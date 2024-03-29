import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from "../mixins/utils-mixin.js";
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
class NuevaFecha extends DialogLayoutMixin(UtilsMixin(PolymerElement)) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            
            
            <vaadin-combo-box id="txtTipo" selected-item="{{tipoFecha}}" label="Tipo de actividad"
            error-message="valor inválido" items="[[listaTipos]]" item-label-path="texto" item-id-path="color">
                <template>
                    <b style$="background-color:[[item.fondo]];color:[[item.color]];">[[item.texto]]</b>
                </template>
            </vaadin-combo-box>

            
            
            <vaadin-date-picker label="Fecha" i18n="[[vaadinDateConfig]]" id="txtFecha" value="{{fecha}}"
            error-message="selecciona una fecha válida"></vaadin-date-picker>

            <paper-input id="txtNombre" label="Nombre de la actividad" value="{{nombre}}"
            error-message="valor inválido"></paper-input>

          



        `;
    }

    static get properties() {
        return {
            objFecha:{type:Object, notify:true},
            listaTipos:{type:Array, notify:true,value:[
                {"texto":"Salida","fondo":"var(--paper-blue-600)","color":"white"},
                {"texto":"Cumpleaños","fondo":"var(--paper-yellow-500)","color":"black"},
                {"texto":"Junta","fondo":"var(--paper-orange-700)","color":"black"},
                {"texto":"Entrega mensual","fondo":"var(--paper-red-600)","color":"white"},
                {"texto":"Fiesta / evento","fondo":"var(--paper-green-600)","color":"white"},
                {"texto":"Asueto","fondo":"var(--paper-grey-700)","color":"white"},
            ]}

        }
    }

    constructor(obj) {
        super();

        if(obj){
            this.set("objFecha",obj);

            this.set("tipoFecha",obj.tipo);
            this.set("fecha",obj.fecha);
            this.set("nombre",obj.nombre);

        }
    }

    ready() {
        super.ready();
    }

    guardaFecha(){
        if(!this.tipoFecha || this.tipoFecha==null){
            return this.$.txtTipo.invalid=true;
        }else{
            this.$.txtTipo.invalid=false;
        }

       

        if(!this.fecha || this.fecha==null || this.fecha.trim()==""){
            return this.$.txtFecha.invalid=true;
        }else{
            this.$.txtFecha.invalid=false;
        }

        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.$.txtNombre.invalid=true;
        }else{
            this.$.txtNombre.invalid=false;
        }

        var item={
            tipo:this.tipoFecha,
            nombre:this.nombre,
            fecha:this.fecha
        }

        var t=this;

        if(this.objFecha && this.objFecha.id){
            var idFecha=t.objFecha.id;
            var washingtonRef = firebase.firestore().collection("_fechas-khalia").doc(idFecha);
            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                tipo:t.tipoFecha,
                nombre:t.nombre,
                fecha:t.fecha
            }).then(() => {
                PolymerUtils.Toast.show("fecha guardada");
                t.set("tipoFecha",null);
                t.set("nombre",null);
                t.set("fecha",null);
                
                
                t.DialogLayout_closeDialog();
            
            }).catch((error) => {
                PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
                console.error("Error updating document: ", error);
            });

        }else{
            sharedFirebase.collection("_fechas-khalia").add(item)
		.then(function(docRef) {
			
			PolymerUtils.Toast.show("fecha guardada");
            t.set("tipoFecha",null);
            t.set("nombre",null);
            t.set("fecha",null);
			
			
			t.DialogLayout_closeDialog();
		
			
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
			PolymerUtils.Toast.show("Error al guardar. Intentalo más tarde.");
		});

        }




		
    }
}

customElements.define('nueva-fecha', NuevaFecha);