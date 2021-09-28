import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../prospectos/my-seguimiento-item.js';

import '../bootstrap.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

class MyItemLista extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
                .carta{
                    background-color: white;
                    border-radius: 5px;
                    /* margin: 8px 24px; */
                    margin:8px;
                }
                .carta.iron-selected{
                    background-color: var(--paper-blue-100);
                }
                .carta:hover{
                    background-color: var(--paper-blue-50);
                }
                
                .carta-1 {
                    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
                }
                .carta-1:hover {
                    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                }
            </style>
            
            <div class="carta carta-1" >
                <div style="display: flex; padding: 8px 16px; ">
                    <div>
                        <div style="font-size: 22px; font-weight: 500; color: var(--paper-indigo-500);">{{getNombre(dato,tituloValue)}}</div>

                        <div style="font-size: 17px; font-weight: 450;">[[dato.dependencia]]</div>

                        <template is="dom-if" if="{{_muestraElemento(estilo,'appClientes')}}">
                        <div style="font-size: 17px; font-weight: 450;">[[dato.id]]</div>

                        </template>



                        <template is="dom-if" if="{{_muestraElemento(estilo,'prospectos')}}">
                            <my-seguimiento-item obj-buscar="[[dato]]"></my-seguimiento-item>
                        </template>
                        
                        
                    </div>
                    <div style="flex-grow: 1000;"></div>
                    <div style="text-align: right;">
                        <template is="dom-if" if="{{_muestraElemento(estilo,'prospectos')}}">
                            <div style="font-size: 16px; font-weight: 400; color: var(--paper-blue-grey-500);">fecha de creación</div>
                            <div style="font-weight: 400; font-size: 16px;">[[PolymerUtils_getTimeString(dato._timestamp)]]</div>
                        </template>
                        <template is="dom-if" if="{{_muestraElemento(estilo,'clientes')}}">
                            <div style="font-size: 16px; font-weight: 400; color: var(--paper-blue-grey-500);">fecha de adición</div>
                            <div style="font-weight: 400; font-size: 16px;">[[PolymerUtils_getTimeString(dato._timestamp)]]</div>
                        </template>

                        <template is="dom-if" if="{{_muestraElemento(estilo,'productos')}}">
                            <div style="font-size: 16px; font-weight: 400; color: var(--paper-blue-grey-500);">departamento</div>
                            <div style="font-weight: 400; font-size: 16px;">[[dato.departamento]]</div>
                        </template>
                        
                    </div>
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            estilo:{type:String, notify:true},
            dato:{type:Object, notify:true},
            tituloValue:{type:String, notify:true},

            bolEstatus:{type:Boolean, notify:true}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    _muestraElemento(str,base){
        if(str===base){
            return true;
        }else{
            return false;
        }
    }

    getNombre(obj,tit){
        if(obj[tit]){
            return obj[tit];
        }else{
            return "registro";
        }
    }
}

customElements.define('my-item-lista', MyItemLista);