import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import './mi-item-conta.js';

class MyContadores extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>

            <my-item-conta llave="[[idCliente]]" id="[[idEstacion]]" titulo="Bitácoras de accidentes"
            documento="bitacora-accidente"></my-item-conta>

            <my-item-conta llave="[[idCliente]]" id="[[idEstacion]]" titulo="Bitácoras de mantenimiento"
            documento="bitacora-mantto"></my-item-conta>

            <my-item-conta llave="[[idCliente]]" id="[[idEstacion]]" titulo="Bitácoras de producto"
            documento="bitacora-producto"></my-item-conta>

            <my-item-conta llave="[[idCliente]]" id="[[idEstacion]]" titulo="Bitácora de limpiezas - DIARIA"
            documento="limpieza-diaria"></my-item-conta>

            <my-item-conta llave="[[idCliente]]" id="[[idEstacion]]" titulo="Bitácora de limpiezas - MENSUAL"
            documento="limpieza-mes"></my-item-conta>

            <my-item-conta llave="[[idCliente]]" id="[[idEstacion]]" titulo="Bitácora de limpiezas - ECOLÓGICA"
            documento="limpieza-trimestre"></my-item-conta>

            <my-item-conta llave="[[idCliente]]" id="[[idEstacion]]" titulo="Pruebas de hermeticidad - MÓVIL"
            documento="prueba-anual"></my-item-conta>

            <my-item-conta llave="[[idCliente]]" id="[[idEstacion]]" titulo="Pruebas de hermeticidad - FIJA"
            documento="prueba-mensual"></my-item-conta>

        `;
    }

    static get properties() {
        return {
            idCliente:{type:String, notify:true},
            idEstacion:{type:String, notify:true}
        }
    }

    constructor(cliente,esta) {
        super();

        if(cliente){
            this.set("idCliente",cliente);
        }

        if(esta){
            this.set("idEstacion",esta);
        }
    }

    ready() {
        super.ready();
    }
}

customElements.define('my-contadores', MyContadores);