import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-dropdown/demo/x-select.js';

import '../general-controls/dialogo-nuevo-conta.js';

import '../bootstrap.js';

class ItemContacto extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
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

                .dato:hover{
                    cursor:pointer;
                    text-decoration:underline;
                }
                
            </style>
            
            <x-select>
                <div slot="dropdown-trigger" class="dropdownTrigger">
                    <paper-item style="cursor:pointer;">
                        <paper-item-body>
                            <div class="dato">
                                [[muestraNombre(datosContacto)]]
                            </div>
                        </paper-item-body>
                        
                    </paper-item>
                    
                    

                    
                </div>
                
                <div slot="dropdown-content" class="dropdownContent" style="border:solid 1px var(--paper-blue-500);background-color:white;">
                    <paper-icon-button icon="create" on-click="abreDialogo"></paper-icon-button>
                    <paper-icon-button icon="delete" on-click="despachaBorra"></paper-icon-button>
                    <paper-listbox>
                        <template is="dom-repeat" items="[[datosContacto.telefonos]]" as="tels">
                            <paper-item>
                                <span style="padding:10px;">
                                    <iron-icon icon="communication:call"></iron-icon>
                                </span>[[tels.tipo]]: [[tels.telefono]]
                            </paper-item>
                        </template>
                        
                        <template is="dom-repeat" items="[[datosContacto.correos]]" as="email">
                            <paper-item >
                                <span style="padding:10px;">
                                    <iron-icon icon="communication:email"></iron-icon>
                                </span>[[email]]
                            </paper-item>
                        </template>
                    </paper-listbox>
                </div>
            </x-select>



            
            <!-- <div class="card">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <h5 class="card-title" style="padding:10px;">[[muestraNombre(datosContacto)]]</h5>
                        <div>
                            <paper-icon-button icon="create" on-click="despachaEdita"></paper-icon-button>
                            <paper-icon-button icon="delete" on-click="despachaBorra"></paper-icon-button>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <paper-listbox style="max-height:200px;overflow-y:scroll;">
                            <template is="dom-repeat" items="[[datosContacto.telefonos]]" as="tels">
                                    <paper-item ><span style="padding:10px;">
                                    <iron-icon icon="communication:call"></iron-icon>
                                    </span>[[tels.tipo]]: [[tels.telefono]]</paper-item>
                                </template>
                                <template is="dom-repeat" items="[[datosContacto.correos]]" as="email">
                                    <paper-item ><span style="padding:10px;">
                                    <iron-icon icon="communication:email"></iron-icon>
                                    </span>[[email]]</paper-item>
                                </template>
                            </paper-listbox>










                            <ul class="list-group" style="max-height:150px;overflow-y:scroll;">
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div> -->
   

            

        `;
    }

    static get properties() {
        return {
            idProspecto:{type:String, notify:true},
            datosContacto:{type:Object, notify:true},
            indexContacto:{type:Number, notify:true},
            arregloContactos:{type:Array, notify:true, value:[]}

        }
    }

    muestraNombre(obj){
        if(obj.puesto){
            return obj.nombreCliente + " - " + obj.puesto;
        }else{
            return obj.nombreCliente;
        }
    }

    despachaBorra(){
        var t=this;
        this.dispatchEvent(new CustomEvent('quita-contacto', {
            detail: {
                "indexEliminar":t.indexContacto
            }
        }));
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    abreDialogo(){
        var id=this.idProspecto;
        var arr=PolymerUtils.cloneObject(this.arregloContactos);
        var pos=this.indexContacto;
        var data=this.datosContacto;
        console.log("veamos que nos llega de contactos",arr);
         PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"editar contacto",
			element:"dialogo-nuevo-conta",
            params:[id,arr,pos,data],

			
			style:"width:70%;",
			positiveButton: {
                text: "Guardar cambios",
                action: function(dialog, element) {
                    element.editaContacto();
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
}

customElements.define('item-contacto', ItemContacto);