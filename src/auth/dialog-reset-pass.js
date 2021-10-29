import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";
import { UtilsMixin } from "../mixins/utils-mixin.js";

class DialogResetPass extends UtilsMixin(DialogLayoutMixin(PolymerElement)) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <paper-input id="txtUser" label="verificar usuario de accesso" value="{{user}}">
                <paper-icon-button slot="suffix" icon="search" on-click="buscaUsuario"></paper-icon-button>
            </paper-input>


            
            <template is="dom-if" if="[[usuarioEditar]]">

            <paper-input id="txtContra" value="{{pass}}" type="password" label="nueva contraseña" error-message="valor inválido"></paper-input>
            <paper-input id="txtConfirm" value="{{pass2}}" type="password" label="Confirmar nueva contraseña" error-message="valor inválido"></paper-input>

            </template>
            


            

            

        `;
    }

    static get properties() {
        return {
            user:{type:String, notify:true},
            pass:{type:String, notify:true},
            pass2:{type:String, notify:true}
        }
    }

    buscaUsuario(){
        if(!this.user || this.user==null || this.user.trim()==""){
            return this.shadowRoot.querySelector("#txtUser").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtUser").invalid=false;
        }
        var esEmail=this.validateEmail(this.user);

        if(esEmail==true){
            var correoBuscar=this.user;
        }else{
            var correoBuscar=this.user+"@gkhalia.com"
        }

        var t=this;

        firebase.firestore().collection("usuarios").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                

                var usuario=doc.data();
                usuario["_key"]=doc.id;

                if(usuario.email==correoBuscar){
                    console.log(doc.id, " => ", doc.data());
                    return t.set("usuarioEditar",usuario);
                }

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

    enviaResetCorreo(){

        // if(!this.user || this.user==null || this.user.trim()==""){
        //     return this.shadowRoot.querySelector("#txtUser.invalid=true;
        // }else{
        //     this.shadowRoot.querySelector("#txtUser.invalid=false;
        // }

        // var esEmail=this.validateEmail(this.user);

        // if(esEmail==true){
        //     var correoAcceder=this.user;
        // }else{
        //     var correoAcceder=this.user+"@clientes.gkhalia.com"
        // }



        if(!this.pass || this.pass==null || this.pass.trim()==""){
            return this.shadowRoot.querySelector("#txtContra").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtContra").invalid=false;
        }

        var ps=this.pass;
        
        if(ps.length<6){
            this.shadowRoot.querySelector("#txtContra").errorMessage="mínimo 6 caracteres";
            return this.shadowRoot.querySelector("#txtContra").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtContra").errorMessage="valor inválido";
            this.shadowRoot.querySelector("#txtContra").invalid=false;
        }

        
        if(!this.pass2|| this.pass2==null || this.pass2.trim()==""){
            return this.shadowRoot.querySelector("#txtConfirm").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtConfirm").invalid=false;
        }

        var ps2=this.pass2;

        if(ps!=ps2){
            this.shadowRoot.querySelector("#txtConfirm").errorMessage="las contraseñas no coinciden";
            return this.shadowRoot.querySelector("#txtConfirm").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtConfirm").invalid=false;
        }

        console.log("vamos a modificar esta contraseña",this.usuarioEditar,this.pass);


        var t=this;

        var objUser={
            uid:this.usuarioEditar._key,
            email:this.usuarioEditar.email,
            displayName:this.usuarioEditar.displayName,
            password:this.pass,
            
        };
        var actualizaPassword = firebase.functions().httpsCallable('actualizaPassword');
        actualizaPassword(objUser).then(function (result) {
            console.log("result actualizaPassword",result);
            t.DialogLayout_closeDialog();
            PolymerUtils.Toast.show("Contraseña actualizada con exito.");

        }).catch(function (error) {
            t.DialogLayout_closeDialog();
            PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde");
       
        });




    }

    creaNuevoUsuario(objUser,callbacks) {
        var t=this;
        console.log("Inserting user", objUser.name);
        var insertNewUser = firebase.functions().httpsCallable('insertNewUser');
        insertNewUser(objUser).then(function (result) {
            if (callbacks && callbacks.finished) {
                callbacks.finished();
            }
            if (result.data.user) {
                if (callbacks && callbacks.success) {
                    callbacks.success();
                }
                PolymerUtils.Toast.show("¡Usuario registrado con éxito!");
            } else {
                if (callbacks && callbacks.fail) {
                    callbacks.fail();
                }
                DataHelper.auth.showErrorToast(result.data.error);
            }
            console.log(result.data.result);
        });
        
    }
}

customElements.define('dialog-reset-pass', DialogResetPass);