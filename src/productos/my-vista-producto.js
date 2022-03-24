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
            
            <nav class="navbar navbar-light bg-light titulo">
                <span class="navbar-brand" on-click="regresa">
                    <iron-icon icon="arrow-back"></iron-icon>
                    [[producto.nombre]]
                    
                </span>

                <button class=" btn btn-success btn-md" on-click="disparaVentanaProd">
                        <span><iron-icon icon="save"></iron-icon></span>
                        GUARDAR CAMBIOS
                    </button>

            </nav>

            <div class="card">
                <div class="card-body">

                <dialogo-nuevo-producto style="margin:10px;" id="ventana-editar"
                es-editar="[[esEditar]]" producto-activo="{{producto}}"></dialogo-nuevo-producto>

                </div>
            </div>

            <!-- <div class="container">

                <div class="card">
                    <div class="card-header d-flex align-items-center" >
                        
                       
                        <h5>[[producto.nombre]]</h5>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-12">
                            
                          
                        </div>

                        
                    </div>
                    <div class="card-footer">
                        <template is="dom-if" if="[[esEditar]]">
                            <paper-button on-click="cambiaEdita">cancelar</paper-button>
                            <paper-button style="color:var(--paper-green-500);" icon="save" on-click="disparaVentanaProd">guardar</paper-button>
                            
                            
                        </template>
                        <template is="dom-if" if="[[!esEditar]]">
                            <paper-button on-click="cambiaEdita">cancelar</paper-button>
                            <paper-button style="color:var(--paper-green-500);" icon="save" on-click="disparaVentanaProd">Crear producto</paper-button>
                            
                        </template>
                    </div>
                </div>
                
            </div> -->

        `;
    }



    static get properties() {
        return {
            producto:{type:Object, notify:true},
            _routeParams:{observer: "_routeChanged"},
            esEditar:{type:Boolean, notify:true, value:true}
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
                        t.set("producto",null);
                    }
                }
            }));

		}else{
            t.set("producto",null);
        }
	}
}

customElements.define('my-vista-producto', MyVistaProducto);