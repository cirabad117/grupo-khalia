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

            <h5 style="margin:5px;">[[titulo]]</h5>

            <paper-listbox>
                <template is="dom-repeat" items="{{itemsTareas}}" filter="{{_filtraTareasTipo(tipo)}}"
                sort="_ordenaItems">
                    
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
            tareas:{type:Array, notify:true, value:[]},
            itemsTareas:{type:Array, notify:true, value:[]},
        }
    }

    static get observers() {
        return [
            '_changed(tareas,tareas.*)'
        ];
    }

    _changed(arr){
        var nuevoArreglo=PolymerUtils.cloneObject(arr);
        this.set("itemsTareas",nuevoArreglo);
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

    _ordenaItems(a,b){
        var textoA=a.modulo.nombre.toLowerCase();
        var textoB=b.modulo.nombre.toLowerCase();
        if(textoA==textoB){
            return 0;
        }
        else{
            return (textoA<textoB ? -1 : 1);
        }
    }

}

customElements.define('my-proyecto-item', MyProyectoItem);