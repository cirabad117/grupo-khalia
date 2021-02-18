import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';


import '../shared-styles.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

class MyLicencias extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="shared-styles">
                :host{
                    display:block;
                }
            </style>
            
            <div class="separador">
                <h1>seguimiento</h1>
                
                <vaadin-combo-box placeholder="gestor asignado" selected-item="{{gestor}}" items="[[listaGestores]]"
                item-value-path="codigo" item-label-path="nombre"></vaadin-combo-box>
                
                <paper-checkbox checked>aplica SRV</paper-checkbox>
                
                <paper-input label="usuario"></paper-input>
                
                <paper-input label="contraseña"></paper-input>
                
                <vaadin-date-picker label="fecha de ingreso"></vaadin-date-picker>
                
                <paper-checkbox checked>envio de acuse</paper-checkbox>
                
                <paper-checkbox checked>subsanado</paper-checkbox>
                
                <paper-input label="impresion de carpeta"></paper-input>
                
                <paper-input label="no. de oficio"></paper-input>
                
                <paper-input label="no de tramite/bitacora"></paper-input>
                
                <paper-input label="LF/LAU"></paper-input>
                
                <paper-input label="NRA"></paper-input>
                
                <paper-checkbox checked>respaldo en drive</paper-checkbox>
                

            </div>

            <div class="separador">
                <h1>estatus del sa en el portal</h1>
                
                <vaadin-combo-box label="estatus portal OPE" selected-item="{{estatus_OPE}}" items="[[estatus_lf]]"
                item-value-path="nombre" item-label-path="significado"></vaadin-combo-box>
                
                <vaadin-date-picker label="fecha ultimo estatus"></vaadin-date-picker>
                
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