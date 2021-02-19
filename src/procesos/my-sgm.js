import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

import '../shared-styles.js';
import '../bootstrap.js';


class MySgm extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap shared-styles">
                :host{
                    margin:10px;
                    display:block;
                }
            </style>
            
            <div class="container-fluid">
            
                <div class="row">
                    <div class="col-md-6">
                        <vaadin-combo-box placeholder="venta por" selected-item="{{objVenta}}" items="[[_ventaPor]]"
                        item-value-path="codigo" item-label-path="nombre"></vaadin-combo-box>
                        <paper-input label="CURR"></paper-input>
                        <paper-input label="clave de instalación"></paper-input>
                    </div>
                
                    <div class="col-md-6 border border-primary rounded">
                        <p>portal ope asea</p>
                        <paper-input label="usuario"></paper-input>
                        <paper-input label="contraseña"></paper-input>
                    </div>

                </div>

                <hr/>

                <h1>seguimiento</h1>
                <div class="row row d-flex justify-content-start align-items-baseline">
                    <vaadin-combo-box class="col-md-3" placeholder="gestor asignado" selected-item="{{gestor}}" items="[[listaGestores]]"
                    item-value-path="codigo" item-label-path="nombre"></vaadin-combo-box>
                    <vaadin-date-picker class="col-md-3" label="fecha de ingreso"></vaadin-date-picker>
                    <vaadin-date-picker class="col-md-3" label="fecha de implementación"></vaadin-date-picker>
                    
                </div>

                <div class="row">
                    <paper-input class="col-md-3" label="unidad de verificacion"></paper-input>
                    <paper-input class="col-md-3" label="comentarios"></paper-input>
                </div>

                <hr/>
                <h1>estatus del sa en el portal</h1>

                <div class="row">
                    <paper-input class="col-md-3" label="notificacion/estatus"></paper-input>
                    <vaadin-date-picker class="col-md-3" label="fecha"></vaadin-date-picker>
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

customElements.define('my-sgm', MySgm);