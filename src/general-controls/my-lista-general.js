import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-select/vaadin-select.js';
import '@polymer/paper-listbox/paper-listbox.js';

import './my-item-lista.js';

import '../prospectos/my-seguimiento-item.js';


import '../bootstrap.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

class MyListaGeneral extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                .carta {
				margin: 10px;
				color: #757575;
				border-radius: 5px;
				background-color: #fff;
				box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
			}

            tr:hover{
                cursor:pointer;
            }
            </style>
            
            <div class="container-fluid carta">
                <div class="row">
                    <div class="col-md-12">
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
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-hover table-sm">
                                <thead class="thead-dark">
                                    <tr>
                                        <template is="dom-repeat" items="[[listaCols]]" as="col">
                                            <th>[[col.titulo]]</th>
                                        </template>
                                        
                                    </tr>
                                </thead>
                                <tbody>

                                <template is="dom-repeat" items="{{arregloItems}}" sort="{{_funcionGeneralOrdena(modoOrdena)}}"
                                filter="{{_funcionGeneralBusqueda(busqueda,filtroEstatus)}}" as="info">
                                
                                    <tr on-click="disparaAccionItem">
                                        <template is="dom-repeat" items="[[listaCols]]" as="tit">

                                            <template is="dom-if" if="[[esSeguimiento(tit.dato)]]">
                                                <my-seguimiento-item obj-buscar="[[info.listaSeguimiento]]"></my-seguimiento-item>
                                            </template>
                                            <template is="dom-if" if="[[!esSeguimiento(tit.dato)]]">
                                                <td>
                                                    [[muestraInfo(info,tit.dato,tit.valorInterno)]]
                                                </td>
                                            </template>
                                            
                                        </template>
                                    </tr>
                                </template>


                                    
                                </tbody>
                            </table>

                        </div>

                    </div>
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
            vista:{type:String, notify:true},
            filtroEstatus:{type:String, notify:true,value:"todos"},
            arregloItems:{type:Array, notify:true, value:[]},
            arregloMostrar:{type:Array, notify:true, value:[]},
            listaFiltro:{type:Array, notify:true, value:[]},
            listaOrdena:{type:Array, notify:true, value:[]},

            listaCols:{type:Array, notify:true, value:[]},

            funcionBuscar:{type:Object, notify:true},
            funcionOrdenar:{type:Object, notify:true},
            // funcionFiltro:{type:Object, notify:true},
            colorBoton:{type:String, notify:true, value:"var(--paper-pink-500)"},

            fechaActual:{type:Object, notify:true}



        }
    }

    esSeguimiento(str){
        return str=="listaSeguimiento";
    }
    

    muestraInfo(obj,dato,valorInterno){

        if(valorInterno){
            var extra=valorInterno;
            var interno=obj[dato];
            //console.log("interno",interno);
            return interno[extra];
        }else if(dato=="_timestamp"){
            return this.PolymerUtils_getDateString(obj._timestamp);
        }else if(dato=="objCliente"){
            return this.showEstatus(obj);
            
        }else if(dato=="id"){
            var str=obj.id;
            let length = str.length;
            var restante=4-length;
            if(restante>0){
                for(var i=0;i<restante;i++){
                    str=0+str;
                }
            }
            
            return "GK-"+str;
            

        }else{
            return obj[dato];
        }
        
        
        
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
        // this.set("filtroEstatus","todos");
    }

    showEstatus(obj){
        if(obj._cancelada && obj._cancelada==true){
            return "cancelada";
        }else{
            var fechaProducto=this.PolymerUtils_getDateFromTimestamp(obj._fechaLimite);
            var fechaActual=this.fechaActual;

            var diasRestantes=Sugar.Date.daysUntil(fechaActual, fechaProducto);

            if(diasRestantes<=0){
                return "finalizada";
            }else{
                return "activa";
            }
            //return diasRestantes;


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
        
        if(!objFunct || objFunct==null || !texto && texto==null || texto.trim()==""){
            console.log("no hay funcion para filtro");
            return arreglo;
        }else{
            var funcion=objFunct.funcion;

            var nuevoArreglo=funcion(arreglo,texto);
            return nuevoArreglo;
        }
    }

    disparaAccionItem(e){
        var elegido=e.model.info;
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