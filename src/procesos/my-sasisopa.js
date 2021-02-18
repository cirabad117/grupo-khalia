import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';

import '../shared-styles.js';

class MySasisopa extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="shared-styles">
                :host{
                    display:block;
                }
            </style>
            
            <vaadin-combo-box placeholder="venta por" selected-item="{{objVenta}}" items="[[_ventaPor]]"
            item-value-path="codigo" item-label-path="nombre"></vaadin-combo-box>

            <div class="separador">

                <h1>registros</h1>
                
                <paper-input label="CURR"></paper-input>
                
                <paper-input label="clave de instalación"></paper-input>
                
            </div>

            <div class="separador">
                <h1>portal ope asea</h1>
                
                <paper-input label="usuario"></paper-input>
                
                <paper-input label="contraseña"></paper-input>
            
            </div>

            <div class="separador">
                <h1>seguimiento</h1>
                
                <vaadin-combo-box placeholder="gestor asignado" selected-item="{{gestor}}" items="[[listaGestores]]"
                item-value-path="codigo" item-label-path="nombre"></vaadin-combo-box>
                
                <paper-input label="unidad de verificacion"></paper-input>
                
                <vaadin-date-picker label="fecha de ingreso"></vaadin-date-picker>
                
                <vaadin-date-picker label="fecha de implementación"></vaadin-date-picker>
                
                <paper-input label="comentarios"></paper-input>
                
            </div>

            <div class="separador">
                <h1>estatus del sa en el portal</h1>
                
                <paper-input label="notificacion/estatus"></paper-input>
                
                <vaadin-date-picker label="fecha"></vaadin-date-picker>
            
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

customElements.define('my-sasisopa', MySasisopa);