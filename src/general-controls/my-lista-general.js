import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-fab/paper-fab.js';
import '@vaadin/vaadin-select/vaadin-select.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-icon/iron-icon.js';

import './my-item-lista.js';

import '../prospectos/my-seguimiento-item.js';
import './my-botones-lista.js';


import '../bootstrap.js';

class MyListaGeneral extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    margin:5px;
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
            
            <!-- <template is="dom-if" if="[[esOtros(tituloPagina)]]">
                <nav class="navbar navbar-light" style$="[[estiloNavega]]">
                    <a class="navbar-brand">
                        
                        <iron-icon icon="[[icono]]"></iron-icon>
                        
                        [[tituloPagina]]
                    </a>
                </nav>
            </template> -->
            
            <div class="card">
                <div class="card-body" style="padding: 5px !important;">
                    <div class="d-flex flex-wrap bd-highlight mb-3 align-items-center">
                    <vaadin-select id="selectCotiza" class="p-1" label="filtrar registros" value="{{filtroEstatus}}" error-message="selecciona una opcion">
                    <template>
                        <vaadin-list-box>
                            <vaadin-item value="todos">todos los registros</vaadin-item>
                            <template is="dom-repeat" items="[[listaFiltro]]" as="filtro">
                                <vaadin-item style$="[[muestraSeparador(filtro)]]" value="[[filtro.texto]]">[[filtro.texto]]</vaadin-item>
                            </template>
                        </vaadin-list-box>
                    </template>
                </vaadin-select>
                <vaadin-select id="selectCotiza" class="p-1" label="Ordenar registros" value="{{modoOrdena}}" error-message="selecciona una opcion">
                    <template>
                        <vaadin-list-box>
                            <template is="dom-repeat" items="[[listaOrdena]]" as="ordena">
                                <vaadin-item value="[[ordena.opcion]]">[[ordena.texto]]</vaadin-item>
                            </template>
                        </vaadin-list-box>
                    </template>
                </vaadin-select>
                <paper-input label="Buscar" class="p-3" id="inputWithButton" value="{{busqueda}}">
                    <paper-icon-button onmouseover="PolymerUtils.Tooltip.show(event,'limpiar')" slot="suffix" on-click="limpia" icon="clear"S>
                    </paper-icon-button>
                </paper-input>

                <template is="dom-if" if="{{!esPrincipal}}">
                    <button type="button" class="btn btn-primary btn-sm p-1"
                    on-click="disparaAccionPrincipal">
                        <span>
                            <iron-icon icon="create"></iron-icon>
                        </span>
                        Agregar cotización
                    </button>
                    
                </template>
                    </div>
                </div>
                
            </div>
            
            <div class="card table-responsive" style="max-height:450px;overflow-y:scroll;">
                <table class="table table-hover table-sm" >
                    <thead class="thead-dark" style="position: sticky;top: 0">
                        <tr>
                            <template is="dom-repeat" items="[[listaCols]]" as="col">
                                <th>[[col.titulo]]</th>
                            </template>
                        </tr>
                    </thead>
                    <tbody>
                        <template is="dom-repeat" items="{{arregloItems}}" sort="{{_funcionGeneralOrdena(modoOrdena)}}"
                        filter="{{_funcionGeneralBusqueda(busqueda,filtroEstatus)}}" as="info">
                            <tr style$="{{aplicaEstilo(info)}}">
                                <template is="dom-repeat" items="[[listaCols]]" as="tit">
                                    <td>
                                        <template is="dom-if" if="[[esSeguimiento(tit.dato)]]">
                                            <my-seguimiento-item obj-buscar="[[info.listaSeguimiento]]"></my-seguimiento-item>
                                        </template>
                                        <template is="dom-if" if="[[esValorBase(tit.dato)]]">
                                            [[muestraInfo(info,tit.dato,tit.valorInterno)]]
                                        </template>

                                        <template is="dom-if" if="[[esEstatusCoti(tit.dato)]]">
                                            <div style="font-size: 16px; font-weight: 500;">
                                                <span class$="badge [[getEstiloEstatus(info)]]" >
                                                    [[getEstatus(info)]]
                                                </span>
                                            </div>
                                        </template>


                                        <template is="dom-if" if="[[tit.listaAcciones]]">
                                            <div class="d-flex">
                                                <template is="dom-repeat" items="[[tit.listaAcciones]]" as="ac">

                                                <my-botones-lista obj="[[info]]" icono="[[ac.icono]]" accion="[[ac.accion]]"
                                                obj="[[info]]" texto="[[ac.texto]]" on-lanza-accion="activaAccionBoton">
                                                </my-botones-lista>

                                            </template>
                                            </div>
                                        </template>
                                    </td>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            
            <template is="dom-if" if="{{esPrincipal}}">
                <div style="position: fixed; bottom: 24px; right: 24px;">
                    <div style="position: relative; cursor:pointer;" on-clicK="disparaAccionPrincipal">
                        <paper-fab icon="add" style$="color:white;background-color:[[colorBoton]];"></paper-fab>
                    </div>
                </div>
            </template>

        `;
    }

    static get properties() {
        return {
            esPrincipal:{type:Boolean, notify:true,value:true},
            tituloPagina:{type:String, notify:true,},
            vista:{type:String, notify:true},
            icono:{type:String, notify:true},
            estiloNavega:{type:String, notify:true},
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

            fechaActual:{type:Object, notify:true},

            acciones:{type:Array, notify:true, value:[]}



        }
    }

    limpia(){
        this.set("busqueda","");
    }

 
    esSeguimiento(str){
        return str=="listaSeguimiento";
    }
    esValorBase(str){
        return str!="listaSeguimiento" && str!="estatus";
    }

    esEstatusCoti(str){
        return str=="estatus";
    }

    esOtros(str){
        return str!="App Clientes";
    }
    

    muestraInfo(obj,dato,valorInterno){
        if(obj!=null && dato!=null){
        if(valorInterno){
            
            var datoInterno=obj[dato];
            if(datoInterno && datoInterno!=null){
                var encontrado=datoInterno[valorInterno];
                console.log("encontrado",encontrado);
                if(!encontrado || encontrado==null){
                    return "-";
                }else{
                    return encontrado;
                }
            }else{
                return "-"
            }
            
            
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
            if(!obj.listaAcciones){
                return obj[dato];
            }
            
        }

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

    aplicaEstilo(obj){
        if(obj.estatus && obj.estatus.nombreEstatus=="declinada"){
            return "text-decoration:line-through;"
        }
    }

    getEstiloEstatus(obj){
        var cl="badge-secondary";
        if(obj && obj.estatus && obj.estatus.nombreEstatus){
            if(obj.estatus.nombreEstatus=="aceptada"){
                cl="badge-primary";
            }else{
                cl="badge-danger";

            }
            
        }
        
       return cl;

    }

    getEstatus(obj){
        var est="pendiente";
        var fe="";
        if(obj && obj.estatus && obj.estatus.nombreEstatus && obj.estatus.fecha){
            console.log("getEstatus",obj);
            est=obj.estatus.nombreEstatus;
            fe=this.PolymerUtils_getDateString(obj.estatus.fecha);
            
        }
        
       return est+" - "+ fe
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

    activaAccionBoton(e){
        var info=e.detail;

        this.dispatchEvent(new CustomEvent('ejecuta-item', {
            detail: {
                objeto:info
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