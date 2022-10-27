import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

import '../bootstrap.js';
class AventuraDialog extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    overflow-y:scroll;
                    max-height:350px;
                }
            </style>

            <div class="container">
                
                <div class="row text-center">
                    <div class="col-md-12">
                        <h3>[[objAventura.titulo]]</h3>
                    </div>
                    <div class="col-md-12">
                        <img src$="[[muestraImagen(objAventura.fotoUrl)]]" class="img img-fluid img-thumbnail">
                    </div>
                    <div class="col-md-12">
                        <p class="mt-2">[[objAventura.desc]]</p>
                    </div>
                </div>
            </div>



        `;
    }

    static get properties() {
        return {
            objAventura:{type:Object, notify:true}
        }
    }

    constructor(obj) {
        super();

        if(obj){
            this.DialogLayout_notifyResize();
            this.set("objAventura",obj);
        }
    }

    ready() {
        super.ready();
    }

    muestraImagen(str){
        if(str && str!=null && str!="ninguno"){
            return str;
        }else{
            return "../../images/logo-khalia.jpeg";
        }
    }
}

customElements.define('aventura-dialog', AventuraDialog);