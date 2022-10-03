import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-textarea.js';
import '../bootstrap.js';
class MyBuzon extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            <div class="container">
                
<div class="card">
                            <div class="card-header">
                                Buzón de sugerencias
                            </div>
                            <div class="card-body">
                                <paper-textarea placeholder="Dudas, sugerencias o comentarios" value="{{mensaje}}"></paper-textarea>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-primary" on-click="muestraTexto">Enviar</button>
                            </div>
                        </div>

            </div>


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

customElements.define('my-buzon', MyBuzon);