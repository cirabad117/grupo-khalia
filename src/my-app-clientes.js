import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';

import './general-controls/my-lista-general.js';
import './app-clientes/my-nuevo-app.js';
import './app-clientes/my-datos-app.js';
import './app-clientes/my-comentarios-app.js';

import './bootstrap.js';

class MyAppClientes extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                paper-tabs paper-tab.iron-selected {
                    background-color: #DCEDC8;
                }
            </style>

            <div class="container">
                <paper-tabs selected="{{selected}}" style="background-color:white;">
                    <paper-tab>Clientes activos</paper-tab>
                    <paper-tab>Comentarios</paper-tab>
                </paper-tabs>
                <iron-pages selected="{{selected}}">
                    <div>
                        <my-lista-general vista="appClientes" arreglo-items="{{listaClientesApp}}" titulo="razon"
                        lista-filtro="[[listaEstatus]]" lista-ordena="[[opcionesOrdena]]"
                        lista-cols="[[datosApp]]"
                        funcion-buscar="[[funcionProspecto]]"
                        on-ejecuta-accion="abreNuevoApp" on-ejecuta-item="abreClienteApp"
                        color-boton="#BF360C"></my-lista-general>
                    </div>
                    <div>
                        <my-comentarios-app></my-comentarios-app>
                    </div>
                   
                </iron-pages>
                
            </div>
            
            
        `;
    }

    static get properties() {
        return {
            selected:{type:Number, notify:true, value:0},
            datosApp:{type:Array, notify:true, value:[
                {"titulo":"clave de producto","dato":"_key"},
                {"titulo":"razon social","dato":"razon"},
                {"titulo":"tipo de membresia","dato":"tipoMembresia","valorInterno":"tipo"},
                {"titulo":"estado","dato":"objCliente",}
                
            ]},
            listaClientesApp:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        var binder=new QueryBinder("_clientes",{
            "specialRef":firebase.firestore().collection("_clientes")
        });
        
        binder.bindArray(this,this.listaClientesApp,"listaClientesApp");
    }

    abreClienteApp(e){
        var elegido=e.detail.valor;
        console.log("abreClienteApp",elegido);
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-datos-app",
			style:"width:700px;max-width:95%;",
            params:[elegido],
			// positiveButton: {
            //     text: "Crear",
            //     action: function(dialog, element) {
            //         // element.accionBotonGuardar();
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

    abreNuevoApp(){
       PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-nuevo-app",
			title:"Agregar cliente a plataforma",
			style:"width:600px;max-width:95%;",
			positiveButton: {
                text: "Crear",
                action: function(dialog, element) {
                    element.accionBotonGuardar();
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


}

customElements.define('my-app-clientes', MyAppClientes);