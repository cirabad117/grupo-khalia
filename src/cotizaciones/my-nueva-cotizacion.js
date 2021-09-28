import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

import '../general-controls/data-simple.js';

import '../bootstrap.js';

class MyNuevaCotizacion extends PolymerElement {
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

                paper-item:hover{
                    cursor:pointer;
                }
            </style>

            <div class="container-fluid">
                <div class="card">
                    <div class="card-header">
                        <paper-icon-button icon="arrow-back" on-click="cambiaEdita"></paper-icon-button>

                        Nueva cotización
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <vaadin-combo-box id="combo-cliente" label="cliente" selected-item="{{clienteElegido}}" allow-custom-value
                                items="[[listaClientes]]" item-label-path="razon" item-id-path="id">
                                    <template>
                                        <b>[[item.razon]]</b>
                                        [[getTipo(item)]]
                                    </template>
                                
                                </vaadin-combo-box>

                                <div> 
                                    <b>lista de productos</b>
                                    
                                    <paper-input label="buscar" value="{{productoBuscar}}" ></paper-input>
                                    
                                    <paper-listbox style="max-height:250px;overflow-y:scroll;">
                                        <template is="dom-repeat" items="[[listaProductos]]" filter="{{_buscaProd(productoBuscar)}}">
                                            <paper-item class="btn-outline-primary" on-click="agregaProducto">
                                                <paper-item-body two-line>
                                                    <div style="white-space: initial;">[[item.nombre]]</div>
                                                    <div secondary>[[item.codigo]]</div>
                                                </paper-item-body>
                                            </paper-item>
                                            
                                        </template>
                                    </paper-listbox>
                                </div>
                                


                                <!-- <vaadin-combo-box label="tramite" selected-item="{{productoElegido}}" allow-custom-value
                                items="[[listaProductos]]" item-label-path="codigo" item-id-path="id"></vaadin-combo-box> -->
                                
                                <paper-input label="dirigida a" value="{{nombreDirigido}}"></paper-input>

                            </div>
                            <div class="col-md-8">
                                <h4>Nueva cotización</h4>
                                <data-simple font-size="20px"value="[[clienteElegido.razon]]" title="Nombre o Razón social"></data-simple>
                                
                                <data-simple font-size="20px"value="[[nombreDirigido]]" title="Dirigida a"></data-simple>

                                <h5>lista de trámites</h5>
                                
                                <paper-listbox style="max-height:250px;overflow-y:scroll;">
                                    <template is="dom-repeat" items="[[listaProds]]">
                                        <paper-item>
                                            <paper-item-body two-line>
                                                <div style="white-space: initial;">[[item.nombre]]</div>
                                                <div secondary>[[item.codigo]]</div>
                                            </paper-item-body>
                                            <paper-icon-button icon="clear" style="color:var(--paper-red-500);"></paper-icon-button>
                                        </paper-item>
                                    </template>
                                </paper-listbox>
                               


                            </div>


                            
                        </div>
                    </div>
                    <div class="card-footer">
                        
                        <paper-button style="color:white;background-color:var(--paper-green-500);" on-click="guardaCotiza">
                            <span>
                                <iron-icon icon="save"></iron-icon>
                            </span>
                            guardar cotización
                        </paper-button>
                        
                    </div>
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            listaClientes:{type:Array, notify:true, value:[]},
            listaProductos:{type:Array, notify:true, value:[]},
            listaProds:{type:Array, notify:true, value:[]}

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

        var binderProducto=new QueryBinder("_productos-khalia");
        
        binderProducto.bindArray(this,this.listaProductos,"listaProductos");
        
        const comboBox = this.shadowRoot.querySelector('vaadin-combo-box');
        
            // NOTE: elements is an array of the form {'Carbon', ...}
            comboBox.filteredItems = elements;
        
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

    _buscaProd(str){
        if(str){
            str=str.toLowerCase();
        }

        return function(item) {
            if((item.nombre&&item.nombre.replace(/\s|_|\(|\)/g, "-").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().indexOf(str)!=-1) || 
            (item.codigo &&item.codigo.toLowerCase().indexOf(str)!=-1)){
                return item;
            }
        }
    }

    agregaProducto(e){
        console.log("se hace click producto",e);
        var elegido=e.model.item;
        this.push("listaProds",elegido);

        console.log("listaProds",this.listaProds);
    }

    guardaCotiza(){

        if(!this.clienteElegido || this.clienteElegido==null){
            return PolymerUtils.Toast.show("selecciona un cliente para continuar")
        }

        if(!this.listaProds || !this.listaProds.length || this.listaProds.lenght<=0){
            return PolymerUtils.Toast.show("no hay trámites seleccionados");

        }

        var cotizacion={
            cliente:this.clienteElegido,
            listaProds:this.listaProds,
           _timestamp:firebase.firestore.FieldValue.serverTimestamp()
        };

        if(this.nombreDirigido && this.nombreDirigido!=null && this.nombreDirigido.trim()!=""){
            cotizacion["nombreDirigido"]=this.nombreDirigido;
        }

        firebase.firestore().collection("_cotizaciones-khalia").add(cotizacion)
        .then((docRef) => {
            PolymerUtils.Toast.show("cotización guardada con éxito");
            NavigationUtils.navigate("cotizaciones");
            // console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            PolymerUtils.Toast.show("Error al guardar. Intentalo más tarde.");

            console.error("Error adding document: ", error);
        });
    }

    cambiaEdita(){
        NavigationUtils.navigate("cotizaciones");
    }
}

customElements.define('my-nueva-cotizacion', MyNuevaCotizacion);