import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { NavigationMixin } from '../mixins/navigation-mixin.js';

import './vida-khaliana.js';
import './my-reconocimiento.js';
import './my-buzon.js';
import './my-seguridad.js';

import '@polymer/iron-pages/iron-pages.js';
class MyPortalMain extends NavigationMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                    width:max-max-content;
                }
            </style>

            
            <iron-pages selected="{{selected}}" attr-for-selected="name">
                <vida-khaliana name="vida-khaliana"></vida-khaliana>
                <my-reconocimiento name="reconocimiento"></my-reconocimiento>
                <my-buzon name="buzon"></my-buzon>
                <my-seguridad name="seguridad"></my-seguridad>
                
            </iron-pages>
            



        `;
    }

    static get properties() {
        return {
            _routeParams:{observer: "_routeChanged"},
            selected:{type:String, notify:true}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    _routeChanged(params){
        var t=this;
		if(params && params!=null && params.vista){
          
            t.set("selected",params.vista);
		}else{
            t.set("selected",null);
        }
	}
}

customElements.define('my-portal-main', MyPortalMain);