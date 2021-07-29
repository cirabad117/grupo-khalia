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

import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends NavigationMixin(PolymerElement) {
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
			</style>
			
			<app-location route="{{route}}" url-space-regex="^[[rootPath]]" query-params={{routeParams}}>
			</app-location>

			<app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
			</app-route>

			<app-drawer-layout fullbleed="" narrow="{{narrow}}">
				<!-- Drawer content -->
				<app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
					<app-toolbar>Menu</app-toolbar>
					<iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
						<a name="prospectos" href="[[rootPath]]prospectos">Prospectos</a>
						<a name="clientes" href="[[rootPath]]clientes">Clientes</a>
						<hr>
						<a name="clientes" href="[[rootPath]]clientes">Administración y ventas</a>
						<a name="clientes" href="[[rootPath]]clientes">SASISOPA</a>
						<a name="clientes" href="[[rootPath]]clientes">Sistemas de gestion de medicion</a>
						<a name="clientes" href="[[rootPath]]clientes">emisiones a la atmosfera</a>
						<a name="clientes" href="[[rootPath]]clientes">seguridad</a>
						<hr>
						<a name="clientes" href="[[rootPath]]clientes">Configuracion</a>
						<!-- <a name="lista-clientes" href="[[rootPath]]lista-clientes">Mis Clientes</a> -->
					</iron-selector>
				</app-drawer>

				<!-- Main content -->
				<app-header-layout has-scrolling-region="">

					<app-header slot="header" condenses="" reveals="" effects="waterfall">
						<app-toolbar>
							<paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
							<div main-title="">My App</div>
						</app-toolbar>
					</app-header>

					<iron-pages selected="[[page]]" attr-for-selected="name" role="main">
						<my-prospectos-main name="prospectos"></my-prospectos-main>
						<my-prospecto name="prospecto"></my-prospecto>
						<my-clientes-main name="clientes"></my-clientes-main>
						<my-cliente name="cliente"></my-cliente>
						<!-- <my-inicio name="inicio"></my-inicio>
						<my-clientes-main name="lista-clientes"></my-clientes-main>
						
						<my-nuevo-cliente name="nuevo-cliente"></my-nuevo-cliente> -->
						
						<my-view404 name="view404"></my-view404>
					</iron-pages>
				</app-header-layout>
			</app-drawer-layout>
		`;
	}

	static get properties() {
		return {
			page: {
				type: String,
				reflectToAttribute: true,
				observer: '_pageChanged'
			},
			paginas:{type:Array, notify:true, value:['prospecto','prospectos','clientes','cliente']},
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

	static get observers() {
		return [
			'_routePageChanged(routeData.page)'
		];
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
				import('./prospectos/my-prospecto.js');
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
			// case 'nuevo-cliente':
			// 	import ('./clientes/my-nuevo-cliente.js');
			// 	break;
			
			case 'view404':
				import('./my-view404.js');
				break;
		}
	}
}

window.customElements.define('my-app', MyApp);
