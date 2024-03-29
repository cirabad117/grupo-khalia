import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/device-icons.js';

import '../controles-extra/dom-access.js';

import '../bootstrap.js';
class MyDropdownButton extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
                
                .dropdown{
                    z-index:1;
                    display: inline-block;
                    position: relative;
                    color:rgba(255, 255, 255, 0.5);
                    
                    
                }
                
                .dropdown-content {
                    min-width:130px;
                    background-color:#FFFFFF;
                    display: none;
                    position: absolute;
                    
                    overflow: auto;
                    box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.4);
                }

                .dropdown:hover{
                    color:#BEBDC0;
                    cursor:pointer;
                }

                .dropdown:hover .dropdown-content {
                    display: block;
                    cursor:pointer;
                   
                }
                .dropdown-content span {
                    display: block;
                    color: #000000;
                    margin:5px;
                    padding: 5px;
                    text-decoration: none;
                }
                .dropdown-content span:hover {
                    color: #FFFFFF;
                    background-color: var(--paper-blue-700);
                }
            </style>
            
            <div class="dropdown">
                <span class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    [[titulo]]
				</span>
                <div class="dropdown-content">
                    <template is="dom-repeat" items="[[items]]">
                        <dom-access path="[[item.permiso]]">
                            <span on-click="navega" class="d-flex align-items-center justify-content-start"><iron-icon style="margin:3px;"icon="[[item.icono]]"></iron-icon>[[item.nombre]]</span>

                        </dom-access>

                    </template>
                    <!-- <a href="https://blog.hubspot.com/">Blog</a>
                    <a href="https://academy.hubspot.com/">Academy</a>
                    <a href="https://www.youtube.com/user/hubspot">YouTube</a> -->
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            titulo:{type:String, notify:true},
            items:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    navega(e){
        var item=e.model.item;

        if(item.link && item.link!=null && item.link.trim()!=""){
            NavigationUtils.navigate(item.link);
        }
    }
}

customElements.define('my-dropdown-button', MyDropdownButton);