import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';

// • Reconocimientos
// - Departamento del mes
// - Líder del mes
// - Gestor del mes

class MyReconocimiento extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="container text-center">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Departamento del mes</h3>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Líder del mes</h3>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Gestor del mes</h3>
                            </div>
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

customElements.define('my-reconocimiento', MyReconocimiento);