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
                        <div class="d-flex align-items-center">
                            <data-simple font-size="15px" style="padding:5px;"dato="[[clienteElegido.razon]]" titulo="Nombre o Razón social"></data-simple>
                            <data-simple font-size="15px" style="padding:5px;"dato="[[clienteElegido.alias]]" titulo="Alias"></data-simple>

                            <data-simple font-size="15px" style="padding:5px;"dato="[[PolymerUtils_getTimeString(clienteElegido._timestamp)]]" titulo="fecha de creación"></data-simple>
                        </div>
                    </div>
                </div>
                <div name="nuevo">
                    <dialogo-nuevo-prospecto lista-usuarios="{{usuariosApp}}" id="creador-cliente" es-forzar-cliente="{{esCliente}}" on-prospecto-guardado="ejecutaNuevoApp" ></dialogo-nuevo-prospecto>
                </div>
            </iron-pages>
            
            <div class="relative">
				<div class="absolute">tipo de membresia</div>
				<div class="d-flex align-items-center">
                    <vaadin-combo-box id="combo-vigencia" label="Periodo de uso" selected-item="{{nuevaVigencia}}" allow-custom-value
                    items="[[listaOpciones]]" item-label-path="tipo" item-id-path="cantidad">
                        <template>
                            <b>[[item.tipo]]</b>
                            [[item.explicacion]]
                        </template>
                    </vaadin-combo-box>
                    
                    <data-simple font-size="15px" value="{{muestraNuevaFecha(fechaActual,nuevaVigencia)}}" title="fecha de vigencia"></data-simple>
                </div>
            </div>
 

        `;
    }

    static get properties() {
        return {
            usuariosApp:{type:Array, notify:true, value:[]},
            esCliente:{type:Boolean, notify:true, value:true},
            selected:{type:String, notify:true, value:"elige", observer:"_actualiza"},
            listaClientes:{type:Array, notify:true, value:[]},
            clienteElegido:{type:Object, notify:true},

            fechaActual:{type:Object, notify:true},
            nuevaVigencia:{type:Object, notify:true},
            listaOpciones:{type:Array, notify:true, value:[
                {"tipo":"Versión de prueba","explicacion":"7 días","cantidad":7},
                {"tipo":"Básica","explicacion":"1 mes","cantidad":30},
                {"tipo":"Completa","explicacion":"1 año","cantidad":365}
            ]}

        }
    }

    constructor(users) {
        super();

        if(users){
            this.set("usuariosApp",users);
        }

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

    muestraNuevaFecha(fecha,dato){
        if(!fecha || fecha==null || !dato || dato==null){
            return "-";
        }else{
            var fechaBase=new Date(fecha.getTime());
            var numDias=dato.cantidad;
            var nuevaFecha=Sugar.Date.advance(fechaBase, { days: numDias });

            return Sugar.Date.medium(nuevaFecha,'es');
        }
    }

    muestraFecha(fecha,dato){
       
            var fechaBase=new Date(fecha.getTime());
            var numDias=dato.cantidad;
            var nuevaFecha=Sugar.Date.advance(fechaBase, { days: numDias });
            var noTime = new Date(nuevaFecha.getFullYear(), nuevaFecha.getMonth(), nuevaFecha.getDate());

            return firebase.firestore.Timestamp.fromDate(noTime);
        
    }

    _actualiza(str){
        this.DialogLayout_notifyResize();
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
        nuevoCliente["_timestamp"]=firebase.firestore.FieldValue.serverTimestamp();
        if(!this.nuevaVigencia || this.nuevaVigencia==null){
            return PolymerUtils.Toast.show("Selecciona un tipo de membresia");
        }

        nuevoCliente["tipoMembresia"]=this.nuevaVigencia;
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
        
        guardar["_timestamp"]=firebase.firestore.FieldValue.serverTimestamp();
        this.firebaseGuardaApp(guardar);
       


    }



    firebaseGuardaApp(guardar){
        var id=this.makeId();

        var fechaLimite=this.muestraFecha(this.fechaActual,this.nuevaVigencia);

        guardar["_fechaLimite"]=fechaLimite;

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