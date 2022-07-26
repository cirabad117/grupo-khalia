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

import '../controles-extra/checkbox-tree.js';

import '../bootstrap.js';


class MyNuevoUsuario extends AuthMixin(DialogLayoutMixin(UtilsMixin(PolymerElement))) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="card">
                
                <div class="card-body">
                    <h5 class="card-title d-flex  align-items-center">
                        <paper-icon-button icon="arrow-back" on-click="despachaVolver">volver a mis usuarios</paper-icon-button>
                        
                        {{muestraTitulo(esEditar)}}
                    </h5>
                    <paper-input id="txtUser" label="nombre de usuario" value="{{user}}" error-message="valor inválido" disabled="[[esEditar]]"></paper-input>
                    <paper-input id="txtNombre" value="{{nombre}}" label="Nombre completo" error-message="valor inválido"></paper-input>                  
                    <h4>Lista de permisos de acceso</h4>
                    <div style="max-height:300px; overflow-y:scroll;">
                        
                        <checkbox-tree object-tree="[[mainTree]]" id="mainDomTree"></checkbox-tree>
                    </div>
                    
                    <!-- <template is="dom-if" if="[[esEditar]]">
                        <paper-button on-click="cambiaBolActivo">[[muestraTextoBoton(campoActivo)]]</paper-button>
                    </template> -->
                    <paper-input id="txtContra" value="{{pass}}" type="password" label="Contraseña" error-message="valor inválido"></paper-input>
                    <paper-input id="txtConfirm" value="{{pass2}}" type="password" label="Confirmar contraseña" error-message="valor inválido"></paper-input>




                </div>
                <div class="card-footer">
                    <template is="dom-if" if="[[esEditar]]">
                        <paper-button on-click="modificaUsuario">modificar usuario</paper-button>
                    </template>
                    <template is="dom-if" if="[[!esEditar]]">
                        <paper-button on-click="guardaUsuario">guardar usuario</paper-button>
                    </template>
                </div>
                
            </div>
            
           
            

            
        `;
    }

    static get properties() {
        return {
            nombre:{type:String, notify:true},
            user:{type:String, notify:true},
            email:{type:String, notify:true,observer:"_muestraUsuario"},
            pass:{type:String, notify:true},
            pass2:{type:String, notify:true},

            esEditar:{type:Boolean, notify:true, value:false},

            uid:{type:String, notify:true},
            mainTree:{type:Object, notify:true},

            perfil:{type:Object,notify:true,value:null,observer: "_selectedPerfilChanged"},

            campoActivo:{type:Boolean, notify:true,value:false}
        }
    }

    constructor() {
        super();
        
    }

    _muestraUsuario(str){
        if(str && str!=null && str.trim()!=""){
            var arr=str.split("@");
            this.set("user",arr[0]);
        }
        
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

    muestraTextoBoton(campoActivo){
        if(campoActivo==true){
            return "cancelar edición de contraseña";
        }else{
            return "editar contraseña";
        }
    }

    muestraIcono(bol){
        if(bol==true){
            return "arrow-drop-up";
        }else{
            return "arrow-drop-down";
        }
    }

    guardaUsuario(){
        console.log("guardamos usuario en el negocio:",HELPER_OMNIPOTENT_KEY);
        var dialog=PolymerUtils.Dialog.createAndShow({
            type: "modal",
            saveSpinner:{
                message: "Registrando Usuario",
                saving: true
            },
            style:"width: 400px; height: 300px;",
            smallStyle: "width: 95% !important;"
        });

       

        if(!this.user || this.user==null || this.user.trim()==""){
            return this.$.txtUser.invalid=true;
        }else{
            this.$.txtUser.invalid=false;
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
            _timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            name:this.nombre,
            email:correoAcceder,
            nombre:this.nombre,
            password:this.pass,
            accessList:lista
        };

        var arreglado=PolymerUtils.fixDataForFirebase(nuevoUsuario);
        var t=this;
        
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


    modificaUsuario(){
        var dialog=PolymerUtils.Dialog.createAndShow({
            type: "modal",
            saveSpinner:{
                message: "Modificando Usuario",
                saving: true
            },
            style:"width: 400px; height: 300px;",
            smallStyle: "width: 95% !important;"
        });
        console.log("modificamos usuario en el negocio:",HELPER_OMNIPOTENT_KEY)
        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.$.txtNombre.invalid=true;
        }else{
            this.$.txtNombre.invalid=false;
        }
       
        
        var acceso=this.$.mainDomTree.getSelectedList();
        
        var editar={
            uid:this.uid,
            displayName:this.nombre,
            email:this.email,
            
            accessList:acceso
            //password:this.pass
        };
    
        var ps=this.pass;

      
            if(!this.ps || this.ps==null || this.ps.trim()==""){
                return this.$.txtContra.invalid=true;
            }else{
                this.$.txtContra.invalid=false;
            }
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


            editar["password"]=ps;
        


        console.log("veamos el usuario a editar",editar);

        var arreglado=PolymerUtils.fixDataForFirebase(editar);
        
        var t=this;
       
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
    }

  
}

customElements.define('my-nuevo-usuario', MyNuevoUsuario);