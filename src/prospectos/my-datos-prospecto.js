import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';
import { NavigationMixin } from '../mixins/navigation-mixin.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

import '../general-controls/my-datos-contacto.js';
import '../general-controls/my-datos-seguimiento.js';
import '../general-controls/data-simple.js';
import '../controles-extra/selector-usuarios.js';

import './my-seguimiento-item.js';

import '../bootstrap.js';

class MyDatosProspecto extends UtilsMixin(NavigationMixin(DialogLayoutMixin(PolymerElement))) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    margin:5px;
                }

                .titulo:hover{
                    cursor:pointer;
                }
            </style>
            
            <nav class="navbar navbar-light bg-light titulo">
                <span class="navbar-brand" on-click="navegaLista">
                    <iron-icon icon="arrow-back"></iron-icon>
                    {{razon}}
                    
                </span>
                <my-seguimiento-item obj-buscar="[[listaSeguimiento]]"></my-seguimiento-item>

                <div class="form-inline my-2 my-lg-0">
                    
                    <paper-tabs selected="{{selected}}" attr-for-selected="name">
                        <paper-tab name="info">Información</paper-tab>
                        <paper-tab name="contacto">Contactos</paper-tab>
                        <paper-tab name="seg">Seguimiento</paper-tab>
                    </paper-tabs>
                    
                </div>
            </nav>

            <div class="card">
                <div class="card-body">
                    <iron-pages selected="[[selected]]" attr-for-selected="name">
                        <div name="info">
                            <template is="dom-if" if="[[!esEditar]]" restamp>
                                <form class="d-flex flex-wrap">
                                    <data-simple dato="{{razon}}" titulo="Nombre o razón social" font-size="20px"></data-simple>
                                    <data-simple dato="{{alias}}" titulo="alias" font-size="20px"></data-simple>
                                    <data-simple dato="{{nombreAgente}}" titulo="Agente" font-size="20px"></data-simple>
                                    <data-simple dato="{{franquicia}}" titulo="Franquicia" font-size="20px"></data-simple>
                                    <data-simple dato="{{estado.nombre}}" titulo="Estado" font-size="20px"></data-simple>
                                </form>

                                <button type="button" style="margin:5px;" class="btn btn-warning btn-sm" on-click="cambiaEdita">
                                <span aria-hidden="true">
                                    <iron-icon icon="create"></iron-icon>
                                </span>
                                EDITAR PROSPECTO
                                </button>
                            </template>

                            <template is="dom-if" if="[[esEditar]]" restamp>
                                <div class="d-flex flex-wrap align-items-center mb-3">
                                    <paper-input class="m-3" id="txtAlias" label="Razón social"
                                    value="{{razon}}" error-message="valor inválido"></paper-input>
                                
                                    <paper-input class="m-3" id="txtAlias" label="Alias"
                                    value="{{alias}}" error-message="valor inválido"></paper-input>

                                    <paper-input class="m-3" id="txtAlias" label="Franquicia"
                                    value="{{franquicia}}" error-message="valor inválido"></paper-input>
                                
                                    <selector-usuarios class="m-3" etiqueta="Agente" usuario-elegido="{{agente}}"></selector-usuarios>
                                
                                    <vaadin-combo-box class="m-3" id="comboEstado" label="Estado" selected-item="{{estado}}" items="[[_estados]]"
                                    item-value-path="codigo" item-label-path="nombre" error-message="seleccione una opción"></vaadin-combo-box>
                                        
                                </div>
                                
                                <button type="button" class="btn btn-sm btn-light" on-click="cambiaEdita">
                                    <span><iron-icon icon="clear"></iron-icon></span>
                                    Cancelar
                                </button>
                                <button type="button" class="btn btn-sm btn-success" on-click="actualizaDatos">
                                    <span><iron-icon icon="save"></iron-icon></span>Guardar cambios
                                </button>
                            </template>
                            
                            <button type="button" style="float:right;" class="btn btn-info btn-sm" on-click="cambiaCliente">
                                <span aria-hidden="true">
                                    <iron-icon icon="supervisor-account"></iron-icon>
                                </span>
                                AGREGAR A CLIENTES
                            </button>
                        </div><!--info-->
                        
                        <div name="contacto">
                            <my-datos-contacto class="flex-fill m-2" on-despacha-dialogo="updateDialogo"
                            id-prospecto="[[prospecto.id]]" arreglo-contactos="[[listaContactos]]">
                            </my-datos-contacto>
                        </div><!--contacto-->
                        
                        <div name="seg">
                            <my-datos-seguimiento class="flex-fill m-2" on-despacha-dialogo="updateDialogo"
                            id-prospecto="[[prospecto.id]]" arreglo-seguimiento="[[listaSeguimiento]]">
                            </my-datos-seguimiento>
                        </div><!--seg-->
                    </iron-pages>
                
                </div><!--card-body-->
        
            </div><!--card-->

          

           
        
        `;
    }

    static get properties() {
        return {
            selected:{type:String, notify:true, value:"info"},
            prospecto:{type:Object, notify:true,observer:"_llenaCampos"},
            esEditar:{type:Boolean, notify:true, value:false},
            razon:{type:String, notify:true},
            agente:{type:Object, notify:true},
            nombreAgente:{type:String, notify:true},
            alias:{type:String, notify:true},
            listaSeguimiento:{type:Array, notify:true, value:[]},
            listaContactos:{type:Array, notify:true, value:[]},

            _routeParams:{observer: "_routeChanged"},

        }
    }
    
    constructor() {
        super();
    }

    esInfo(str){
        return str=="info";
    }

    cambiaEdita(){
        this.set("esEditar",!this.esEditar);
        console.log("esEditar",this.esEditar);
    }

    navegaLista(){
        NavigationUtils.navigate("prospectos");
    }
    
    _routeChanged(params){
        var t=this;
        if(params && params!=null && params.id){
            console.warn("se ejecuta _routeChanged",params);
            
            
            var t=this;
            
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "_clientes-khalia/"+params.id,
                observer:function(obj){
                    if(obj){
                        console.log("recibimos consulta",obj);
                        t.set("prospecto",obj);
                    }else{
                        t.set("prospecto",null);
                    }
                }
            }));

        }else{
            t.set("prospecto",null);
        }
	}

    updateDialogo(){
        this.__notifyResize(500);
    }

    ready() {
        super.ready();
    }

    _llenaCampos(datos){

        var obj=PolymerUtils.cloneObject(datos);
        if(obj && obj!=null){
            if(obj.razon){
                this.set("razon",obj.razon);
            }else{
                this.set("razon",null);
            }

            if(obj.agente){
                this.set("nombreAgente",obj.agente.displayName);
                this.set("agente",obj.agente);
            }else{
                this.set("nombreAgente",null);
                this.set("agente",null);
            }


            if(obj.alias){
                this.set("alias",obj.alias);
            }else{
                this.set("alias",null);
            }

            if(obj.franquicia){
                this.set("franquicia",obj.franquicia);
            }else{
                this.set("franquicia",null);
            }

            if(obj.estado){
                this.set("estado",obj.estado);
            }else{
                this.set("estado",null);
            }
            if(obj.listaContactos){
                
                // var arrCon=PolymerUtils.cloneObject(obj.listaContactos);
                console.log("hay contactos",obj.listaContactos);
                this.set("listaContactos",obj.listaContactos);
            }else{
                this.set("listaContactos",[]);
            }
            if(obj.listaSeguimiento){
                //var arrSeg=PolymerUtils.cloneObject(obj.listaSeguimiento);
                this.set("listaSeguimiento",obj.listaSeguimiento);
            }else{
                this.set("listaSeguimiento",[]);
            }
         
        }

        
        
    }

    cambiaCliente(){
        var idEditar=this.prospecto.id;
        var t=this;

        PolymerUtils.Dialog.createAndShow({
            title:"Nuevo cliente",
			type: "modal",
            style:"width:400px;max-width:95%;",
            saveSpinner:{message:"guardando cliente"},
            message:"El prospecto seleccionado sera agregado a la lista de clientes activos. ¿Desea continuar?",
			positiveButton: {
                text: "crear cliente",
                action: function(dialog, element) {
                    t.DialogLayout_setSaving(true);
                    var washingtonRef = firebase.firestore().collection("_clientes-khalia").doc(idEditar);
                    return washingtonRef.update({
                        _esCliente: true
                    }).then(() => {
                        PolymerUtils.Toast.show("Cliente creado con éxito");
                        t.DialogLayout_closeDialog();
                        NavigationUtils.navigate("clientes");
                        
                    }).catch((error) => {
                        t.DialogLayout_setSaving(false);
                        console.error("Error updating document: ", error);
                        PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde.");
                    });
                }
            },
            negativeButton: {
                text: "cancelar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});
    }
    
    actualizaDatos(){
        var idEditar=this.prospecto.id;
        if(!this.razon || this.razon==null || this.razon.trim()==""){
            return PolymerUtils.Toast.show("Ingresa un nombre válido");
        }
        
        var actualizado={
            razon:this.razon
        };
        
        if(this.alias){
            actualizado["alias"]=this.alias;
        }
        
        if(this.franquicia){
            actualizado["franquicia"]=this.franquicia;
        }
        if(this.agente){
            actualizado["agente"]=this.agente;
        }
        if(this.estado){
            actualizado["estado"]=this.estado;
        }
        
        var t=this;
        firebase.firestore().collection("_clientes-khalia").doc(idEditar).set(actualizado,{merge:true})
        .then(() => {
            PolymerUtils.Toast.show("Información actualizada con exito");
            t.cambiaEdita();
        })
        .catch((error) => {
            PolymerUtils.Toast.show("Error al guardar; intentalo más tarde.");
            console.error("Error writing document: ", error);
        });
    }
    
}

customElements.define('my-datos-prospecto', MyDatosProspecto);