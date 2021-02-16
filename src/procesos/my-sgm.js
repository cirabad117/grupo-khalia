import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';

import '../shared-styles.js'
import { UtilsMixin } from '../mixins/utils-mixin.js';


import '@polymer/paper-checkbox/paper-checkbox.js';

class MySgm extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="shared-styles">
                :host{
                    display:block;
                }
            </style>

<div class="card">
                <h1>registros</h1>

                
                <paper-input label="venta por"></paper-input>
                
                <paper-input label="CURR"></paper-input>
                
                <paper-input label="clave de instalación"></paper-input>

                
                
                


            </div>
            <div class="card">
                <h1>portal ope asea</h1>

                
                <paper-input label="usuario"></paper-input>
                
                <paper-input label="contraseña"></paper-input>
                
                
                

            </div>
            <div class="card">
                <h1>seguimiento</h1>

                
                <paper-input label="gestor"></paper-input>
                
                <paper-input label="unidad de verificacion"></paper-input>
                
                <paper-input label="fecha de ingreso"></paper-input>
                
                <paper-input label="fecha de implementacion"></paper-input>
                
                <paper-input label="comentarios"></paper-input>
                
                
                
                
                
                

            </div>

            <div class="card">
                <h1>estatus del sa en el portal</h1>
                
                <paper-input label="notificacion/estatus"></paper-input>
                
                <paper-input label="fecha"></paper-input>
                
                
                

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

customElements.define('my-sgm', MySgm);