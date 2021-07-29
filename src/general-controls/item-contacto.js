import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';

import '../bootstrap.js';

class ItemContacto extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <!-- <div style="background-color:white;">
                <div style="display: flex; padding: 8px; ">
                    <div style="flex-grow: 1;">
                        <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">Nombre</div>
                            <div style="font-size: 16px; color: black;">[[datosContacto.nombreCliente]]</div>
                        </div>
                        
                        <div style="flex-grow: 1;">
                            <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">Puesto</div>
                            <div style="font-size: 16px; color: black;">[[datosContacto.puesto]]</div>
                        </div>
                        
                        <div style="flex-grow: 1;">
                            <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">telefonos</div>
                            <div style="font-size: 16px; color: black;">[[datosContacto.telefono]]</div>
                        </div>

                        <div style="flex-grow: 1;">
                            <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">Correo electrónico</div>
                            <div style="font-size: 16px; color: black;">[[datosContacto.email]]</div>
                        </div>
                        
                        <div style="flex-grow: 0;">
                            <paper-icon-button icon="clear" on-click="despachaBorra"></paper-icon-button>
                        </div>
                    </div>
                </div> -->
            
            <!-- <paper-icon-item>
                <iron-icon icon="communication:phone" slot="item-icon"></iron-icon>
                <paper-item-body two-line>
                    <div>[[datosContacto.nombreCliente]]</div>
                    <div secondary>[[datosContacto.telefono]] - [[datosContacto.email]]</div>
                </paper-item-body>
                <paper-icon-button icon="clear" on-click="despachaBorra"></paper-icon-button>

            </paper-icon-item> -->
            
            <paper-item>
                
                <paper-item-body two-line>
                    <div>[[muestraNombre(datosContacto)]]</div>
                    <div secondary class="d-flex flex-wrap align-items-center">
                        <div id="lista-tels">
                            <p style="margin:0 !important;">telefonos</p>
                            <vaadin-list-box>
                            
                                <template is="dom-repeat" items="[[datosContacto.telefonos]]" as="tels">
                                    <vaadin-item>[[tels.tipo]]: [[tels.telefono]]</vaadin-item>
                                </template>
                            </vaadin-list-box>
                        </div>

                        <div id="lista-email">
                        <p style="margin:0 !important;">correos electronicos</p>
                            <vaadin-list-box>
                                <template is="dom-repeat" items="[[datosContacto.correos]]" as="email">
                                    <vaadin-item>[[email]]</vaadin-item>
                                </template>
                            </vaadin-list-box>
                        </div>
                    </div>
                </paper-item-body>
                <paper-icon-button icon="clear" on-click="despachaBorra"></paper-icon-button>
            </paper-item>
            
        `;
    }

    static get properties() {
        return {
            datosContacto:{type:Object, notify:true},
            indexContacto:{type:Number, notify:true}

        }
    }

    muestraNombre(obj){
        if(obj.puesto){
            return obj.nombreCliente + " - " + obj.puesto;
        }else{
            return obj.nombreCliente;
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