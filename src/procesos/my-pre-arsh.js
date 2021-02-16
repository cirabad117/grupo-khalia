import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';


import '../shared-styles.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

class MyPreArsh extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="shared-styles">
                :host{
                    display:block;
                }
            </style>

            <div class="card">
                <h1>general</h1>
                
                <paper-input label="paquete"></paper-input>
                
                <paper-input label="gestor"></paper-input>

                
                
            </div>
            <div class="card">
                <h1>carta y formato de ingreso</h1>
                
                <paper-input label="enviada"></paper-input>
                
                <paper-input label="fisico"></paper-input>

            </div>
            <div class="card">
                <h1>analisis de riesgo</h1>
                
                <paper-input label="informacion enviada"></paper-input>
                
                <paper-input label="visto bueno y respaldo en drive"></paper-input>
                
                <paper-input label="respaldo en fisico"></paper-input>
                
                <paper-input label="firmado por gestor"></paper-input>
                
                <paper-input label="entregado al cliente o proveedor"></paper-input>
                
                
                
                
                
                
               
                
                
                
            </div>
            <div class="card">
                <h1>protocolo de respuesta a emergencias</h1>
                
                <paper-checkbox checked>listo</paper-checkbox>
                
                <paper-checkbox checked>acuse de ingreso</paper-checkbox>
                
                <paper-checkbox checked>impreso</paper-checkbox>
                
                <paper-checkbox checked>entregado al cliente o proveedor</paper-checkbox>

                
                <paper-input label="evidencia de entrega"></paper-input>
                
                
                
                
                
                
               
                
                
                
            </div>
            <div class="card">
                <h1>estatus en el portal de la asea</h1>
                
                <paper-input label="estatus de asea"></paper-input>
                
                <paper-input label="fecha ultimo estatus"></paper-input>

                
                <paper-input label="observaciones"></paper-input>
                
                
                
                

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

customElements.define('my-pre-arsh', MyPreArsh);