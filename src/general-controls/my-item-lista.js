import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';

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
                /* .carta{
                    background-color: white;
                    border-radius: 5px;
                    
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
                } */
            </style>

            
            <paper-item style="border:solid 1px #607D8B; border-radius:10px;">
                <paper-item-body>
                    <div class="row align-items-center">
                    <template is="dom-if" if="{{_muestraElemento(estilo,'appClientes')}}">
                            <div  class="col-auto">[[dato.id]]</div>
                        </template>
                        <div class="col-auto">{{getNombre(dato,tituloValue)}}</div>
                        <div  class="col-auto">[[dato.dependencia]]</div>
                        <template is="dom-if" if="{{_muestraElemento(estilo,'prospectos')}}">
                            <my-seguimiento-item  class="col-auto" obj-buscar="[[dato]]"></my-seguimiento-item>
                        </template>
                        <template is="dom-if" if="{{_muestraElemento(estilo,'productos')}}">
                            <div class="col-auto">
                                <div style="font-size: 16px; font-weight: 400; color: var(--paper-blue-grey-500);">departamento</div>
                                <div style="font-weight: 400; font-size: 16px;">[[dato.departamento]]</div>
                            </div>
                        </template>
                        
                    </div>
                </paper-item-body>
                
                <paper-icon-button style="color:var(--paper-blue-500);" icon="search" on-click="clickEdita"></paper-icon-button>
                <paper-icon-button style="color:var(--paper-red-500);" icon="delete"></paper-icon-button>

                
            </paper-item>
            

        `;
    }

    static get properties() {
        return {
            estilo:{type:String, notify:true},
            dato:{type:Object, notify:true},
            tituloValue:{type:String, notify:true},

            bolEstatus:{type:Boolean, notify:true},


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

    clickEdita(){
        this.dispatchEvent(new CustomEvent('activa-item', {
            detail: {
                closed:true
            }
        }));
    }
}

customElements.define('my-item-lista', MyItemLista);