import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

class SelectorUsuarios extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>

            <vaadin-combo-box label="[[etiqueta]]" selected-item="{{usuarioElegido}}"
            items="[[listaUsuarios]]" item-label-path="displayName" item-id-path="id"></vaadin-combo-box>

            



        `;
    }

    static get properties() {
        return {
            listaUsuarios:{type:Array, notify:true, value:[]},
            etiqueta:{type:String, notify:true},
            usuarioElegido:{type:Object, notify:true, reflectToAttribute:true}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        
        if(this.lastInstalaciones){
            this.lastInstalaciones();
            this.set("lastInstalaciones",null);
        }

        this.set("lastInstalaciones",DataHelper.queryCollection(this,{
            "collection":"usuarios",
            "array":this.listaUsuarios,
            "arrayName":"listaUsuarios"
        }));
    }
}

customElements.define('selector-usuarios', SelectorUsuarios);