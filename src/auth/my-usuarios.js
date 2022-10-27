import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { AuthMixin } from '../mixins/auth-mixin.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { DiccionarioMixin } from '../mixins/diccionario-mixin.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '../controles-extra/checkbox-tree.js';
import '@polymer/iron-collapse/iron-collapse.js';

import './my-nuevo-usuario.js';
import './my-nuevo-perfil.js';

import '../bootstrap.js';

class MyUsuarios extends DiccionarioMixin(UtilsMixin(AuthMixin(PolymerElement))) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <nav class="navbar bg-light">
                <span class="navbar-brand">
                    <iron-icon icon="face"></iron-icon>
                    Usuarios
                </span>
                <button type="button" class="btn btn-light" on-click="togglePerfil">
                    <iron-icon class="m-1" icon="account-box"></iron-icon>Perfiles
                </button>
            </nav>
            
            <div class="container mt-3">
                
                <iron-collapse opened="{{opened}}">
                    <div class="row border border-secondary rounded">
                        <div class="col-xl-12">
                            <div class="d-flex align-items-center">
                                <h5>Lista de perfiles</h5>
                                <div class="ml-auto">
                                    <paper-icon-button icon="add" on-click="agregaPerfil"></paper-icon-button>
                                    <paper-icon-button icon="close" on-click="togglePerfil"></paper-icon-button>
                                </div>
                            </div>

                            <div class="d-flex flex-wrap align-items-center">
                                <template is="dom-repeat" items="[[perfiles]]" as="perfil">
                                    <paper-item class="bg-light m-2">
                                        <paper-item-body>
                                            <div>[[getNombrePerfil(perfil)]]</div>
                                        </paper-item-body>
                                        <paper-icon-button icon="delete"></paper-icon-button>
                                    </paper-item>
                                </template>
                            </div>

                        </div>
                    </div>
                </iron-collapse>
                        
                   


                <div class="row text-center">
                    <template is="dom-repeat" items="[[listaUsuarios]]" sort="_sortUsers">

                        <div class="col-xl-3 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4 text-center">
                                
                                <img src$="[[getImagen(item.fotoUrl)]]" alt="" width="100"
                                class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                                
                                <h5 class="mb-0">{{item.displayName}}</h5>
                                
                                <div class="d-flex justify-content-center mb-0 mt-3">
                                    <paper-icon-button style="color:var(--paper-blue-500);"
                                    onmouseover="PolymerUtils.Tooltip.show(event,'Eliminar')"
                                    icon="delete" on-click="abreBorraUsuario"></paper-icon-button>
                                    
                                    <paper-icon-button style="color:var(--paper-blue-500);"
                                    onmouseover="PolymerUtils.Tooltip.show(event,'Editar')"
                                    icon="create" on-click="abreEditaUsuario"></paper-icon-button>
                                </div>
                            
                            </div>
                        
                        </div>
                    </template>
                </div>
            </div>
            
            <div style="position: fixed; bottom: 24px; right: 24px;">
                <div style="position: relative; cursor:pointer;" on-clicK="abreNuevoUsuario">
                    <paper-fab style="color:white; background-color:var(--paper-blue-500);" icon="add"></paper-fab>
                </div>
            </div>
            
            <!-- <iron-pages selected="{{selected}}" attr-for-selected="name">
                <div name="editar">
                    <my-nuevo-usuario on-cierra-vista="abreListaUsuario" es-editar="[[esEditarUsuario]]"
                    campo-activo="[[!esEditarUsuario]]" main-tree="[[listaPermisos]]"
                    usuario="[[usuarioActivo]]"></my-nuevo-usuario>
                </div>
                <div name="crear">
                    <my-nuevo-usuario on-cierra-vista="abreListaUsuario" es-editar="[[esEditarUsuario]]"
                    campo-activo="[[!esEditarUsuario]]" main-tree="[[listaPermisos]]"></my-nuevo-usuario>
                </div>
            </iron-pages> -->
        
        `;
    }

    static get properties() {
        return {
            opened:{type:Boolean, notify:true,value:false},
            
            listaUsuarios:{type:Array, notify:true, value:[]},
            perfiles:{type:Array, notify:true, value:[]},
            
            listaPermisos:{type:Object, notify:true}
        }
    }

    constructor() {
        super();

        var datos=StaticDomAccess.MAIN_TREE;
        this.set("listaPermisos",datos);
    }

    ready() {
        super.ready();

        var binder=new QueryBinder("perfiles");
        
        binder.bindArray(this,this.perfiles,"perfiles");
    }

    togglePerfil(){
        this.set("opened",!this.opened);
    }

    getNombrePerfil(obj){
        if(obj.nombrePuesto){
            return obj.nombrePuesto;
        }else{

            var areas=this.areasKhalia;

            var nom=this.buscaObjectoArreglo(areas,"tipo",obj.area);

            if(obj.puesto=="liderArea"){
                return "Líder" + " "+nom.nombre;
            }else{
                return "Gestor" + " "+nom.nombre;
            }


            return obj.puesto + " "+nom.nombre;
        }
    }

    getImagen(str){
        if(str && str!=null){
            return str;
        }else{
            return "../../images/user.png";
        }
    }
    
    

    agregaPerfil(){
        PolymerUtils.Dialog.createAndShow({
                type: "modal",
                title:"Crear perfil",
                style:"width:400px;max-width:95%;",
                element:"my-nuevo-perfil",
                saveSpinner:{
                    message:"Creando perfil..."
                },
                positiveButton: {
                    text: "Guardar",
                    action: function(dialog, element) {
                        element.guardaPerfil();
                        
                    }
                },
                negativeButton: {
                    text: "Cancelar",
                    action: function(dialog, element) {
                        dialog.close();
                    }
                }
            });
    
        
    }
    
    abreNuevoUsuario(){
        
        PolymerUtils.Dialog.createAndShow({
            type: "modal",
            title:"Agregar usuario",
			style:"width:95%;",
            element:"my-nuevo-usuario",
            saveSpinner:{
                message:"Creando usuario..."
            },
            positiveButton: {
                text: "Guardar",
                action: function(dialog, element) {
                    element.ejecutaUsuario();
                    
                }
            },
            negativeButton: {
                text: "Cancelar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});

    }
    
    abreEditaUsuario(e){
        var usuario=e.model.item;
        NavigationUtils.navigate("usuario",{id:usuario.uid})
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
    
    _sortUsers(a,b){
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

    // perfil:{type:Object,notify:true,value:null,observer: "_selectedPerfilChanged"},
    // _selectedPerfilChanged(list){
    //     console.log("_selectedPerfilChanged",list);
    //     if(list){
         
    //       this.selectTree(list);
    
    //     }else{
    //       this.set("displayName",null);
    //       this.clearTree();
    //     }
    // }

    // selectTree(list){
    //     var context=this;
    //     setTimeout(function(){
            
    //         context.shadowRoot.querySelector("#mainDomTree").selectTree(list);
    //     },500);
    //     //this.$.mainDomTree.selectTree(list);
    // }


    
}

customElements.define('my-usuarios', MyUsuarios);