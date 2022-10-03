import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';
class MySeguridad extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card card-body">
                            <h3 class="card-title">Normas</h3>
                        </div>

                    </div>
                    <div class="col-md-4">
                    <div class="card card-body">
                            <h3 class="card-title">Avisos de seguridad</h3>
                        </div>
                    </div>
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

customElements.define('my-seguridad', MySeguridad);