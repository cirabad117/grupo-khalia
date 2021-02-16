import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';


import '../shared-styles.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

class MyLicencias extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="shared-styles">
                :host{
                    display:block;
                }
            </style>
            
            <div class="card">
                <h1>seguimiento</h1>

                
                <paper-input label="gestor"></paper-input>
                
                <paper-input label="aplica srv"></paper-input>
                
                <paper-input label="usuario"></paper-input>
                
                <paper-input label="contraseña"></paper-input>
                
                <paper-input label="fecha de ingreso"></paper-input>
                
                <paper-input label="envio de acuse"></paper-input>
                
                <paper-input label="subsanado"></paper-input>
                
                <paper-input label="impresion de carpeta"></paper-input>
                
                <paper-input label="no. de oficio"></paper-input>
                
                <paper-input label="no de tramite/bitacora"></paper-input>
                
                <paper-input label="LF/LAU"></paper-input>
                
                <paper-input label="NRA"></paper-input>
                
                <paper-input label="respaldo en drive"></paper-input>

            </div>

            <div class="card">
                <h1>estatus del sa en el portal</h1>
                
                <paper-input label="estatus en portal ope"></paper-input>
                
                <paper-input label="fecha ultimo estatus"></paper-input>
                
                
                

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

customElements.define('my-licencias', MyLicencias);