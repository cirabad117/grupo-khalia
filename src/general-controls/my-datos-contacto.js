import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";
import { ScreenMixin } from "../mixins/screen-mixin.js";

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-icons/social-icons.js';
import '@polymer/paper-listbox/paper-listbox.js';

import './dialogo-nuevo-conta.js';
import '../general-controls/item-contacto.js';


import '../bootstrap.js';

class MyDatosContacto extends ScreenMixin(DialogLayoutMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                 
                }
                .sec:hover{
                    cursor:pointer;
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

                .btn-secundario{
                    color:var(--paper-green-500);
                    border-radius:50%;
                }

               .btn-secundario:hover{
                   background-color:var(--paper-green-500);
                   color:white;
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

                .es-scroll{
                    max-height:200px;overflow-y:scroll;
                }

                .eliminado{
                    background-color:var(--paper-grey-200);
                    color:var(--paper-grey-700);
                    text-decoration:line-through;
                }
              
            
            </style>
            
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex">
                    <iron-icon style="margin:5px;" icon="icons:folder-shared"></iron-icon>
                    <h5  style="margin:5px;">Lista de contactos</h5>
                   
                </div>
                
                <paper-icon-button class="btn-accion"
                onmouseover="PolymerUtils.Tooltip.show(event,'Agregar contacto')"
                icon="social:person-add" on-click="abreDialogo">
                </paper-icon-button>
            </div>

            <template is="dom-if" if="[[muestraError]]">
                <div class="alert alert-warning" role="alert">
                    No hay registros disponibles
                </div>
            </template>

            
            <iron-pages selected="{{selected}}" attr-for-selected="name">
                
                <div name="lista">
                    <div class$="row [[getClassScroll(esVistaPrincipal)]]">
                        <template id="repetidorItems" is="dom-repeat" items="[[arregloContactos]]" index-as="numero">
                            <div class$="[[getClassView(esVistaPrincipal)]]">
                                <div class="card">
                                    <paper-icon-item style="cursor:pointer;" class$="[[muestraEliminado(item._deleted)]]">
                                        <iron-icon style="color:var(--paper-blue-700);" icon="icons:account-circle" slot="item-icon"></iron-icon>
                                        <paper-item-body two-line class$="[[muestraEliminado(item._deleted)]]">
                                            <div>[[item.nombreCliente]]</div>
                                            <div secondary>[[item.puesto]]</div>
                                        </paper-item-body>
                                        <template is="dom-if" if="[[!item._deleted]]">
                                        <paper-icon-button icon="create" class="btn-secundario"
                                        on-click="muestraContacto" onmouseover="PolymerUtils.Tooltip.show(event,'Modificar')"></paper-icon-button>
                                        <paper-icon-button icon="delete" class="btn-secundario"
                                        on-click="eliminaContacto" onmouseover="PolymerUtils.Tooltip.show(event,'Quitar')"></paper-icon-button>
                                        </template>
        
                                    </paper-icon-item>
                                    <paper-listbox>
                                        <template is="dom-repeat" items="[[item.telefonos]]" as="tels">
                                            <paper-item class$="[[muestraEliminado(item._deleted)]]">
                                                <span style="padding:10px;">
                                                    <iron-icon icon="communication:call"></iron-icon>
                                                </span>
                                                [[tels.tipo]]: [[tels.telefono]]
                                            </paper-item>
                                        </template>
                                        <template is="dom-repeat" items="[[item.correos]]" as="email">
                                            <paper-item class$="[[muestraEliminado(item._deleted)]]">
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
                </div><!--lista-->

                <div  name="contacto">
                    
                    <dialogo-nuevo-conta id="dialogo-editar" id-prospecto="[[idProspecto]]" lista-contactos="[[arregloContactos]]"
                    posicion="[[numeroElegido]]" datos-editar="[[contactoElegido]]" nombre="[[contactoElegido.nombreCliente]]"
                    puesto="[[contactoElegido.puesto]]" lista-tels="[[contactoElegido.telefonos]]"
                    lista-email="[[contactoElegido.correos]]" on-finaliza-accion="muestraLista"></dialogo-nuevo-conta>

                    <div class="d-flex align-items-center flex-row-reverse">
                        <button type="button" class="btn m-1 btn-success" on-click="ejecutaDialogo">
                            <span>
                                <iron-icon icon="save"></iron-icon>
                            </span>
                            Guardar cambios
                        </button>
                        <button type="button" class="btn btn-light m-1" on-click="muestraLista">
                            <span>
                                <iron-icon icon="close"></iron-icon>
                            </span>
                            Cancelar
                        </button>
                    </div>
                
                

                  
                </div><!--contacto-->
            </iron-pages>
            

        `;
    }

    static get properties() {
        return {
            esVistaPrincipal:{type:String,notify:true, value:true},
            selected:{type:String, notify:true, value:"lista"},
            infoCliente:{type:Object, notify:true},
            idProspecto:{type:String, notify:true},
            esAgregar:{type:Boolean, notify:true,value:false},
            contactoElegido:{type:Object, notify:true},
            numeroElegido:{type:Number,notify:true},
            muestraError:{type:Boolean, notify:true, value:false},
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

    /**
      * Array of strings describing multi-property observer methods and their
      * dependant properties
      */
    static get observers() {
        return [
            '_revisaArreglo(arregloContactos,arregloContactos.*)'
        ];
    }

    getClassView(bol){
        return bol == true ? "col-md-4" : "col-md-12";
    }
    getClassScroll(bol){
        return bol == false ? "es-scroll" : "";
    }

    muestraEliminado(bol){
        if(bol && bol==true){
            return "eliminado"
        }
    }

    _revisaArreglo(arr){
        if(arr && arr.length>0){
            this.set("muestraError",false);
        }else{
            this.set("muestraError",true);
        }
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
        // idElegido["_deleted"]=true;
        var contactos=PolymerUtils.cloneObject(this.arregloContactos);

        PolymerUtils.Dialog.createAndShow({

            message:"El contacto seleccionado ya no será válido en la <br>información del prospecto. ¿Desea continuar?",
		
			positiveButton: {
                text: "Eliminar contacto",
                action: function(dialog, element) {
                    var eliminar=contactos[idElegido];
                    eliminar["_deleted"]=true;

                    contactos[idElegido]=eliminar;

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
			style:"width:400px;max-width:95%;",
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