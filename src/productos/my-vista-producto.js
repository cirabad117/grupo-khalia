import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { NavigationMixin } from '../mixins/navigation-mixin.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import '../general-controls/data-simple.js';
import './dialogo-nuevo-producto.js';

import '../bootstrap.js';

class MyVistaProducto extends NavigationMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="container">

                <div class="card">
                    <div class="card-header d-flex align-items-center" >
                        
                        <paper-icon-button icon="arrow-back" on-click="regresa"></paper-icon-button>
                        <h5>[[producto.nombre]]</h5>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-12">
                            <template is="dom-if" if="[[esEditar]]">
                               
                                <dialogo-nuevo-producto style="margin:10px;" id="ventana-editar" es-editar="[[esEditar]]" id-prod="[[producto.id]]" codigo="[[producto.codigo]]"
                                nombre="[[producto.nombre]]" departamento="[[producto.departamento]]" dependencia="[[producto.dependencia]]"
                                es-cotizacion="[[revisaCoti(producto)]]" cotizacion="[[producto.cotizacion]]"
                                on-cierra-dialogo="forzarDialogo"></dialogo-nuevo-producto>
                            </template>
                        </div>

                        <div class="col-md-12">
                            <template is="dom-if" if="[[!esEditar]]">
                                <div style="margin:10px; display: flex; align-items: center; flex-wrap: wrap;">
                                    <data-simple value="[[producto.codigo]]" title="código"></data-simple>
                                    <data-simple value="[[producto.nombre]]" title="nombre del producto"></data-simple>
                                    <data-simple value="[[producto.departamento]]" title="departamento"></data-simple>
                                    <data-simple value="[[producto.dependencia]]" title="dependencia"></data-simple>
                                    <template is="dom-if" if="[[producto.cotizacion]]">
                                        <data-simple value="[[producto.cotizacion]]" title="cotizacion"></data-simple>
                                    </template>
                                    <!-- <paper-icon-button style="background-color:#FFECB3;border-radius:50%;" icon="create" on-click="cambiaEdita"></paper-icon-button> -->
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="card-footer">
                        <template is="dom-if" if="[[esEditar]]">
                            <paper-button on-click="cambiaEdita">cancelar</paper-button>
                            <paper-button style="color:var(--paper-green-500);" icon="save" on-click="disparaVentanaProd">guardar</paper-button>
                            
                            
                        </template>
                        <template is="dom-if" if="[[!esEditar]]">
                            <paper-button on-click="cambiaEdita">editar</paper-button>
                        </template>
                    </div>
                </div>
                
            </div>

        `;
    }



    static get properties() {
        return {
            producto:{type:Object, notify:true},
            _routeParams:{observer: "_routeChanged"},
            esEditar:{type:Boolean, notify:true, value:false}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    regresa(){
        NavigationUtils.navigate("productos");
    }

    cambiaEdita(){
        this.set("esEditar",!this.esEditar);
        
    }

    disparaVentanaProd(){
        var dialogo=this.shadowRoot.querySelector("#ventana-editar");
        dialogo.guardaProducto();
        
    }

    _routeChanged(params){
        var t=this;
		if(params && params!=null && params.id){
            console.log("recibimos id de producto");
            var id=params.id;
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "_productos-khalia/"+id,
                observer:function(obj){
                    if(obj){
                        t.set("producto",obj);
                        
                    }else{
                        
                    }
                }
            }));

		}else{
            t.set("producto",null);
        }
	}
}

customElements.define('my-vista-producto', MyVistaProducto);