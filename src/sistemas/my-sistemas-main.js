import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';


import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/device-icons.js';

import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';



import '../bootstrap.js';
class MySistemasMain extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
                
             
            </style>

            
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand" >
                        <iron-icon icon="polymer"></iron-icon>
                        Departamento de Sistemas
                    </a>
                   <div class="form-inline my-2 my-lg-0">
                        <paper-tabs selected="{{selected}}" attr-for-selected="name" style="background-color:white;">
                            <paper-tab name="proyectos">
                                <iron-icon icon="device:developer-mode"></iron-icon>
                                <span style="margin:5px;">Proyectos</span>
                            </paper-tab>
                            <paper-tab name="inventario">
                                <iron-icon icon="icons:important-devices"></iron-icon>
                                <span style="margin:5px;">Inventario</span>
                            </paper-tab>
                            <paper-tab name="mantto">
                                <iron-icon icon="icons:build"></iron-icon>
                                <span style="margin:5px;">Mantenimiento</span>
                            </paper-tab>
                        </paper-tabs>
                    </div>
                </nav>

                <iron-pages selected="{{selected}}" attr-for-selected="name">
                    <div name="proyectos">
                        <my-sistemas-proyectos></my-sistemas-proyectos>
                    </div>

                    <div name="inventario">
                        <my-sistemas-inventario></my-sistemas-inventario>

                    </div>
                    <div name="mantto">
                        <my-sistemas-mantto lista-usuarios="[[listaUsuarios]]"></my-sistemas-mantto>
                    </div>

                </iron-pages>

                

           

            

        `;
    }

    static get properties() {
        return {
            listaUsuarios:{type:Array, notify:true,value:[]},
            selected:{type:String, notify:true,value:"proyectos",observer:"_cargaPagina"},
            
        }
    }

    constructor() {
        super();
    }

    _cargaPagina(str){
        switch (str) {
            case "proyectos":
                import("./my-sistemas-proyectos.js");
                
            break;
            case "inventario":
                import("./my-sistemas-inventario.js");
                
            break;
            case "mantto":
                import("./my-sistemas-mantto.js");
                
            break;
            default:
                
            break;
        
           
        }
    }

    

   
}

customElements.define('my-sistemas-main', MySistemasMain);