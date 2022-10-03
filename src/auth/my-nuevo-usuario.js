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

import '../controles-extra/checkbox-tree.js';
import '../sistemas/my-sistemas-inventario.js';
import './my-imagen-perfil.js';

import '../bootstrap.js';


class MyNuevoUsuario extends AuthMixin(DialogLayoutMixin(UtilsMixin(PolymerElement))) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
                
            </style>

            <div class="container">
                <div class="card card-body">
                    <h5 class="card-title d-flex align-items-center" style="cursor:pointer;" on-click="despachaVolver">
                        <paper-icon-button icon="arrow-back">volver a mis usuarios</paper-icon-button>
                        {{muestraTitulo(esEditar)}}
                        <div class="ml-auto">

                            
                            <paper-button style$="[[botonAccion.estilo]]" on-click="ejecutaUsuario">[[botonAccion.texto]]</paper-button>
                            

                        </div>
                    </h5>

                    <div class="row">

                        <template is="dom-if" if="[[esEditar]]" restamp>
                            <div class="col-md-3">
                                <my-imagen-perfil url-imagen="[[fotoUrl]]" id-empleado="[[usuario.id]]" nombre-foto="[[usuario.nombreFoto]]"></my-imagen-perfil>
                            </div>
                        </template>
                        <div class="col-md-9">

                            <div class="d-flex">
                                <paper-input class="mr-3" id="txtUser" label="Nombre de usuario" value="{{user}}" error-message="valor inválido" disabled="[[esEditar]]"></paper-input>
                                <paper-input id="txtCod" label="Número de empleado" value="{{codigo}}" error-message="valor inválido"></paper-input>
                            </div>
                            <paper-input id="txtNombre" value="{{nombre}}" label="Nombre completo" error-message="valor inválido"></paper-input>                  
                            <paper-input id="txtContra" value="{{pass}}" type="password" label="Contraseña" error-message="valor inválido"></paper-input>
                            <paper-input id="txtConfirm" value="{{pass2}}" type="password" label="Confirmar contraseña" error-message="valor inválido"></paper-input>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 border border-primary rounded-lg">
                            <span class="font-weight-bold">Lista de permisos</span>
                            <div style="max-height:300px; overflow-y:scroll;">
                                <checkbox-tree object-tree="[[mainTree]]" id="mainDomTree"></checkbox-tree>
                            </div>
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
            </div>


            
        `;
    }

    static get properties() {
        return {
            usuario:{type:Object, notify:true,observer:"_asignaValores"},
            nombre:{type:String, notify:true},
            user:{type:String, notify:true},
            email:{type:String, notify:true,observer:"_muestraUsuario"},
            pass:{type:String, notify:true},
            pass2:{type:String, notify:true},
            codigo:{type:String,notify:true},
            _timestamp:{type:Object, notify:true},
            equipoAsignado:{type:String, notify:true, value:[]},
            fotoUrl:{type:String, notify:true},
            uid:{type:String, notify:true},
            perfil:{type:Object,notify:true,value:null,observer: "_selectedPerfilChanged"},


            esEditar:{type:Boolean, notify:true, value:false,observer:"_muestraBoton"},
            esAbierto:{type:Boolean, notify:true, value:false},

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

           
        }
    }

    constructor() {
        super();
        
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

    despachaVolver(){
        this.dispatchEvent(new CustomEvent('cierra-vista', {
            detail: {
                closed:true
            }
        }));
    }

    muestraTitulo(editar){
        if(editar==true){
            return "Editar usuario";
        }else{
            return "Agregar usuario"
        }
    }

    

    selectTree(list){
        var context=this;
        setTimeout(function(){
            
            context.shadowRoot.querySelector("#mainDomTree").selectTree(list);
        },500);
        //this.$.mainDomTree.selectTree(list);
    }

    _selectedPerfilChanged(list){
        console.log("_selectedPerfilChanged",list);
        if(list){
         
          this.selectTree(list);
    
        }else{
          this.set("displayName",null);
          this.clearTree();
        }
    }

    clearTree(){

        var context=this;
        setTimeout(function(){
            context.shadowRoot.querySelector("#mainDomTree").clearTree();
        },500);
        //this.$.mainDomTree.clearTree();
    }

    ready() {
        super.ready();
        
    }

    cambiaBolActivo(){
        this.set("campoActivo",!this.campoActivo);
        this.DialogLayout_notifyResize();
    }

    muestraIcono(bol){
        if(bol==true){
            return "arrow-drop-up";
        }else{
            return "arrow-drop-down";
        }
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
        
        var correoAcceder=this.user+"@gkhalia.com";

        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.$.txtNombre.invalid=true;
        }else{
            this.$.txtNombre.invalid=false;
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

        var lista=this.$.mainDomTree.getSelectedList();

        

        console.log("accessList",lista);

         
        var nuevoUsuario={
            // _timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            codigo:this.codigo,
            email:correoAcceder,
            displayName:this.nombre,
            password:this.pass,
            accessList:lista
        };

        if(this.equipoAsignado && this.equipoAsignado.length>0){
            nuevoUsuario["equipoAsignado"]=this.equipoAsignado;
        }

        if(this.esEditar==true){
            nuevoUsuario["uid"]=this.uid;

        }
        

        var arreglado=PolymerUtils.fixDataForFirebase(nuevoUsuario);

        var dialog=PolymerUtils.Dialog.createAndShow({
            type: "modal",
            saveSpinner:{
                message: "Guardando Usuario...",
                saving: true
            },
            style:"width: 400px; height: 300px;",
            smallStyle: "width: 95% !important;"
        });

        var t=this;

        if(this.esEditar==true){
            this.editaUsuario(arreglado,{
                success:function(){
                    dialog.close();
                    t.borraCampos();
                    t.despachaVolver();
                },
                fail: function(){
                    dialog.close();
                    t.set("saving",false);
                }
            });
        }else{
            this.creaNuevoUsuario(arreglado,{
                success:function(){
                    dialog.close();
                    t.borraCampos();
                    t.despachaVolver();
                },
                fail: function(){
                    t.set("saving",false);
                }
            });
        }

    }



    disparaVolver(){
        this.dispatchEvent(new CustomEvent('cierra-vista', {
            detail: {
                closed:true
            }
        }));
    }

    borraCampos(){
        this.set("nombre",null);
        this.set("email",null);
        this.set("pass",null);
        this.set("pass2",null);
        //this.set("mainTree",null);
        this.set("perfil",null);
        this.set("_timestamp",null);
        this.set("nuevaImagen",null)
        
    }

  
}

customElements.define('my-nuevo-usuario', MyNuevoUsuario);