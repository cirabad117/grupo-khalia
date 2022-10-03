import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin';

import '@polymer/paper-input/paper-input.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-select/vaadin-select.js';

class MyDatosEquipo extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <vaadin-select id="combo-tipo" label="Tipo" value="{{tipo}}" error-message="selecciona una opcion">
                    <template>
                        <vaadin-list-box>
                            
                            <template is="dom-repeat" items="[[listaTipo]]" as="filtro">
                                <vaadin-item value="[[filtro.texto]]">[[filtro.texto]]</vaadin-item>
                            </template>
                        </vaadin-list-box>
                    </template>
                </vaadin-select>

                <template is="dom-if" if="{{esOtro(tipo)}}">
                    <paper-input id="txt-desc" label="Descripción" value="{{desc}}" error-message="valor invalido"></paper-input>


                </template>

            <paper-input id="txt-marca" label="Marca" value="{{marca}}" error-message="valor invalido"></paper-input>
            
            <paper-input id="txt-mod" label="Modelo" value="{{modelo}}" error-message="valor invalido"></paper-input>
            
            <paper-input id="txt-ns" label="Número de serie" value="{{ns}}" error-message="valor invalido"></paper-input>

            <paper-input id="txt-obs" label="Observaciones" value="{{obs}}" error-message="valor invalido"></paper-input>
            
            
            

        `;
    }

    static get properties() {
        return {
            listaTipo:{type:Array, notify:true,value:[
                {color:"#FFEB3B",base:"black",texto:"LAPTOP"},
                {color:"#FFEB3B",base:"black",texto:"IMPRESORA"},
                {color:"#FFEB3B",base:"black",texto:"MOUSE"},
                {color:"#FFEB3B",base:"black",texto:"CARGADOR"},
                {color:"#FFEB3B",base:"black",texto:"MOCHILA"},
                {color:"#FFEB3B",base:"black",texto:"TELÉFONO"},
                {color:"#FFEB3B",base:"black",texto:"OTRO"},
            ]},

            accionRealizar:{type:String, notify:true},
            objEditar:{type:Object, notify:true}

        }
    }

    constructor(accion,obj) {
        super();

        if(accion){
            this.set("accionRealizar",accion);

            if(accion=="editar" && obj && obj!=null){
                this.set("objEditar",obj);
                this.set("tipo",obj.tipo);
                this.set("marca",obj.marca);
                this.set("modelo",obj.modelo);
                this.set("ns",obj.ns);
                if(obj.obs){
                    this.set("obs",obj.obs);
                }
                if(obj.desc){
                    this.set("desc",obj.desc);
                }
                
                
            }
        }
    }

    ready() {
        super.ready();
    }

    esOtro(str){
        return str=="OTRO";
    }

    ejecutaAccion(){
        if(!this.tipo || this.tipo==null || this.tipo.trim()==""){
            return this.shadowRoot.querySelector("#combo-tipo").invalid=true;
        }else{
            this.shadowRoot.querySelector("#combo-tipo").invalid=false;
        }

        if(this.tipo=="OTRO"){
            if(!this.desc || this.desc==null || this.desc.trim()==""){
                return this.shadowRoot.querySelector("#combo-desc").invalid=true;
            }else{
                this.shadowRoot.querySelector("#combo-desc").invalid=false;
            }
        }



        if(!this.marca || this.marca==null || this.marca.trim()==""){
            return this.shadowRoot.querySelector("#txt-marca").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txt-marca").invalid=false;
        }
        if(!this.modelo || this.modelo==null || this.modelo.trim()==""){
            return this.shadowRoot.querySelector("#txt-mod").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txt-mod").invalid=false;
        }
        if(!this.ns || this.ns==null || this.ns.trim()==""){
            return this.shadowRoot.querySelector("#txt-ns").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txt-ns").invalid=false;
        }

        var item={
            tipo:this.tipo,
            marca:this.marca,
            modelo:this.modelo,
            ns:this.ns
        }

        if(this.tipo=="OTRO"){
            item["desc"]=this.desc;
        }

        if(this.obs && this.obs.trim()!=""){
            item["obs"]=this.obs;
        }

        var t=this;

        if(this.accionRealizar=="crear"){
            item["_timestamp"]=firebase.firestore.FieldValue.serverTimestamp();
            
            firebase.firestore().collection("estatus-area").doc("sistemas").collection("inventario").add(item).then(function(docRef) {
                PolymerUtils.Toast.show("registro agregado con éxito");
                
                t.limpiaCampos();
                t.DialogLayout_closeDialog();
            }).catch(function(error) {
                console.error("Error adding document: ", error);
                PolymerUtils.Toast.show("Error al guardar. Intentalo más tarde.");
            });

        }else{
            var idDoc=this.objEditar.id;
            item["_timestamp"]=this.objEditar._timestamp;
            var washingtonRef = firebase.firestore().collection("estatus-area").doc("sistemas").collection("inventario").doc(idDoc);
            return washingtonRef.update(item).then(() => {
                PolymerUtils.Toast.show("Equipo actualizado");
                t.limpiaCampos();
                    t.DialogLayout_closeDialog();
                
                
               // t.actualizaCliente(cliente);
            
            }).catch((error) => {
                PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
                console.error("Error updating document: ", error);
            });
        }

    }

    limpiaCampos(){
        this.set("tipo","");
        this.set("marca","");
        this.set("modelo","");
        this.set("ns","");
        this.set("obs","");
    }
}

customElements.define('my-datos-equipo', MyDatosEquipo);