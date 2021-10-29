import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { AuthMixin } from "../mixins/auth-mixin.js";

import '@polymer/paper-input/paper-input.js';
;
import '@polymer/iron-pages/iron-pages.js';

import './dialog-reset-pass.js';

import '../bootstrap.js';
import '../shared-styles.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

class MyInicioSesion extends DialogLayoutMixin(UtilsMixin(AuthMixin(PolymerElement))) {
    
    static get template() {
        return html`
            <style include="bootstrap shared-styles">
                :host{
                    display:block;
                }
              
            </style>
            
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                       

                                <paper-input id="txtUser" label="usuario" value="{{user}}" error-message="valor inválido"></paper-input>

                                <!-- <paper-radio-group selected="{{selected}}" attr-for-selected="name">
                                    <paper-radio-button name="correo">correo electronico</paper-radio-button>
                                    <paper-radio-button name="user">nombre de usuario</paper-radio-button>
                                </paper-radio-group>

                                
                                <iron-pages selected="{{selected}}" attr-for-selected="name">
                                    <div name="correo">
                                    <paper-input id="txtEmail" label="correo electronico" value="{{email}}" error-message="valor inválido"></paper-input>

                                    </div>
                                    <div name="user">
                                    <paper-input id="txtUser" label="nombre de usuario" value="{{user}}" error-message="valor inválido"></paper-input>

                                    </div>
                                </iron-pages> -->
                                
                                



                                <paper-input id="txtPass" type="password" label="contraseña" value="{{pass}}" error-message="valor inválido"></paper-input>

                                <hr class="my-4">

                                <paper-button on-click="iniciaSesion" style="margin: 0 !important;" raised class="btn btn-lg btn-primary btn-block">acceder</paper-button>

                                <div class="text-center" style="margin-top:30px;">
                                    <paper-button class="btn nuevo-link" on-click="abreDialogoPass">olvidé mi contraseña</paper-button>
                                </div>

                           
                        
                    </div>
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            email:{type:String, notify:true},
            user:{type:String, notify:true},
            pass:{type:String, notify:true},
            _loggedUser:{type:Object, notify:true}

        };
    }

    abreDialogoPass(){
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			title:"restablecer contraseña",
            element:"dialog-reset-pass",
			style:"width:400px;max-width:95%;",
			positiveButton: {
                text: "Crear",
                action: function(dialog, element) {
                    element.enviaResetCorreo();
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
    
    cambia(){
        this.dispatchEvent(new CustomEvent('cambia-activa', {detail: {"numero":"signup"} }));
    }

    iniciaSesion(){



        if(!this.user || this.user==null || this.user.trim()==""){
            return this.$.txtUser.invalid=true;
        }else{
            this.$.txtUser.invalid=false;
        }

       
        var correoAcceder=this.user+"@gkhalia.com"
       

        // if(this.selected=="correo"){
        //     if(!this.email || this.email==null || this.email.trim()==""){
        //         return this.$.txtEmail.invalid=true;
        //     }else{
        //         this.$.txtEmail.invalid=false;
        //     }

        //     var correoAcceder=this.email;
        // }else{
        //     if(!this.user || this.user==null || this.user.trim()==""){
        //         return this.$.txtUser.invalid=true;
        //     }else{
        //         this.$.txtUser.invalid=false;
        //     }

        //     var correoAcceder=this.user+"@clientes.gkhalia.com"
        // }



        

        if(!this.pass || this.pass==null || this.pass.trim()==""){
            return this.$.txtPass.invalid=true;
        }else{
            this.$.txtPass.invalid=false;
        }

        var data={
            email:correoAcceder,
            password:this.pass
        }

        var t=this;
        var su=function() {
            //NavigationUtils.navigate("instalaciones");
            // window.location.reload();
            // NavigationUtils.navigate("prospectos");
            t.DialogLayout_closeDialog();
            t.set("email",null);
            t.set("pass",null);
            
        };
        var er=function() {
            PolymerUtils.Toast.show("error al iniciar sesion");
        };

        this.loginPassword(data,su,er);
    }


    // funcionExito(){
    //     this.set("email",null);q
    //     this.set("pass",null);
    //     NavigationUtils.navigate("instalaciones");
    // }

    // funcionError(){
    //     PolymerUtils.Toast.show("error al iniciar sesion");
    // }
}

customElements.define('my-inicio-sesion', MyInicioSesion);