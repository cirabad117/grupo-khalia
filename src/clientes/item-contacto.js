import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';

class ItemContacto extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <paper-icon-item>
                <iron-icon icon="account-circle"></iron-icon>
                <paper-item-body two-line>
                    <div>[[datosContacto.nombreCliente]]</div>
                    <div secondary>[[datosContacto.telefono]]</div>
                </paper-item-body>
                <paper-icon-button icon="clear" on-click="despachaBorra"></paper-icon-button>
            </paper-icon-item>
            
        `;
    }

    static get properties() {
        return {
            datosContacto:{type:Object, notify:true},
            indexContacto:{type:Number, notify:true}

        }
    }

    despachaBorra(){
        var t=this;
        this.dispatchEvent(new CustomEvent('quita-contacto', {
            detail: {
                "indexEliminar":t.indexContacto
            }
        }));
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }
}

customElements.define('item-contacto', ItemContacto);