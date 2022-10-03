// • Vida Khaliana:
// - Cumpleaños
// - Avisos de eventos /fiestas
// - Aniversarios
// - Aventuras

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';
class VidaKhaliana extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-header">
                                Cumpleaños
                            </div>
                            <div class="card-body">

                            </div>

                        </div>
                        <div class="card">
                            <div class="card-header">
                                Aniversarios
                            </div>
                            <div class="card-body">
                                
                            </div>

                        </div>
                        
                        
                    </div>
                    <div class="col-sm-6 bg-success">aventuras</div>
                    <div class="col-sm-3">
                    <div class="card">
                            <div class="card-header">
                                Proximos eventos
                            </div>
                            <div class="card-body">

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

customElements.define('vida-khaliana', VidaKhaliana);