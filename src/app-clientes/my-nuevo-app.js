import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import "@polymer/iron-pages/iron-pages.js";

import '../general-controls/data-simple.js';
import '../prospectos/dialogo-nuevo-prospecto.js';

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

            
            <paper-tabs selected="{{selected}}" attr-for-selected="name">
                <paper-tab name="elige">seleccionar cliente</paper-tab>
                <paper-tab name="nuevo">agregar nuevo cliente</paper-tab>
               
            </paper-tabs>

            
            <iron-pages selected="{{selected}}" attr-for-selected="name">
                <div name="elige">
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
                </div>
                <div name="nuevo">
                    <dialogo-nuevo-prospecto id="creador-cliente" es-forzar-cliente="{{esCliente}}" on-prospecto-guardado="ejecutaNuevoApp" ></dialogo-nuevo-prospecto>
                </div>
            </iron-pages>
            

        `;
    }

    static get properties() {
        return {
            esCliente:{type:Boolean, notify:true, value:true},
            selected:{type:String, notify:true, value:"elige", observer:"_actualiza"},
            listaClientes:{type:Array, notify:true, value:[]},
            clienteElegido:{type:Object, notify:true}

        }
    }

    constructor() {
        super();
    }

    _actualiza(str){
        this.DialogLayout_notifyResize();
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


    accionBotonGuardar(){
        if(this.selected=="elige"){
            this.guardaAppLocal();
        }else{
            this.shadowRoot.querySelector("#creador-cliente").guardaCliente();
        }
    }

    ejecutaNuevoApp(e){
        var nuevoCliente=e.detail.datosCliente;
        nuevoCliente["_fechaApp"]=firebase.firestore.FieldValue.serverTimestamp();
        this.firebaseGuardaApp(nuevoCliente);

    }





    guardaAppLocal(){

        
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
        this.firebaseGuardaApp(guardar);
       


    }



    firebaseGuardaApp(guardar){
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
        var result= '';
        var characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 16; i++ ) {
            result += characters.charAt(Math.floor(Math.random()*charactersLength));
        }
        return result;
    }
}

customElements.define('my-nuevo-app', MyNuevoApp);