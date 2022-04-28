import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";
import { NotificacionMixin } from '../mixins/notificacion-mixin.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

//import './item-contacto.js';

import '../bootstrap.js';

class MyNuevoCliente extends NotificacionMixin(UtilsMixin(DialogLayoutMixin(PolymerElement))) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    margin:10px;
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
            
           
            
            <paper-input id="txtRazon" label="Razón social" value="{{razon}}" error-message="valor inválido"></paper-input>

            <paper-input id="txtEstacion" label="número de estación" value="{{noEs}}" error-message="valor inválido"></paper-input>
            
            <vaadin-combo-box id="comboVenta"  placeholder="Proveedor" selected-item="{{objVenta}}" items="[[_ventaPor]]"
            item-value-path="codigo" item-label-path="nombre" error-message="seleccione una opción"></vaadin-combo-box>
            
            <div class="relative">
                <div class="absolute">Información de contacto</div>
				
				<div class="d-flex flex-wrap align-items-center">
					<paper-input style="padding:8px;" id="txtNombre" label="Nombre" error-message="valor inválido" value="{{nombre}}"></paper-input>
					<paper-input style="padding:8px;" label="puesto" value="{{puesto}}"></paper-input>
				</div>

                <div class="d-flex flex-wrap align-items-center">
                <vaadin-select label="tipo de telefono" value="{{tipoTel}}">
							<template>
								<vaadin-list-box>
									<vaadin-item value="celular">celular</vaadin-item>
									<vaadin-item value="oficina">oficina</vaadin-item>
								</vaadin-list-box>
							</template>
						</vaadin-select>
                        <paper-input style="padding:8px;" id="txtTel" label="número telefónico" value="{{tel}}" error-message="ingresa un valor válido">
						</paper-input>
                </div>




				

				<paper-input style="padding:8px;" label="Correo electrónico" value="{{email}}">
				</paper-input>

			</div>


            <!-- <div class="container card">
                <div class="row card-body">
                    <div class="col-md-6">
                        <h6>datos del cliente</h6>
                        
                        <paper-input id="txtRazon" label="Razón social" value="{{razon}}" error-message="valor inválido"></paper-input>

                        <paper-input id="txtEstacion" label="número de estación" value="{{noEs}}" error-message="valor inválido"></paper-input>
                        
                        
                        <vaadin-combo-box id="comboVenta"  placeholder="venta por" selected-item="{{objVenta}}" items="[[_ventaPor]]"
                        item-value-path="codigo" item-label-path="nombre" error-message="seleccione una opción"></vaadin-combo-box>

                        
                    </div>
                    
                    <div class="col-md-6">
                        <div style="display:flex; align-items:center;justify-content:space-between;">
                            <div>
                                <h6>contacto del cliente</h6>
                                <template is="dom-if" if="{{!revisaContactos(listaContactos,listaContactos.*)}}">
                                    <p>no hay contactos registrados</p>
                                </template>
                            </div>
                            <paper-icon-button style="border:solid 1px var(--paper-blue-500);border-radius:50%;" icon="[[devuelveIcono(bolContacto)]]" on-click="toggleContacto"></paper-icon-button>
                        </div>
                        
                        <paper-listbox>
                            <template is="dom-repeat" items="[[listaContactos]]">
                                <item-contacto datos-contacto="[[item]]" index-contacto="[[index]]" on-quita-contacto="spliceContactos"></item-contacto>
                            </template>
                        </paper-listbox>
                        
                        
                        <template is="dom-if" if="[[bolContacto]]">

                            <paper-input id="txtNombre" label="Nombre" error-message="valor inválido" value="{{nombre}}"></paper-input>
                            <paper-input label="Telefono" value="{{tel}}"></paper-input>
                            <paper-input label="Correo electrónico" value="{{email}}"></paper-input>
                            
                            <paper-button raised on-click="agregaContacto">agregar a la lista</paper-button>
                        </template>
                        
                        
                    </div>

                    
                </div>

            
            </div> -->
            
        `;
    }

    static get properties() {
        return {
            objVenta:{type:Object, notify:true},
            noEs:{type:String, notify:true},
            razon:{type:String, notify:true},
            estado:{type:Object, notify:true},
            nombre:{type:String, notify:true},
            puesto:{type:String, notify:true},
            email:{type:String, notify:true},
            tel:{type:String, notify:true},
           
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    // toggleContacto(){
    //     this.set("bolContacto",!this.bolContacto);
    //     this.DialogLayout_notifyResize();
    // }

    // devuelveIcono(bol){
    //     if(bol==true){
    //         return "clear";
    //     }else{
    //         return "add";
    //     }
    // }

    // revisaContactos(arr){
    //     if(arr && arr.length && arr.length>0){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    // spliceContactos(e){
    //     var eliminar=e.detail.indexEliminar;
    //     this.splice("listaContactos",eliminar,1);

    // }

    agregaContacto(){

        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.shadowRoot.querySelector("#txtNombre").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtNombre").invalid=false;
        }
        var nuevo={
            nombreCliente:this.nombre,
            
        };

        if(this.tel && this.tel!=null && this.tel.trim()!=""){
            nuevo["telefono"]=this.tel;
        }

        if(this.email && this.email!=null && this.email.trim()!=""){
            nuevo["email"]=this.email;
        }

        


        this.push("listaContactos",nuevo);
        // 
        

    }

    guardaCliente(){
        if(!this.razon || this.razon==null || this.razon.trim()==""){
            return this.shadowRoot.querySelector("#txtRazon").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtRazon").invalid=false;
        }

        if(!this.noEs || this.noEs==null || this.noEs.trim()==""){
            return this.shadowRoot.querySelector("#txtEstacion").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtEstacion").invalid=false;
        }

        if(!this.estado || this.estado==null){
            return this.shadowRoot.querySelector("#comboEstado").invalid=true;
        }else{
            this.shadowRoot.querySelector("#comboEstado").invalid=false;
        }

        if(!this.objVenta || this.objVenta==null){
            return this.shadowRoot.querySelector("#comboVenta").invalid=true;
        }else{
            this.shadowRoot.querySelector("#comboVenta").invalid=false;
        }

        this.agregaContacto();

        if(!this.listaContactos || !this.listaContactos.length || this.listaContactos.length<=0){
            return PolymerUtils.Toast.show("No hay información de contacto válida");
        }

        var cliente={
            _timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            nomEstacion:this.noEs,
            razonSocial:this.razon,
            estado:this.estado,
            ventaPor:this.objVenta,
            listaContactos:this.listaContactos
            
        };

        var t=this;
        sharedFirebase.collection("_clientes-khalia").add(cliente)
        .then(function(docRef) {
            //t._dialog.close();
            t.limpiaCampos();
            t.notificacionCreate({
                texto:"Cliente guardado con éxito",
                duracion:3000
            });
            NavigationUtils.navigate("lista-clientes");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    limpiaCampos(){
        this.set("noEs","");
        this.set("razon","");
        this.set("estado",null);
        this.set("objVenta",null);
        this.set("listaContactos",[]);
        this.limpiaCamposContacto();
    }

    limpiaCamposContacto(){
        this.set("nombre",null);
        this.set("tel",null);
        this.set("email",null);
    }

    // regresa(){
    //     window.history.back();
    // }
}

customElements.define('my-nuevo-cliente', MyNuevoCliente);