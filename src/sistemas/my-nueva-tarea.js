import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

import '../general-controls/my-text-editor.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin';


class MyNuevaTarea extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                    overflow-y:scroll;
                    max-height:550px;
                }

                .titulo{
                    border-bottom:1px solid var(--paper-blue-700);
                 
                }
            </style>
            
            <vaadin-combo-box id="comboAgente" label="Módulo" selected-item="{{moduloElegido}}" items="[[modulos]]"
            item-value-path="id" item-label-path="nombre" error-message="seleccione una opción">
                <template>
                    <b style$="background-color:[[item.fondo]];color:[[item.txtColor]];">[[item.nombre]]</b>
                </template>
            </vaadin-combo-box>

            <paper-input label="nombre de la tarea" value="{{nombreTarea}}" maxlength="50"></paper-input>
            
            
            <div class="titulo">
                <h5>Descripción</h5>
            </div>
            <my-text-editor id="text-campos" texto-incrustar="{{campos}}"></my-text-editor>



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

        if(!this.moduloElegido || this.moduloElegido==null ){
            return PolymerUtils.Toast.show("Selecciona un módulo");
        }

        if(!this.nombreTarea || this.nombreTarea==null || this.nombreTarea.trim()==""){
            return PolymerUtils.Toast.show("Escribe un nombre a la tarea");
        }

        var texto=this.shadowRoot.querySelector("#text-campos").muestraTexto();

        if(!texto || texto==null || texto.trim()=="" || texto=="<p></p>" || texto=="<p><br></p>"){
            return PolymerUtils.Toast.show("escribe un texto válido para los campos");
        }
        var tarea={
            modulo:this.moduloElegido,
            nombreTarea:this.nombreTarea,
            campos:texto,
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