import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin';


class MyNuevaTarea extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <vaadin-combo-box id="comboAgente" label="Módulo" selected-item="{{moduloElegido}}" items="[[modulos]]"
            item-value-path="id" item-label-path="nombre" error-message="seleccione una opción">
                <template>
                    <b style$="background-color:[[item.fondo]];color:[[item.txtColor]];">[[item.nombre]]</b>
                </template>
            </vaadin-combo-box>

            <paper-input style="width:250px;"label="nombre de la tarea" value="{{nombreTarea}}" ></paper-input>
            
            <paper-textarea label="descripción" value="{{descripcion}}"></paper-textarea>


        `;
    }

    static get properties() {
        return {
            idProyecto:{type:String, notify:true},
            modulos:{type:Array, notify:true, value:[]}
        }
    }

    constructor(id,arr) {
        super();
        if(id){
            this.set("idProyecto",id);
        }
        
        if(arr){
            this.set("modulos",arr);
        }
    }

    ready() {
        super.ready();
    }

    guardaTarea(){
        var tarea={
            modulo:this.moduloElegido,
            descripcion:this.descripcion,
            nombreTarea:this.nombreTarea,
            estatus:"backlog"
        }
        var id=this.idProyecto;

        var col="estatus-area/sistemas/proyectos/"+id+"/tareas";

        var t=this;
        DataHelper.insert(this,{
            collection:col,
            object:tarea,
            includeTimestamp:true,
            includeUser:true,
            success:function(){
                PolymerUtils.Toast.show("Registro agregado con éxito");
                t.DialogLayout_closeDialog();

            
            },
            error:function(err) {
                PolymerUtils.Toast.show("Error al guardar, intentalo más tarde");
                console.log("fallo la insercion",err);
            }
        });
    }
}

customElements.define('my-nueva-tarea', MyNuevaTarea);