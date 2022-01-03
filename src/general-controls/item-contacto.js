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
                               [[indexContacto]] -  [[muestraNombre(datosContacto)]]
                            </div>
                        </paper-item-body>
                        
                    </paper-item>
                </div>
                
                <div slot="dropdown-content" class="dropdownContent" style="margin-left:230px;border:solid 1px var(--paper-blue-500);background-color:white;">
                    <paper-icon-button icon="create" on-click="activaVista"></paper-icon-button>
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

    activaVista(){
        var t=this;
        setTimeout(() => {
            t.abreDialogo();
        }, 1000);
    }

    abreDialogo(){
        var t=this;
        var id=this.idProspecto;
        var arr=PolymerUtils.cloneObject(this.arregloContactos);
        console.log("abre indexContacto",this.indexContacto);
        var pos=this.indexContacto;
        var data=this.datosContacto;

        var data={
            id:id,
            arr:arr,
            pos:pos.toString(),
            data:data
        }
        
        console.log("se asigna el indexContacto",pos);
         PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"editar contacto",
			element:"dialogo-nuevo-conta",
            params:[data],

			
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