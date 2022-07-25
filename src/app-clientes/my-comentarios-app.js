import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import './my-muestra-mensaje.js';

import '../bootstrap.js';
import '../shared-styles.js';

class MyComentariosApp extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap shared-styles">
                :host{
                    display:block;
                    margin:5px;
                }
            </style>
            
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="list-unstyled">
                                <template is="dom-repeat" items="[[listaComentarios]]">
                                    <li class="media">
                                        <div class="media-body">
                                            <h5 class="mt-0 mb-1">[[item._idCliente]] - [[PolymerUtils_getDateString(item._timestamp)]]</h5>
                                            <my-muestra-mensaje mensaje="[[item.coment]]"></my-muestra-mensaje>
                                        </div>
                                        <paper-icon-button icon="create"></paper-icon-button>
                                        <paper-icon-button icon="delete"></paper-icon-button>
                                    </li>
                                    <hr>
                                </template>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            

        `;
    }

    static get properties() {
        return {
            listaComentarios:{type:Array, notify:true, value:[]}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        var binder=new QueryBinder("_clientes",{
            "specialRef":firebase.firestore().collection("_comentarios-app").orderBy("_timestamp","desc")
        });
        
        binder.bindArray(this,this.listaComentarios,"listaComentarios");
    }
}

customElements.define('my-comentarios-app', MyComentariosApp);