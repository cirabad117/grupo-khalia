import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DiccionarioMixin } from '../mixins/diccionario-mixin.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-select/vaadin-select.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/iron-icons/iron-icons.js';

import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';

import './dialogo-nuevo-seg.js';

import '../bootstrap.js';

class MyDatosSeguimiento extends DialogLayoutMixin(DiccionarioMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                .sec:hover{
                    cursor:pointer;
                }
                ::-webkit-scrollbar {
                    width: 10px;
                }
                ::-webkit-scrollbar-track {
                    background: #f1f1f1; 
                }
                ::-webkit-scrollbar-thumb {
                    background: #888; 
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #555; 
                }

                .btn-accion{
                   
                   margin:5px;
                   border-radius:50%;
                   color:var(--paper-grey-600);
                   background-color:var(--paper-grey-300);
               }

               .btn-accion:hover{
                   background-color:var(--paper-blue-600);
                   color:white;
               }
            </style>

            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center" >
                    <iron-icon icon="timeline" style="margin:5px;"></iron-icon>
                    <h5>Historial de seguimiento</h5>
                </div>

                <paper-icon-button class="btn-accion"
                onmouseover="PolymerUtils.Tooltip.show(event,'Actualizar seguimiento')"
                icon="update" on-click="abreDialogo">
                </paper-icon-button>
                
                <!-- <button type="button" class="btn btn-success btn-sm" on-click="abreDialogo">
                    <span aria-hidden="true"><iron-icon icon="update"></iron-icon></span>
                    ACTUALIZAR SEGUIMIENTO
                </button> -->

            </div>

            <template is="dom-if" if="[[muestraError]]">
                <div class="alert alert-warning" role="alert">
                    No hay registros disponibles
                </div>
            </template>

            <paper-listbox style="max-height:200px;overflow-y:scroll;">
                <template is="dom-repeat" items="[[arregloSeguimiento]]" as="seg" sort="sort">
                    <paper-item style="border-bottom: solid 1px #CFD8DC;">
                        <paper-item-body two-line>
                            <div>
                                <span class="badge" style$="padding:5px;background-color:[[seg.estatus.color]];color:[[seg.estatus.base]]">
                                    [[seg.estatus.texto]]
                                </span>
                                [[seg.actividad]]
                            </div>
                            <div secondary>[[seg.comentario]]</div>
                        </paper-item-body>
                        [[muestraFecha(seg.fechaGuardado)]]
                    </paper-item>
                </template>
            </paper-listbox>

        `;
    }

    static get properties() {
        return {
            idProspecto:{type:String, notify:true},
            esAgregar:{type:Boolean, notify:true,value:false},
            arregloSeguimiento:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    static get observers() {
        return [
            '_revisaArreglo(arregloSeguimiento,arregloSeguimiento.*)'
        ];
    }

    _revisaArreglo(arr){
        if(arr && arr.length>0){
            this.set("muestraError",false);
        }else{
            this.set("muestraError",true);
        }
    }

    despachaDialogo(){
        this.dispatchEvent(new CustomEvent('despacha-dialogo', {
            detail: {
                closed:true
            }
        }));
    }

    getIcon(bol){
        if(bol==true){
            return "arrow-drop-down";
        }else{
            return "arrow-drop-up";
        }
    }
    cambiaBol(){
        this.set("esAgregar",!this.esAgregar);
        this.despachaDialogo();
    }

    abreDialogo(){
        var id=this.idProspecto;
        var arr=this.arregloSeguimiento;

        
         PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Actualizar seguimiento",
			element:"dialogo-nuevo-seg",
            params:[id,arr],

			
			style:"width:400px;max-width:95%;",
			positiveButton: {
                text: "agregar estatus",
                style:"background-color:var(--paper-green-500);color:white;",
                action: function(dialog, element) {
                    element.agregaEstatus();
                }
            },
            negativeButton: {
                text: "Cerrar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});

        
    }

    muestraFecha(value){
        return PolymerUtils.getTimeString(value);

    }

    
    

    sort(a, b) {
        var nameA = a.fechaGuardado; 
        var nameB = b.fechaGuardado; 
        if (nameA > nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }

   
}

customElements.define('my-datos-seguimiento', MyDatosSeguimiento);