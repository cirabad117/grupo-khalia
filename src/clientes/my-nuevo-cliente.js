import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '@polymer/paper-input/paper-input.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

class MyNuevoCliente extends UtilsMixin(DialogLayoutMixin(PolymerElement)) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                    margin:10px;
                }
            </style>

            <vaadin-combo-box placeholder="venta por" selected-item="{{objVenta}}" items="[[_ventaPor]]"
            item-value-path="codigo" item-label-path="nombre"></vaadin-combo-box>

            
            <paper-input label="número de estación" value="{{noEs}}"></paper-input>
            
            <paper-input label="Razón social" value="{{razon}}"></paper-input>
            
            <vaadin-combo-box placeholder="Seleccione un estado" selected-item="{{estado}}" items="[[_estados]]"
            item-value-path="codigo" item-label-path="nombre"></vaadin-combo-box>

            

            
            <paper-input label="Nombre" value="{{nombre}}"></paper-input>
            
            <paper-input label="Correo electrónico" value="{{email}}"></paper-input>
            
            <paper-input label="Telefono" value="{{tel}}"></paper-input>

            
            
            
            
            
            
            

        `;
    }

    static get properties() {
        return {
            noEs:{type:String, notify:true},
            razon:{type:String, notify:true},
            estado:{type:Object, notify:true},
            nombre:{type:String, notify:true},
            email:{type:String, notify:true},
            tel:{type:String, notify:true},

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    guardaCliente(){

        var cliente={
            _timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            nomEstacion:this.noEs,
            razonSocial:this.razon,
            estado:this.estado,
            nombreCliente:this.nombre,
            email:this.email,
            telefono:this.tel
        };

        var t=this;
        sharedFirebase.collection("_clientes-khalia").add(cliente)
        .then(function(docRef) {
            t._dialog.close();
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}

customElements.define('my-nuevo-cliente', MyNuevoCliente);