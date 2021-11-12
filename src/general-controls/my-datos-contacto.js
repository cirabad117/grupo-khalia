import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/paper-listbox/paper-listbox.js';

import './dialogo-nuevo-conta.js';
import '../general-controls/item-contacto.js';


import '../bootstrap.js';

class MyDatosContacto extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                 
                }
                .sec:hover{
                    cursor:pointer;
                }
                /*  */
               item-contacto:hover{
                    background-color:#CFD8DC;
                }
            </style>
            
            <div style="display:flex; align-items:center;">
                <div style="flex-grow:1; display:flex;" class="sec">
                    <iron-icon icon="communication:contact-phone" style="margin:5px;"></iron-icon>
                    <h5>contactos del prospecto</h5>
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

            <paper-listbox style="overflow-y:scroll;height:230px;">
                <template id="repetidorItems" is="dom-repeat" items="[[arregloContactos]]">
                    <item-contacto  style="width:100%;" id-prospecto="[[idProspecto]]" datos-contacto="[[item]]" arreglo-contactos="[[arregloContactos]]"
                    index-contacto="[[index]]" on-quita-contacto="spliceContactos"></item-contacto>
                   
                </template>
            </paper-listbox>
            
           
                
            

        `;
    }

    static get properties() {
        return {
            infoCliente:{type:Object, notify:true},
            idProspecto:{type:String, notify:true},
            esAgregar:{type:Boolean, notify:true,value:false},

            listaTels:{type:Array, notify:true, value:[]},
            listaEmails:{type:Array, notify:true, value:[]},
            arregloContactos:{type:Array, notify:true, value:[],},

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    
    abreDialogo(){
        var id=this.idProspecto;
        var arr=this.arregloContactos;
        console.log("veamos que nos llega de contactos",arr);
         PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Agregar nuevo contacto",
			element:"dialogo-nuevo-conta",
            params:[id,arr],

			
			style:"width:70%;",
			positiveButton: {
                text: "Crear",
                action: function(dialog, element) {
                    element.agregaContacto();
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

    despachaDialogo(){
        this.dispatchEvent(new CustomEvent('despacha-dialogo', {
            detail: {
                closed:true
            }
        }));
    }
   

}

customElements.define('my-datos-contacto', MyDatosContacto);