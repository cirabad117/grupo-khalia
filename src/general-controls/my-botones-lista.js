import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-tooltip/paper-tooltip.js';

class MyBotonesLista extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <paper-icon-button style="color:var(--paper-grey-700);" icon="[[icono]]"
            on-click="ejecutaAccion" ></paper-icon-button>

            <paper-tooltip position="top" animation-delay="0">[[texto]]</paper-tooltip>
                                         

        `;
    }

    static get properties() {
        return {
            icono:{type:String, notify:true},
            accion:{type:String, notify:true},
            texto:{type:String, notify:true},
            obj:{type:Object, notify:true}
           
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    ejecutaAccion(){
        var t=this;
        this.dispatchEvent(new CustomEvent('lanza-accion', {
            detail: {
                texto:t.accion,
                dato:t.obj
            }
        }));
    }
}

customElements.define('my-botones-lista', MyBotonesLista);