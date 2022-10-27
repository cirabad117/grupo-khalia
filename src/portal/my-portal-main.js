import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { NavigationMixin } from '../mixins/navigation-mixin.js';

import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icons/iron-icons.js';

import '../bootstrap.js';
class MyPortalMain extends NavigationMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" on-click="regresa">
                    <iron-icon icon="arrow-back"></iron-icon>
                    Volver al inicio
                </a>
            </nav>

            <iron-pages selected="{{selected}}" attr-for-selected="name">
                <vida-khaliana name="vida-khaliana" fechas="[[listaActividades]]" personal="[[listaUsuarios]]"
                eventos="[[arrActividades]]"></vida-khaliana>
                <my-reconocimiento name="reconocimiento" personal="[[listaUsuarios]]"></my-reconocimiento>
                <my-buzon name="buzon"></my-buzon>
                <my-seguridad name="seguridad"></my-seguridad>
                <my-cursos name="cursos" cursos="[[arrActividades]]"></my-cursos>
                
            </iron-pages>
            



        `;
    }

    static get properties() {
        return {
            _routeParams:{observer: "_routeChanged"},
            selected:{type:String, notify:true,observer:"_cargaPagina"},
            listaActividades:{type:Array, notify:true,value:[]},
            listaUsuarios:{type:Array, notify:true,value:[]},

            arrActividades:{type:Array, notify:true, value:[]}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();

        var binder=new QueryBinder("actividades");
        
        binder.bindArray(this,this.arrActividades,"arrActividades");

    }

    _routeChanged(params){
        var t=this;
		if(params && params!=null && params.vista){
          
            t.set("selected",params.vista);
		}else{
            t.set("selected",null);
        }
	}


    _cargaPagina(str){
        switch (str) {
            case "vida-khaliana":
                import("./vida-khaliana.js");
            break;
            case "reconocimiento":
                import("./my-reconocimiento.js");
            break;
            case "buzon":
                import("./my-buzon.js");
            break;
            case "seguridad":
                import("./my-seguridad.js");
            break;
            case "cursos":
                import("./my-cursos.js");
            break;
            default:
            break;
        }
    }

    regresa(){
        NavigationUtils.navigate("/");
    }
}

customElements.define('my-portal-main', MyPortalMain);