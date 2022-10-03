import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import "@polymer/iron-pages/iron-pages.js";
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';

import '../prospectos/dialogo-nuevo-prospecto.js';

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

                div.relative {
					margin-top:15px;
					padding:5px;
					position: relative;
					border: 3px solid var(--paper-blue-300);
					border-radius:15px;
				}
				div.absolute {
					position: absolute;
					top: -15px;
					left: 20px;
					background-color:white !important;
					font-weight: 700;
					font-size: 14px;
				}

                paper-tabs{
                    text-align: center;
                    background-color: #e9ecf1;
                    border-right: 1px solid #c1c4c9;
                    cursor: pointer;
                    margin-right:20px;
                    margin-left:20px;
                }
                
                paper-tabs:first-child{
                    border-top-left-radius: 25px;
                    border-bottom-left-radius: 25px;
                }
                paper-tabs:last-child{
                    border-top-right-radius: 25px;
                    border-bottom-right-radius: 25px;
                }

                paper-tabs paper-tab.iron-selected {
                    background-color:var(--paper-blue-500);
                    color: white;
                }
                    
                  
                 
            </style>

            <div class="container">
                <div class="card">
                    <div class="card-body">
                        

                        <div class="row">
                            <div class="col-md-12">
                            <paper-tabs selected="{{selected}}" attr-for-selected="name" no-bar>
                            <paper-tab name="elige">Seleccionar cliente</paper-tab>
                            <paper-tab name="nuevo">Agregar cliente</paper-tab>
                        </paper-tabs>
                            </div>
                            <div class="col-md-8">
                                <iron-pages selected="{{selected}}" attr-for-selected="name">

                                    <div name="elige">
                                        
                                        <paper-input label="buscar" value="{{nombreBusca}}"></paper-input>
                                        
                                        <paper-listbox style="max-height:300px;overflow-y:scroll;">
                                            <template is="dom-repeat" items="[[listaClientes]]" filter="{{_buscaCliente(nombreBusca)}}">
                                                <paper-item on-click="agregaCliente">
                                                    [[item.razon]]
                                                </paper-item>
                                            </template>
                                        </paper-listbox>
                                        <div class="d-flex align-items-center">
                                            <data-simple font-size="15px" style="padding:5px;"dato="[[clienteElegido.razon]]" titulo="Nombre o Razón social"></data-simple>
                                            <data-simple font-size="15px" style="padding:5px;"dato="[[clienteElegido.alias]]" titulo="Alias"></data-simple>
                                            <data-simple font-size="15px" style="padding:5px;"dato="[[PolymerUtils_getTimeString(clienteElegido._timestamp)]]" titulo="fecha de creación"></data-simple>
                                        </div>
                                    </div>

                                    <div name="nuevo">
                                        <dialogo-nuevo-prospecto lista-usuarios="{{usuariosApp}}" id="creador-cliente" es-forzar-cliente="{{esCliente}}" on-prospecto-guardado="ejecutaNuevoApp" ></dialogo-nuevo-prospecto>
                                    </div>
                                </iron-pages>
                            </div>
                            <div class="col-md-4">
                                <div>
                                    <vaadin-combo-box id="combo-vigencia" label="Tipo de mebresía" selected-item="{{nuevaVigencia}}" allow-custom-value
                                    items="[[listaOpciones]]" item-label-path="tipo" item-id-path="cantidad">
                                        <template>
                                            <b>[[item.tipo]]</b>
                                            [[item.explicacion]]
                                        </template>
                                    </vaadin-combo-box>
                                    <data-simple font-size="15px" dato="{{datoVigencia}}" titulo="fecha de vigencia"></data-simple>
                                </div>

                                <paper-button raised style="background-color:var(--paper-green-500);color:white;" on-click="accionBotonGuardar">crear cliente</paper-button>
                                <paper-button raised style="color:black;" on-click="disparaAtras">cancelar</paper-button>
                            
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>



        `;
    }

    static get properties() {
        return {
            usuariosApp:{type:Array, notify:true, value:[]},
            esCliente:{type:Boolean, notify:true, value:true},
            selected:{type:String, notify:true, value:"elige"},
            listaClientes:{type:Array, notify:true, value:[]},
            clienteElegido:{type:Object, notify:true},

            fechaActual:{type:Object, notify:true},
            nuevaVigencia:{type:Object, notify:true},
            listaOpciones:{type:Array, notify:true, value:[
                {"tipo":"Versión de prueba","explicacion":"7 días","cantidad":7},
                {"tipo":"Básica","explicacion":"1 mes","cantidad":30},
                {"tipo":"Completa","explicacion":"1 año","cantidad":365}
            ]},

            datoVigencia:{typ:String,notify:true}

        }
    }
    
    static get observers() {
        return [
            '_muestraNuevaFecha(fechaActual,nuevaVigencia)'
        ];
    }

    constructor() {
        super();

        var fecha=firebase.firestore.Timestamp.now().toDate();

        if(fecha && fecha!=null){
            this.set("fechaActual",fecha);
        }else{
            var fechaEquipo=new Date();
            this.set("fechaActual",fechaEquipo);
        }
    }

    

    ready() {
        super.ready();
        var binder=new QueryBinder("_clientes-khalia",{
            "specialRef":firebase.firestore().collection("_clientes-khalia").where("_esCliente","==",true)
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

    agregaCliente(e){
        var elegido=e.model.item;
        this.set("clienteElegido",elegido);
    }

    _muestraNuevaFecha(fecha,dato){
        if(!fecha || fecha==null || !dato || dato==null){
            this.set("datoVigencia","-");
        }else{
            var fechaBase=new Date(fecha.getTime());
            var numDias=dato.cantidad;
            var nuevaFecha=Sugar.Date.advance(fechaBase, { days: numDias });

            this.set("datoVigencia",Sugar.Date.medium(nuevaFecha,'es'));
        }
    }

    muestraFecha(fecha,dato){
       
            var fechaBase=new Date(fecha.getTime());
            var numDias=dato.cantidad;
            var nuevaFecha=Sugar.Date.advance(fechaBase, { days: numDias });
            var noTime = new Date(nuevaFecha.getFullYear(), nuevaFecha.getMonth(), nuevaFecha.getDate());

            return firebase.firestore.Timestamp.fromDate(noTime);
        
    }

    

    getTipo(obj){
        if(obj._esCliente && obj._esCliente==true){
            return "Cliente";
        }else{
            return "Prospecto";
        }
    }


    accionBotonGuardar(){

        if(!this.nuevaVigencia || this.nuevaVigencia==null){
            return PolymerUtils.Toast.show("Selecciona un tipo de membresia");
        }

        if(this.selected=="elige"){
            this.guardaAppLocal();
        }else{
            this.shadowRoot.querySelector("#creador-cliente").guardaCliente();
        }
    }

    ejecutaNuevoApp(e){
        var nuevoCliente=e.detail.datosCliente;
        var idCli=nuevoCliente.id;
        nuevoCliente["_timestamp"]=firebase.firestore.FieldValue.serverTimestamp();
        
        nuevoCliente["tipoMembresia"]=this.nuevaVigencia;
        nuevoCliente["_idCliente"]=idCli;

        delete nuevoCliente.id;
        delete nuevoCliente._key;
        delete nuevoCliente._timestamp;
        delete nuevoCliente.agente;
        
        delete nuevoCliente.listaContactos;
        this.firebaseGuardaApp(nuevoCliente);

    }

    guardaAppLocal(){

        if(!this.clienteElegido || this.clienteElegido==null){
            return PolymerUtils.Toast.show("Selecciona un cliente para continuar");
        }

        if(!this.nuevaVigencia || this.nuevaVigencia==null){
            return PolymerUtils.Toast.show("Selecciona un un tipo de membresía");
        }

        var guardar=this.clienteElegido;

        delete guardar.listaContactos;
        delete guardar.listaSeguimiento;

        var idCliente=guardar.id;
        guardar["_idCliente"]=idCliente;

        delete guardar.id;
        delete guardar._key;
        delete guardar._timestamp;
        
        guardar["_timestamp"]=firebase.firestore.FieldValue.serverTimestamp();
        guardar["tipoMembresia"]=this.nuevaVigencia;
        this.firebaseGuardaApp(guardar);
       


    }



    firebaseGuardaApp(guardar){
        var dialog=PolymerUtils.Dialog.createAndShow({
            type: "modal",
            saveSpinner:{
                message: "Agregando cliente",
                saving: true
            },
            style:"width: 400px; height: 300px;",
            smallStyle: "width: 95% !important;"
        });
        var id=this.makeId();

        var fechaLimite=this.muestraFecha(this.fechaActual,this.nuevaVigencia);

        guardar["_fechaLimite"]=fechaLimite;

        var t=this;

        setTimeout(() => {
            firebase.firestore().collection("_clientes").doc(id).set(guardar).then(() => {
                PolymerUtils.Toast.show("Cliente agregado a la plataforma");
                dialog.close();
                t.disparaAtras();
            }).catch((error) => {
                console.error("Error writing document: ", error);
                PolymerUtils.Toast.show("Error al guardar. Intentalo más tarde");
            });
        }, 1000);
        
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

    disparaAtras(){
        this.dispatchEvent(new CustomEvent('regresa-lista', {
            detail: {
                closed:true
            }
        }));
    }

    _buscaCliente(str){
        return function(item) {
            return item.razon.toLowerCase().indexOf(str)!=-1;
        }
    }
}

customElements.define('my-nuevo-app', MyNuevoApp);