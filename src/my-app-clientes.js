import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import './general-controls/my-lista-general.js';
import './app-clientes/my-nuevo-app.js';

class MyAppClientes extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <my-lista-general vista="appClientes" arreglo-items="[[listaClientesApp]]" titulo="razon"
            lista-filtro="[[listaEstatus]]" lista-ordena="[[opcionesOrdena]]"
            funcion-buscar="[[funcionProspecto]]"
            on-ejecuta-accion="abreNuevoApp" on-ejecuta-item="abreClienteApp"
            color-boton="#BF360C" modo-vista="cuadro"></my-lista-general>

        `;
    }

    static get properties() {
        return {
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