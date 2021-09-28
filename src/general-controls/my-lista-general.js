import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-select/vaadin-select.js';

import './my-item-lista.js';

import '../bootstrap.js';

class MyListaGeneral extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row bd-highlight mb-3 align-items-center">
                                    <vaadin-select id="selectCotiza" class="m-3" label="filtrar registros" value="{{filtroEstatus}}" error-message="selecciona una opcion">
                                        <template>
                                            <vaadin-list-box>
                                                <vaadin-item value="todos">todos los registros</vaadin-item>
                                                <template is="dom-repeat" items="[[listaFiltro]]" as="filtro">
                                                    <vaadin-item style$="[[muestraSeparador(filtro)]]" value="[[filtro.texto]]">[[filtro.texto]]</vaadin-item>
                                                </template>
                                            </vaadin-list-box>
                                        </template>
                                    </vaadin-select>
                                    
                                    <vaadin-select id="selectCotiza" class="m-3" label="Ordenar registros" value="{{modoOrdena}}" error-message="selecciona una opcion">
                                        <template>
                                            <vaadin-list-box>
                                                <template is="dom-repeat" items="[[listaOrdena]]" as="ordena">
                                                    <vaadin-item value="[[ordena.opcion]]">[[ordena.texto]]</vaadin-item>
                                                </template>
                                            </vaadin-list-box>
                                        </template>
                                    </vaadin-select>
                                    
                                    <paper-input label="Buscar" class="m-3" id="inputWithButton" value="{{busqueda}}">
                                        <paper-icon-button slot="suffix" on-click="limpia" icon="clear" alt="clear" title="clear">
                                        </paper-icon-button>
                                    </paper-input>

                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class$="btn [[activoLista(modoVista)]]" on-click="esVistaLista">
                                            <span>
                                                <iron-icon icon="view-list"></iron-icon>
                                            </span>
                                        </button>
                                        <button type="button" class$="btn [[activoCuadro(modoVista)]]" on-click="esVistaCuadro">
                                            <span>
                                                <iron-icon icon="view-module"></iron-icon>
                                            </span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
                <div class="row">
                    <template is="dom-repeat" items="{{arregloItems}}" sort="{{_funcionGeneralOrdena(modoOrdena)}}" filter="{{_funcionGeneralBusqueda(busqueda,filtroEstatus)}}">
                        <my-item-lista class$="[[getEstiloLista(modoVista)]]" estilo="[[vista]]" dato="[[item]]" titulo-value="[[titulo]]" on-click="disparaAccionItem"></my-item-lista>
                    </template>
                </div>

                
            </div>
            
            <div style="position: fixed; bottom: 24px; right: 24px;">
				<div style="position: relative; cursor:pointer;" on-clicK="disparaAccionPrincipal">
					<paper-fab icon="add" style$="color:white;background-color:[[colorBoton]];"></paper-fab>
				</div>
			</div>

        `;
    }

    static get properties() {
        return {
            modoVista:{type:String, notify:true, value:"lista"},
            vista:{type:String, notify:true},
            filtroEstatus:{type:String, notify:true,value:"todos"},
            arregloItems:{type:Array, notify:true, value:[]},
            arregloMostrar:{type:Array, notify:true, value:[]},
            titulo:{type:String, notify:true,},
            listaFiltro:{type:Array, notify:true, value:[]},
            listaOrdena:{type:Array, notify:true, value:[]},

            funcionBuscar:{type:Object, notify:true},
            funcionOrdenar:{type:Object, notify:true},
            // funcionFiltro:{type:Object, notify:true},
            colorBoton:{type:String, notify:true, value:"var(--paper-pink-500)"}



        }
    }
    
    // static get observers() {
    //     return [
    //         '_activaFiltro(funcionFiltro,filtroEstatus,arregloItems,arregloItems.*)'
    //     ];
    // }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        // this.set("filtroEstatus","todos");
    }

    getEstiloLista(str){
        if(str=="lista"){
            return "col-md-12";
        }else{
            return "col-md-4";
        }
    }

    esVistaLista(){
        this.set("modoVista","lista");

    }
    esVistaCuadro(){
        this.set("modoVista","cuadro");

    }

    activoLista(str){
        if(str=="lista"){
            return "btn-primary";
        }else{
            return "btn-secondary";
        }
    }
    activoCuadro(str){
        if(str=="cuadro"){
            return "btn-primary";
        }else{
            return "btn-secondary";
        }
    }

    muestraSeparador(item){
        if(item.esSeparador && item.esSeparador==true){
            return "border-bottom:solid 1px var(--paper-blue-400);";
        }else{
            return "";
        }
    }

    _activaFiltro(objFunct,texto,arreglo){
        // console.log("se dispara _activaFiltro",objFunct,texto,arreglo);
        if(!objFunct || objFunct==null || !texto && texto==null || texto.trim()==""){
            console.log("no hay funcion para filtro");
            return arreglo;



            
            //this.set("arregloMostrar",nuevoArreglo);
        }else{
            var funcion=objFunct.funcion;

            var nuevoArreglo=funcion(arreglo,texto);
            return nuevoArreglo;
            //this.set("arregloMostrar",arreglo);
        }
    }

    disparaAccionItem(e){
        var elegido=e.model.item;
        this.dispatchEvent(new CustomEvent('ejecuta-item', {
            detail: {
                valor:elegido
            }
        }));
    }

    disparaAccionPrincipal(){
        this.dispatchEvent(new CustomEvent('ejecuta-accion', {
            detail: {
                closed:true
            }
        }));
    }

    _funcionGeneralBusqueda(texto,filtro){

        if(this.funcionBuscar && this.funcionBuscar!=null){
            var funcion=this.funcionBuscar.funcion;
            return function(item) {
                return funcion(item,texto,filtro);
            }

            
        }

    }

    _funcionGeneralOrdena(valor){
        if(this.funcionOrdenar && this.funcionOrdenar!=null){
            var funcion=this.funcionOrdenar.funcion;
            return function(a,b){
                return funcion(a,b,valor);

            }
        }
    }
}

customElements.define('my-lista-general', MyListaGeneral);