import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';

import '../general-controls/my-text-editor.js';
import '../general-controls/my-doc-upload.js';

class MyNuevoSeg extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <paper-radio-group selected="{{seccion}}">
                
                <paper-radio-button name="normas">Normas</paper-radio-button>
                <paper-radio-button name="avisos">Avisos de seguridad</paper-radio-button>
                
            </paper-radio-group>

            <paper-tabs selected="{{tipo}}" attr-for-selected="name" style="background-color:var(--paper-blue-100);">
                <paper-tab name="archivo">Subir archivo</paper-tab>
                <paper-tab name="texto">Escribir comunicado</paper-tab>
            </paper-tabs>

            <!-- <paper-radio-group selected="{{tipo}}" aria-labelledby="label1">
                
                <paper-radio-button name="archivo">Subir archivo</paper-radio-button>
                <paper-radio-button name="texto">Escribir comunicado</paper-radio-button>
                
            </paper-radio-group> -->

            
            <paper-input id="txt-titulo" label="Título" value="{{titulo}}" error-message="valor inválido"></paper-input>
            

            
            <iron-pages selected="{{tipo}}" attr-for-selected="name">
                <div name="archivo">
                    <my-doc-upload id="carga-item" carpeta-guardar="_grupo-khalia/docs"
                    on-archivo-guardado="guardaArchivoFirebase" style="margin:10px;"></my-doc-upload>
                                        
                </div>
                <div name="texto">
                    <my-text-editor id="text-campos" texto-incrustar="{{campos}}"></my-text-editor>

                </div>
            </iron-pages>
            

        `;
    }

    static get properties() {
        return {
            tipo:{type:String, notify:true, value:"archivo"},
            seccion:{type:String, notify:true, value:"normas"}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    guardaRegistro(){

        if(!this.titulo || this.titulo==null || this.titulo.trim()==""){
            return this.shadowRoot.querySelector("#txt-titulo").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txt-titulo").invalid=false;
        }


        if(this.tipo=="archivo"){
            this.shadowRoot.querySelector("#carga-item").guardaDocumento();
        }else{

            var texto=this.shadowRoot.querySelector("#text-campos").muestraTexto();


            if(!texto || texto==null || texto.trim()=="" || texto=="<p></p>" || texto=="<p><br></p>"){
                return PolymerUtils.Toast.show("Escribe un texto válido.");
            }

            var guardar={
                seccion:this.seccion,
                titulo:this.titulo,
                doc:texto,
                tipo:this.tipo
            }

            var t=this;

            DataHelper.insert(this,{
                collection:"documentos",
                object:guardar,
                includeTimestamp:true,
                includeUser:true,
                success:function(){
                    PolymerUtils.Toast.show("Registro agregado con éxito");
                    t.DialogLayout_closeDialog();
    
                
                },
                error:function(err) {
                    PolymerUtils.Toast.show("Error al guardar, intentalo más tarde");
                    console.log("fallo la insercion",err);
                }
            });

        }

    }

    guardaArchivoFirebase(e){
        var guardar={
            archivoUrl:e.detail.direccion,
            nombreArchivo:e.detail.nombreArchivo,
            titulo:this.titulo,
            tipo:this.tipo,
            seccion:this.seccion
        }

        var t=this;

        DataHelper.insert(this,{
            collection:"documentos",
            object:guardar,
            includeTimestamp:true,
            includeUser:true,
            success:function(){
                PolymerUtils.Toast.show("Registro agregado con éxito");
                t.DialogLayout_closeDialog();

            
            },
            error:function(err) {
                PolymerUtils.Toast.show("Error al guardar, intentalo más tarde");
                console.log("fallo la insercion",err);
            }
        });

    }
}

customElements.define('my-nuevo-seg', MyNuevoSeg);