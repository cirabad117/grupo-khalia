import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
class MyItemConta extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>

            <paper-item>
                <paper-item-body>
                    <div>[[titulo]]</div>
                </paper-item-body>
                [[contador]]
            </paper-item>

        `;
    }

    static get properties() {
        return {
            titulo:{type:String, notify:true},
            llave:{type:String, notify:true},
            id:{type:String, notify:true},
            contador:{type:Number, notify:true,value:0},
            documento:{type:String, notify:true}

        }
    }

    static get observers() {
        return [
            '_consultaDoc(llave,id)'
        ];
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    _consultaDoc(llave,id){
        var doc=this.documento;
        var t=this;
        if(id && id!=null && llave && llave!=null){
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "_clientes/"+llave+"/counters/instalaciones/"+id+"/"+doc,
                observer:function(obj){
                    if(obj){
                        t.set("contador",obj.count);
                        
                    }
                }
            }));

        }
    }
}

customElements.define('my-item-conta', MyItemConta);