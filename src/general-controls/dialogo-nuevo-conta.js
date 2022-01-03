import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';

import '../bootstrap.js';

class DialogoNuevoConta extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                div.relative {
					margin-top:15px;
					padding:5px;
					position: relative;
					border: 3px solid var(--paper-blue-300);
					border-radius:15px;
				}
				div.absolute {
					position: absolute;
					top: -15px;
					left: 20px;
					background-color:white !important;
					font-weight: 700;
					font-size: 14px;
				}
            </style>

            <div class="d-flex">
                <paper-input style="padding:8px;" id="txtNombre" label="Nombre"
                error-message="valor inválido" value="{{nombre}}"></paper-input>

                <paper-input style="padding:8px;" label="puesto" value="{{puesto}}"></paper-input>




            </div>

            <div class="relative">
				<div class="absolute">Datos de contacto</div>

                <div class="d-flex">


                <div class="flex-fill">
                    <div class="d-flex align-items-center">
                        <div class="d-flex flex-column">
                            <label id="label1">tipo de telefono</label>
                            <paper-radio-group selected="{{tipoTel}}" aria-labelledby="label1">
                                <paper-radio-button name="celular">celular</paper-radio-button>
                                <paper-radio-button name="oficina">oficina</paper-radio-button>
                            </paper-radio-group>
                        </div>
                        
                        <paper-input style="padding:8px;" id="txtTel" label="Telefono" value="{{tel}}" error-message="ingresa un valor válido">
                        <button slot="suffix" class="btn btn-sm btn-primary" on-click="agregaTelefono">agregar telefono a la lista</button>

                        </paper-input>

                    </div>
                    <div id="lista-tels" style="overflow-y:scroll;max-height:110px;">
                        <paper-listbox>
                            <template is="dom-repeat" items="[[listaTels]]" as="tels" restamp>
                                <paper-item>
                                    <paper-item-body>[[tels.tipo]]: [[tels.telefono]]</paper-item-body>
                                    <paper-icon-button icon="clear" on-click="quitaTel"></paper-icon-button>
                                </paper-item>
                            </template>
                        </paper-listbox>
                    </div>
                </div>




                <div class="flex-fill">
                    <paper-input style="padding:8px;" label="Correo electrónico" value="{{email}}">
                    <button slot="suffix" class="btn btn-sm btn-primary" on-click="agregaEmail">agregar correo a la lista</button>

                    </paper-input>
                    
                    <div id="lista-email" style="overflow-y:scroll;max-height:110px;">
                        <paper-listbox>
                            <template is="dom-repeat" items="[[listaEmails]]" as="email" restamp>
                                <paper-item>
                                    <paper-item-body>[[email]]</paper-item-body>
                                    <paper-icon-button icon="clear" on-click="quitaEmail"></paper-icon-button>
                                </paper-item>
                            </template>
                        </paper-listbox>
                    </div>
                </div>



                </div>

               
                
                

                

                
				
				

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
            datosEditar:{type:Object, notify:true}
        }
    }

    constructor(obj) {
        // id,arr,pos,data
        super();

        if(obj){
            console.log("recibimos el objeto",obj);
            if(obj.id){
                this.set("idProspecto",obj.id);
            }
    
            if(obj.arr){
                this.set("listaContactos",obj.arr);
            }
            console.log("veamos que llega al constructor",obj.pos);
    
            if(obj.pos){
                
                var num=Number(obj.pos);
                console.log("veamos la posicion",num);
                this.set("posicion",num);
            }else{
                console.log("no llega la posicion");
            }
    
            if(obj.data){
                console.log("veamos que nos llega de contactos",obj.data);
                this.set("datosEditar",obj.data);
                if(obj.data.nombreCliente){
                    this.set("nombre",obj.data.nombreCliente);
                }
    
                if(obj.data.puesto){
                    this.set("puesto",obj.data.puesto);
                }
                if(obj.data.telefonos){
                    this.set("listaTels",obj.data.telefonos);
                }
                if(obj.data.correos){
                    this.set("listaEmails",obj.data.correos);
                }
            }
        }

        


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
}

customElements.define('dialogo-nuevo-conta', DialogoNuevoConta);