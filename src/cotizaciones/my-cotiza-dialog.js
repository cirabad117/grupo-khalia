import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';

import '../general-controls/data-simple.js';

import '../bootstrap.js';
class MyCotizaDialog extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <div class="d-flex flex-wrap">
                <data-simple style="padding:5px;"font-size="25px"dato="[[getId(coti.id)]]" titulo="Folio"></data-simple>
                <data-simple style="padding:5px;"font-size="25px"dato="[[coti.estatus]]" titulo="Estatus"></data-simple>
                <data-simple style="padding:5px;"font-size="25px"dato="[[coti.agente.displayName]]" titulo="Agente"></data-simple>
                <data-simple style="padding:5px;"font-size="25px"dato="[[coti.cliente.razon]]" titulo="Razón Social"></data-simple>
            </div>
            
            <paper-item>
                <paper-item-body two-line>
                    <div>Productos solicitados</div>
                    <div class="d-flex flex-wrap" style="max-height:100px;overflow-y:scroll;">
                        <template is="dom-repeat" items="[[coti.listaProds]]">
                            <h4><span class="badge badge-pill badge-info">[[item.codigo]]</span></h4>
                        </template>
                    </div>
                </paper-item-body>
            </paper-item>
            
            

        `;
    }

    static get properties() {
        return {
            coti:{type:Object, notify:true}
        }
    }

    constructor(obj) {
        super();

        if(obj){
            console.log("cotizacion",obj);
            this.set("coti",obj);
        }
    }

    ready() {
        super.ready();
    }

    getId(str){
        let length = str.length;
            var restante=4-length;
            if(restante>0){
                for(var i=0;i<restante;i++){
                    str=0+str;
                }
            }
            
            return "GK-"+str;
    }
}

customElements.define('my-cotiza-dialog', MyCotizaDialog);