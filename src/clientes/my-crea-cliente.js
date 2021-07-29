import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-input.js';

class MyCreaCliente extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>

            
            <paper-input label="folio"></paper-input>
            
            <paper-input label="anterior"></paper-input>
            
            <paper-input label="proveedor"></paper-input>
            
            <paper-input label="servicio contratado"></paper-input>

            <paper-input label="departamento tramite"></paper-input>
            
            <paper-input label="folio de cotizacion"></paper-input>
            
            <paper-input label="fecha"></paper-input>
            
            
            
            
            
            

        `;
    }

    static get properties() {
        return {

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }
}

customElements.define('my-crea-cliente', MyCreaCliente);