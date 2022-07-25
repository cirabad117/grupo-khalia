import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/iron-collapse/iron-collapse.js';

import '../bootstrap.js';

class DialogoNuevoConta extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                .btn-secundario{
                    color:black;
                }

               .btn-secundario:hover{
                   color:var(--paper-blue-800);
                   background-color:white;
                }

                paper-item{
                    background-color:var(--paper-grey-100);
                }
                
                paper-radio-button.red {
                    --paper-radio-button-checked-color: white;
                    --paper-radio-button-checked-ink-color: white;
                    --paper-radio-button-unchecked-color: white;
                    --paper-radio-button-unchecked-ink-color: white;
                    --paper-radio-button-label-color: white;
                }
            </style>
            
            <paper-input style="margin:5px;"id="txtNombre" label="Nombre"
            error-message="valor inválido" value="{{nombre}}"></paper-input>
            
            <paper-input style="margin:5px;"
            label="puesto" value="{{puesto}}"></paper-input>

            <div class="p-3 ">
                <div class="d-flex justify-content-between align-items-center">
                    <p>
                        <span>
                            <iron-icon icon="icons:perm-phone-msg"></iron-icon>
                        </span>
                        Teléfonos
                    </p>
                    <template is="dom-if" if="{{!esNuevoTel}}">
                        <paper-icon-button icon="icons:add-circle" class="btn-secundario"
                        on-click="toggleTel" onmouseover="PolymerUtils.Tooltip.show(event,'Agregar número')">
                        </paper-icon-button>
                    </template>
                </div>
                <iron-collapse opened="{{esNuevoTel}}">
                    <label id="label1">tipo de teléfono</label>
                    <paper-radio-group  selected="{{tipoTel}}" aria-labelledby="label1">
                        <paper-radio-button name="celular">celular</paper-radio-button>
                                        <paper-radio-button name="oficina">oficina</paper-radio-button>
                                    </paper-radio-group>
                                    
                                    <div class="input-group">
                                        <input type="text" class="form-control" value="{{tel::input}}" placeholder="Número telefónico" aria-describedby="button-addon4">
                                        <div class="input-group-append" id="button-addon4">
                                            <paper-icon-button icon="icons:done" on-click="agregaTelefono" 
                                            onmouseover="PolymerUtils.Tooltip.show(event,'Aceptar')">
                                            </paper-icon-button>
                                            
                                            <paper-icon-button icon="icons:clear" on-click="toggleTel"
                                            onmouseover="PolymerUtils.Tooltip.show(event,'Cancelar')">
                                            </paper-icon-button>
                                        </div>
                                    </div>
                                </iron-collapse>
                                
                                <iron-collapse opened="{{!esNuevoTel}}">
                                    <paper-listbox>
                                        <template is="dom-repeat" items="[[listaTels]]" as="tels" restamp>
                                            <paper-item>
                                                <paper-item-body>[[tels.tipo]]: [[tels.telefono]]</paper-item-body>
                                                <paper-icon-button icon="delete" on-click="quitaTel" onmouseover="PolymerUtils.Tooltip.show(event,'Quitar')"></paper-icon-button>
                                            </paper-item>
                                        </template>
                                    </paper-listbox>
                                </iron-collapse>
                            </div>
                            <div class="p-3 ">
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>
                                        <span>
                                            <iron-icon icon="icons:mail"></iron-icon>
                                        </span>
                                        correos electronicos
                                    </p>
                                
                                    <template is="dom-if" if="{{!esNuevoEmail}}">
                                        <paper-icon-button icon="add-circle" class="btn-secundario" on-click="toggleEmail"
                                        onmouseover="PolymerUtils.Tooltip.show(event,'Agregar correo')">
                                        </paper-icon-button>
                                    </template>
                                </div>
                                
                                <iron-collapse opened="{{esNuevoEmail}}">
                                    
                                    <div class="input-group">
                                        <input type="text" class="form-control" value="{{email::input}}"
                                        placeholder="Dirección de correo" aria-describedby="button-addon5">
                                    
                                        <div class="input-group-append" id="button-addon5">
                                            <paper-icon-button icon="icons:done" on-click="agregaEmail"
                                            onmouseover="PolymerUtils.Tooltip.show(event,'Aceptar')">
                                            </paper-icon-button>
                                        
                                            <paper-icon-button icon="icons:clear" on-click="toggleEmail"
                                            onmouseover="PolymerUtils.Tooltip.show(event,'Cancelar')">
                                            </paper-icon-button>
                                        </div>
                                    </div>
                                </iron-collapse>
                                
                                <iron-collapse opened="{{!esNuevoEmail}}">
                                    <paper-listbox>
                                        <template is="dom-repeat" items="[[listaEmails]]" as="email" restamp>
                                            <paper-item>
                                                <paper-item-body>[[email]]</paper-item-body>
                                                <paper-icon-button icon="delete" on-click="quitaEmail" onmouseover="PolymerUtils.Tooltip.show(event,'Quitar')"></paper-icon-button>
                                            </paper-item>
                                        </template>
                                    </paper-listbox>
                                </iron-collapse>
                            </div>
    


        `;
    }

    static get properties() {
        return {
            idProspecto:{type:String, notify:true},
            listaTels:{type:Array, notify:true, value:[]},
            listaEmails:{type:Array, notify:true, value:[]},
            listaContactos:{type:Array, notify:true, value:[]},

            posicion:{type:Number, notify:true},
            datosEditar:{type:Object, notify:true},

            esNuevoTel:{type:Boolean, notify:true, value:false},
            esNuevoEmail:{type:Boolean, notify:true, value:false}
        }
    }

    constructor(id,arr) {
        // id,arr,pos,data
        super();
        
        if(id){
            this.set("idProspecto",id);
        }
        if(arr){
            this.set("listaContactos",arr);
        }
    }

    static get observers() {
        return [
            '_changed(esNuevoTel,esNuevoEmail)'
        ];
    }

    _changed(bol1,bol2){
        this.DialogLayout_notifyResize();
    }
    toggleTel(){
        this.set("esNuevoTel",!this.esNuevoTel);
        this.set("tel",null);

    }
    toggleEmail(){
        this.set("esNuevoEmail",!this.esNuevoEmail);
        this.set("email",null);

    }

    muestraIcono(bol){
        return bol==true?"expand-less":"expand-more";
    }

    quitaTel(e){
        console.log("quitamos telefono",e.model.tels,e.model.index);
        var id=e.model.index;
        this.splice("listaTels",id,1);
        this.DialogLayout_notifyResize();
    }
    quitaEmail(e){
        console.log("quitamos email",e.model.email,e.model.index);
        var id=e.model.index;
        this.splice("listaEmails",id,1);
        this.DialogLayout_notifyResize();
    }

    ready() {
        super.ready();
    }

    agregaTelefono(){

        var telsActuales=PolymerUtils.cloneObject(this.listaTels);
        var tel=this.tel;
        var tipo=this.tipoTel;
        if(!tel || tel==null || tel.trim()==""){
            return PolymerUtils.Toast.show("valor invalido");
        }

        if(!tipo || tipo==null || tipo.trim()==""){
            return PolymerUtils.Toast.show("seleciona un tipo de telefono");
        }
        var agregar={"telefono":tel,"tipo":tipo};
        
        //this.push("listaTels",agregar);
        telsActuales.push(agregar);
        this.set("listaTels",telsActuales);
        this.toggleTel();
        if(this._dialog){
            this.DialogLayout_notifyResize();
        }
    }
    agregaEmail(){
        var emailsActuales=PolymerUtils.cloneObject(this.listaEmails);
        var email=this.email;
        if(!email || email==null || email.trim()==""){
            return PolymerUtils.Toast.show("valor invalido");
        }
        emailsActuales.push(email);
        this.set("listaEmails",emailsActuales);
        this.toggleEmail();
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

    editaContacto(){
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
        var posi=this.posicion;
        arreglo[posi]=nuevo;
        var t=this;
        var id=t.idProspecto;
        var washingtonRef = firebase.firestore().collection("_clientes-khalia").doc(id);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            listaContactos: arreglo
        }).then(() => {
            PolymerUtils.Toast.show("contacto agregado con éxito");
            t.limpiaCamposContacto();
            t.disparaFinalizado();
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
        this.set("listaEmails",[]);
    }

    limpiaDatos(){
        console.log("se ejecuta limpiaDatos");
        this.set("razon",null);
        this.set("listaContactos",[]);
        console.log("listaContactos",this.listaContactos);
        this.limpiaCamposContacto();
    }

    disparaFinalizado(){
        this.dispatchEvent(new CustomEvent('finaliza-accion', {
            detail: {
                closed:true
            }
        }));
    }
}

customElements.define('dialogo-nuevo-conta', DialogoNuevoConta);