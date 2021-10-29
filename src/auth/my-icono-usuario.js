import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { AuthMixin } from '../mixins/auth-mixin.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-button/paper-button.js';

import './my-inicio-sesion.js';

class MyIconoUsuario extends AuthMixin(UtilsMixin(PolymerElement)) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
                
                .circle-div{
                    border-radius: 50%;
                    color: white;
                    cursor:pointer;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-style: solid;
                    border-width: 1px;
                }
                .floating-card{
                    background-color: white;
                    border-radius: 5px;
                    padding: 16px;
                }
                
                #dropdown{
                    z-index: 999;
                }
            </style>
            <template is="dom-if" if="[[_loggedUser]]">
            <div id="actualCircle" style\$="[[getSizeStyle(tam)]] background-color: var(--paper-[[getShowColor(_loggedUser)]]-500); border-color: var(--paper-[[getShowColor(_loggedUser)]]-500);" class="circle-div">
                <div style\$="[[getFontSize(tam)]]">[[getFirstLetter(_loggedUser)]]</div>
            </div>
            </template>

            <template is="dom-if" if="[[!_loggedUser]]">
                
                <paper-button on-click="initLogin">iniciar sesion</paper-button>
                
            </template>


           

        `;
    }

    static get properties() {
        return {
            tam:{type:String,notify:true,value:null},
            
        };
    }
    
    getShowColor(contact){
        if(!contact){
            return "teal";
        }
        if(!contact.badgeColor){
            return "teal";
        }
        return contact.badgeColor;
    }

    getFontSize(tam){
        if(tam){
            if(parseFloat(tam.replace("px",""))>=48){
                return "font-size: 30px;";
            }
        }else{
            return "font-size: 20px;";
        }
    }
    
    getSizeStyle(tam){
        if(tam){
            return "width: "+tam+" !important; height: "+tam+" !important;"
        }else{
            return "width: 32px !important; height: 32px !important;";
        }
    }
    
    getFirstLetter(user){
        if(user){
            if(user.displayName){
                return user.displayName.substring(0,1).toUpperCase();
            }
            else{
                return user.email.substring(0,1).toUpperCase();
            }
        }
        else{
            return "";
        }
    }

    initLogin(){
         PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"iniciar sesión",
			element:"my-inicio-sesion",
			
			style:"width:400px;max-width:95%;",
			// positiveButton: {
            //     text: "Crear",
            //     action: function(dialog, element) {
            //         element.iniciaSesion();
            //     }
            // },
            negativeButton: {
                text: "Cerrar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});
    }
}

customElements.define('my-icono-usuario', MyIconoUsuario);