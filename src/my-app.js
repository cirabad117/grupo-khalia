/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import { NavigationMixin } from "./mixins/navigation-mixin.js";
import { AuthMixin } from "./mixins/auth-mixin.js";

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-icon/iron-icon.js';

import './general-controls/my-dropdown-button.js';
import './auth/my-icono-usuario.js';
import './controles-extra/dom-access.js';

import './bootstrap.js';

import './my-icons.js';



// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends AuthMixin(NavigationMixin(PolymerElement)) {
	static get template() {
		return html`
			<style include="bootstrap">
				:host {
					--app-primary-color: #4285f4;
					--app-secondary-color: black;
					display: block;
				}
				
				app-drawer-layout:not([narrow]) [drawer-toggle] {
					display: none;
				}
				
				app-header {
					color: #fff;
					background-color: var(--app-primary-color);
				}

				app-header paper-icon-button {
					--paper-icon-button-ink-color: white;
				}

				.drawer-list {
					margin: 0 20px;
				}

				.drawer-list a {
					display: block;
					padding: 0 16px;
					text-decoration: none;
					color: var(--app-secondary-color);
					line-height: 40px;
				}

				.drawer-list a.iron-selected {
					color: black;
					font-weight: bold;
				}

				.nav-link:hover{
					color:#FFFFFF;
				}
				
				/* The side navigation menu */
				.sidenav {
					height: 100%; /* 100% Full-height */
					width: 0; /* 0 width - change this with JavaScript */
					position: fixed; /* Stay in place */
					z-index: 1; /* Stay on top */
					top: 0; /* Stay at the top */
					right: 0;
					/* background-color: #006064; */
					overflow-x: hidden; /* Disable horizontal scroll */
					padding-top: 60px; /* Place content 60px from the top */
					transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
				}
				
				/* The navigation menu links */
				.sidenav a {
					padding: 8px 8px 8px 32px;
					text-decoration: none;
					font-size: 18px;
					color: #f1f1f1;
					display: block;
					transition: 0.3s;
				}

				.item-collapse{
					padding: 8px 8px 8px 32px;
					text-decoration: none;
					font-size: 18px;
					color: #f1f1f1;
					transition: 0.3s;
				}
				
				/* When you mouse over the navigation links, change their color */
				.sidenav a:hover {
					text-decoration:underline;
				}
				/*Position and style the close button (top right corner) */
				.sidenav .closebtn {
					position: absolute;
					top: 0;
					right: 25px;
					font-size: 36px;
					margin-left: 50px;
				}
				#main {
					transition: margin-right .5s;
				}
				
				@media screen and (max-height: 450px) {
					.sidenav {padding-top: 15px;} 
					.sidenav a {font-size: 18px;}
				}

			</style>
			
			<app-location route="{{route}}" url-space-regex="^[[rootPath]]" query-params={{routeParams}}>
			</app-location>

			<app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
			</app-route>

			<div id="mySidenav" class="sidenav bg-secondary">
				<a href="javascript:void(0)" class="bg-light" on-click="closeNav">
					<span>
						<iron-icon icon="chevron-right" style="color:#000000;"></iron-icon>
					</span>
				</a>
				
				<template is="dom-if" if="[[_loggedUser]]">
					<paper-icon-item class="item-collapse" on-click="toggleAdmin">
						<iron-icon icon$="[[getIcono(esAdmin)]]" slot="item-icon"></iron-icon>
						Ventas
					</paper-icon-item>
					
					<iron-collapse opened="[[esAdmin]]" style="padding:15px;">
						<dom-access path="admin/prospectos">
							<a name="prospectos" href="[[rootPath]]prospectos"><iron-icon style="margin:3px;" icon="communication:contact-phone"></iron-icon>Prospectos</a>
						</dom-access>
						<dom-access path="admin/clientes">
							<a name="clientes" href="[[rootPath]]clientes"><iron-icon style="margin:3px;" icon="icons:assignment-ind"></iron-icon>Clientes</a>
						</dom-access>
						<dom-access path="admin/productos">
							<a name="productos" href="[[rootPath]]productos"><iron-icon style="margin:3px;" icon="icons:book"></iron-icon>Productos</a>
						</dom-access>
						<dom-access path="admin/cotizaciones">
							<a name="cotizaciones" href="[[rootPath]]cotizaciones"><iron-icon style="margin:3px;" icon="icons:list"></iron-icon>Cotizaciones</a>
						</dom-access>
					</iron-collapse>
					
					<paper-icon-item class="item-collapse" on-click="toggleArea">
						<iron-icon icon$="[[getIcono(esArea)]]" slot="item-icon"></iron-icon>
						Estatus por departamento
					</paper-icon-item>
					
					<iron-collapse opened="[[esArea]]" style="padding:15px;">
						<a name="sasisopa" href="[[rootPath]]sasisopa">SASISOPA</a>
						<a name="sgm" href="[[rootPath]]sgm">SGM</a>
						<a name="emisiones" href="[[rootPath]]emisiones">Emisiones</a>
						<a name="seg" href="[[rootPath]]seg" >Seguridad</a>
						<a name="admin" href="[[rootPath]]admin" >Administración</a>
					</iron-collapse>
					<dom-access path="app-clientes">
						<a name="app-clientes" href="[[rootPath]]app-clientes" >App Clientes</a>
					</dom-access>
					<dom-access path="usuarios">
						<a name="usuarios" href="[[rootPath]]usuarios" >Usuarios</a>
					</dom-access>
					<hr>
					<a  href="#" on-click="cierraSesion" >
						<span>
							<iron-icon icon="power-settings-new"></iron-icon>
						</span>
						Cerrar sesión
					</a>
				</template>

				<template is="dom-if" if="[[!_loggedUser]]">
					<a  href="[[rootPath]]inicio" on-click="iniciaSesion">
						<span>
							<iron-icon icon="touch-app"></iron-icon>
						</span>
						Iniciar sesión
					</a>
				</template>


			</div><!--sidebar-->
			
			<div id="main">
				<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
					<a class="navbar-brand" href="/">
						<img src="../images/gk_icono.png" width="30" height="30" class="d-inline-block align-top" alt="">
						Grupo Khalia
					</a>

					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
					aria-expanded="false" aria-label="Toggle navigation" on-click="openNav">
						<span class="navbar-toggler-icon">
							<iron-icon icon="menu"></iron-icon>
						</span>
					</button>

					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						
						<ul class="navbar-nav mr-auto">
							<li class="nav-item dropdown">
								<my-dropdown-button titulo="Ventas" items="[[listaVentas]]"></my-dropdown-button>
							</li>
							<li class="nav-item dropdown">
								<my-dropdown-button titulo="Estatus por departamento" items="[[listaDepa]]"></my-dropdown-button>
							</li>
							<dom-access path="app-clientes">
								<li class="nav-item">
									<a class="nav-link" href="[[rootPath]]app-clientes">App clientes</a>
								</li>
							</dom-access>
							<dom-access path="usuarios">
								<li class="nav-item">
									<a class="nav-link" href="[[rootPath]]usuarios">Usuarios</a>
								</li>
							</dom-access>
						</ul>
						<div class="form-inline my-2 my-lg-0">
							<my-icono-usuario tam="48px"></my-icono-usuario>
							<div style="padding: 4px 12px;">
								<div style="font-size: 16px; font-weight: 500;color:#FFFFFF;">[[_loggedUser.displayName]]</div>
							</div>

							<template is="dom-if" if="[[_loggedUser]]">
								<paper-icon-button onmouseover="PolymerUtils.Tooltip.show(event,'Cerrar sesión')" style="color:var(--paper-red-200);" icon="power-settings-new" on-click="cierraSesion"></paper-icon-button>
							</template>
						</div>
					</div>
				</nav>
				
				<div class="container">
					<iron-pages selected="[[page]]" attr-for-selected="name" role="main">

						<my-inicio name="inicio"></my-inicio>
						
						<dom-access name="prospectos" path="admin/prospectos">
							<my-prospectos-main name="prospectos" lista-prospectos="[[listaProspectos]]" lista-usuarios="[[listaUsuarios]]"></my-prospectos-main>
						</dom-access>
						
						<my-datos-prospecto  name="prospecto" lista-usuarios="[[listaUsuarios]]" cotizaciones="[[mainCotizaciones]]"></my-datos-prospecto>
						
						<dom-access name="clientes" path="admin/clientes">
							<my-clientes-main name="clientes" lista-clientes="[[listaClientes]]"></my-clientes-main>
						</dom-access>

						<my-cliente name="cliente" lista-usuarios="[[listaUsuarios]]" cotizaciones="[[mainCotizaciones]]"></my-cliente>

						<dom-access name="productos" path="admin/productos">
							<my-productos-main name="productos" lista-productos="[[arregloProductos]]"></my-productos-main>
						</dom-access>

						<my-vista-producto  name="producto"></my-vista-producto>

						<dom-access name="cotizaciones" path="admin/cotizaciones">
							<my-cotizaciones-main name="cotizaciones" lista-cotizaciones="{{mainCotizaciones}}"></my-cotizaciones-main>
						</dom-access>

						<my-vista-cotiza name="cotizacion"></my-vista-cotiza>

						<my-nueva-cotizacion name="nueva-cotizacion" lista-clientes="[[arregloClientes]]"
						lista-productos="[[arregloProductos]]" lista-usuarios="[[listaUsuarios]]"></my-nueva-cotizacion>

						<dom-access name="usuarios" path="usuarios">
							<my-usuarios name="usuarios" lista-usuarios="[[listaUsuarios]]"></my-usuarios>
						</dom-access>

						<dom-access name="app-clientes" path="app-clientes">
							<my-app-clientes name="app-clientes" lista-usuarios="[[listaUsuarios]]"></my-app-clientes>
						</dom-access>

						<my-sistemas-main name="sistemas"></my-sistemas-main>
						<my-sistemas-proyecto name="proyecto"></my-sistemas-proyecto>
					
						<my-view404 name="view404"></my-view404>
					</iron-pages>
				</div>
			
			</div><!--div main-->
			

		`;
	}

	static get properties() {
		return {
			esAdmin:{type:Boolean, notify:true, value:false},
			esArea:{type:Boolean, notify:true, value:false},
			
			page: {
				type: String,
				reflectToAttribute: true,
				observer: '_pageChanged'
			},
			paginas:{type:Array, notify:true, value:[
				'inicio','prospecto','prospectos','clientes','cliente',
				'productos','producto','cotizaciones','nueva-cotizacion','usuarios',
				'app-clientes','cotizacion','sistemas','proyecto']
			},
			nombrePagina:{type:String, notify:true, value:"Grupo Khalia"},
			muestraBack:{type:Boolean, notify:true, value:false},
			
			routeData: Object,
			subroute: Object,

			listaVentas:{type:Array, notify:true, value:[
				{"nombre":"Prospectos","icono":"communication:contact-phone","link":"prospectos","permiso":"admin/prospectos"},
				{"nombre":"Clientes","icono":"icons:assignment-ind","link":"clientes","permiso":"admin/clientes"},
				{"nombre":"Productos","icono":"icons:book","link":"productos","permiso":"admin/productos"},
				{"nombre":"Cotizaciones","icono":"icons:list","link":"cotizaciones","permiso":"admin/cotizaciones"},
			]},
			listaDepa:{type:Array, notify:true, value:[
				{"nombre":"SASISOPA","link":""},
				{"nombre":"SGM","link":""},
				{"nombre":"Emisiones","link":""},
				{"nombre":"Seguridad","link":""},
				{"nombre":"Administración","link":""},
				{"nombre":"Sistemas","link":"sistemas","icono":"polymer","permiso":"areas/sistemas"}
			]},

			listaUsuarios:{type:Array, notify:true, value:[]},
			arregloClientes:{type:Array, notify:true, value:[]},
			arregloProductos:{type:Array, notify:true, value:[]},

			listaProspectos:{type:Array, notify:true, value:[]},
			listaClientes:{type:Array, notify:true, value:[]},
			mainCotizaciones:{type:Array, notify:true, value:[]}

		};
	}

	ready() {
		super.ready();
		_initNavigationUtils(this,this.route,"route",this.routeParams,"routeParams");

		if(this.lastInstalaciones){
            this.lastInstalaciones();
            this.set("lastInstalaciones",null);
        }

        this.set("lastInstalaciones",DataHelper.queryCollection(this,{
            "collection":"usuarios",
            "array":this.listaUsuarios,
            "arrayName":"listaUsuarios"
        }));

		var binder=new QueryBinder("_clientes-khalia");
        
        binder.bindArray(this,this.arregloClientes,"arregloClientes");

		var binder2=new QueryBinder("_productos-khalia");
        
        binder2.bindArray(this,this.arregloProductos,"arregloProductos");

		var binder3=new QueryBinder("_cotizaciones-khalia");
        
        binder3.bindArray(this,this.mainCotizaciones,"mainCotizaciones");

	}

	_revisaClientes(arr){
		if(arr && arr.length>0){
			var arrPros=[];
			var arrClie=[];

			for(var i=0;i<arr.length;i++){
				var item=arr[i];

				if(item._esCliente==true){
					arrClie.push(item);
				}else{
					arrPros.push(item);
				}
			}

			this.set("listaProspectos",arrPros);
			this.set("listaClientes",arrClie);
		}
	}
	regresa(){
		window.history.back();
	}

	/* Set the width of the side navigation to 250px */
	openNav() {
		this.shadowRoot.querySelector("#mySidenav").style.width = "250px";
	}
	
	/* Set the width of the side navigation to 0 */
	closeNav() {
		this.shadowRoot.querySelector("#mySidenav").style.width = "0";
	}

	getIcono(bol){
		if(bol==true){
			return "arrow-drop-up";
		}else{
			return "arrow-drop-down";
		}
	}

	toggleAdmin(){
		this.set("esAdmin",!this.esAdmin);
	}

	toggleArea(){
		this.set("esArea",!this.esArea);
	}

	static get observers() {
		return [
			'_routePageChanged(routeData.page)',
			'_revisaClientes(arregloClientes,arregloClientes.*)'
		];
	}

	iniciaSesion(){
		NavigationUtils.navigate("inicio");
	}

	cierraSesion(){
		this.signOut();
		NavigationUtils.navigate("inicio");
	}
	
	_routePageChanged(page) {
		if (!page) {
			this.page = 'inicio';
		} else if (this.paginas.indexOf(page) !== -1) {
			this.closeNav();
			
			this.page = page;
		} else {
			this.page = 'view404';
		}
	}

	_pageChanged(page) {
		switch (page) {
			case 'inicio':
				import('./my-inicio.js');
			break;
			case 'prospectos':
				import('./my-prospectos-main.js');
				this.set("nombrePagina","Prospectos");
				this.set("muestraBack",false);
			break;
			case 'prospecto':
				import('./prospectos/my-datos-prospecto.js');
				this.set("nombrePagina","Información de prospecto");
				this.set("muestraBack",true);
			break;
			case 'clientes':
				import('./my-clientes-main.js');
				this.set("nombrePagina","Clientes");
				this.set("muestraBack",false);
			break;
			
			case 'cliente':
				import('./clientes/my-cliente.js');
				this.set("nombrePagina","Cliente");
				this.set("muestraBack",true);
			break;

			case 'productos':
				import('./my-productos-main.js');
				this.set("nombrePagina","Productos");
				this.set("muestraBack",false);
			break;
			case 'producto':
				import('./productos/my-vista-producto.js');
				this.set("nombrePagina","datos de producto");
				this.set("muestraBack",true);
			break;
			case 'cotizaciones':
				import('./my-cotizaciones-main.js');
				this.set("nombrePagina","Cotizaciones");
				this.set("muestraBack",false);
			break;
			case 'cotizacion':
				import ('./cotizaciones/my-vista-cotiza.js');
				this.set("nombrePagina","Datos cotización");
				this.set("muestraBack",true);
			break;
			case 'nueva-cotizacion':
				import ('./cotizaciones/my-nueva-cotizacion.js');
				this.set("nombrePagina","Nueva cotización");
				this.set("muestraBack",true);
			break;
			case 'usuarios':
				import ('./auth/my-usuarios.js');
				this.set("nombrePagina","Usuarios");
				this.set("muestraBack",false);
			break;
			case 'app-clientes':
				import ('./my-app-clientes.js');
				this.set("nombrePagina","App Clientes");
			break;
			case 'sistemas':
				import('./sistemas/my-sistemas-main.js');
				this.set("nombrePagina","Departamento Sistemas");
			break;
			case 'proyecto':
				import('./sistemas/my-sistemas-proyecto.js');
				this.set("nombrePagina","Departamento Sistemas");
			break;
			case 'view404':
				import('./my-view404.js');
			break;
		}
	}
}

window.customElements.define('my-app', MyApp);
