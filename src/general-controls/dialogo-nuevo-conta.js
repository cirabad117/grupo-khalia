import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '../bootstrap.js';

class DialogoNuevoConta extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <paper-input style="padding:8px;" id="txtNombre" label="Nombre"
                        error-message="valor inválido" value="{{nombre}}"></paper-input>
                    </div>
                    <div class="col-md-6">
                        <paper-input style="padding:8px;" label="puesto" value="{{puesto}}"></paper-input>
                    </div>
                </div><!--row-->

                <div class="row">
                    <div class="col-md-6">
                        <vaadin-select label="tipo de telefono" value="{{tipoTel}}">
                            <template>
                                <vaadin-list-box>
                                    <vaadin-item value="celular">celular</vaadin-item>
                                    <vaadin-item value="oficina">oficina</vaadin-item>
                                </vaadin-list-box>
                            </template>
                        </vaadin-select>
                    </div>
                    <div class="col-md-6">
                        <paper-input style="padding:8px;" id="txtTel" label="Telefono" value="{{tel}}" error-message="ingresa un valor válido">
                            <paper-icon-button slot="suffix" icon="add" on-click="agregaTelefono"></paper-icon-button>
                        </paper-input>
                    </div>
                    <div class="col-md-12">
                        <div id="lista-tels" style="overflow-y:scroll;max-height:70px;">
                            <vaadin-list-box>
                                <template is="dom-repeat" items="[[listaTels]]" as="tels" restamp>
                                    <vaadin-item>[[tels.tipo]]: [[tels.telefono]]</vaadin-item>
                                </template>
                            </vaadin-list-box>
                        </div>
                    </div>
                </div><!--row-->

                <div class="row">
                    <div class="col-md-6">
                        <paper-input style="padding:8px;" label="Correo electrónico" value="{{email}}">
                            <paper-icon-button slot="suffix"
                            icon="add" on-click="agregaEmail"></paper-icon-button>
                        </paper-input>
                    </div>
                    <div class="col-md-12">
                        <div id="lista-email" style="overflow-y:scroll;max-height:70px;">
                            <vaadin-list-box>
                                <template is="dom-repeat" items="[[listaEmails]]" as="email" restamp>
                                    <vaadin-item>[[email]]</vaadin-item>
                                </template>
                            </vaadin-list-box>
                        </div>
                    </div>
                </div><!--row-->
                   
                
                
            </div><!--container-->
            
          
            

        `;
    }

    static get properties() {
        return {
            idProspecto:{type:String, notify:true},
            listaTels:{type:Array, notify:true, value:[]},
            listaEmails:{type:Array, notify:true, value:[]},
            listaContactos:{type:Array, notify:true, value:[]},
        }
    }

    constructor(id,arr) {
        super();

        if(id){
            this.set("idProspecto",id);
        }

        if(arr){
            this.set("listaContactos",arr);
        }
    }

    ready() {
        super.ready();
    }

    agregaTelefono(){
        var tel=this.tel;
        var tipo=this.tipoTel;
        if(!tel || tel==null || tel.trim()==""){
            return PolymerUtils.Toast.show("valor invalido");
        }

        if(!tipo || tipo==null || tipo.trim()==""){
            return PolymerUtils.Toast.show("seleciona un tipo de telefono");
        }
        var agregar={"telefono":tel,"tipo":tipo};
        
        this.push("listaTels",agregar);
        if(this._dialog){
            this.DialogLayout_notifyResize();
        }
    }
    agregaEmail(){
        var email=this.email;
        if(!email || email==null || email.trim()==""){
            return PolymerUtils.Toast.show("valor invalido");
        }
        this.push("listaEmails",email);
        if(this._dialog){
            this.DialogLayout_notifyResize();
        }
    }

    agregaContacto(){
        var arreglo=PolymerUtils.cloneObject(this.listaContactos);
        console.log("agregaContacto",arreglo);
        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.shadowRoot.querySelector("#txtNombre").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtNombre").invalid=false;
        }
        var nuevo={
            nombreCliente:this.nombre
        };

        if(this.puesto && this.puesto!=null && this.puesto.trim()!=""){
            nuevo["puesto"]=this.puesto;
        }

        if(this.listaTels.length<=0 && this.listaEmails.length<=0){
            return PolymerUtils.Toast.show("no se encuentran datos de contacto validos");
        }else{
            if(this.listaTels.length>0){
                nuevo["telefonos"]=this.listaTels;
            }
            if(this.listaEmails.length>0){
                nuevo["correos"]=this.listaEmails;
            }
        }
        
       
        
        //this.push("listaContactos",nuevo);
        arreglo.push(nuevo);
        var t=this;
        var id=t.idProspecto;
        var washingtonRef = firebase.firestore().collection("_clientes-khalia").doc(id);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            listaContactos: arreglo
        }).then(() => {
            PolymerUtils.Toast.show("contacto agregado con éxito");
            t.limpiaCamposContacto();
            t.DialogLayout_closeDialog();
        }).catch((error) => {
            PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
            console.error("Error updating document: ", error);
        });


        //this.limpiaCamposContacto();
        //console.log("listaContactos",this.listaContactos);
    }

    limpiaCamposContacto(){
        console.log("se ejecuta limpiaCamposContacto");
        this.set("nombre",null);
        this.set("tel",null);
        this.set("email",null);

        this.set("listaTels",[]);
        console.log("listaTels",this.listaTels);
        this.set("listaEmails",[]);
        console.log("listaEmails",this.listaEmails);
    }

    limpiaDatos(){
        console.log("se ejecuta limpiaDatos");
        this.set("razon",null);
        this.set("listaContactos",[]);
        console.log("listaContactos",this.listaContactos);
        this.limpiaCamposContacto();
    }
}

customElements.define('dialogo-nuevo-conta', DialogoNuevoConta);