import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-textarea.js';
import '../bootstrap.js';
class MyBuzon extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            <div class="container">
                <div class="card">
                            
                            
                            <iframe height="600" src="https://docs.google.com/forms/d/e/1FAIpQLScHu_-S2GGtwG8vZKaGVlo8UgOnMXY4AnDbI2gpg7B2WQgzpg/viewform"></iframe>
                        </div>

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

customElements.define('my-buzon', MyBuzon);