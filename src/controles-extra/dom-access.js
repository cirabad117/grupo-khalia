import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { AuthMixin } from "../mixins/auth-mixin.js";


class DomAccess extends AuthMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <!-- <template is="dom-if" if="[[loggedUserHasAccess(path,dataUser,accessList)]]"> -->
            <template id="vista" is="dom-if" if="{{permiso}}" restamp>
                <slot></slot>
            </template>
        `;
    }
    
    static get properties() {
        return {
            _loggedUser:{type:Object,notify:true,observer:"_asignaDatos"},
            dataUser:{type:Object,notify:true},
            accessList:{type:Object,notify:true},
            path:{type:String,notify:true},
            permiso:{type:Boolean, notify:true}
        };
    }
    
    static get observers() {
        return [
            'loggedUserHasAccess(path,dataUser,accessList)'
        ];
    }
    
    _asignaDatos(dataUser){
        var context=this;
        //console.log("_asignaDatos",dataUser);
        if(dataUser && dataUser.accessList){
            //console.log("_asignaDatos",dataUser);

            var nuevo=PolymerUtils.cloneObject(dataUser);
         
                
            
            context.set("dataUser",nuevo);
            context.set("accessList",nuevo.accessList);
        }else{
            context.set("dataUser",null);
        }
    }
    constructor(){
        super();
    }
    
    ready() {
        super.ready();
    }
    
    loggedUserHasAccess(path,user,accessList){
        //console.log("loggedUserHasAccess",path,user,accessList);
        if(path && path!=null && user && user!=null && accessList && accessList!=null){
            if(accessList.allAccess && accessList.allAccess==true){
                
                //return true;
                this.set("permiso",true);
                this.$.vista.render();
                
            }else{
                //console.log("accessList[path]",path,accessList);
                var activado=accessList[path];

                if(activado && activado!=null){
                    this.set("permiso",true);
                }else{
                    this.set("permiso",false);
                }

                
                //this.set("permiso",accessList[path]);
                this.$.vista.render();
                //console.warn("permiso",this.permiso);
    
            }
        }else{
            this.set("permiso",false);
            this.$.vista.render();
            //console.warn("permiso",this.permiso);
        }

      

        
    }
}

customElements.define('dom-access', DomAccess);