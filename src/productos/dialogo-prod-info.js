import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import '../general-controls/data-simple.js';
// import '../general-controls/dialogo-nuevo-producto.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

class DialogoProdInfo extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <template is="dom-if" if="[[esEditar]]">

                <paper-icon-button icon="arrow-back" on-click="cambiaEdita"></paper-icon-button>
                <paper-icon-button style="color:var(--paper-green-500);" icon="save" on-click="disparaVentanaProd"></paper-icon-button>
                <dialogo-nuevo-producto id="ventana-editar" es-editar="[[esEditar]]" id-prod="[[producto.id]]" codigo="[[producto.codigo]]"
                nombre="[[producto.nombre]]" departamento="[[producto.departamento]]" dependencia="[[producto.dependencia]]"
                es-cotizacion="[[revisaCoti(producto)]]" cotizacion="[[producto.cotizacion]]"
                on-cierra-dialogo="forzarDialogo"></dialogo-nuevo-producto>
            </template>
            
            <template is="dom-if" if="[[!esEditar]]">
                <div style="display: flex; align-items: center; flex-wrap: wrap;">
                    
                    <data-simple dato="[[producto.codigo]]" titulo="código"></data-simple>
                    <data-simple dato="[[producto.nombre]]" titulo="nombre del producto"></data-simple>
                    <data-simple dato="[[producto.departamento]]" titulo="departamento"></data-simple>
                    <data-simple dato="[[producto.dependencia]]" titulo="dependencia"></data-simple>
                    <template is="dom-if" if="[[producto.cotizacion]]">
                        <data-simple dato="[[producto.cotizacion]]" titulo="cotizacion"></data-simple>
                    </template>
                    <paper-icon-button style="background-color:#FFECB3;border-radius:50%;" icon="create" on-click="cambiaEdita"></paper-icon-button>

                </div>
            </template>


            

        `;
    }

    static get properties() {
        return {
            producto:{type:Object, notify:true},
            esEditar:{type:Boolean, notify:true, value:false}
            
        }
    }

    constructor(obj) {
        super();

        if(obj){
            this.set("producto",obj);
        }
    }

    ready() {
        super.ready();
    }

    disparaVentanaProd(){
        var dialogo=this.shadowRoot.querySelector("#ventana-editar");
        dialogo.guardaProducto();
        
    }

    cambiaEdita(){
        this.set("esEditar",!this.esEditar);
        this.DialogLayout_notifyResize();
    }

    revisaCoti(obj){
        if(obj.cotizacion){
            return true;
        }else{
            return false;
        }
    }

    forzarDialogo(){
        this.DialogLayout_closeDialog();
    }
}

customElements.define('dialogo-prod-info', DialogoProdInfo);