import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { NavigationMixin } from "../mixins/navigation-mixin.js";

import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';

import '../procesos/my-licencias.js';
import '../procesos/my-pre-arsh.js';
import '../procesos/my-sasisopa.js';
import '../procesos/my-sgm.js';

import '../bootstrap.js';

class MyCliente extends NavigationMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    
                    
                }

                paper-tabs{
                    background-color:var(--paper-blue-500);
                    --paper-tab-ink: var(--paper-blue-100);
		            --paper-tabs-selection-bar-color: #FFFF00;
                }

                paper-tabs paper-tab.iron-selected {
                    color: #FFFF00;
                }


            </style>

            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Estatus general por departamento</h5>
                    </div>

                    <div class="card-body">
                        <paper-tabs selected="{{selected}}" attr-for-selected="name" scrollable>
                            <paper-tab name="sasi">SASISOPA</paper-tab>
                            <paper-tab name="licencia">LICENCIAS DE FUNCIONAMIENTO</paper-tab>
                            <paper-tab name="pre">PRE & ARSH</paper-tab>
                            <paper-tab name="sgm">SGM</paper-tab>
                        </paper-tabs>
                        
                        <iron-pages selected="{{selected}}" attr-for-selected="name">
                            <my-sasisopa name="sasi"></my-sasisopa>
                            <my-licencias name="licencia"></my-licencias>
                            <my-pre-arsh name="pre"></my-pre-arsh>
                            <my-sgm name="sgm"></my-sgm>
                        </iron-pages>
                    </div>
                </div>
            </div>



            
            
            
        `;
    }

    static get properties() {
        return {
            selected:{type:String, notify:true, value:"sasi"},
            idCliente:{type:String, notify:true, observer:"_consultaCliente"},
            datosCliente:{type:Object, notify:true},

            routeParams:{observer:"_cambiaId"}

        }
    }

    _cambiaId(params){
        if(params && params.idCliente){
            this.set("idcliente",params.idCliente);
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }
}

customElements.define('my-cliente', MyCliente);