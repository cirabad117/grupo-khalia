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
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

import './auth/my-icono-usuario.js';
import './controles-extra/dom-access.js';

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
			<style>
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

				paper-item:hover{
					cursor:pointer;
				}
				paper-icon-item:hover{
					cursor:pointer;
				}
				
			</style>
			
			<app-location route="{{route}}" url-space-regex="^[[rootPath]]" query-params={{routeParams}}>
			</app-location>

			<app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
			</app-route>

			 <app-drawer-layout fullbleed="" narrow="{{narrow}}"><!--force-narrow="" -->
				<!-- Drawer content -->
				<app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
					<app-toolbar>
						Menu
					</app-toolbar>
					<iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
						

							
					<dom-access path="instalaciones"></dom-access>

							<paper-icon-item on-click="toggleAdmin">
								<iron-icon icon$="[[getIcono(esAdmin)]]" slot="item-icon"></iron-icon>
								
								VENTAS
							</paper-icon-item>
							
							<iron-collapse opened="[[esAdmin]]" style="padding:15px;">
								<dom-access path="admin/prospectos">
								<a name="prospectos" href="[[rootPath]]prospectos">PROSPECTOS</a>
								</dom-access>
								<dom-access path="admin/clientes">
								<a name="clientes" href="[[rootPath]]clientes">CLIENTES</a>
								</dom-access>
								<dom-access path="admin/productos">
								<a name="productos" href="[[rootPath]]productos">CONTROL DE PRODUCTOS</a>
								</dom-access>
								<dom-access path="admin/cotizaciones">
								<a name="cotizaciones" href="[[rootPath]]cotizaciones">COTIZACIONES</a>
								</dom-access>
							</iron-collapse>

							
							
							<paper-icon-item on-click="toggleArea">
								<iron-icon icon$="[[getIcono(esArea)]]" slot="item-icon"></iron-icon>
								DEPARTAMENTOS
							</paper-icon-item>
							<iron-collapse opened="[[esArea]]" style="padding:15px;">
								<a name="clientes" href="[[rootPath]]clientes">SASISOPA</a>
								<a name="clientes" href="[[rootPath]]clientes">SGM</a>
								<a name="clientes" href="[[rootPath]]clientes">EMISIONES</a>
								<a name="clientes" href="[[rootPath]]clientes">SEGURIDAD</a>
								<a name="clientes" href="[[rootPath]]clientes">ADMINSITRACIÓN</a>
							</iron-collapse>
							
							<dom-access path="usuarios">
							<a name="usuarios" href="[[rootPath]]usuarios">usuarios</a>
							</dom-access>

							<dom-access path="app-clientes">
							<a name="app-clientes" href="[[rootPath]]app-clientes">App Clientes</a>
							</dom-access>
						<!-- <a name="lista-clientes" href="[[rootPath]]lista-clientes">Mis Clientes</a> -->
						<hr>

						
						<template is="dom-if" if="[[_loggedUser]]">
						<paper-item on-click="cierraSesion">cerrar sesión</paper-item>
						</template>
						
					
						
					</iron-selector>
				</app-drawer>

				<!-- Main content -->
				<app-header-layout has-scrolling-region="">

					<app-header slot="header" condenses="" reveals="" effects="waterfall">
						<app-toolbar>
							<paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
							<div main-title="">My App</div>
							
									<my-icono-usuario tam="48px"></my-icono-usuario>
									<div style="padding: 4px 12px;">
										<div style="font-size: 16px; font-weight: 500;">[[_loggedUser.displayName]]</div>
									</div>
								
							
						</app-toolbar>
					</app-header>

					<iron-pages selected="[[page]]" attr-for-selected="name" role="main">
						
						<dom-access name="prospectos" path="admin/prospectos">
						<my-prospectos-main name="prospectos"></my-prospectos-main>
						</dom-access>

						<my-datos-prospecto name="prospecto"></my-datos-prospecto>


						<my-datos-prospecto name="prospecto"></my-datos-prospecto>

						<dom-access name="clientes" path="admin/clientes">
						<my-clientes-main name="clientes"></my-clientes-main>
						</dom-access>

						<my-cliente name="cliente"></my-cliente>

						<dom-access name="productos" path="admin/productos">
						<my-productos-main name="productos"></my-productos-main>
						</dom-access>

						<dom-access name="cotizaciones" path="admin/cotizaciones">
						<my-cotizaciones-main name="cotizaciones"></my-cotizaciones-main>
						</dom-access>

						<my-vista-cotiza name="cotizacion"></my-vista-cotiza>

						<my-nueva-cotizacion name="nueva-cotizacion"></my-nueva-cotizacion>

						<my-usuarios name="usuarios"></my-usuarios>

						<my-app-clientes name="app-clientes"></my-app-clientes>
						<!-- <my-nuevo-app name="nuevo-app"></my-nuevo-app> -->
					
						
						<my-view404 name="view404"></my-view404>
					</iron-pages>
				</app-header-layout>
			</app-drawer-layout>
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
				'prospecto','prospectos','clientes','cliente',
				'productos','cotizaciones','nueva-cotizacion','usuarios',
				'app-clientes','cotizacion']
				// 'nuevo-app'
			},

			
			routeData: Object,
			subroute: Object
		};
	}

	/**
	 * Use for one-time configuration of your component after local DOM is
	 * initialized.
	 */
	ready() {
		super.ready();
		_initNavigationUtils(this,this.route,"route",this.routeParams,"routeParams");

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
			'_routePageChanged(routeData.page)'
		];
	}

	iniciaSesion(){
		NavigationUtils.navigate("login");
	}

	cierraSesion(){
		this.signOut();
	}

	

	_routePageChanged(page) {
		 // Show the corresponding page according to the route.
		 //
		 // If no page was found in the route data, page will be an empty string.
		 // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
		if (!page) {
			this.page = 'prospectos';
		} else if (this.paginas.indexOf(page) !== -1) {
			
			this.page = page;
		} else {
			this.page = 'view404';
		}

		// Close a non-persistent drawer when the page & route are changed.
		if (!this.$.drawer.persistent) {
			this.$.drawer.close();
		}
	}

	_pageChanged(page) {
		// Import the page component on demand.
		//
		// Note: `polymer build` doesn't like string concatenation in the import
		// statement, so break it up.
		switch (page) {
			case 'prospectos':
				import('./my-prospectos-main.js');
			break;
			case 'prospecto':
				import('./prospectos/my-datos-prospecto.js');
			break;
			case 'clientes':
				import('./my-clientes-main.js');
			break;
			// case 'inicio':
			// 	import('./my-inicio.js');
			// 	break;

			// case 'lista-clientes':
			// 	import('./my-clientes-main.js');
			// 	break;
			
			case 'cliente':
				import('./clientes/my-cliente.js');
			break;

			case 'productos':
				import('./my-productos-main.js');
			break;
			case 'cotizaciones':
				import('./my-cotizaciones-main.js');
			break;
			case 'cotizacion':
				import ('./cotizaciones/my-vista-cotiza.js');
			break;
			case 'nueva-cotizacion':
				import ('./cotizaciones/my-nueva-cotizacion.js');
			break;
			case 'usuarios':
				import ('./auth/my-usuarios.js');
			break;
			case 'app-clientes':
				import ('./my-app-clientes.js');
			break;
			// case 'nuevo-app':
			// 	import ('./app-clientes/my-nuevo-app.js');
			// break;
			
			
			case 'view404':
				import('./my-view404.js');
			break;
		}
	}
}

window.customElements.define('my-app', MyApp);
