import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";
import { AuthMixin } from '../mixins/auth-mixin';

import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';

import '../controles-extra/checkbox-tree.js';
import '../sistemas/my-sistemas-inventario.js';
import './my-imagen-perfil.js';
import './my-selector-perfil.js';

import '../bootstrap.js';


class MyNuevoUsuario extends AuthMixin(DialogLayoutMixin(UtilsMixin(PolymerElement))) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    overflow-y:scroll;
                    max-height:400px;
                }
                
            </style>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <my-imagen-perfil id="carga-imagen" on-foto-guardada="guardaUsuario" es-nuevo="[[nuevo]]"></my-imagen-perfil>
                    </div>
                    <div class="col-md-9">
                        <div class="d-flex">
                            <paper-input class="mr-3" id="txtUser" label="Nombre de acceso" value="{{user}}" error-message="valor inválido" disabled="[[esEditar]]"></paper-input>
                            <paper-input id="txtCod" label="Número de empleado" value="{{codigo}}" error-message="valor inválido"></paper-input>
                        </div>
                        <div class="d-flex align-items-center">

                            <paper-input class="mr-auto" style="width:100%;" id="txtNombre" value="{{nombre}}" label="Nombre completo" error-message="valor inválido"></paper-input>                  
                            <vaadin-date-picker class="ml-3" label="Fecha de nacimiento" i18n="[[vaadinDateConfig]]" id="txtFecha" value="{{fechaNac}}"
                            error-message="selecciona una fecha válida"></vaadin-date-picker>
                        </div>
                        <div class="d-flex align-items-center">
                            <paper-input id="txtContra" class="m-1" value="{{pass}}" type="password" label="Contraseña" error-message="valor inválido"></paper-input>
                            <paper-input id="txtConfirm" class="m-1" value="{{pass2}}" type="password" label="Confirmar contraseña" error-message="valor inválido"></paper-input>
                        </div>
                    </div>
                </div>
                
                <div class="row">

                    <div class="col-md-6 border border-primary rounded-lg">
                        <span class="font-weight-bold">Lista de permisos</span>
                        <my-selector-perfil id="select-perfil"></my-selector-perfil>
                        <!-- <div style="max-height:300px; overflow-y:scroll;">
                            <checkbox-tree object-tree="[[mainTree]]" id="mainDomTree"></checkbox-tree>
                        </div> -->
                    </div>
                    
                    <div class="col-md-6 border border-primary rounded-lg">
                        <div class="d-flex align-items-baseline">
                            <span class="font-weight-bold">Equipo Asigando</span>
                            <div class="ml-auto">
                                <button type="button" class="btn btn-primary" on-click="abreEquipo">{{muestraTexto(esAbierto)}}</button>
                            </div>
                        </div>
                        
                        <paper-listbox>
                            <template is="dom-repeat" items="[[equipoAsignado]]">
                                <paper-item>
                                    <paper-item-body two-line>
                                        <div>
                                            [[item.tipo]] - [[item.marca]]
                                        </div>
                                        <div secondary>
                                            [[item.ns]]
                                        </div>
                                    </paper-item-body>
                                    <paper-icon-button icon="clear" on-click="quitaEquipo"></paper-icon-button>
                                </paper-item>
                            </template>
                        </paper-listbox>
                    </div>
                    
                    <div class="col-md-12">
                        <iron-collapse id="collapse" opened="{{esAbierto}}">
                            <my-sistemas-inventario class="border border-info rounded-lg" border-primary rounded-lg es-vista-principal="[[vistaPrincipal]]"
                            datos-equipo="[[datosEquipo]]" on-agrega-equipo="pushEquipo"></my-sistemas-inventario>
                        </iron-collapse>
                    </div>
                </div>
            
            </div>


            
        `;
    }

    static get properties() {
        return {
            
            
            email:{type:String, notify:true,observer:"_muestraUsuario"},

           
            equipoAsignado:{type:String, notify:true, value:[]},
            
            
           
            mainTree:{type:Object, notify:true},

            vistaPrincipal:{type:Boolean, notify:true, value:false},

            campoActivo:{type:Boolean, notify:true,value:false},

            datosEquipo:{type:Array, notify:true, value:[
                {"titulo":"Número de serie","dato":"ns"},
                {"titulo":"Tipo","dato":"tipo"},
                {"titulo":"Marca","dato":"marca"},
                {"titulo":"Acciones","listaAcciones":[
                    {"accion":"accionItem","icono":"icons:add","texto":"agregar equipo"},
                ]}
            ]},

            nuevo:{type:Boolean, notify:true, value:true}

           
        }
    }

    constructor() {
        super();

        var datos=StaticDomAccess.MAIN_TREE;
        this.set("mainTree",datos);
        
    }

    ready() {
        super.ready();
        
    }

    _asignaValores(usuarioActivo){
        if(usuarioActivo && usuarioActivo!=null){
            this.set("uid",usuarioActivo.id);
            this.set("nombre",usuarioActivo.displayName);
            this.set("email",usuarioActivo.email);
            this.set("perfil",usuarioActivo.accessList);
            this.set("pass",usuarioActivo.password);
            this.set("pass2",usuarioActivo.password);

            if(usuarioActivo.equipoAsignado){
                this.set("equipoAsignado",usuarioActivo.equipoAsignado);
            }

            if(usuarioActivo.fotoUrl){
                this.set("fotoUrl",usuarioActivo.fotoUrl);
            }

            if(usuarioActivo.codigo){
                this.set("codigo",usuarioActivo.codigo);
            }


        }
    }

    _muestraUsuario(str){
        if(str && str!=null && str.trim()!=""){
            var arr=str.split("@");
            this.set("user",arr[0]);
        }
        
    }

    muestraTexto(bol){
        return bol==true?"Cerrar":"Asignar equipo";
    }

    

    _muestraBoton(bol){
        if(bol==true){
            this.set("botonAccion",{
                estilo:'background-color:var(--paper-blue-500);color:white;',
                texto:"guardar cambios"
            });
        }else{
            this.set("botonAccion",{
                estilo:'background-color:var(--paper-green-500);color:white;',
                texto:"crear usuario"
            });
        }
    }

    abreEquipo(){
        this.set("esAbierto",!this.esAbierto);
    }

    pushEquipo(e){
        var arreglo=PolymerUtils.cloneObject(this.equipoAsignado);
        if(!arreglo){
            arreglo=[];
        }
        arreglo.push(e.detail.equipo);

        console.log("arreglo",arreglo);
        this.set("equipoAsignado",arreglo);
    }

    quitaEquipo(e){
        var item=e.model.index;
        var arr=PolymerUtils.cloneObject(this.equipoAsignado);
        arr.splice(item,1);
        this.set("equipoAsignado",arr);
    }

    ejecutaUsuario(){
        if(!this.user || this.user==null || this.user.trim()==""){
            return this.$.txtUser.invalid=true;
        }else{
            this.$.txtUser.invalid=false;
        }

        if(!this.codigo || this.codigo==null || this.codigo.trim()==""){
            return this.$.txtCod.invalid=true;
        }else{
            this.$.txtCod.invalid=false;
        }
        
        

        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.$.txtNombre.invalid=true;
        }else{
            this.$.txtNombre.invalid=false;
        }

        if(!this.fechaNac || this.fechaNac==null || this.fechaNac.trim()==""){
            return this.$.txtFecha.invalid=true;
        }else{
            this.$.txtFecha.invalid=false;
        }
       
        
        if(!this.pass || this.pass==null || this.pass.trim()==""){
            return this.$.txtContra.invalid=true;
        }else{
            this.$.txtContra.invalid=false;
        }

        var ps=this.pass;
        
        if(ps.length<6){
            this.$.txtContra.errorMessage="mínimo 6 caracteres";
            return this.$.txtContra.invalid=true;
        }else{
            this.$.txtContra.errorMessage="valor inválido";
            this.$.txtContra.invalid=false;
        }

        
        if(!this.pass2|| this.pass2==null || this.pass2.trim()==""){
            return this.$.txtConfirm.invalid=true;
        }else{
            this.$.txtConfirm.invalid=false;
        }

        var ps2=this.pass2;

        if(ps!=ps2){
            this.$.txtConfirm.errorMessage="las contraseñas no coinciden";
            return this.$.txtConfirm.invalid=true;
        }else{
            this.$.txtConfirm.invalid=false;
        }

        var datosPerfil=null;

        var selector=this.shadowRoot.querySelector("#select-perfil");
        console.log("selector",selector);
        if(selector){
            datosPerfil=selector.devuelveDatos();
        }

        if(!datosPerfil || datosPerfil==null){
            return PolymerUtils.Toast.show("no hay datos de perfil válidos");

        }



        this.shadowRoot.querySelector("#carga-imagen").cargaImagen();
         
       

        if(this.equipoAsignado && this.equipoAsignado.length>0){
            nuevoUsuario["equipoAsignado"]=this.equipoAsignado;
        }


    }

    guardaUsuario(e){
        this.DialogLayout_setSaving(true);
        var correoAcceder=this.user+"@gkhalia.com";
        var datosPerfil=null;

        var selector=this.shadowRoot.querySelector("#select-perfil");
        console.log("selector",selector);
        if(selector){
            datosPerfil=selector.devuelveDatos();
        }

        var nuevoUsuario={
            codigo:this.codigo,
            email:correoAcceder,
            displayName:this.nombre,
            password:this.pass,
            accessList:datosPerfil.accessList,
            puesto:datosPerfil.puesto,
            fotoUrl:e.detail.direccion,
            nombreFoto:e.detail.nombreArchivo,
            fechaNac:this.fechaNac

        };

        var arreglado=PolymerUtils.fixDataForFirebase(nuevoUsuario);

        var t=this;

        t.creaNuevoUsuario(arreglado,{
            success:function(){
                t.DialogLayout_closeDialog()
              
            },
            fail: function(){
                t.DialogLayout_setSaving(false);
            }
        });

    }


   

  
}

customElements.define('my-nuevo-usuario', MyNuevoUsuario);