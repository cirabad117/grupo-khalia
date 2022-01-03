import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';

import './general-controls/my-lista-general.js';

import './bootstrap.js';

class MyCotizacionesMain extends PolymerElement {
	static get template() {
		return html`
			<style include="bootstrap">
				:host{
					display:block;
				}
			</style>
			
			
			<my-lista-general vista="cotizacion" arreglo-items="[[listaCotizaciones]]" titulo="cliente.razon"
            lista-filtro="[[listaEstatus]]" lista-ordena="[[opcionesOrdena]]"
			lista-cols="[[datosCotiza]]"
			funcion-buscar="[[funcionProspecto]]" funcion-ordenar="[[funcionOrdena]]"
            on-ejecuta-accion="abreNuevaCotizacion" on-ejecuta-item="abreCotizacion"></my-lista-general>
			
		
		`;
	}
	
	static get properties() {
		return {
			listaCotizaciones:{type:Array, notify:true, value:[]},
			datosCotiza:{type:Array, notify:true, value:[
                {"titulo":"folio","dato":"id"},
                {"titulo":"fecha de creación","dato":"_timestamp"}
            ]},
		}
	}
	
	constructor() {
		super();
	}
	
	ready() {
		super.ready();

		var binder=new QueryBinder("_cotizaciones-khalia");
        
        binder.bindArray(this,this.listaCotizaciones,"listaCotizaciones");
	}

	abreNuevaCotizacion(){
		NavigationUtils.navigate("nueva-cotizacion");
	}

	abreCotizacion(e){
		var elegido=e.detail.valor;
        NavigationUtils.navigate("cotizacion",{"id":elegido.id});
	}
}

customElements.define('my-cotizaciones-main', MyCotizacionesMain);