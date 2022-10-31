import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { AuthMixin } from './mixins/auth-mixin.js';
import { DiccionarioMixin } from './mixins/diccionario-mixin.js';
import { UtilsMixin } from './mixins/utils-mixin.js';

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';

import './auth/my-inicio-sesion.js';
import './portal/my-carrusel.js';
import './portal/my-reporte.js';
import './portal/my-organigrama.js';

import './bootstrap.js';

class MyInicio extends UtilsMixin(DiccionarioMixin(AuthMixin(PolymerElement))) {
	static get template() {
		return html`
			<style include="bootstrap">
				:host{
					display:block;
					background-color:white;
				}

				.item-menu:hover{
					cursor:pointer;
					text-decoration:underline;
					color:var(--paper-blue-500);
				}
				
			</style>
			
			<template is="dom-if" if="[[_loggedUser]]">
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-12">
							<nav class="navbar">
								<a class="navbar-brand">
									<iron-icon icon="icons:list"></iron-icon>
									Tablero de avisos
								</a>

								<div class="item-menu" on-click="veCalendario">
									<iron-icon icon="event"></iron-icon>
									<span>[[fechaActual]]</span>
								</div>
							</nav>
						</div>
						<div class="col-lg-10 col-md-8 col-sm-12">
							<my-carrusel></my-carrusel>
						</div>
						<div class="col-lg-2 col-md-4 col-sm-12">
							<template is="dom-repeat" items="[[itemsPortal]]">
								<div class="card card-body bg-light item-menu" on-click="navegaPortal">
									[[item.nombre]]
								</div>
							</template>
						</div>
					</div>
					<hr>
				</div>
				<br>
				<div class="container-fluid text-center ">
					<h3 class="mt-3">Acerca de Grupo Khalia</h3>
					<div class="row">
						<div class="col-sm-3">
							<img src="../images/fair.png" class="img-fluid rounded-circle bg-secondary m-4" style="width:60%" alt="Image">
							<p>POLÍTICA</p>
						</div>
						<div class="col-sm-3">
							<img src="../images/leadership.png" class="img-fluid rounded-circle bg-secondary m-4" style="width:60%" alt="Image">
							<p>MISIÓN Y VISIÓN</p>
						</div>
						<div class="col-sm-3">
							<img src="../images/value.png" class="img-fluid rounded-circle bg-secondary m-4" style="width:60%" alt="Image">
							<p>VALORES</p>
						</div>
						<div class="col-sm-3">
							<img src="../images/workspace.png" class="img-fluid rounded-circle bg-secondary m-4" style="width:60%" alt="Image">
							<p>TU LUGAR DE TRABAJO</p>
						</div>
					</div>
					<hr>
				</div>
				<br>
				<div class="container-fluid text-center">
					<h3 class="mt-3">Conoce a tus compañeros</h3>
					
					<my-organigrama obj-empleados="[[objOrganigrama]]" empleados="[[listaUsuarios]]"></my-organigrama>
				</div>

				<div style="position: fixed; bottom: 24px; right: 24px;">
					<div style="position: relative; cursor:pointer;" on-clicK="abreReporte">
						<paper-fab style="color:white; background-color:var(--paper-blue-500);" icon="announcement"></paper-fab>
					</div>
				</div>
			</template>

			<template is="dom-if" if="[[!_loggedUser]]">
				<div class="background-container" style="display: flex; align-items: center; justify-content: center; flex-direction: column; height: 100vh;">
					<div style="width: 450px; max-width: 95%; height: auto; max-width: 95%; background-color: white; border-radius: 10px; border: 1px solid var(--paper-grey-100);">
						<img class="img img-fluid mx-auto d-block" src="../images/logo-khalia10.jpeg">
						<div class="title-container"  style="position: relative;">
						</div>
						<div class="big-container" style="padding: 24px 0px;">
							<my-inicio-sesion></my-inicio-sesion>
						</div>
					</div>
				</div>
			</template>

			
		`;
	}
	
	static get properties() {
		return {
			objOrganigrama:{type:Object, notify:true},
			listaUsuarios:{type:Array, notify:true, value:[]},
			itemsPortal:{type:Array, notify:true,value:[
				{nombre:"Vida Khaliana",vista:"vida-khaliana"},
				{nombre:"Reconocimientos",vista:"reconocimiento"},
				{nombre:"Seguridad y Salud",vista:"seguridad"},
				{nombre:"Medio Ambiente",vista:"ambiente"},
				{nombre:"Cursos",vista:"cursos"},
				{nombre:"Buzón",vista:"buzon"},
			]}
		}
	}
	
	static get observers() {
		return [
			'_carga(listaUsuarios,listaUsuarios.*)'
		];
	}
	
	constructor(){
		super();
	}
	
	ready(){
		super.ready();
		this.set("fechaActual",Sugar.Date.medium(new Date(),'es'));

		this._carga(this.listaUsuarios);
	}
	navegaPortal(e){
		var elegido=e.model.item;
		console.log("navegaPortal",elegido);
		NavigationUtils.navigate("portal",{vista:elegido.vista});
	}

	veCalendario(){
		NavigationUtils.navigate("calendario")
	}
	
	_carga(arr){
		
		if(arr && arr!=null && arr.length>0){
			var datascource={
				'name':"Grupo Khalia",
				'title': 'general manager',
				'fotoUrl':'../images/khalia.jpeg',
				'relationship':'100'
			};
			
			var areas=this.areasKhalia;

			var jefes=[];
			var lideres=[];
			var empleados=[];
			
			for(var i=0;i<arr.length;i++){
				
				var usuario=arr[i];
				console.log("usuario",usuario);
				
				if(usuario.puesto.tipo=="jefe"){
					console.log("usuario.tipo==jefe",usuario.puesto.tipo=="jefe");
					var jefe =this.creaItemOrg(usuario);
					jefes.push(jefe);
				}else{

					if(usuario.puesto.cargo=="liderArea"){
						var lider=this.creaItemOrg(usuario);
						lideres.push(lider);
					}else{
						var emp=this.creaItemOrg(usuario);
						empleados.push(emp);
					}
					
				}
			}

			console.log("jefes",jefes);
			console.log("lideres",lideres);
			console.log("empleados",empleados);

			var orga=[];

			for(var j=0;j<areas.length;j++){
				var area=areas[j];
				var liderActual={
					'name': area.nombre,
					'title': 'general manager',
					'className':area.tipo,
					'fotoUrl':'../images/khalia.jpeg',
				};

				var empArea=[];
				if(lideres && lideres.length>0){
					for(var l=0;l<lideres.length;l++){
						if(lideres[l].area==area.tipo){
							liderActual=lideres[l];
							break;
						}
					}
				}

				if(empleados && empleados.length>0){
					for(var ll=0; ll<empleados.length;ll++){
						if(empleados[ll].area==area.tipo){
							empArea.push(empleados[ll]);
						}
					}

					if(empArea && empArea.length>0){
						liderActual["children"]=empArea;
					}
				}
				console.log(liderActual);
				orga.push(liderActual);
			}

			console.log("orga",orga);
			
			if(jefes && jefes.length>0){
				var middle=Math.floor(jefes.length/2);
				console.log("middle",middle);
				
				// if(middle>0){
					// 	middle=middle-1;
				// }
				
				var nuevoJefe=jefes[middle];
				console.log("jefes",jefes);
				console.log("nuevoJefe",nuevoJefe);
				nuevoJefe["children"]=orga;
				jefes[middle]=nuevoJefe;
				datascource["children"]=jefes;
				console.log("data",datascource);
				this.set("objOrganigrama",datascource);
			}
		}
		
	}

	creaItemOrg(obj){
		var item={
			'id':obj.uid
		};

		if(obj.puesto.nombrePuesto){
			item["name"]=obj.puesto.nombrePuesto+"<br>"+obj.displayName;
			item['title']=obj.puesto.nombrePuesto;
			item["className"]="jefe";
		}else{
			if(obj.puesto.cargo=="liderArea"){
				var nombreDep=this.buscaObjectoArreglo(this.areasKhalia,"tipo",obj.puesto.area);
				var nuevoNombre=nombreDep.nombre+"<br>"+obj.displayName;
				item["name"]=nuevoNombre;
			}else{
				item["name"]=obj.displayName;
			}
			item['area']=obj.puesto.area;
			item["className"]=obj.puesto.area;
		}
		
		if(obj.fotoUrl){
			item['fotoUrl']=obj.fotoUrl;
		}else{
			item['fotoUrl']='../images/user.png';
		}

		return item;
	}


	abreReporte(){
		PolymerUtils.Dialog.createAndShow({
			type: "modal",
			title:"Nuevo reporte",
			element:"my-reporte",
			style:"width:800px;max-width:95%;",
			
            negativeButton: {
                text: "Cerrar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});
	}



}

customElements.define('my-inicio', MyInicio);