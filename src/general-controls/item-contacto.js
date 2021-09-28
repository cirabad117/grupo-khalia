import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-listbox/paper-listbox.js';
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
                    padding:10px;
                }
                ::-webkit-scrollbar {
                    width: 10px;
                }
                ::-webkit-scrollbar-track {
                    background: #f1f1f1; 
                }
                ::-webkit-scrollbar-thumb {
                    background: #888; 
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #555; 
                }
            </style>
            
            <div class="card">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <h5 class="card-title" style="padding:10px;">[[muestraNombre(datosContacto)]]</h5>
                        <div>
                            <paper-icon-button icon="create" on-click="despachaEdita"></paper-icon-button>
                            <paper-icon-button icon="delete" on-click="despachaBorra"></paper-icon-button>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <paper-listbox style="max-height:200px;overflow-y:scroll;">
                            <template is="dom-repeat" items="[[datosContacto.telefonos]]" as="tels">
                                    <paper-item ><span style="padding:10px;">
                                    <iron-icon icon="communication:call"></iron-icon>
                                    </span>[[tels.tipo]]: [[tels.telefono]]</paper-item>
                                </template>
                                <template is="dom-repeat" items="[[datosContacto.correos]]" as="email">
                                    <paper-item ><span style="padding:10px;">
                                    <iron-icon icon="communication:email"></iron-icon>
                                    </span>[[email]]</paper-item>
                                </template>
                            </paper-listbox>










                            <ul class="list-group" style="max-height:150px;overflow-y:scroll;">
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
   

            

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