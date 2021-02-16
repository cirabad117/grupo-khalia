import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { NavigationMixin } from "../mixins/navigation-mixin.js";

import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';

import '../procesos/my-licencias.js';
import '../procesos/my-pre-arsh.js';
import '../procesos/my-sasisopa.js';
import '../procesos/my-sgm.js';

class MyCliente extends NavigationMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>

            
            <paper-tabs selected="{{selected}}" attr-for-selected="name">
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