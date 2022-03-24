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
                /* ::-webkit-scrollbar {
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
                } */
                
            </style>
            
            <div class="d-flex align-items-center justify-content-between" style="cursor:pointer">
                <div class="d-flex align-items-center" on-click="despachaLista">
                    <iron-icon style="margin:5px;" icon="icons:chevron-left"></iron-icon>
                    <h5 style="margin:5px;">[[muestraNombre(datosContacto)]]</h5>
                </div>
                
                <template is="dom-if" if="[[!esEditar]]" restamp>
                <div>
                    <button type="button" class="btn btn-warning btn-sm m-3" on-click="cambiaEditar">
                        <span>
                            <iron-icon icon="create"></iron-icon>
                        </span>
                        EDITAR CONTACTO
                    </button>
                    <button type="button" class="btn btn-danger btn-sm m-3" on-click="despachaBorra">
                        <span>
                            <iron-icon icon="delete"></iron-icon>
                        </span>BORRAR CONTACTO
                    </button>
                </div>
                </template>
                
            </div>


            <template is="dom-if" if="[[esEditar]]" restamp>

                <dialogo-nuevo-conta id-prospecto="[[idProspecto]]" lista-contactos="[[arregloContactos]]" posicion="[[indexContacto]]"
                datos-editar="[[datosContacto]]" nombre="[[datosContacto.nombreCliente]]" puesto="[[datosContacto.puesto]]" lista-tels="[[datosContacto.telefonos]]"
                lista-email="[[datosContacto.correos]]"></dialogo-nuevo-conta>
                <button type="button" class="btn btn-warning btn-sm m-3" on-click="cambiaEditar">
                    <span>
                        <iron-icon icon="create"></iron-icon>
                    </span>
                    Cancelar
                </button>

            </template>

            <template is="dom-if" if="[[!esEditar]]" restamp>
                <paper-listbox class="bg-light">
                    <template is="dom-repeat" items="[[datosContacto.telefonos]]" as="tels">
                        <paper-item>
                            <span style="padding:10px;">
                                <iron-icon icon="communication:call"></iron-icon>
                            </span>
                            [[tels.tipo]]: [[tels.telefono]]
                        </paper-item>
                    </template>
                    <template is="dom-repeat" items="[[datosContacto.correos]]" as="email">
                        <paper-item>
                            <span style="padding:10px;">
                                <iron-icon icon="communication:email"></iron-icon>
                            </span>
                            [[email]]
                        </paper-item>
                    </template>
                </paper-listbox>
            </template>
            
            
            


        `;
    }

    static get properties() {
        return {
            idProspecto:{type:String, notify:true},
            datosContacto:{type:Object, notify:true},
            indexContacto:{type:Number, notify:true},
            arregloContactos:{type:Array, notify:true, value:[]},

            esEditar:{type:Boolean, notify:true, value:false}

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

    despachaLista(){
        var t=this;
        this.dispatchEvent(new CustomEvent('muestra-lista', {
            detail: {
                closed:true
            }
        }));
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    cambiaEditar(){
        this.set("esEditar",!this.esEditar);
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