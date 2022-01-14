import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class MyMuestraMensaje extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>

            <div id="contenedor"></div>

        `;
    }

    static get properties() {
        return {
            mensaje:{type:String, notify:true, observer:"_agregaHtml"}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    _agregaHtml(str){
        this.shadowRoot.querySelector("#contenedor").innerHTML +=str;
    }
}

customElements.define('my-muestra-mensaje', MyMuestraMensaje);