import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { NavigationMixin } from '../mixins/navigation-mixin.js';

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';

import './my-proyecto-item.js';
import './my-tarea.js';
import './my-nueva-tarea.js';
import './my-nuevo-modulo.js';

import '../bootstrap.js';

class MySistemasProyecto extends NavigationMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                .item{
                    border-radius:10px;
                    border:solid 1px var(--paper-blue-500);
                    min-height:300px;
                }

            </style>

            <div class="container-fluid">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title d-flex align-items-center">
                            <span>
                                <paper-icon-button icon$="{{muestraIcono(selected)}}" on-click="backSistemas"></paper-icon-button>
                            </span>
                            <h3>[[proyecto.nombre]] - [[proyecto.plataforma]]</h3>
                            
                          
                        </div>
                        
                        <iron-pages selected="{{selected}}" attr-for-selected="name">
                            <div name="vista">
                                
                                <h5>Módulos</h5>

                                <div class="d-flex">
                                    <div class="d-flex flex-wrap">
                                        <template is="dom-repeat" items="[[modulos]]">
                                            <!-- <h4 style="margin:5px;"><span class="badge" style$="[[muestraEstilo(item)]]"></span></h4> -->
                                            
                                            <paper-item style$="margin:5px; [[muestraEstilo(item)]]">
                                                <paper-item-body>
                                                    <div>[[item.nombre]]</div>
                                                </paper-item-body>
                                                
                                                <paper-icon-button icon="clear" on-click="borraModulo"></paper-icon-button>
                                                
                                            </paper-item>
                                            
                                        </template>
                                    </div>
                                    <div class="ml-auto">
                                        <button type="button" class="btn btn-sm btn-primary m-1" on-click="abreNuevoModulo">Agregar módulo</paper-button>
                                        <button type="button" class="btn btn-sm btn-primary m-1" on-click="abreNuevaTarea">Agregar tarea</paper-button>
                                    </div>
                                </div>

                                
                                <div class="row">
                                    <div class="col-md-3">
                                        <my-proyecto-item class="item" tipo="backlog" on-elige-tarea="selectTarea" titulo="Pendientes" tareas="{{listaTareas}}"></my-proyecto-item>
                                    </div>
                                    <div class="col-md-3">
                                        <my-proyecto-item class="item" tipo="progress" on-elige-tarea="selectTarea" titulo="En progreso" tareas="{{listaTareas}}"></my-proyecto-item>
                                    </div>
                                    <div class="col-md-3">
                                        <my-proyecto-item class="item" tipo="validate" on-elige-tarea="selectTarea" titulo="Validación" tareas="{{listaTareas}}"></my-proyecto-item>
                                    </div>
                                    <div class="col-md-3">
                                        <my-proyecto-item class="item" tipo="complete" on-elige-tarea="selectTarea" titulo="Completadas" tareas="{{listaTareas}}"></my-proyecto-item>
                                    </div>
                                </div>
                            </div>
                            <div name="tarea">
                                <my-tarea tarea="{{tareaElegida}}" id-proyecto="{{proyecto.id}}" modulos="[[modulos]]"></my-tarea>
                            </div>
                        </iron-pages>
                    </div>
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            proyecto:{type:Object, notify:true, observer:"_consultaDatos"},
            modulos:{type:Array, notify:true, value:[]},
            listaTareas:{type:Array, notify:true, value:[]},
            _routeParams:{observer: "_routeChanged"},
     
            selected:{type:String, notify:true, value:"vista"},
            tareaElegida:{type:Object, notify:true}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    
    }

    muestraEstilo(obj){
        return "background-color:"+obj.fondo+";color:"+obj.txtColor+";"
    }
    muestraIcono(str){
        return str=="vista" ? "arrow-back" : "chevron-left";
    }

    eligeVista(){
        this.set("selected","vista");
        this.set("tareaElegida",null);
    }

   

    selectTarea(e){
        console.log("selectTarea",e.detail.tarea);
        this.set("tareaElegida",e.detail.tarea);
        this.set("selected","tarea");
    }

    cambiaBol(){
        this.set("esGuardar",!this.esGuardar);
    }

    abreNuevaTarea(){
        var id=this.proyecto.id;
        var arr=this.modulos;
        PolymerUtils.Dialog.createAndShow({
			element:"my-nueva-tarea",
			title:"Agregar tarea",
            params:[id,arr],
            style:"width:450px;max-width:95%;",
			positiveButton: {
                text: "guardar tarea",
                style:"background-color:var(--paper-blue-500);color:white",
                action: function(dialog, element) {
                    element.guardaTarea();
                }
            },
            negativeButton: {
                text: "Cancelar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});
    }

    abreNuevoModulo(){
        var id=this.proyecto.id;
        var arr=this.modulos;
        PolymerUtils.Dialog.createAndShow({
			element:"my-nuevo-modulo",
			title:"Agregar modulo",
            params:[id,arr],
			// style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "guardar modulo",
                style:"background-color:var(--paper-blue-500);color:white",
                action: function(dialog, element) {
                    element.guardaModulo();
                }
            },
            negativeButton: {
                text: "Cancelar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});
    }

    borraModulo(e){
        var item=e.model.item;
        var index=e.model.index;
        var arreglo=PolymerUtils.cloneObject(this.modulos);
        var t=this;
        PolymerUtils.Dialog.createAndShow({
            message:"¿desea eliminiar el módulo "+item.nombre+"? Esta acción no puede deshacerse.",
			// style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "Eliminar",
                style:"background-color:var(--paper-blue-500);color:white",
                action: function(dialog, element) {
                    arreglo.splice(index,1);
                    var id=t.proyecto.id;

                    var washingtonRef = firebase.firestore().collection("estatus-area/sistemas/proyectos").doc(id);
                    // Set the "capital" field of the city 'DC'
                    return washingtonRef.update({
                        modulos:arreglo
                    }).then(() => {
                        PolymerUtils.Toast.show("Módulos actualizados");
                        dialog.close();
                    }).catch((error) => {
                        PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
                        console.error("Error updating document: ", error);
                    });
                }
            },
            negativeButton: {
                text: "Cancelar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});

    }

    _consultaDatos(obj){
        console.log("_consultaDatos",obj);
        if(obj && obj!=null){
            
            this.set("modulos",obj.modulos);

            var id=obj.id;

            var binder=new QueryBinder("tareas",{
                "specialRef":firebase.firestore().collection("estatus-area/sistemas/proyectos/"+id+"/tareas")
            });
            
            binder.bindArray(this,this.listaTareas,"listaTareas");

        }
    }

    _routeChanged(params){
        var t=this;
		if(params && params!=null && params.id){
            console.log("recibimos datos navegacion",params);
            var id=params.id;
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "estatus-area/sistemas/proyectos/"+id,
                observer:function(obj){
                    if(obj){
                        t.set("proyecto",obj);
                        
                    }else{
                        t.set("proyecto",null);
                    }
                }
            }));

		}else{
            t.set("proyecto",null);
        }
	}

    

   

    backSistemas(){
        if(this.selected=="tarea"){
            this.set("selected","vista");
        }else{
            NavigationUtils.navigate("sistemas");
        }
        
    }
}

customElements.define('my-sistemas-proyecto', MySistemasProyecto);