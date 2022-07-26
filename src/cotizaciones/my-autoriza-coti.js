import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-input.js';

import '../general-controls/data-simple.js';


class MyAutorizaCoti extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <data-simple font-size="25px"
            dato="[[cotizacion.id]]" titulo="Folio"></data-simple>

            <data-simple font-size="25px"
            dato="[[cotizacion.cliente.razon]]" titulo="Razón social"></data-simple>

            
            <paper-input id="txt-acuerdo" label="Acuerdo de pago" value="{{acuerdoPago}}" error-message="texto inválido"></paper-input>
            <paper-input id="txt-factura" label="Folio de factura" value="{{folioFactura}}" error-message="texto inválido"></paper-input>
            <paper-input type="number" id="txt-costo" label="Costo total (sin I.V.A.)" value="{{costo}}" error-message="texto inválido">
            <div slot="prefix">$</div>
            </paper-input>

            


        `;
    }

    static get properties() {
        return {
            cotizacion:{type:Object, notify:true}

        }
    }

    constructor(obj) {
        super();

        if(obj){
            console.log("obj",obj);
            this.set("cotizacion",obj);
        }
    }

    ready() {
        super.ready();
    }

    retornaCoti(){
        if(!this.acuerdoPago || this.acuerdoPago==null || this.acuerdoPago.trim()==""){
            return this.shadowRoot.querySelector("#txt-acuerdo").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txt-acuerdo").invalid=false;
        }
        if(!this.folioFactura || this.folioFactura==null || this.folioFactura.trim()==""){
            return this.shadowRoot.querySelector("#txt-factura").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txt-factura").invalid=false;
        }

        if(!this.costo || this.costo==null || isNaN(this.costo)){
            return this.shadowRoot.querySelector("#txt-costo").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txt-costo").invalid=false;
        }

        return {
            acuerdoPago:this.acuerdoPago,
            folioFactura:this.folioFactura,
            costo:this.costo
        };
    }
}

customElements.define('my-autoriza-coti', MyAutorizaCoti);