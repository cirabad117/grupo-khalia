import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DiccionarioMixin } from '../mixins/diccionario-mixin';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

class MyEditaRec extends DialogLayoutMixin(DiccionarioMixin(PolymerElement)) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <vaadin-combo-box label="Departamento de mes" selected-item="{{depto}}" items="[[areasKhalia]]"
            item-value-path="tipo" item-label-path="nombre" error-message="seleccione una opción"></vaadin-combo-box>

            <vaadin-combo-box label="Líder de mes" selected-item="{{lider}}" items="[[empleados]]"
            item-value-path="uid" item-label-path="displayName" error-message="seleccione una opción"></vaadin-combo-box>

            <vaadin-combo-box label="Gestor de mes" selected-item="{{gestor}}" items="[[empleados]]"
            item-value-path="uid" item-label-path="displayName" error-message="seleccione una opción"></vaadin-combo-box>


            

        `;
    }

    static get properties() {
        return {
            empleados:{type:Array, notify:true, value:[]}

        }
    }

    constructor(arr) {
        super();

        if(arr){
            this.set("empleados",arr);
        }
    }

    ready() {
        super.ready();
    }

    guardaRecs(){
        if(!this.depto || this.depto==null){
            PolymerUtils.Toast.show("Selecciona un departamento");
        }
        if(!this.lider || this.lider==null){
            PolymerUtils.Toast.show("Selecciona un líder");
        }
        if(!this.gestor || this.gestor==null){
            PolymerUtils.Toast.show("Selecciona un gestor");
        }
        var db=firebase.firestore();
        var batch = db.batch();

        var t=this;
        
        var nycRef = db.collection("reconocimientos").doc("departamento");
        batch.set(nycRef, t.depto);
        var nycRef = db.collection("reconocimientos").doc("lider");
        batch.set(nycRef, t.lider);
        var nycRef = db.collection("reconocimientos").doc("gestor");
        batch.set(nycRef, t.gestor);
        
        batch.commit().then(() => {
            PolymerUtils.Toast.show("Reconomientos actualizados");
            t.DialogLayout_closeDialog();
        }).catch((error) => {
            PolymerUtils.Toast.show("error al actualizar");
            console.error("Error batch: ", error);
        });


    }
}

customElements.define('my-edita-rec', MyEditaRec);