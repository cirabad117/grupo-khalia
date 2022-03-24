import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';

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
                    background-color:var(--paper-grey-200);
                }

                paper-tab{
                    
                    border-bottom:solid 3px var(--paper-blue-600);
                }
                paper-tab.iron-selected {
                    background-color: var(--paper-blue-200);
                    border-top: solid 3px var(--paper-blue-600);
                    border-bottom: none;
                    border-right: solid 3px var(--paper-blue-600);
                    border-left: solid 3px var(--paper-blue-600);
                    border-top-left-radius:10px;
                    border-top-right-radius:10px;
  
                }
            </style>
            
            <div class="containeR">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <paper-tabs selected="{{pasoElegido}}" attr-for-selected="name">
                                    <paper-tab name="cliente">CLIENTE</paper-tab>
                                    <paper-tab name="productos">PRODUCTOS</paper-tab>
                                    <paper-tab name="finalizaCoti">VISTA PREVIA</paper-tab>
                                </paper-tabs>
                            </div>
                        </div>
                        <iron-pages selected="{{pasoElegido}}" attr-for-selected="name">
                            <div name="cliente">
                                <div class="row">
                                    <div class="col-md-12">
                                        <paper-input label="Buscar" value="{{busqueda}}"></paper-input>
                                        <paper-listbox style="max-height:250px;overflow-y:scroll;">
                                            <template is="dom-repeat" items="{{listaClientes}}" filter="{{_funcionBusca(busqueda)}}">
                                                <paper-item on-click="asignaCliente">
                                                    <paper-item-body two-line>
                                                        <div>[[item.razon]]</div>
                                                        <div secondary>[[item.alias]]</div>
                                                    </paper-item-body>
                                                </paper-item>
                                            </template>
                                        </paper-listbox>
                                    </div>
                                </div>
                            </div><!--cliente-->
                            <div name="productos">
                               

                                <div class="row">
                                    <div class="col-md-8">
                                        <paper-input label="buscar" value="{{productoBuscar}}" ></paper-input>
                                        <paper-listbox style="max-height:250px;overflow-y:scroll;">
                                            <template is="dom-repeat" items="[[listaProductos]]" filter="{{_buscaProd(productoBuscar)}}">
                                                <paper-item on-click="agregaProducto">
                                                    <paper-item-body two-line>
                                                        <div style="white-space: initial;">[[item.nombre]]</div>
                                                        <div secondary>[[item.codigo]]</div>
                                                    </paper-item-body>
                                                </paper-item>
                                            </template>
                                        </paper-listbox>
                                    </div>
                                    <div class="col-md-4">
                                        <h5 style="margin-top:30px;">productos seleccionados</h5>
                                        <paper-listbox style="max-height:200px;overflow-y:scroll;">
                                            <template is="dom-repeat" items="[[listaProds]]">
                                                <paper-item>
                                                    <paper-item-body two-line>
                                                        <div>[[item.codigo]]</div>
                                                    </paper-item-body>
                                                    <paper-icon-button icon="clear" on-click="eliminaProd" style="color:var(--paper-red-500);"></paper-icon-button>
                                                </paper-item>
                                            </template>
                                        </paper-listbox>
                                    </div>
                                </div>

                            </div>
                            <div name="finalizaCoti">
                                <div class="row">
                                    <div class="col-md-12">
                                        
                                        <paper-input label="dirigida a" value="{{nombreDirigido}}"></paper-input>
                                        <data-simple font-size="20px"dato="[[clienteElegido.razon]]" titulo="Nombre o Razón social"></data-simple>
                                        <data-simple font-size="20px"dato="[[nombreDirigido]]" titulo="Dirigida a"></data-simple>
                                        <h5>lista de trámites</h5>
                                        
                                        <paper-listbox style="max-height:250px;overflow-y:scroll;">
                                            <template is="dom-repeat" items="[[listaProds]]">
                                                <paper-item>
                                                    <paper-item-body two-line>
                                                        <div style="white-space: initial;">[[item.nombre]]</div>
                                                        <div secondary>[[item.codigo]]</div>
                                                    </paper-item-body>
                                                    <paper-icon-button icon="clear" on-click="eliminaProd" style="color:var(--paper-red-500);"></paper-icon-button>
                                                </paper-item>
                                            </template>
                                        </paper-listbox>
                                    </div>
                                </div>
                            </div>
                        </iron-pages>
                    </div>
                    
                    <template is="dom-if" if="[[esGuardar(pasoElegido)]]">
                        <div class="card-footer">
                            <paper-button style="color:white;background-color:var(--paper-green-500);" on-click="guardaCotiza">
                                <span>
                                    <iron-icon icon="save"></iron-icon>
                                </span>
                                guardar cotización
                            </paper-button>
                        </div>
                    </template>
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            pasoElegido:{type:String, notify:true,value:"cliente"},
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
            //comboBox.filteredItems = elements;
        
            comboBox.addEventListener('filter-changed', function(e) {
              comboBox.filteredItems = elements.filter(function(item) {
                  console.log("estamos filtrando",item);
                return item.indexOf(e.detail.value) === 0;
              });
            });
         
    }

    esGuardar(str){
        if(str=="finalizaCoti"){
            return true;
        }else{
            return false;
        }
    }

    esProductos(str){
        if(str=="productos"){
            return true;
        }else{
            return false;
        }
    }

    muestraProds(arr){
        if(arr && arr.length>0){
            return true;
        }else{
            return false;
        }
    }

    muestraNumProds(arr){
        return arr.length;
        // if(arr && arr.length>0){
        //     return true;
        // }else{
        //     return false;
        // }
    }

    asignaCliente(e){
        var elegido=e.model.item;
        this.set("clienteElegido",elegido);
        this.set("pasoElegido","productos");
    }

    regresaCliente(){
        // this.set("clienteElegido",null);
        this.set("pasoElegido","cliente");
    }
    cambiaCotiza(){
        this.set("pasoElegido","finalizaCoti");
    }

    getTipo(obj){
        if(obj._esCliente && obj._esCliente==true){
            return "Cliente";
        }else{
            return "Prospecto";
        }
    }

    eliminaProd(e){
        console.log("eliminaProd",e.model.index);
        var index=e.model.index;
        this.splice('listaProds', index, 1);
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

        var nuevoClie=this.clienteElegido;
        delete nuevoClie.listaContactos;
        delete nuevoClie.listaSeguimiento;

        var cotizacion={
            cliente:this.clienteElegido,
            listaProds:this.listaProds,
        };

        if(this.nombreDirigido && this.nombreDirigido!=null && this.nombreDirigido.trim()!=""){
            cotizacion["nombreDirigido"]=this.nombreDirigido;
        }


        DataHelper.insertWithAutoIncrement(this,{
            collection:"_cotizaciones-khalia",
            object:cotizacion,
            includeTimestamp:true,
            includeUser:true,
            success:function(){
                PolymerUtils.Toast.show("cotización guardada con éxito");
                NavigationUtils.navigate("cotizaciones");
            },
            error:function(error) {
                PolymerUtils.Toast.show("Error al guardar. Intentalo más tarde.");
                console.error("Error adding document: ", error);
            }
        });

    }

    cambiaEdita(){
        NavigationUtils.navigate("cotizaciones");
    }

    _funcionBusca(texto){
        return function(prospecto) {
            if((prospecto.razon && prospecto.razon.toLowerCase().indexOf(texto)!=-1) ||(prospecto.alias && prospecto.alias.toLowerCase().indexOf(texto)!=-1)){
                return prospecto;
            }else{
                var arreglo=prospecto.listaContactos;
                if(arreglo){
                    for(var i=0; i<arreglo.length;i++){
                        var item=arreglo[i];
                        if((item.nombreCliente && item.nombreCliente.toLowerCase().indexOf(texto)!=-1) || (item.puesto && item.puesto.toLowerCase().indexOf(texto)!=-1)){
                            return prospecto;
                        }
                    }
                }
            }
        }
    }













    













}

customElements.define('my-nueva-cotizacion', MyNuevaCotizacion);