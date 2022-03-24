
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
import '../general-controls/my-datos-seguimiento.js';
import '../general-controls/my-datos-contacto.js';
import '../general-controls/data-simple.js';
import '../controles-extra/selector-usuarios.js';
import '../prospectos/my-seguimiento-item.js';

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
            
            <nav class="navbar navbar-light bg-light titulo">
                <span class="navbar-brand" on-click="navegaLista">
                    <iron-icon icon="arrow-back"></iron-icon>
                    {{prospecto.razon}} - {{prospecto.alias}}
                    
                </span>

                <my-seguimiento-item obj-buscar="[[listaSeguimiento]]"></my-seguimiento-item>
                
         
                
                <template is="dom-if" if="[[esEditar]]" restamp>
                    <button class=" btn btn-light btn-md" on-click="toggleEditar">
                        <span><iron-icon icon="clear"></iron-icon></span>
                        CANCELAR
                    </button>
                    <button class=" btn btn-info btn-md" on-click="actualizaDatos">
                        <span><iron-icon icon="save"></iron-icon></span>
                        GUARDAR CAMBIOS
                    </button>
                </template>

                <template is="dom-if" if="[[!esEditar]]" restamp>
                    <button class=" btn btn-warning btn-md" on-click="toggleEditar">
                        <span><iron-icon icon="create"></iron-icon></span>
                        EDITAR INFORMACIÓN
                    </button>
                </template>
            </nav>
            
            <div class="card">
                <div class="card-body">
                    <template is="dom-if" if="[[esEditar]]" restamp>
                        <paper-input  style="margin:5px;" id="txtRazon" label="Nombre o Razón social" value="{{razon}}"
                        error-message="valor inválido"></paper-input>

                        <paper-input  style="margin:5px;" id="txtAlias" label="Alias"
                        value="{{alias}}" error-message="valor inválido"></paper-input>
                       

                        <selector-usuarios style="margin:5px;" etiqueta="Agente" usuario-elegido="{{agente}}"></selector-usuarios>

                        <paper-input style="margin:5px;" id="txtDom" label="Domicilio" value="{{domicilio}}" error-message="valor inválido"></paper-input>

                        <paper-input style="margin:5px;" id="txtFran" label="Franquicia" value="{{franquicia}}" error-message="valor inválido"></paper-input>

                        <vaadin-combo-box style="margin:5px;" id="comboEstado" label="Estado" selected-item="{{estado}}" items="[[_estados]]"
                        item-value-path="codigo" item-label-path="nombre" error-message="seleccione una opción"></vaadin-combo-box>

                        <div class="d-flex">
                            <paper-input style="margin:5px; width:50%;" id="txtPl" label="PL" value="{{pl}}" placeholder="PL/XXXX/EXP/ES/XXXX" error-message="valor inválido"></paper-input>

                            <paper-input style="margin:5px; width:50%;" id="txtEs" label="ES" value="{{es}}" error-message="valor inválido"></paper-input>
                        </div>

                    </template>
                    <template is="dom-if" if="[[!esEditar]]" restamp>
                        <form class="d-flex flex-wrap">
                            <data-simple dato="{{razon}}" titulo="Nombre o razón social" font-size="20px"></data-simple>
                            <data-simple dato="{{alias}}" titulo="alias" font-size="20px"></data-simple>
                            <data-simple dato="{{PolymerUtils_getTimeString(prospecto._timestamp)}}" titulo="fecha de creación" font-size="20px"></data-simple>
                        </form>
                            <data-simple dato="{{domicilio}}" titulo="Domicilio" font-size="20px"></data-simple>
                            <form class="d-flex flex-wrap">
                            <data-simple dato="{{agente.displayName}}" titulo="Agente" font-size="20px"></data-simple>
                            <data-simple dato="{{franquicia}}" titulo="Franquicia" font-size="20px"></data-simple>
                            <data-simple dato="{{estado.nombre}}" titulo="Estado" font-size="20px"></data-simple>
                            <data-simple dato="{{pl}}" titulo="PL" font-size="20px"></data-simple>
                            <data-simple dato="{{es}}" titulo="ES" font-size="20px"></data-simple>
                            </form>
                        

                    </template>
                </div>
            </div>
            
            <div class="card">
                <h5 class="card-header d-flex justify-content-between align-items-center" on-click="toggleConta">
                    Información de contacto
                    <span><iron-icon icon="[[muestraIcono(bolConta)]]"></iron-icon></span>
                </h5>
                <div class="card-body">
                    <iron-collapse id="collapse" opened="{{bolConta}}">
                        <my-datos-contacto style="padding:10px;" id-prospecto="[[prospecto.id]]"
                        arreglo-contactos="[[listaContactos]]"></my-datos-contacto>
                    </iron-collapse>
                </div>
            </div>
            
            <div class="card">
                <h5 class="card-header d-flex justify-content-between align-items-center" on-click="toggleExtra">
                    Seguimiento
                    <span class="btn-label"><iron-icon icon="[[muestraIcono(bolExtra)]]"></iron-icon></span>
                </h5>
                <div class="card-body">
                    <iron-collapse id="collapse" opened="{{bolExtra}}">
                        <my-datos-seguimiento style="padding:10px;" id-prospecto="[[prospecto.id]]"
                        arreglo-seguimiento="[[prospecto.listaSeguimiento]]"></my-datos-seguimiento>
                    </iron-collapse>
                </div>
            </div>
            
        `;
    }

    static get properties() {
        return {
            esEditar:{type:Boolean, notify:true, value:false},
            esProspectoGuardado:{type:Boolean, notify:true, value:false},
            prospecto:{type:Object, notify:true,observer:"_llenaCampos"},
            listaContactos:{type:Array, notify:true, value:[]},
            listaSeguimiento:{type:Array, notify:true, value:[]},
            objCliente:{type:Object, notify:true},
            agente:{type:Object, notify:true},
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

    toggleEditar(){
        this.set("esEditar",!this.esEditar);
    }

    navegaLista(){
        NavigationUtils.navigate("clientes");
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
            this.set("esProspectoGuardado",true);
            
            if(obj.razon){
                this.set("razon",obj.razon);
            }else{
                this.set("razon","");
            }
            
            if(obj.agente){
                this.set("agente",obj.agente);
            }else{
                this.set("agente","");
            }
            
            if(obj.alias){
                this.set("alias",obj.alias);
            }else{
                this.set("alias","");
            }

            if(obj.domicilio){
                this.set("domicilio",obj.domicilio);
            }else{
                this.set("domicilio","");
            }

            if(obj.estado){
                this.set("estado",obj.estado);
            }else{
                this.set("estado","");
            }

            if(obj.pl){
                this.set("pl",obj.pl);
            }else{
                this.set("pl","");
            }

            if(obj.es){
                this.set("es",obj.es);
            }else{
                this.set("es","");
            }

            if(obj.franquicia){
                this.set("franquicia",obj.franquicia);
            }else{
                this.set("franquicia","");
            }

            if(obj.listaContactos){
                var arrCon=PolymerUtils.cloneObject(obj.listaContactos);
                this.set("listaContactos",arrCon);
            }

            if(obj.listaSeguimiento){
                var arrSeg=PolymerUtils.cloneObject(obj.listaSeguimiento);
                this.set("listaSeguimiento",arrSeg);
            }
        }else{
            console.log("no hay datos de prospecto");
            this.set("bolInfo",!this.bolInfo);
            this.set("bolConta",!this.bolConta);
            this.set("bolExtra",!this.bolExtra);
        }
        
    }

    actualizaDatos(){

        if(!this.razon || this.razon==null || this.razon.trim()==""){
            return PolymerUtils.Toast.show("Ingresa un nombre válido");
        }

        var actualizado={
            razon:this.razon,
            _esCliente:true
        };

        if(this.alias){
            actualizado["alias"]=this.alias;
        }
        if(!this.agente || this.agente==null ){
            return PolymerUtils.Toast.show("no hay un agente asignado a este cliente");
        }else{
            actualizado["agente"]=this.agente;
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
        if(this.franquicia){
            actualizado["franquicia"]=this.franquicia;
        }
        if(this.listaContactos){
            actualizado["listaContactos"]=this.listaContactos;
        }
        if(this.listaSeguimiento){
            actualizado["listaSeguimiento"]=this.listaSeguimiento;
        }

        if(this.prospecto && this.prospecto!=null){
            var idEditar=this.prospecto.id;
            firebase.firestore().collection("_clientes-khalia").doc(idEditar).set(actualizado,{merge:true})
            .then(() => {
                PolymerUtils.Toast.show("Cliente almacenado con exito");
            })
            .catch((error) => {
                PolymerUtils.Toast.show("Error al guardar; intentalo más tarde.");
                console.error("Error writing document: ", error);
            });
        }else{

            firebase.firestore().collection("_clientes-khalia").add(idEditar)
            .then(() => {
                PolymerUtils.Toast.show("Cliente almacenado con exito actualizada con exito");
            })
            .catch((error) => {
                PolymerUtils.Toast.show("Error al guardar; intentalo más tarde.");
                console.error("Error writing document: ", error);
            });
        }


        
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
                        
                    }
                }
            }));

		}else{
            t.set("prospecto",null);
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