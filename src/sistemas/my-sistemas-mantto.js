import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../general-controls/my-lista-general.js';
import './my-nuevo-mantto.js';
class MySistemasMantto extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <my-lista-general arreglo-items="[[registros]]"
            lista-filtro="[[listaTipo]]" lista-ordena="[[opcionesOrdena]]"
            lista-cols="[[datosMantto]]"
            funcion-ordenar="[[funcionOrdenaEquipo]]" funcion-buscar="[[funcionFiltraEquipo]]"
            on-ejecuta-accion="abreNuevoMantto" on-ejecuta-item="ejecutaAccionItem"></my-lista-general>

        `;
    }

    static get properties() {
        return {
            registros:{type:Array, notify:true, value:[]},
            datosMantto:{type:Array, notify:true, value:[
                {"titulo":"Fecha de registro","dato":"_timestamp"},
                {"titulo":"Tipo de mantenimiento","dato":"nombre"},
                {"titulo":"Acciones","listaAcciones":[
                    {"accion":"accionItem","icono":"icons:input","texto":"Abrir detalles"},
                    {"accion":"eliminar","icono":"icons:delete-forever","texto":"Eliminar"}
                ]}
            ]},
            listaTipo:{type:Array, notify:true,value:[
                {color:"#FFEB3B",base:"black",texto:"PREVENTIVO"},
                {color:"#FFEB3B",base:"black",texto:"CORRECTIVO"},
            ]},
            opcionesOrdena:{type:Array, notify:true, value:[
                // {"opcion":"nsAs","texto":"Número de serie (A - Z)"},
                // {"opcion":"nsDe","texto":"Número de serie (Z - A)"},
                {"opcion":"fechaAs","texto":"fecha de registro(A - Z)"},
                {"opcion":"fechaDe","texto":"fecha de registro(Z - A)"},
                
            ]},

            listaUsuarios:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    abreNuevoMantto(){
        var arr=this.listaUsuarios;
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-nuevo-mantto",
            params:[arr],
			title:"Nuevo registro de mantenimiento",
			style:"width:95%;",
			positiveButton: {
                text: "guardar",
                style:"background-color:var(--paper-blue-500);color:white",
                action: function(dialog, element) {
                    element.guardaMantto();
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

customElements.define('my-sistemas-mantto', MySistemasMantto);