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
            </style>
            
            <div style="display:flex; align-items:center;">
                <div style="flex-grow:1; display:flex;" class="sec">
                    <iron-icon icon="assignment" style="margin:5px;"></iron-icon>
                    <h5>historial de seguimiento</h5>
                </div>
                <div style="flex-grow:0;">
                    <!-- <paper-icon-button style="margin:5px;background-color:#B3E5FC;border-radius:50%;" icon="add" on-click="abreDialogo"></paper-icon-button> -->
                    <button type="button" style="margin:5px;" class="btn btn-info btn-sm" on-click="abreDialogo">
                        <span aria-hidden="true">
                            
                            <iron-icon icon="add"></iron-icon>
                            
                        </span>
                    </button>
                </div>
            </div>
            
            <paper-listbox style="max-height:280px;overflow-y:scroll;">
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
            title:"Agregar estatus",
			element:"dialogo-nuevo-seg",
            params:[id,arr],

			
			style:"width:400px;max-width:95%;",
			positiveButton: {
                text: "Crear",
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