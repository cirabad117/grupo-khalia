import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { AuthMixin } from '../mixins/auth-mixin.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';

import '../controles-extra/checkbox-tree.js';
import './my-nuevo-usuario.js';


import '../bootstrap.js';


class MyUsuarios extends AuthMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    margin:15px;
                }
            </style>

            <div class="container">
                <div class="row">
                    <div class="col-md-12">

                    <iron-pages selected="{{selected}}" attr-for-selected="name">
                            <div name="lista">
                                <div class="row">
                                    <template is="dom-repeat" items="[[listaUsuarios]]" sort="_sortInstalaciones">
                                        <div class="col-xl-3 col-md-6 mb-4 ins-item">
                                            <div class="card border-left-primary h-100 py-2 bg-light text-primary">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col">
                                                            <div class="h4 font-weight-bold text-uppercase mb-1">
                                                                [[item.displayName]]
                                                            </div>
                                                            <div class="mb-0 text-xs">[[item.email]]</div>
                                                        </div>
                                                        <div class="col-auto mr-2" style="display:flex;flex-direction:column;">
                                                            <paper-icon-button style="color:var(--paper-blue-500);" icon="create" on-click="abreEditaUsuario"></paper-icon-button>
                                                            <paper-icon-button style="color:var(--paper-blue-500);" icon="delete" on-click="abreBorraUsuario"></paper-icon-button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                    <div style="position: fixed; bottom: 24px; right: 24px;">
                                        <div style="position: relative; cursor:pointer;" on-clicK="abreNuevoUsuario">
                                            <paper-fab style="color:white; background-color:var(--paper-blue-500);" icon="add"></paper-fab>
                                        </div>
                                    </div>
                            </div><!--div name="lista"-->
                            
                            <div name="editar">
                               
                                        <my-nuevo-usuario on-cierra-vista="abreListaUsuario" es-editar="[[esEditarUsuario]]" campo-activo="[[!esEditarUsuario]]"
                                        main-tree="[[listaPermisos]]" uid="[[usuarioActivo.id]]" nombre="[[usuarioActivo.displayName]]"
                                        email="[[usuarioActivo.email]]" perfil="[[usuarioActivo.accessList]]"
                                        pass="[[usuarioActivo.password]]" pass2="[[usuarioActivo.password]]"></my-nuevo-usuario>
                                    
                            </div><!--div name="editar"-->
                            
                            <div name="crear">
                                
                                        <my-nuevo-usuario on-cierra-vista="abreListaUsuario" es-editar="[[esEditarUsuario]]" 
                                        campo-activo="[[!esEditarUsuario]]" main-tree="[[listaPermisos]]"></my-nuevo-usuario>
                                   
                            </div>
                        </iron-pages>

                    </div>
                </div>
            </div>
            
            <!-- <div class="container-fluid">
            
                <div class="card m-4">
                    <h5 class="card-header d-flex  align-items-center">
                        <template is="dom-if" if="{{esAccion(selected)}}">
                            <paper-icon-button icon="arrow-back" on-click="abreListaUsuario">volver a mis usuarios</paper-icon-button>
                        </template>
                        {{muestraTitulo(selected)}}
                        
                    </h5>
                    
                    <div class="card-body">
                        
                        
                    </div>
                </div>
                
            </div> -->


            

            
        `;
    }

    static get properties() {
        return {
            selected:{type:String, notify:true, value:"lista"},
            listaUsuarios:{type:Array, notify:true, value:[]},
            usuarioActivo:{type:Object, notify:true},
            esEditarUsuario:{type:Boolean,notify:true,value:false},
            listaPermisos:{type:Object, notify:true}
        }
    }

    constructor() {
        super();

        var datos=StaticDomAccess.MAIN_TREE;
        this.set("listaPermisos",datos);
    }

    esAccion(elegido){
        if(elegido=="editar" || elegido=="crear"){
            return true;
        }else{
            return false;
        }

    }

    muestraTitulo(ti){
        switch (ti) {
            case "lista":
                
            return "Mis usuarios";
            case "editar":
                
            return "Editar usuario";
            case "crear":
                
            return "Crear nuevo usuario";
        
            
        }
    }

  

    ready() {
        super.ready();
        
        if(this.lastInstalaciones){
            this.lastInstalaciones();
            this.set("lastInstalaciones",null);
        }

        this.set("lastInstalaciones",DataHelper.queryCollection(this,{
            "collection":"usuarios",
            "array":this.listaUsuarios,
            "arrayName":"listaUsuarios"
        }));
    }

  

    abreNuevoUsuario(){

        this.set("selected","crear"),
        this.set("esEditarUsuario",false);
        this.set("usuarioActivo",null);

    }

    abreEditaUsuario(e){
        var usuario=e.model.item;
        this.set("selected","editar"),
        this.set("esEditarUsuario",true);
        this.set("usuarioActivo",usuario);


    }

    abreListaUsuario(){
        this.set("selected","lista"),
        this.set("esEditarUsuario",false);
        this.set("usuarioActivo",null);
    }

    abreBorraUsuario(e){
        var usuario=e.model.item;
        var t=this;

       
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Eliminar usuario",
            message:"Al eliminar la información de este usuario no volverá a tener acceso a la plataforma, ¿desea continuar?",
			style:"width:600px; max-width:95% !important;",
            saveSpinner:{
				message:"Eliminando usuario"
			  },
			positiveButton: {
                text: "eliminar usuario",
                action: function(dialog, element) {
                    dialog.setSaving(true);
                    t.borraUsuario(usuario,{
                        success:function(){
                            PolymerUtils.Toast.show("Usuario eliminado");
                            dialog.close();
                        },
                        fail: function(){
                            PolymerUtils.Toast.show("Error al eliminar, Intentalo más tarde.");
                        }
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

    _sortInstalaciones(a,b){
        var n1=a.displayName;
        var n2=b.displayName;

        if (n1 < n2) {
            return -1;
          }
          if (n1 > n2) {
            return 1;
          }

          // names must be equal
          return 0;

    }


    
}

customElements.define('my-usuarios', MyUsuarios);