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
			
			
			<my-lista-general titulo-pagina="Cotizaciones" vista="cotizacion" arreglo-items="[[listaCotizaciones]]" titulo="cliente.razon"
            lista-filtro="[[listaEstatus]]" lista-ordena="[[opcionesOrdena]]"
			lista-cols="[[datosCotiza]]"
			funcion-buscar="[[funcionCotizacion]]" funcion-ordenar="[[funcionOrdenaCoti]]"
            on-ejecuta-accion="abreNuevaCotizacion" on-ejecuta-item="abreCotizacion"></my-lista-general>

		`;
	}
	
	static get properties() {
		return {
			listaCotizaciones:{type:Array, notify:true, value:[]},
			datosCotiza:{type:Array, notify:true, value:[
                {"titulo":"Folio","dato":"id"},
                {"titulo":"Fecha de creación","dato":"_timestamp"},
				{"titulo":"Cliente/Prospecto","dato":"cliente","valorInterno":"razon"},
				{"titulo":"Dirigida a","dato":"nombreDirigido"},
				
            ]},

			opcionesOrdena:{type:Array, notify:true, value:[
                {"opcion":"razonAs","texto":"Cliente/Prospecto (ascendente)"},
                {"opcion":"razonDe","texto":"Cliente/Prospecto (descendente)"},
                {"opcion":"fechaAs","texto":"Fecha de creacion (ascendente)"},
                {"opcion":"fechaDe","texto":"Fecha de creacion (descendente)"}
                
            ]},

			funcionCotizacion:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionProspecto",
                    funcion:function(prospecto,texto,filtro) {
						if((prospecto.id && prospecto.id.toLowerCase().indexOf(texto)!=-1) ||
						(prospecto.cliente.razon && prospecto.cliente.razon.toLowerCase().indexOf(texto)!=-1) ||
						(prospecto.cliente.alias && prospecto.cliente.alias.toLowerCase().indexOf(texto)!=-1) ||
						(prospecto.nombreDirigido && prospecto.nombreDirigido.toLowerCase().indexOf(texto)!=-1)){
							return prospecto;
						}
                        
                    }
                }
            },
			
			funcionOrdenaCoti:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionOrdena",
                    funcion:function(a,b,str) {
                        var at=PolymerUtils.convertFirebaseTimestamp(a._timestamp);
                        var bt=PolymerUtils.convertFirebaseTimestamp(b._timestamp);
                        var textoA=a.cliente.razon.toLowerCase();
                        var textoB=b.cliente.razon.toLowerCase();
                    
                        switch (str) {
                            case "razonAs":
                                if(textoA==textoB){
                                    return 0;
                                }
                                else{
                                    return (textoA<textoB ? -1 : 1);
                                }
                            break;
                            case "razonDe":
                                if(textoA==textoB){
                                    return 0;
                                }else{
                                    return (textoA>textoB ? -1 : 1);
                                } 
                            break;
                            case "fechaAs":
                                if(at==bt){
                                    return 0;
                                }else{
                                    return (at<bt ? -1 : 1);
                                }
                            break;
                            case "fechaDe":
                                if(at==bt){
                                    return 0;
                                }else{
                                    return (at>bt ? -1 : 1);
                                }
                            break;
                            default:
                            break;
                        }
                    }
                }
            }
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