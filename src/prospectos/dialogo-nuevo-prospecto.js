import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";
import { UtilsMixin } from "../mixins/utils-mixin.js";

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';

import '../general-controls/item-contacto.js';
import '../controles-extra/selector-usuarios.js';

import '../bootstrap.js';

class DialogoNuevoProspecto extends UtilsMixin(DialogLayoutMixin(PolymerElement)) {
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
			
			<paper-input id="txtRazon" label="Nombre o Razón social" value="{{razon}}" error-message="valor inválido"></paper-input>
			
			<div class="row">
				<div class="col-md-6">
					<vaadin-combo-box id="comboEstado" label="Estado" selected-item="{{estado}}" items="[[_estados]]"
                    item-value-path="codigo" item-label-path="nombre" error-message="seleccione una opción"></vaadin-combo-box>
				</div>
				<div class="col-md-6">
					<selector-usuarios etiqueta="Agente" usuario-elegido="{{agente}}"></selector-usuarios>
				</div>
			</div>
			
			<div class="relative">
				<div class="absolute">Información de contacto</div>
				
				<div style="display:flex;">
					<paper-input style="padding:8px;" id="txtNombre" label="Nombre" error-message="valor inválido" value="{{nombre}}"></paper-input>
					<paper-input style="padding:8px;" label="puesto" value="{{puesto}}"></paper-input>
				</div>
				
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
						<paper-input style="padding:8px;" id="txtTel" label="número telefónico" value="{{tel}}" error-message="ingresa un valor válido">
						</paper-input>
					</div>	
				</div>

				<paper-input style="padding:8px;" label="Correo electrónico" value="{{email}}">
				</paper-input>

			</div>

		`;
	}

	static get properties() {
		return {
			esForzarCliente:{type:Boolean, notify:true, value:false},
			listaTels:{type:Array, notify:true, value:[]},
			listaEmails:{type:Array, notify:true, value:[]},
			listaContactos:{type:Array, notify:true, value:[]},
			agente:{type:Object, notify:true}
		}
	}

	constructor() {
		super();
	}

	ready() {
		super.ready();
		// this.limpiaDatos();
	}

	guardaCliente(){

		if(!this.razon || this.razon==null || this.razon.trim()==""){
			return this.shadowRoot.querySelector("#txtRazon").invalid=true;
		}else{
			this.shadowRoot.querySelector("#txtRazon").invalid=false;
		}

		if(!this.estado || this.estado==null){
			return this.shadowRoot.querySelector("#comboEstado").invalid=true;
		}else{
			this.shadowRoot.querySelector("#comboEstado").invalid=false;
		}

		if(!this.agente || this.agente==null){
			return PolymerUtils.Toast.show("Selecciona un agente encargado del prospecto");
		}

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
		
		var listaTels=[];

		var tel=this.tel;
		var tipo=this.tipoTel;

		if(tel && tel.trim()!="" && tipo && tipo.trim()!=""){
			var agregar={"telefono":tel,"tipo":tipo};
			console.log("se agrega al arreglo",agregar);
			listaTels.push(agregar);
		}

		console.log("listaTels",listaTels);
		
		var listaEmails=[]
		var email=this.email;

		if(email && email.trim()!=""){
			console.log("se agrega al arreglo",email);
			listaEmails.push(email);
		}

		console.log("listaEmails",listaEmails);
		
		var listaContactos=[];

		if(listaTels.length<=0 && listaEmails.length<=0){
			return PolymerUtils.Toast.show("no se encuentran datos de contacto validos");
		}else{
			if(listaTels.length>0){
				nuevo["telefonos"]=listaTels;
			}
			if(listaEmails.length>0){
				nuevo["correos"]=listaEmails;
			}
		}

		listaContactos.push(nuevo);
		
		var cliente={
			_esCliente:this.esForzarCliente,
			_timestamp:firebase.firestore.FieldValue.serverTimestamp(),
			razon:this.razon,
			agente:this.agente
		};

		
		if(!listaContactos || !listaContactos.length || listaContactos.length<=0){
			return PolymerUtils.Toast.show("No hay información de contacto para este prospecto.");
		}else{
			cliente["listaContactos"]=listaContactos;
		}
		
		console.log("cliente",cliente);

		var t=this;
		sharedFirebase.collection("_clientes-khalia").add(cliente)
		.then(function(docRef) {
			console.log("docref",docRef);

			
			PolymerUtils.Toast.show("prospecto agregado con éxito");
			t.despachaProspecto(docRef.id,cliente);
			
			if(t._dialog){
				t._dialog.close();
			}
		
			
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
			PolymerUtils.Toast.show("Error al guardar. Intentalo más tarde.");
		});

	}

	despachaProspecto(id,datos){

		var obj=datos;
		obj["id"]=id;
		this.dispatchEvent(new CustomEvent('prospecto-guardado', {
			detail: {
				datosCliente:obj
			}
		}));
	}

	

	

}

customElements.define('dialogo-nuevo-prospecto', DialogoNuevoProspecto);