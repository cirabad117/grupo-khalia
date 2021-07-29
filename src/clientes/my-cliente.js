// import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
// import { NavigationMixin } from "../mixins/navigation-mixin.js";

// import '@polymer/iron-pages/iron-pages.js';
// import '@polymer/paper-tabs/paper-tabs.js';
// import '@polymer/paper-tabs/paper-tab.js';

// import '../procesos/my-licencias.js';
// import '../procesos/my-pre-arsh.js';
// import '../procesos/my-sasisopa.js';
// import '../procesos/my-sgm.js';

// import '../bootstrap.js';

// class MyCliente extends NavigationMixin(PolymerElement) {
//     static get template() {
//         return html`
//             <style include="bootstrap">
//                 :host{
//                     display:block;
                    
                    
//                 }

//                 paper-tabs{
//                     background-color:var(--paper-blue-500);
//                     --paper-tab-ink: var(--paper-blue-100);
// 		            --paper-tabs-selection-bar-color: #FFFF00;
//                 }

//                 paper-tabs paper-tab.iron-selected {
//                     color: #FFFF00;
//                 }


//             </style>

//             <div class="container">
//                 <div class="card">
//                     <div class="card-body">
//                         <h5 class="card-title">Estatus general por departamento</h5>
//                     </div>

//                     <div class="card-body">
//                         <paper-tabs selected="{{selected}}" attr-for-selected="name" scrollable>
//                             <paper-tab name="sasi">SASISOPA</paper-tab>
//                             <paper-tab name="licencia">LICENCIAS DE FUNCIONAMIENTO</paper-tab>
//                             <paper-tab name="pre">PRE & ARSH</paper-tab>
//                             <paper-tab name="sgm">SGM</paper-tab>
//                         </paper-tabs>
                        
//                         <iron-pages selected="{{selected}}" attr-for-selected="name">
//                             <my-sasisopa name="sasi" cliente="[[idCliente]]"></my-sasisopa>
//                             <my-licencias name="licencia" cliente="[[idCliente]]"></my-licencias>
//                             <my-pre-arsh name="pre" cliente="[[idCliente]]"></my-pre-arsh>
//                             <my-sgm name="sgm" cliente="[[idCliente]]"></my-sgm>
//                         </iron-pages>
//                     </div>
//                 </div>
//             </div>



            
            
            
//         `;
//     }

//     static get properties() {
//         return {
//             selected:{type:String, notify:true, value:"sasi"},
//             idCliente:{type:String, notify:true},
//             datosCliente:{type:Object, notify:true},

//             routeParams:{observer:"_cambiaId"},

//             documentos:{type:Array, notify:true, value:[]}

//         }
//     }

//     _cambiaId(params){

//         if(params && params.id){
//             this.set("idCliente",params.id);
//         }
//     }

    
 
//     // _consultaInstalacion(str){
//     //     var t=this;
//     //     if(str && str!=null && str.trim()!=""){
//     //         if(this.lastEquipo){
//     //             this.lastEquipo();
//     //             this.set("lastEquipo",null);
//     //         }
            
//     //         this.set("lastEquipo",DataHelper.queryCollection(this,{
//     //             "collection":"documentos",
//     //             "specialRef": sharedFirebase.collection("_clientes-khalia").doc(id).collection("documentos"),
//     //             "array":this.equipos,
//     //             "arrayName":"equipos"
//     //         }));
                
            
//     //     }
//     // }

//     constructor() {
//         super();
//     }

//     ready() {
//         super.ready();
//     }
// }

// customElements.define('my-cliente', MyCliente);
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { NavigationMixin } from "../mixins/navigation-mixin.js";

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-collapse/iron-collapse.js';

import '@vaadin/vaadin-text-field/vaadin-text-field.js';

import '../general-controls/item-contacto.js';

import '../bootstrap.js';

class MyCliente extends NavigationMixin(UtilsMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    margin:10px;
                }

                h5:hover{
                    cursor:pointer;
                }
                
            </style>
            
            <div class="container">
                <!-- <div style="background-color:white;">
                    <div style="display: flex; padding: 8px; ">
                        <div style="flex-grow: 1;">
                            <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">fecha ultima actualizacion</div>
                            <div style="font-size: 16px; color: black;">[[PolymerUtils_getTimeString(item._timestamp)]]</div>
                        </div>
                        
                        <div style="flex-grow: 1;">
                            <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">usuario que registró</div>
                            <div style="font-size: 16px; color: black;">[[item._user.displayName]]</div>
                        </div>
                        
                        <div style="flex-grow: 1;">
                            <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">archivo disponible</div>
                            <a href="[[item.ubicacion]]">[[item.nombreArchivo]]</a>
                        </div>
                        
                        <div style="flex-grow: 1;">
                            <paper-button style="color:var(--paper-red-500);border:solid 1px var(--paper-red-500);" on-click="borraDoc">
                                <span>
                                    <iron-icon icon="clear"></iron-icon>
                                </span>
                                eliminar
                            </paper-button>
                        </div>
                    </div>
                    <my-datos-doc style="flex-grow: 10;" documento="[[item]]" instalacion="[[instalacion]]"></my-datos-doc>
                </div> -->
                
                <div class="card">
                    <h5 class="card-header d-flex justify-content-between align-items-center">
                        Datos del prospecto
                        <button class=" btn btn-info btn-md" on-click="actualizaDatos">
                            <span>
                                <iron-icon icon="save"></iron-icon>
                            </span>
                            guardar informacion
                        </button>
                    </h5>
                    <div class="card-body">

                        <div style="display: flex; padding: 8px; ">
                            <div style="flex-grow: 1; margin:5px;">
                                <paper-input id="txtRazon" label="Nombre o Razón social" value="{{razon}}" 
                                    error-message="valor inválido"></paper-input>
                                </div>
                            <div style="flex-grow: 1; margin:5px;">
                                <paper-input id="txtAlias" label="Alias"
                                value="{{alias}}" error-message="valor inválido"></paper-input>
                            </div>
                            <div style="flex-grow: 1; margin:5px;">
                                <paper-input id="txtAlias" label="Agente"
                                value="{{alias}}" error-message="valor inválido"></paper-input>
                            </div>

                            <div style="flex-grow: 1; margin:5px;">
                                <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">fecha de creación</div>
                                <div style="font-size: 16px; color: black;">{{PolymerUtils_getTimeString(prospecto._timestamp)}}</div>
                            </div>

                        </div>
                    </div>
                </div><!--card-->
                
                <div class="card">
                    <h5 class="card-header d-flex justify-content-between align-items-center" on-click="toggleInfo">
                        información complementaria
                      
                        <span><iron-icon icon="[[muestraIcono(bolInfo)]]"></iron-icon></span>
                        
                    </h5>
                    <div class="card-body">
                        <iron-collapse id="collapse" opened="{{bolInfo}}">
                            <form>
                                <div class="form-row">
                                    <div class="form-group col-md-9">
                                        <paper-input id="txtDom" label="Domicilio" value="{{domicilio}}" error-message="valor inválido"></paper-input>
                                    </div>
                                    
                                    <div class="form-group col-md-3">
                                        <vaadin-combo-box id="comboEstado" label="Estado" selected-item="{{estado}}" items="[[_estados]]"
                                        item-value-path="codigo" item-label-path="nombre" error-message="seleccione una opción"></vaadin-combo-box>
                                    </div>
                                    
                                    <div class="form-group col-md-3">
                                        <paper-input id="txtPl" label="PL" value="{{pl}}" placeholder="PL/XXXX/EXP/ES/XXXX" error-message="valor inválido"></paper-input>
                                    </div>
                                    
                                    <div class="form-group col-md-3">
                                        <paper-input id="txtEs" label="ES" value="{{es}}" error-message="valor inválido"></paper-input>
                                    </div>
                                </div>
                            </form>
                        </iron-collapse>
                    </div>
                </div><!--card-->
                
                <div class="card">
                    <h5 class="card-header d-flex justify-content-between align-items-center" on-click="toggleConta">
                        información de contacto
                        <span><iron-icon icon="[[muestraIcono(bolConta)]]"></iron-icon></span>
                        
                    </h5>
                    <div class="card-body">
                        <iron-collapse id="collapse" opened="{{bolConta}}">
                            <div style="display: flex; padding: 8px; align-items:center;">
                                <div style="flex-grow: 1; margin:5px;">
                                    <paper-input id="txtNombre" label="Nombre" error-message="valor inválido" value="{{nombre}}"></paper-input>
                                </div>
                                <div style="flex-grow: 1; margin:5px;">
                                    <paper-input label="puesto" value="{{puesto}}"></paper-input>
                                </div>
                                <div style="flex-grow: 1; margin:5px;">
                                    <paper-input id="txtTel" label="Telefono" value="{{tel}}"></paper-input>
                                </div>
                                <div style="flex-grow: 1; margin:5px;">
                                    <paper-input label="Correo electrónico" value="{{email}}"></paper-input>
                                </div>
                                <div style="flex-grow: 0;">
                                    <button class="btn btn-sm" style="background-color:var(--paper-green-500);color:white;" on-click="agregaContacto">
                                        <span class="btn-label">
                                        <iron-icon icon="add"></iron-icon>
                                        </span>
                                        agregar contacto
                                    </button>
                                </div>
                            </div>
                            <template is="dom-repeat" items="[[listaContactos]]">
                                <item-contacto style="border:solid 1px var(--paper-blue-300);border-radius:10px;margin:5px;" datos-contacto="[[item]]" index-contacto="[[index]]" on-quita-contacto="spliceContactos"></item-contacto>
                            </template>
                        </iron-collapse>
                    </div>
                </div><!--card-->
                
                <div class="card">
                    <h5 class="card-header d-flex justify-content-between align-items-center" on-click="toggleExtra">
                        seguimiento
                        <span class="btn-label"><iron-icon icon="[[muestraIcono(bolExtra)]]"></iron-icon></span>
                        
                    </h5>
                    <div class="card-body">
                        <iron-collapse id="collapse" opened="{{bolExtra}}">
                            <div style="display: flex; padding: 8px; align-items:center;">
                                <div style="flex-grow: 1; margin:5px;">
                                    <paper-input id="txtEstatus" label="estatus" error-message="valor inválido" value="{{estatus}}"></paper-input>
                                </div>
                                <div style="flex-grow: 1; margin:5px;">
                                    <paper-input id="txtComentario" label="comentario" value="{{comentario}}"></paper-input>
                                </div>
                                <!-- <div style="flex-grow: 1; margin:5px;"> esto esra automatico
                                    <paper-input id="txtTel" label="fecha" value="{{tel}}"></paper-input>
                                </div> -->
                                <div style="flex-grow: 1; margin:5px;">
                                    <paper-input id="txtActividad" label="actividad a realizar" value="{{actividad}}"></paper-input>
                                </div>
                                <div style="flex-grow: 0;">
                                    <button class="btn btn-sm" style="border:solid 1px var(--paper-green-500);color:var(--paper-green-500);background-color:white;" on-click="agregaEstatus">
                                        <span>
                                            <iron-icon icon="add"></iron-icon>
                                        </span>
                                        agregar estatus
                                    </button>
                                </div>
                            </div>
                            <template is="dom-repeat" items="[[listaSeguimiento]]" as ="seg">
                                <div style="background-color:white;">
                                    <div style="display: flex; padding: 8px; ">
                                        <div style="flex-grow: 1;">
                                            <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">estatus</div>
                                            <div style="font-size: 16px; color: black;">[[seg.estatus]]</div>
                                        </div>
                                        <div style="flex-grow: 1;">
                                            <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">comentario</div>
                                            <div style="font-size: 16px; color: black;">[[seg.comentario]]</div>
                                        </div>
                                        
                                        <div style="flex-grow: 1;"> 
                                        <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">fecha</div>
                                        <div style="font-size: 16px; color: black;">{{PolymerUtils_getTimeString(seg._timestamp)}}</div>
                                        </div>
                                        
                                        <div style="flex-grow: 1;">
                                            <div style="font-size: 16px; font-weight: 500; color: var(--paper-indigo-500);">actividad a realizar</div>
                                            <div style="font-size: 16px; color: black;">[[seg.actividad]]</div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                           
                        </iron-collapse>
                    </div>
                </div><!--card-->
            
            </div><!--container-->
            
        `;
    }

    static get properties() {
        return {
            prospecto:{type:Object, notify:true,observer:"_llenaCampos"},
            listaContactos:{type:Array, notify:true, value:[]},
            listaSeguimiento:{type:Array, notify:true, value:[]},
            objCliente:{type:Object, notify:true},
            _routeParams:{observer: "_routeChanged"},

            bolInfo:{type:Boolean, notify:true, value:false},
            bolConta:{type:Boolean, notify:true, value:false},
            bolExtra:{type:Boolean, notify:true, value:false}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    muestraIcono(bol){
        if(bol==true){
            return "expand-less";
        }else{
            return "expand-more";
        }
    }

    _llenaCampos(obj){
        if(obj && obj!=null){
            if(obj.razon){
                this.set("razon",obj.razon);
            }
            if(obj.alias){
                this.set("alias",obj.alias);
            }
            if(obj.domicilio){
                this.set("domicilio",obj.domicilio);
            }
            if(obj.estado){
                this.set("estado",obj.estado);
            }
            if(obj.pl){
                this.set("pl",obj.pl);
            }
            if(obj.es){
                this.set("es",obj.es);
            }
            if(obj.listaContactos){
                this.set("listaContactos",obj.listaContactos);
            }
            if(obj.listaSeguimiento){
                this.set("listaSeguimiento",obj.listaSeguimiento);
            }
        }
        
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
        if(this.domicilio){
            actualizado["domicilio"]=this.domicilio;
        }
        if(this.estado){
            actualizado["estado"]=this.estado;
        }
        if(this.pl){
            actualizado["pl"]=this.pl;
        }
        if(this.es){
            actualizado["es"]=this.es;
        }
        if(this.listaContactos){
            actualizado["listaContactos"]=this.listaContactos;
        }
        if(this.listaSeguimiento){
            actualizado["listaSeguimiento"]=this.listaSeguimiento;
        }


        firebase.firestore().collection("_clientes-khalia").doc(idEditar).set(actualizado,{merge:true})
        .then(() => {
            PolymerUtils.Toast.show("Información actualizada con exito");
        })
        .catch((error) => {
            PolymerUtils.Toast.show("Error al guardar; intentalo más tarde.");
            console.error("Error writing document: ", error);
        });
    }

    _routeChanged(params){
        var t=this;
		if(params && params!=null && params.id){
            console.log("recibimos datos navegacion",params);
            var id=params.id;
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "_clientes-khalia/"+id,
                observer:function(obj){
                    if(obj){
                        t.set("prospecto",obj);
                        
                    }else{
                        t.set("prospecto",null);
                    }
                }
            }));

		}
	}


     _consultaActividad(str){
        var t=this;
        if(str && str!=null && str.trim()!=""){
            var objConsultar=JSON.parse(str);
            
        }
    }

    toggleInfo(){
        this.set("bolInfo",!this.bolInfo);
    }
    toggleConta(){
        this.set("bolConta",!this.bolConta);
    }
    toggleExtra(){
        this.set("bolExtra",!this.bolExtra);
    }
    
    spliceContactos(e){
        var eliminar=e.detail.indexEliminar;
        this.splice("listaContactos",eliminar,1);

    }

    agregaContacto(){

        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.shadowRoot.querySelector("#txtNombre").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtNombre").invalid=false;
        }
        var nuevo={
            nombreCliente:this.nombre,
            
        };

        if(this.tel && this.tel!=null && this.tel.trim()!=""){
            nuevo["telefono"]=this.tel;
        }

        if(this.email && this.email!=null && this.email.trim()!=""){
            nuevo["email"]=this.email;
        }

        


        this.push("listaContactos",nuevo);
        this.limpiaCamposContacto();
    }

    agregaEstatus(){

        var nuevo={
            _timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            
        };
        
        if(!this.estatus || this.estatus==null || this.estatus.trim()==""){
            return this.shadowRoot.querySelector("#txtEstatus").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtEstatus").invalid=false;
            nuevo["estatus"]=this.estatus;
        }

        if(!this.comentario || this.comentario==null || this.comentario.trim()==""){
            return this.shadowRoot.querySelector("#txtComentario").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtComentario").invalid=false;
            nuevo["comentario"]=this.comentario;
        }

        if(!this.actividad || this.actividad==null || this.actividad.trim()==""){
            return this.shadowRoot.querySelector("#txtActividad").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtActividad").invalid=false;
            nuevo["actividad"]=this.actividad;
        }
        
        this.push("listaSeguimiento",nuevo);
        //this.limpiaCamposSeguimiento();
    }

    limpiaCamposContacto(){
        this.set("nombre",null);
        this.set("tel",null);
        this.set("email",null);
    }

    limpiaCampos(){
        this.set("pl",null);
        this.set("es",null);
        this.set("razon",null);
        this.set("alias",null);
        this.set("domicilio",null);
        this.set("estado",null);
        this.set("listaContactos",[]);
        this.set("agente",null);
        this.set("ejecutivo",null);
        this.set("seguimiento",null);
        this.limpiaCamposContacto();
    }

    regresa(){
        NavigationUtils.navigate("prospectos");
    }

    agregaContacto(){
        console.log("agregaContacto");
        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.shadowRoot.querySelector("#txtNombre").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtNombre").invalid=false;
        }
        if(!this.tel || this.tel==null || this.tel.trim()==""){
            return this.shadowRoot.querySelector("#txtTel").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtTel").invalid=false;
        }
        var nuevo={
            nombreCliente:this.nombre,
            telefono:this.tel
            
        };

        if(this.puesto && this.puesto!=null && this.puesto.trim()!=""){
            nuevo["puesto"]=this.puesto;
        }

        if(this.email && this.email!=null && this.email.trim()!=""){
            nuevo["email"]=this.email;
        }
        
        this.push("listaContactos",nuevo);
        this.limpiaCamposContacto();
        console.log("listaContactos",this.listaContactos);
    }

    spliceContactos(e){
        var eliminar=e.detail.indexEliminar;
        this.splice("listaContactos",eliminar,1);

    }
}

customElements.define('my-cliente', MyCliente);