import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';
class MyReporte extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="container">
                <div class="card">
                            
                            
                            <iframe height="600" src="https://docs.google.com/forms/d/e/1FAIpQLSfJ791cG3yPp48p2Rf16ttP2u4N8CzsJjhPUFKemPQmL0WqFA/viewform"></iframe>
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

customElements.define('my-reporte', MyReporte);