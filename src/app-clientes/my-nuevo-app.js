import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

import '../general-controls/data-simple.js';

import '../bootstrap.js';


class MyNuevoApp extends DialogLayoutMixin(UtilsMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
                

                paper-item:hover{
                    cursor:pointer;
                }
            </style>
            
            <div style="display:block;">
                
                <vaadin-combo-box id="combo-cliente" label="cliente" selected-item="{{clienteElegido}}" allow-custom-value
                items="[[listaClientes]]" item-label-path="razon" item-id-path="id">
                    <template>
                        <b>[[item.razon]]</b>
                        [[getTipo(item)]]
                    </template>
                </vaadin-combo-box>

                <div>
                    <data-simple font-size="20px"value="[[clienteElegido.razon]]" title="Nombre o Razón social"></data-simple>
                    <data-simple font-size="20px"value="[[PolymerUtils_getTimeString(clienteElegido._timestamp)]]" title="fecha de creación"></data-simple>
                </div>
            </div>
            
            
            
            <!-- <div class="container-fluid">
                <div class="card">
                    <div class="card-header">
                        <paper-icon-button icon="arrow-back" on-click="cambiaPag"></paper-icon-button>

                        Nuevo registro para App Clientes
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <vaadin-combo-box id="combo-cliente" label="cliente" selected-item="{{clienteElegido}}" allow-custom-value
                                items="[[listaClientes]]" item-label-path="razon" item-id-path="id">
                                    <template>
                                        <b>[[item.razon]]</b>
                                        [[getTipo(item)]]
                                    </template>
                                
                                </vaadin-combo-box>

                               

                            </div>
                            <div class="col-md-12">
                                <h4>Información del cliente</h4>
                                <data-simple font-size="20px"value="[[clienteElegido.razon]]" title="Nombre o Razón social"></data-simple>
                                
                                <data-simple font-size="20px"value="[[PolymerUtils_getTimeString(clienteElegido._timestamp)]]" title="fecha de creación"></data-simple>



                              
                               


                            </div>


                            
                        </div>
                    </div>
                    <div class="card-footer">
                        
                        <paper-button style="color:white;background-color:var(--paper-green-500);" on-click="guardaApp">
                            <span>
                                <iron-icon icon="save"></iron-icon>
                            </span>
                            agregar cliente a la aplicación
                        </paper-button>
                        
                    </div>
                </div>
            </div> -->

        `;
    }

    static get properties() {
        return {
            listaClientes:{type:Array, notify:true, value:[]},
            clienteElegido:{type:Object, notify:true}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        var binder=new QueryBinder("_clientes-khalia",{
            "specialRef":firebase.firestore().collection("_clientes-khalia")
        });
        
        binder.bindArray(this,this.listaClientes,"listaClientes");

        const comboBox = this.shadowRoot.querySelector('vaadin-combo-box');
        
        // NOTE: elements is an array of the form {'Carbon', ...}
        // comboBox.filteredItems = elements;
    
        comboBox.addEventListener('filter-changed', function(e) {
          comboBox.filteredItems = elements.filter(function(item) {
              console.log("estamos filtrando",item);
            return item.indexOf(e.detail.value) === 0;
          });
        });
    }

    getTipo(obj){
        if(obj._esCliente && obj._esCliente==true){
            return "Cliente";
        }else{
            return "Prospecto";
        }
    }


    guardaApp(){
        if(!this.clienteElegido || this.clienteElegido==null){
            return PolymerUtils.Toast.show("Selecciona un cliente para continuar");
        }

        var guardar=this.clienteElegido;

        delete guardar.listaContactos;
        delete guardar.listaSeguimiento;

        var idCliente=guardar.id;
        guardar["_idCliente"]=idCliente;

        delete guardar.id;
        delete guardar._key;
        delete guardar._timestamp;
        

        guardar["_fechaApp"]=firebase.firestore.FieldValue.serverTimestamp();

        var id=this.makeId();

        var t=this;
        firebase.firestore().collection("_clientes").doc(id).set(guardar)
        .then(() => {
            PolymerUtils.Toast.show("Cliente agregado a la plataforma");
            t.DialogLayout_closeDialog();
            // NavigationUtils.navigate("app-clientes");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            PolymerUtils.Toast.show("Error al guardar. Intentalo más tarde");
        });


    }

    cambiaPag(){
        NavigationUtils.navigate("app-clientes");

    }
    
    makeId() {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 16; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
}

customElements.define('my-nuevo-app', MyNuevoApp);