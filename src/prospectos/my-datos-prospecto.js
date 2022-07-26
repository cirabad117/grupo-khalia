import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';
import { NavigationMixin } from '../mixins/navigation-mixin.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icons/social-icons.js';

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

import '../general-controls/my-datos-contacto.js';
import '../general-controls/my-datos-seguimiento.js';
import '../general-controls/data-simple.js';
import '../controles-extra/selector-usuarios.js';
import '../my-prospectos-main.js';
import '../my-cotizaciones-main.js';

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

                paper-tab.iron-selected {
                    background-color: var(--paper-cyan-900);
                    color:white;
                
                }

                .btn-accion{
                   
                    border-radius:50%;
                    color:var(--paper-grey-600);
                    background-color:var(--paper-grey-100);
                }

                .btn-accion:hover{
                    background-color:var(--paper-blue-400);
                    color:white;
                }
            </style>
            
            <nav class="navbar navbar-light titulo" style="background-color:var(--paper-blue-50);">
                <span class="navbar-brand" on-click="navegaLista">
                    <iron-icon icon="arrow-back"></iron-icon>
                    Prospecto "{{razon}}"
                    
                </span>

                <my-seguimiento-item obj-buscar="[[listaSeguimiento]]"></my-seguimiento-item>

                <div class="form-inline my-2 my-lg-0">
                    
                    <paper-tabs style="background-color:#FFFFFF;" selected="{{selected}}" attr-for-selected="name">
                        <paper-tab name="info" onmouseover="PolymerUtils.Tooltip.show(event,'Información')"><iron-icon icon="icons:assignment"></iron-icon></paper-tab>
                        <paper-tab name="contacto" onmouseover="PolymerUtils.Tooltip.show(event,'Contactos')"><iron-icon icon="icons:folder-shared"></iron-icon></paper-tab>
                        <paper-tab name="seg" onmouseover="PolymerUtils.Tooltip.show(event,'Seguimiento')"><iron-icon icon="icons:timeline"></iron-icon></paper-tab>
                        
                        <paper-tab name="coti" onmouseover="PolymerUtils.Tooltip.show(event,'Cotizaciones')">
                            <iron-icon icon="icons:description"></iron-icon>
                        </paper-tab>

                        </template>

                    </paper-tabs>
                    
                </div>
            </nav>

            <div class="card">
                <div class="card-body">
                    <iron-pages selected="[[selected]]" attr-for-selected="name">
                        <div name="info">
                            <template is="dom-if" if="[[!esEditar]]" restamp>
                                
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex">
                                                <iron-icon style="margin:5px;" icon="icons:assignment"></iron-icon>
                                                <h5  style="margin:5px;">Información del prospecto</h5>
                                            </div>

                                            <div class="ml-auto">
                                            <paper-icon-button class="btn-accion"
                                        onmouseover="PolymerUtils.Tooltip.show(event,'Editar')"
                                        icon="icons:create" on-click="cambiaEdita">
                                        </paper-icon-button>
                                        
                                        <!-- <paper-icon-button class="btn-accion"
                                        onmouseover="PolymerUtils.Tooltip.show(event,'Eliminar')"
                                        icon="icons:delete" on-click="eliminaProspecto">
                                        </paper-icon-button> -->
                                        
                                        <!-- <template is="dom-if" if="{{!esCotizacion}}">
                                        <paper-icon-button class="btn-accion"
                                        onmouseover="PolymerUtils.Tooltip.show(event,'Habilitar cotización')"
                                        icon="icons:note-add" on-click="cambiaCliente"></paper-icon-button>
                                        </template> -->
                                        
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="d-flex justify-content-between flex-wrap">
                                            <data-simple dato="{{razon}}" titulo="Nombre o razón social" font-size="20px"></data-simple>
                                            <data-simple dato="{{alias}}" titulo="alias" font-size="20px"></data-simple>
                                            <data-simple dato="{{nombreAgente}}" titulo="Agente" font-size="20px"></data-simple>
                                            <data-simple dato="{{franquicia}}" titulo="Franquicia" font-size="20px"></data-simple>
                                            <data-simple dato="{{estado.nombre}}" titulo="Estado" font-size="20px"></data-simple>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            
                            </template>
                            
                            <template is="dom-if" if="[[esEditar]]" restamp>
                                
                                <div class="d-flex flex-column justify-content-center mr-5 ml-5">
                                    
                                    <div class="d-flex align-items-center">
                                        <paper-input class="m-3" id="txtAlias" label="Razón social"
                                        value="{{razon}}" error-message="valor inválido"></paper-input>
                                        
                                        <paper-input class="m-3" id="txtAlias" label="Alias"
                                        value="{{alias}}" error-message="valor inválido"></paper-input>
                                        
                                        <paper-input class="m-3" id="txtAlias" label="Franquicia"
                                        value="{{franquicia}}" error-message="valor inválido"></paper-input>
                                    </div>
                                    
                                    <div class="d-flex align-items-center">
                                        
                                        <!-- <selector-usuarios class="m-3" etiqueta="Agente" usuario-elegido="{{agente}}"></selector-usuarios> -->

                                        <vaadin-combo-box class="m-3" id="comboAgente" label="Agente" selected-item="{{agente}}" items="[[listaUsuarios]]"
                                        item-value-path="id" item-label-path="displayName" error-message="seleccione una opción"></vaadin-combo-box>
                                    
                                        
                                        <vaadin-combo-box class="m-3" id="comboEstado" label="Estado" selected-item="{{estado}}" items="[[_estados]]"
                                        item-value-path="codigo" item-label-path="nombre" error-message="seleccione una opción"></vaadin-combo-box>
                                    
                                    </div>
                                    
                                    <div class="d-flex align-items-center flex-row-reverse">
                                        
                                        <button type="button" class="btn btn-success m-1" on-click="actualizaDatos">
                                            <span>
                                                <iron-icon icon="save"></iron-icon>
                                            </span>
                                            Guardar cambios
                                        </button>

                                        <button type="button" class="btn btn-light m-1" on-click="cambiaEdita">
                                            <span>
                                                <iron-icon icon="clear"></iron-icon>
                                            </span>
                                            Cancelar
                                        </button>
                                    </div>
                                
                                </div>
                            
                            </template>
                            
                            
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

                        <div name="coti">
                            <div class="d-flex align-items-center" >
                                <iron-icon icon="icons:description" style="margin:5px;"></iron-icon>
                                <h5>Historial de cotizaciones</h5>
                            </div>
                            <my-cotizaciones-main es-vista-principal="{{noMain}}" lista-cotizaciones="[[cotiFiltradas]]"
                            cliente-activo="{{prospecto.id}}"></my-cotizaciones-main>
                        </div>
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
            listaUsuarios:{type:Array, notify:true, value:[]},
            listaSeguimiento:{type:Array, notify:true, value:[]},
            listaContactos:{type:Array, notify:true, value:[]},

            _routeParams:{observer: "_routeChanged"},

            cotizaciones:{type:Array, notify:true, value:[]},
            cotiFiltradas:{type:Array, notify:true, value:[]},
            noMain:{type:Boolean, notify:true, value:false}

        }
    }
    
    constructor() {
        super();
    }
    
    static get observers() {
        return [
            '_filtraCotizaciones(prospecto,cotizaciones,cotizaciones.*)'
        ];
    }

    _filtraCotizaciones(pro,arr){

        if(pro && pro!=null && arr && arr.length>0){
            // var arreglo=PolymerUtils.cloneObject(arr);

            var filtrado=[];
    
            for(var i=0; i<arr.length;i++){
                console.log("revisamos coti",pro);
                if(pro.id==arr[i].cliente.id){
                    filtrado.push(arr[i]);
                }
            }

            this.set("cotiFiltradas",filtrado);


        }
        
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
        if(this.esEditar==true){
            this.set("esEditar",false);
        }
        
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

            // if(obj.esCotizacion && obj.esCotizacion){
            //     this.set("esCotizacion",true);
            // }else{
            //     this.set("esCotizacion",false);
            // }
         
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
                style:"background-color:var(--paper-blue-500);color:white;",
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
                style:"border:solid 1px var(--paper-blue-500);",
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

    eliminaProspecto(){
        var elegido=this.prospecto;
        var id=elegido.id;

        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Eliminar prospecto",
            message:"El prospecto <strong>"+elegido.razon+"</strong> y toda su información relacionada no podra recuperarse. ¿Desea continuar?",
			saveSpinner:{
				message:"Eliminando prospecto"
			  },
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "Elimniar",
                style:"background-color:var(--paper-red-500);color:white;",
                action: function(dialog, element) {
                    dialog.setSaving(true);
                    firebase.firestore().collection("_clientes-khalia").doc(id).delete().then(() => {
                        PolymerUtils.Toast.show("Prospecto eliminado con éxito");
                        NavigationUtils.navigate("prospectos");
                        
                        dialog.close();
                    }).catch((error) => {
                        PolymerUtils.Toast.show("Error al eliminiar. Intentalo más tarde.");

                        dialog.setSaving(false);
                        console.error("Error removing document: ", error);
                    });
                    
                }
            },
            negativeButton: {
                text: "Cerrar",
                action: function(dialog, element) {
                
                    dialog.close();
                }
            }
		});
    }
    
}

customElements.define('my-datos-prospecto', MyDatosProspecto);