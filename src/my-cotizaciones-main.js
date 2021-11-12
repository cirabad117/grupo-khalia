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
			funcion-buscar="[[funcionProspecto]]" funcion-ordenar="[[funcionOrdena]]"
            on-ejecuta-accion="abreNuevaCotizacion" on-ejecuta-item="abreCotizacion"></my-lista-general>
			
			<!-- <div class="container-fluid">
				<div class="row m-3">
					<div class="col-md-12 card">
						<div class="d-flex flex-row bd-highlight mb-3 align-items-center">
							<paper-icon-button icon="filter-list"></paper-icon-button>
							<paper-icon-button icon="expand-less"></paper-icon-button>
							<paper-icon-button icon="expand-more"></paper-icon-button>
							<paper-input label="buscar prospecto" id="inputWithButton" value="{{busqueda}}">
								<paper-icon-button slot="suffix" on-click="limpia" icon="clear" alt="clear" title="clear">
								</paper-icon-button>
							</paper-input>
						</div>
					</div>
				</div>
				<div class="row m-3">
					<div class="col-md-12">
						<div class="card">
							<div class="card-body">
								<table class="table table-bordered">
									<thead>
										<tr>
											<th scope="col">FOLIO</th>
											<th scope="col">RAZON SOCIAL O CONTACTO</th>
											<th scope="col">DIRIGIDA A</th>
											<th scope="col">FECHA</th>
											<th scope="col">VENDEDOR</th>
											<th scope="col">ESTATUS</th>
											<th scope="col">FECHA</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">1</th>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
											<td>sfdv</td>
											<td>sdvs</td>
											<td>sdvs</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="position: fixed; bottom: 24px; right: 24px;">
				<div style="position: relative; cursor:pointer;" on-clicK="abreNuevaCotizacion">
					<paper-fab icon="add"></paper-fab>
				</div>
			</div> -->
		`;
	}
	
	static get properties() {
		return {
			listaCotizaciones:{type:Array, notify:true, value:[]}
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