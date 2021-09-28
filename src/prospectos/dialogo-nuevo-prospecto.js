import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';

import '../general-controls/item-contacto.js';
import '../controles-extra/selector-usuarios.js';

import '../bootstrap.js';

class DialogoNuevoProspecto extends DialogLayoutMixin(PolymerElement) {
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
						<paper-input id="txtRazon" label="Nombre o Razón social" value="{{razon}}" error-message="valor inválido"></paper-input>

					</div>
					<div class="col-md-6">
						<selector-usuarios etiqueta="Agente" usuario-elegido="{{agente}}"></selector-usuarios>

					</div>
				</div>
				
				<div class="row">
					<div class="col-md-12 border rounded border-primary">
						<p>agregar contacto de prospecto</p>
						<div style="display: flex; padding: 8px;align-items:center;">
							<!-- <div style="flex-grow: 1; margin:5px;">
							</div> -->



							<div style="flex-grow: 1; margin:5px;">
								<paper-input style="padding:8px;" id="txtNombre" label="Nombre" error-message="valor inválido" value="{{nombre}}"></paper-input>
								<paper-input style="padding:8px;" label="puesto" value="{{puesto}}"></paper-input>

								

							</div>
							<div style="flex-grow: 1; margin:5px;">
								<div style="display:flex;">
									<vaadin-select label="tipo de telefono" value="{{tipoTel}}">
										<template>
											<vaadin-list-box>
												<vaadin-item value="celular">celular</vaadin-item>
												<vaadin-item value="oficina">oficina</vaadin-item>
											</vaadin-list-box>
										</template>
									</vaadin-select>
									<paper-input style="padding:8px;" id="txtTel" label="Telefono" value="{{tel}}" error-message="ingresa un valor válido">
										<paper-icon-button slot="suffix" style="color:var(--paper-red-500);" icon="add" on-click="agregaTelefono"></paper-icon-button>

									</paper-input>
								</div>
								<div id="lista-tels" style="overflow-y:scroll;max-height:70px;">
									<vaadin-list-box>
										<template is="dom-repeat" items="[[listaTels]]" as="tels" restamp>
											<vaadin-item>[[tels.tipo]]: [[tels.telefono]]</vaadin-item>
										</template>
									</vaadin-list-box>
								</div>

							</div>
							<div style="flex-grow: 1; margin:5px;">
								<paper-input style="padding:8px;" label="Correo electrónico" value="{{email}}">
									<paper-icon-button slot="suffix" style="color:var(--paper-red-500);" icon="add" on-click="agregaEmail"></paper-icon-button>

								</paper-input>
								<div id="lista-email" style="overflow-y:scroll;max-height:70px;">
									<vaadin-list-box>
										<template is="dom-repeat" items="[[listaEmails]]" as="email" restamp>
											<vaadin-item>[[email]]</vaadin-item>
										</template>
									</vaadin-list-box>
								</div>
							
							</div>
							<div style="flex-grow: 1; margin:5px;">
								<button style="padding:8px;" class="btn btn-sm btn-primary" on-click="agregaContacto">agregar contacto</button>

							</div>


						</div>
						
					</div>
					

				</div>

				<div class="row" style="overflow-y:scroll;max-height:200px;">
					<template is="dom-repeat" items="[[listaContactos]]" restamp>
						<div class="col-3">
							<item-contacto datos-contacto="[[item]]" index-contacto="[[index]]" on-quita-contacto="spliceContactos"></item-contacto>
						</div>
					</template>
				</div>

			</div>
		`;
	}

	static get properties() {
		return {
			listaTels:{type:Array, notify:true, value:[]},
			listaEmails:{type:Array, notify:true, value:[]},
			listaContactos:{type:Array, notify:true, value:[]},
			agente:{type:Object, notify:true}
			//numeroTel:{type:}
		}
	}

	constructor() {
		super();
	}

	ready() {
		super.ready();
		this.limpiaDatos();
	}

	agregaTelefono(){
		var tel=this.tel;
		var tipo=this.tipoTel;
		if(!tel || tel==null || tel.trim()==""){
			return PolymerUtils.Toast.show("valor invalido");
		}

		if(!tipo || tipo==null || tipo.trim()==""){
			return PolymerUtils.Toast.show("valor invalido");
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

	guardaCliente(){

		if(!this.razon || this.razon==null || this.razon.trim()==""){
			return this.shadowRoot.querySelector("#txtRazon").invalid=true;
		}else{
			this.shadowRoot.querySelector("#txtRazon").invalid=false;
		}

		if(!this.agente || this.agente==null){
			return PolymerUtils.Toast.show("Selecciona un agente encargado del prospecto");
		}


		var cliente={
			_esCliente:false,
			_timestamp:firebase.firestore.FieldValue.serverTimestamp(),
			razon:this.razon,
			agente:this.agente
		};

		if(!this.listaContactos || !this.listaContactos.length || this.listaContactos.length<=0){
			return PolymerUtils.Toast.show("No hay información de contacto para este prospecto.");
		}else{
			cliente["listaContactos"]=this.listaContactos;
		}

		

	   
		console.log("cliente",cliente);

		var t=this;
		sharedFirebase.collection("_clientes-khalia").add(cliente)
		.then(function(docRef) {
			console.log("docref",docRef);

			
			PolymerUtils.Toast.show("prospecto agregado con éxito");
			t.limpiaDatos();
			
			if(t._dialog){
				t._dialog.close();
			}
			// setTimeout(() => {
			//     NavigationUtils.navigate("prospecto",{id:docRef.id});
			// }, 1000);
			
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
			PolymerUtils.Toast.show("Error al guardar. Intentalo más tarde.");
		});

	}

	agregaContacto(){
		console.log("agregaContacto");
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
		
	   
		
		this.push("listaContactos",nuevo);
		this.limpiaCamposContacto();
		if(this._dialog){
			this.DialogLayout_notifyResize();
		}
		console.log("listaContactos",this.listaContactos);
	}

	limpiaCamposContacto(){
		console.log("se ejecuta limpiaCamposContacto");
		this.set("nombre",null);
		this.set("puesto",null);
		this.set("tel",null);
		this.set("email",null);

		this.set("listaTels",[]);
		console.log("listaTels",this.listaTels);
		this.set("listaEmails",[]);
		console.log("listaEmails",this.listaEmails);
	}

	spliceContactos(e){
		var eliminar=e.detail.indexEliminar;
		this.splice("listaContactos",eliminar,1);

	}

	limpiaDatos(){
		console.log("se ejecuta limpiaDatos");
		this.set("razon",null);
		this.set("listaContactos",[]);
		console.log("listaContactos",this.listaContactos);
		this.limpiaCamposContacto();
	}

}

customElements.define('dialogo-nuevo-prospecto', DialogoNuevoProspecto);