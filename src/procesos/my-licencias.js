import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

import '../shared-styles.js';
import '../bootstrap.js';

class MyLicencias extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap shared-styles">
                :host{
                    display:block;
                }
            </style>
            
            <div class="container-fluid">
                <h1>seguimiento</h1>
                
                <div class="row d-flex justify-content-start align-items-baseline">
                    <vaadin-combo-box class="col-md-3" placeholder="gestor asignado" selected-item="{{gestor}}" items="[[listaGestores]]"
                    item-value-path="codigo" item-label-path="nombre"></vaadin-combo-box>
                    
                    <vaadin-date-picker class="col-md-3" label="fecha de ingreso"></vaadin-date-picker>

                </div>
                <hr/>
                
                <div class="row">
                    <paper-input class="col-md-3" label="usuario"></paper-input>
                    <paper-input class="col-md-3" label="contraseña"></paper-input>
                </div>
                <hr/>
                
                <div class="row">
                    <paper-input class="col-md-3" label="impresion de carpeta"></paper-input>
                    <paper-input class="col-md-3" label="no. de oficio"></paper-input>
                    <paper-input class="col-md-3" label="no de tramite/bitacora"></paper-input>
                    <paper-input class="col-md-3" label="LF/LAU"></paper-input>
                    <paper-input class="col-md-3" label="NRA"></paper-input>
                </div>
                <hr/>
                
                <div class="row">
                    <paper-checkbox class="col-md-3" checked>aplica SRV</paper-checkbox>
                    <paper-checkbox class="col-md-3" checked>envio de acuse</paper-checkbox>
                    <paper-checkbox class="col-md-3" checked>subsanado</paper-checkbox>
                    <paper-checkbox class="col-md-3" checked>respaldo en drive</paper-checkbox>
                </div>
                <hr/>
                
                <h1>estatus del sa en el portal</h1>
                <div class="row">
                    
                    <vaadin-combo-box class="col-md-3" label="estatus portal OPE" selected-item="{{estatus_OPE}}" items="[[estatus_lf]]"
                    item-value-path="nombre" item-label-path="nombre"></vaadin-combo-box>
                    <vaadin-date-picker class="col-md-3" label="fecha ultimo estatus"></vaadin-date-picker>
                </div>
                
            </div><!--container-fluid-->

            

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