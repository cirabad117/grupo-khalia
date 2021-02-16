import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class MyInicio extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>

            comenzamos

        `;
    }

    static get properties() {
        return {

        };
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }
}

customElements.define('my-inicio', MyInicio);