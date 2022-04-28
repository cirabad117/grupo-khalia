import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';


import '../shared-styles.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@vaadin/vaadin-select/vaadin-select.js';

class MyPreArsh extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="shared-styles">
                :host{
                    display:block;
                }
            </style>

            <div class="separador">
                <h1>general</h1>
                
                <vaadin-select id="comboPeriodoNom" label="Paquete" value="{{periodoNom005}}" error-message="seleccione una opción">
                    <template>
                        <vaadin-list-box>
                            <vaadin-item value="I">I</vaadin-item>
                            <vaadin-item value="II">II</vaadin-item>
                            <vaadin-item value="III">III</vaadin-item>
                            <vaadin-item value="IV">IV</vaadin-item>
                            <vaadin-item value="V">V</vaadin-item>
                            <vaadin-item value="VI">VI</vaadin-item>
                            <vaadin-item value="VII">VII</vaadin-item>
                            <vaadin-item value="VIII">VIII</vaadin-item>
                        </vaadin-list-box>
                    </template>
                </vaadin-select>
                
                <vaadin-combo-box placeholder="gestor asignado" selected-item="{{gestor}}" items="[[listaGestores]]"
                item-value-path="codigo" item-label-path="nombre"></vaadin-combo-box>
            </div>

            <div class="separador">
                <h1>carta y formato de ingreso</h1>
                
                <paper-checkbox checked>enviada</paper-checkbox>
                
                <paper-checkbox checked>físico</paper-checkbox>
            
            </div>

            <div class="separador">
                <h1>analisis de riesgo</h1>
                
                <paper-checkbox checked>información enviada</paper-checkbox>
                
                <paper-checkbox checked>visto bueno y respaldo en drive</paper-checkbox>
                
                <paper-checkbox checked>respaldo en fisico</paper-checkbox>
                
                <paper-checkbox checked>firmado por gestor</paper-checkbox>
                
                <paper-checkbox checked>entregado al cliente o proveedor</paper-checkbox>
            
            </div>

            <div class="separador">
                <h1>protocolo de respuesta a emergencias</h1>
                
                <paper-checkbox checked>listo</paper-checkbox>
                
                <paper-checkbox checked>acuse de ingreso</paper-checkbox>
                
                <paper-checkbox checked>impreso</paper-checkbox>
                
                <paper-checkbox checked>entregado al cliente o proveedor</paper-checkbox>

                
                <vaadin-select id="comboPeriodoNom" label="evidencia de entrega" value="{{periodoNom005}}" error-message="seleccione una opción">
                    <template>
                        <vaadin-list-box>
                            <vaadin-item value="CORREO">CORREO</vaadin-item>
                            <vaadin-item value="FORMATO DE ENTREGA">FORMATO DE ENTREGA</vaadin-item>
                            <vaadin-item value="GUIA">GUIA</vaadin-item>
                        </vaadin-list-box>
                    </template>
                </vaadin-select>
            </div>

            <div class="separador">
                <h1>estatus en el portal de la asea</h1>
                
                <paper-input label="estatus de asea"></paper-input>
                
                <vaadin-date-picker label="fecha ultimo estatus"></vaadin-date-picker>
                
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