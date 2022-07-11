import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

import '../bootstrap.js';
class MyProyectoItem extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    
                }

                .tarea:hover{
                    cursor:pointer;
                    text-decoration:underline;
                }
            </style>

            <h5>[[titulo]]</h5>

            <paper-listbox>
                <template is="dom-repeat" items="[[tareas]]" filter="{{_filtraTareasTipo(tipo)}}">
                    
                    <paper-item class="tarea" on-click="eligeTarea" style$="margin:3px; background-color:[[item.modulo.fondo]]; color:[[item.modulo.txtColor]];">
                        [[item.nombreTarea]]
                    </paper-item>
                        
                </template>
            </paper-listbox>


        `;
    }

    static get properties() {
        return {
            titulo:{type:String, notify:true},
            tipo:{type:String, notify:true},
            tareas:{type:Array, notify:true, value:[]}
        }
    }

    eligeTarea(e){
        var elegido=e.model.item;
        this.dispatchEvent(new CustomEvent('elige-tarea', {
            detail: {
                tarea:elegido
            }
        }));
    }

    _filtraTareasTipo(tipo){
        return function(item) {
                return item.estatus==tipo;
            }
        
    }

}

customElements.define('my-proyecto-item', MyProyectoItem);