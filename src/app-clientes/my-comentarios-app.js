import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import './my-muestra-mensaje.js';

import '../bootstrap.js';
import '../shared-styles.js';

class MyComentariosApp extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap shared-styles">
                :host{
                    display:block;
                }
            </style>

            <div class="container-fluid carta">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="list-unstyled">
                            <template is="dom-repeat" items="[[listaComentarios]]">
                                <li class="media">
                                    <!-- <img src="..." class="mr-3" alt="..."> -->
                                    <div class="media-body">
                                        <h5 class="mt-0 mb-1">[[item._idCliente]] - [[PolymerUtils_getDateString(item._timestamp)]]</h5>
                                        <my-muestra-mensaje mensaje="[[item.coment]]"></my-muestra-mensaje>
                                    </div>
                                    <my-botones-mensaje id="[[item.id]]"></my-botones-mensaje>
                                </li>
                                <hr>
                            </template>
                            
                        </ul>
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