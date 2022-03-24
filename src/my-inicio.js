import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { AuthMixin } from './mixins/auth-mixin.js';

import './auth/my-inicio-sesion.js';

import './bootstrap.js';

class MyInicio extends AuthMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                .big-container{
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction:column;
                    width: 100%;
                    align-items: center;
                    justify-content: center;
                }
                .background-container{
                   
                    
                    background-size: cover;
                    background-position: center;
                }
               
                .title-container{
                    background: #E1F5FE;
                    background-size: 100% 100%;
                    border-radius: 8px 8px 0px 0px;
                }
            </style>
            
            <template is="dom-if" if="[[_loggedUser]]">
                <img class="img img-fluid mx-auto d-block" src="../images/logo-khalia10.jpeg">
            </template>

            <template is="dom-if" if="[[!_loggedUser]]">
                <div class="background-container" style="display: flex; align-items: center; justify-content: center; flex-direction: column; height: 100vh;">
                    <div style="width: 450px; max-width: 95%; height: auto; max-width: 95%; background-color: white; border-radius: 10px; border: 1px solid var(--paper-grey-100);">
                        <img class="img img-fluid mx-auto d-block" src="../images/logo-khalia10.jpeg">
                        <div class="title-container"  style="position: relative;">
                        </div>
                        <div class="big-container" style="padding: 24px 0px;">
                            <my-inicio-sesion></my-inicio-sesion>
                        </div>
                    </div>
                </div>
            </template>
            
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

customElements.define('my-inicio', MyInicio);