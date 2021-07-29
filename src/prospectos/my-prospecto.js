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

import '../bootstrap.js';

class MyProspecto extends NavigationMixin(UtilsMixin(PolymerElement)) {
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

                #content-extra{
                    cursor:pointer;
                    /* If you want to implement it in very old browser-versions */
                    -webkit-user-select: none; /* Chrome/Safari */ 
                    -moz-user-select: none; /* Firefox */
                    -ms-user-select: none; /* IE10+ */

                    /* The rule below is not implemented in browsers yet */
                    -o-user-select: none;
                    /* The rule below is implemented in most browsers by now */
                    user-select: none;
                }
                
            </style>
            
            <div class="container-fluid">
                <div class="card">
                    <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div style="display: flex; padding: 8px; ">
                                <div style="flex-grow: 1; margin:5px;">
                                    <paper-input id="txtRazon" label="Nombre o Razón social" value="{{razon}}"
                                    error-message="valor inválido"></paper-input>
                                </div>

                                <div style="flex-grow: 1; margin:5px;">
                                    <div style="font-size: 14px; font-weight: 400; color: var(--paper-indigo-500);">estatus del prospecto</div>

                                    <div style$="font-size: 16px; background-color:[[objEstatus.color]];color:[[objEstatus.base]]">{{objEstatus.texto}}</div>

                                </div>

                                <div style="flex-grow: 1; margin:5px;">
                                    <div style="font-size: 14px; font-weight: 400; color: var(--paper-indigo-500);">fecha de creación</div>

                                    <div style="font-size: 16px; color: black;">{{PolymerUtils_getTimeString(prospecto._timestamp)}}</div>

                                </div>
                                <div style="flex-grow: 1; margin:5px;">
                                    <paper-button style="background-color:var(--paper-blue-500);color:white;">
                                    <span>
                                    <iron-icon icon="supervisor-account"></iron-icon>
                                    </span>Agregar a clientes</paper-button>

                                </div>
                                
                                
                            </div>
                        </div>
                    </div>

                    <div id="content-extra" class="row">
                        <div class="col-md-12">
                        <p>
                            <span>
                                <iron-icon icon="expand-more"></iron-icon>
                            </span>
                            informacion adicional
                        </p>
                        </div>
                    </div>
                    <iron-collapse opened="{{accionesExtra}}" style="width:100%;">
                        <div class="row bg-light text-dark">
                            <div class="col-md-12">
                                <div style="display: flex; padding: 8px; ">
                                
                                    <div style="flex-grow: 1; margin:5px;">
                                        <paper-input id="txtAlias" label="Alias"
                                        value="{{alias}}" error-message="valor inválido"></paper-input>
                                    </div>
                                    <div style="flex-grow: 1; margin:5px;">
                                        <paper-input id="txtAlias" label="Agente"
                                        value="{{alias}}" error-message="valor inválido"></paper-input>
                                    </div>
                                    <div style="flex-grow: 1; margin:5px;">
                                        <paper-input id="txtAlias" label="Franquicia"
                                        value="{{alias}}" error-message="valor inválido"></paper-input>
                                    </div>
                                    <div style="flex-grow: 1; margin:5px;">
                                        
                                        <paper-button style="background-color:var(--paper-blue-100);">
                                        <span>
                                        <iron-icon icon="save"></iron-icon>
                                        </span>Actualizar campos</paper-button>
                                        
                                    </div>

                                
                                </div>
                            </div>
                            <div class="col-md-6" style="padding:8px;">
                                <my-datos-contacto lista-contactos="[[prospecto.listaContactos]]"></my-datos-contacto>
                            </div>
                            <div class="col-md-6" style="padding:8px;">
                                <my-datos-seguimiento id-prospecto="[[prospecto.id]]" arreglo-seguimiento="[[prospecto.listaSeguimiento]]"></my-datos-seguimiento>
                            </div>
                        </div>
                    </iron-collapse>
                </div>
            </div>

            
        `;
    }

    static get properties() {
        return {
            prospecto:{type:Object, notify:true,observer:"_llenaCampos"},

            objEstatus:{type:Object, notify:true},
            listaContactos:{type:Array, notify:true, value:[]},
            listaSeguimiento:{type:Array, notify:true, value:[]},
            objCliente:{type:Object, notify:true},
            // _routeParams:{observer: "_routeChanged"},

            bolInfo:{type:Boolean, notify:true, value:false},
            bolConta:{type:Boolean, notify:true, value:false},
            bolExtra:{type:Boolean, notify:true, value:false},

            accionesExtra:{type:Boolean, notify:true, value:false}

        }
    }

    constructor() {
        super();
    }

    

    muestraEstatus(arreglo){

        console.log("recibimos lsita de seguimiento",arreglo);
        var comparar=function(a,b){
            var nameA = a.fechaGuardado; 
            var nameB = b.fechaGuardado; 
            if (nameA > nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
    
            // names must be equal
            return 0;
        };
        var ordenado=arreglo.sort(comparar);

        console.log("veamos el arreglo ordenado",ordenado);

        var ultimo=ordenado[0];

        if(ultimo && ultimo!=null){
            return ultimo.estatus;
        }else{
            return {texto:"no hay datos de seguimiento",base:"white",color:"black"};
        }

        
    }

    compara(a, b) {
        var nameA = a.fechaGuardado; 
        var nameB = b.fechaGuardado;
        if (nameA > nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }

    ready() {
        super.ready();
        var t=this;
        const card = this.shadowRoot.querySelector('#content-extra');
        card.addEventListener('dblclick', function (e) {
            t.set("accionesExtra",!t.accionesExtra);
        });
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

                var obj=this.muestraEstatus(obj.listaSeguimiento);
                this.set("objEstatus",obj)
            }else{
                this.set("objEstatus",{texto:"no hay datos de seguimiento",base:"white",color:"black"}
                );
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

customElements.define('my-prospecto', MyProspecto);