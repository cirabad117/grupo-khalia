import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-icons/iron-icons.js';
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
              
            
            </style>
            
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex text-primary">
                    <iron-icon style="margin:5px;" icon="communication:contact-phone"></iron-icon>
                    <h5  style="margin:5px;">Lista de contactos</h5>
                </div>
                
                <button type="button" style="margin:5px;" class="btn btn-primary btn-sm" on-click="abreDialogo">
                    <span aria-hidden="true">
                        <iron-icon icon="add"></iron-icon>
                    </span>
                    ARGREGAR CONTACTO
                </button>
            </div>

           

            
            
            <iron-pages selected="{{selected}}" attr-for-selected="name">
                <div name="lista">

                    <div class="row row-cols-1 row-cols-md-3">
                        <template id="repetidorItems" is="dom-repeat" items="[[arregloContactos]]" index-as="numero">
                            <div class="col mb-4">
                                <div class="card bg-light" >
                                <!-- on-click="muestraContacto" -->
                                    <paper-icon-item style="cursor:pointer;">
                                        <iron-icon icon="icons:account-circle" slot="item-icon"></iron-icon>
                                        <paper-item-body two-line>
                                            <div>[[item.nombreCliente]]</div>
                                            <div secondary>[[item.puesto]]</div>
                                        </paper-item-body>
                                        <paper-icon-button icon="create" class="text-warning" on-click="muestraContacto"></paper-icon-button>
                                        <paper-icon-button icon="delete" class="text-danger" on-click="eliminaContacto"></paper-icon-button>
                                    </paper-icon-item>
                                    <paper-listbox class="bg-light">
                                        <template is="dom-repeat" items="[[item.telefonos]]" as="tels">
                                            <paper-item>
                                                <span style="padding:10px;">
                                                    <iron-icon icon="communication:call"></iron-icon>
                                                </span>
                                                [[tels.tipo]]: [[tels.telefono]]
                                            </paper-item>
                                        </template>
                                        <template is="dom-repeat" items="[[item.correos]]" as="email">
                                            <paper-item>
                                                <span style="padding:10px;">
                                                    <iron-icon icon="communication:email"></iron-icon>
                                                </span>
                                                [[email]]
                                            </paper-item>
                                        </template>
                                    </paper-listbox>
                                </div>
                            </div>
                            
                        </template>
                    </div>
                   
                    <!-- <paper-listbox class="bg-light" style="overflow-y:scroll;height:280px;">
                        <template id="repetidorItems" is="dom-repeat" items="[[arregloContactos]]" index-as="numero">
                            <paper-icon-item style="cursor:pointer;" on-click="muestraContacto">
                                <iron-icon icon="communication:phone" slot="item-icon"></iron-icon>
                                <paper-item-body two-line>
                                    <div>[[item.nombreCliente]]</div>
                                    <div secondary>[[item.puesto]]</div>
                                </paper-item-body>
                            </paper-icon-item>
                        </template>

                    </paper-listbox> -->
                </div><!--lista-->
                <div  name="contacto">

                <dialogo-nuevo-conta id="dialogo-editar" id-prospecto="[[idProspecto]]" lista-contactos="[[arregloContactos]]"
                posicion="[[numeroElegido]]" datos-editar="[[contactoElegido]]" nombre="[[contactoElegido.nombreCliente]]"
                puesto="[[contactoElegido.puesto]]" lista-tels="[[contactoElegido.telefonos]]"
                lista-email="[[contactoElegido.correos]]" on-finaliza-accion="muestraLista"></dialogo-nuevo-conta>
                
                <button type="button" class="btn btn-light btn-sm m-3" on-click="muestraLista">
                    <span>
                        <iron-icon icon="close"></iron-icon>
                    </span>
                    Cancelar
                </button>
                <button type="button" class="btn btn-sm m-3 btn-success" on-click="ejecutaDialogo">
                    <span>
                        <iron-icon icon="save"></iron-icon>
                    </span>
                    Guardar cambios
                </button>

                    
                    <!-- <item-contacto class="bg-light mt-1 ml-5 mr-5" id-prospecto="[[idProspecto]]" datos-contacto="[[contactoElegido]]" arreglo-contactos="[[arregloContactos]]"
                    index-contacto="{{numeroElegido}}" on-quita-contacto="spliceContactos" on-muestra-lista="muestraLista"></item-contacto> -->


                </div><!--contacto-->
            </iron-pages>

           
            

            <!-- <div class="card">
                <div class="card-body">
                <div style="display:flex; align-items:center;">
                <div style="flex-grow:1; display:flex;" class="sec">
                    <iron-icon icon="communication:contact-phone" style="margin:5px;"></iron-icon>
                    <h5>contactos del prospecto</h5>
                </div>
                <div style="flex-grow:0;">
                    <button type="button" style="margin:5px;" class="btn btn-info btn-sm" on-click="abreDialogo">
                        <span aria-hidden="true">
                            
                            <iron-icon icon="add"></iron-icon>
                            
                        </span>
                    </button>
                </div>
            </div>

            <paper-listbox style="overflow-y:scroll;height:280px;">
                <template id="repetidorItems" is="dom-repeat" items="[[arregloContactos]]" index-as="numero">
                    <item-contacto style="width:100%; border-bottom: solid 1px #CFD8DC;" id-prospecto="[[idProspecto]]" datos-contacto="[[item]]" arreglo-contactos="[[arregloContactos]]"
                    index-contacto="{{numero}}" on-quita-contacto="spliceContactos"></item-contacto>
                   
                </template>
            </paper-listbox>
                </div>
            </div> -->







            
            
            
           
                
            

        `;
    }

    static get properties() {
        return {
            selected:{type:String, notify:true, value:"lista"},
            infoCliente:{type:Object, notify:true},
            idProspecto:{type:String, notify:true},
            esAgregar:{type:Boolean, notify:true,value:false},
            contactoElegido:{type:Object, notify:true},
            numeroElegido:{type:Number,notify:true},

            listaTels:{type:Array, notify:true, value:[]},
            listaEmails:{type:Array, notify:true, value:[]},
            arregloContactos:{type:Array, notify:true, value:[]},

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    muestraContacto(e){
        var elegido=e.model.item;
        console.log("elegido",e.model.itemsIndex);
        this.set("contactoElegido",elegido);
        this.set("numeroElegido",e.model.itemsIndex);
        this.set("selected","contacto");
    }

    eliminaContacto(e){
        var idPro=this.idProspecto;
        var idElegido=e.model.itemsIndex;
        var contactos=PolymerUtils.cloneObject(this.arregloContactos);

        PolymerUtils.Dialog.createAndShow({

            message:"el contacto seleccionado sera retirado de la información del prospecto. ¿Desea continuar?",
		
			positiveButton: {
                text: "Eliminar contacto",
                action: function(dialog, element) {

                    contactos.splice(idElegido,1);

                    var washingtonRef = firebase.firestore().collection("_clientes-khalia").doc(idPro);
                    return washingtonRef.update({
                       listaContactos:contactos
                    }).then(() => {
                        PolymerUtils.Toast.show("Lista actualizada");
                        dialog.close()
                    }).catch((error) => {
                        PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
                        console.error("Error updating document: ", error);
                    });
                    
                }
            },
            negativeButton: {
                text: "Cancelar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});


    }
    muestraLista(){
        this.set("selected","lista");
    }

    ejecutaDialogo(){
        this.shadowRoot.querySelector("#dialogo-editar").editaContacto();
        
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