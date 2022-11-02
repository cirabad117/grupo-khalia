import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin';

import '@polymer/paper-checkbox/paper-checkbox.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';

import '../general-controls/my-doc-upload.js';


class MyNuevaAct extends DialogLayoutMixin(UtilsMixin(PolymerElement)) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                    overflow-y:scroll;
                    max-height:300px;
                }
            </style>
            
            <paper-checkbox checked="{{esImagen}}">Agregar imagen</paper-checkbox>

            <template is="dom-if" if="{{esImagen}}">
                <my-doc-upload id="carga-item" carpeta-guardar="_grupo-khalia/actividades"
                on-archivo-guardado="guardaAct" style="margin:10px;"></my-doc-upload>
            </template>




            <paper-input id="txt-tit" label="Título" value="{{titulo}}" error-message="Información inválida"></paper-input>

            <div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content: space-between;">
            
                <vaadin-date-picker i18n="[[vaadinDateConfig]]" id="combo-fe" label="Fecha"
                value="{{fecha}}" error-message="Información inválida"></vaadin-date-picker>
                
                <paper-checkbox checked="{{esCalendario}}">Incluir en el calendario</paper-checkbox>

            </div>
            

            <paper-textarea id="txt-desc" label="Descripción" value="{{desc}}" error-message="Información inválida"><paper-textarea>


        `;
    }

    static get properties() {
        return {
            tipo:{type:String, notify:true}

        }
    }

    constructor(ti) {
        super();

        if(ti){
            this.set("tipo",ti);
        }
    }

    ready() {
        super.ready();
    }

    ejecutaGuardar(){

        if(this.esImagen && this.esImagen==true){
            this.shadowRoot.querySelector("#carga-item").guardaDocumento();
        }else{
            this.guardaAct({detail:{direccion:"ninguno",
                nombreArchivo:"ninguno"}})
        }

    }

    
    guardaAct(e){
        if(!this.titulo || this.titulo==null || this.titulo.trim()==""){
            return this.shadowRoot.querySelector("#txt-tit").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txt-tit").invalid=false;
        }

        if(!this.fecha || this.fecha==null || this.fecha.trim()==""){
            return this.shadowRoot.querySelector("#combo-fe").invalid=true;
        }else{
            this.shadowRoot.querySelector("#combo-fe").invalid=false;
        }

        if(!this.desc || this.desc==null || this.desc.trim()==""){
            return this.shadowRoot.querySelector("#txt-desc").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txt-desc").invalid=false;
        }

        
        var act={
            titulo:this.titulo,
            fecha:this.fecha,
            desc:this.desc,
            tipo:this.tipo,
            fotoUrl:e.detail.direccion,
            nombreFile:e.detail.nombreArchivo
        }

        var t=this;

        DataHelper.insert(this,{
            collection:"actividades",
            object:act,
            includeTimestamp:true,
            includeUser:true,
            success:function(){
                if(t.esCalendario && t.esCalendario==true){
                    firebase.firestore().collection("_fechas-khalia").add({
                        tipo:{"texto":"Fiesta / evento","fondo":"var(--paper-green-600)","color":"white"},
                        nombre:t.titulo,
                        fecha:t.fecha,
                        act:t.tipo
                    })
                    .then(() => {
                        //PolymerUtils.Toast.show("Cliente almacenado con exito actualizada con exito");
                        console.log("calendar");
                    })
                    .catch((error) => {
                        
                        console.error("Error writing document: ", error);
                    });
                }
                
                t.DialogLayout_closeDialog();

            
            },
            error:function(err) {
                PolymerUtils.Toast.show("Error al guardar, intentalo más tarde");
                console.log("fallo la insercion",err);
            }
        });

    }
}

customElements.define('my-nueva-act', MyNuevaAct);