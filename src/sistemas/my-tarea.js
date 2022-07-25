import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@vaadin/vaadin-select/vaadin-select.js';

import '../general-controls/my-text-editor.js';
import '../general-controls/my-doc-upload.js';

import '../bootstrap.js';
import '../shared-styles.js';

class MyTarea extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap shared-styles">
                :host{
                    display:block;
                }

                .titulo{
                    border-bottom:1px solid var(--paper-blue-700);
                    display:flex;
                    align-items:center;
                }

          
            </style>
            
            <div class="d-flex align-items-center">
                <h4>
                    [[tarea.nombreTarea]]
                    <template is="dom-if" if="{{!esNuevoEstatus}}" restamp>
                        <span class="badge badge-primary" on-click="toggleEstatus" style="cursor:pointer;">
                            {{textoEstatus}}
                        </span>
                    </template>
                </h4>
                
                <template is="dom-if" if="{{esNuevoEstatus}}" restamp>
                    <div class="ml-4 p-2 d-flex align-items-baseline">
                        
                        <vaadin-select class="p-2"id="comboPeriodoNom" label="Estado de la tarea"
                        value="{{nuevoEstatus}}" error-message="seleccione una opción">
                            <template>
                                <vaadin-list-box>
                                    <vaadin-item value="backlog">Pendiente</vaadin-item>
                                    <vaadin-item value="progress">En progreso</vaadin-item>
                                    <vaadin-item value="validate">Validación</vaadin-item>
                                    <vaadin-item value="complete">Completada</vaadin-item>
                                </vaadin-list-box>
                            </template>
                        </vaadin-select>
                        
                        <button type="button" class="btn btn-primary m-1 p-2" raised on-click="modificaTarea">Aplicar estatus</button>
                        <button type="button" class="btn btn-secondary m-1 p-2" raised on-click="toggleEstatus">Cancelar</button>
                    </div>
                </template>
            
            </div>
            
            <div class="row">
                <div class="col-md-8" style="background-color:var(--paper-grey-100);">
                    <div class="titulo">
                        <h5>Descripción</h5>
                        
                        <div class="ml-auto">
                            <template is="dom-if" if="{{esEditaDesc}}">
                                <paper-icon-button  icon="save" on-click="guardaDesc"></paper-icon-button>
                            </template>
                            <paper-icon-button  icon$="{{getIcono(esEditaDesc)}}" on-click="toggleDesc"></paper-icon-button>
                        </div>
                    </div>
                    
                    <div class="carta">
                        <template is="dom-if" if="{{!esEditaDesc}}">
                            {{descripcion}}
                        </template>
                        <template is="dom-if" if="{{esEditaDesc}}">
                            <paper-input label="Descripción" value="{{descripcion}}"></paper-input>
                        </template>
                    </div>

                    <div class="titulo">
                        <h5>Campos requeridos</h5>
                        <div class="ml-auto">
                            
                            <template is="dom-if" if="{{esEditaCampo}}">
                                <paper-icon-button  icon="save" on-click="guardaCampo"></paper-icon-button>
                            </template>
                            <paper-icon-button  icon$="{{getIcono(esEditaCampo)}}" on-click="toggleCampo"></paper-icon-button>
                        </div>
                    </div>
                    
                    <template is="dom-if" if="{{!esEditaCampo}}">
                        <div class="carta" id="vista-campos"></div>
                    </template>
                    <template is="dom-if" if="{{esEditaCampo}}">
                        <my-text-editor id="text-campos" texto-incrustar="{{campos}}"></my-text-editor>
                    </template>
                </div>

                <div class="col-md-4">
                    <div class="titulo">
                        <h5>notas</h5>
                        <paper-icon-button class="ml-auto" icon$="{{getIcono(esNuevaNota)}}" on-click="toggleNota"></paper-icon-button>
                    </div>

                    <template is="dom-if" if="{{esNuevaNota}}">
                        <paper-input label="nueva nota" value="{{nota}}">
                            <paper-icon-button slot="suffix" on-click="guardaNota" icon="save"
                            alt="agregar" title="agregar">
                            </paper-icon-button>
                        </paper-input>
                    </template>

                    <paper-listbox>
                        <template is="dom-repeat" items="{{notas}}">
                            <paper-icon-item>
                                
                                <template is="dom-if" if="[[item.finalizada]]">
                                    <iron-icon slot="item-icon" icon="check-circle"></iron-icon>
                                </template>
                                
                                
                                <paper-item-body two-line>
                                    <div class="text-wrap">[[item.texto]]</div>
                                    <div secondary>[[item.fecha]]</div>
                                </paper-item-body>
                                
                                <template is="dom-if" if="[[!item.finalizada]]">
                                <paper-icon-button icon="check" on-click="updateNota"></paper-icon-button>

                                </template>
                                <paper-icon-button icon="clear" on-click="eliminaNota"></paper-icon-button>
                                
                            </paper-icon-item>
                        </template>

                    </paper-listbox>
                </div>
                
            </div>



        `;
    }

    static get properties() {
        return {
            textoEstatus:{type:String, notify:true},
            idProyecto:{type:String, notify:true},
            tarea:{type:Object, notify:true, observer:"_consultaTarea"},
            tareaActiva:{type:Object, notify:true,observer:"_cambiaCampos"},
            esEditaCampo:{type:Boolean, notify:true, value:false},
            esEditaDesc:{type:Boolean, notify:true, value:false},
            esNuevaNota:{type:Boolean, notify:true, value:false},
            esSubirArchivo:{type:Boolean, notify:true, value:false},
            esNuevoEstatus:{type:Boolean, notify:true, value:false},
            notas:{type:Array, notify:true, value:[]}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
       
    }

    guardaDesc(){
        if(!this.descripcion || this.descripcion==null){
            return PolymerUtils.Toast.show("escribe una descripción válida");
        }

        var objEditar={descripcion:this.descripcion};

        var t=this;
        var fnVista=function() {
            t.toggleDesc();
        };

        this.updateTarea(objEditar,fnVista);
    }

    guardaCampo(){
        var texto=this.shadowRoot.querySelector("#text-campos").muestraTexto();

        if(!texto || texto==null || texto.trim()=="" || texto=="<p></p>" || texto=="<p><br></p>"){
            return PolymerUtils.Toast.show("escribe un texto válido para los campos");
        }
        var objEditar={campos:texto};

        var t=this;
        var fnVista=function() {
            t.toggleCampo();
        };

        this.updateTarea(objEditar,fnVista);
    }

    updateNota(e){
        console.log("updateNota",e.model.index,e.model.item);
        var arr=PolymerUtils.cloneObject(this.notas);
        var elegido=arr[e.model.index];
        elegido["finalizada"]=true;
        arr[e.model.index]=elegido;

        var objEditar={notas:arr};
        var fnVista=function() {
            PolymerUtils.Toast.show("nota actualizada");
        };
        this.updateTarea(objEditar,fnVista);


    }

    eliminaNota(e){
        console.log("updateNota",e.model.index,e.model.item);
        var arr=PolymerUtils.cloneObject(this.notas);
        arr.splice(e.model.index,1);

        var objEditar={notas:arr};
        var fnVista=function() {
            PolymerUtils.Toast.show("nota actualizada");
        };
        this.updateTarea(objEditar,fnVista);


    }

    guardaNota(){
        if(!this.nota || this.nota==null || this.nota=="" || this.nota.trim()==""){
            return PolymerUtils.Toast.show("escribe un texto válido");
        }

        var arr=PolymerUtils.cloneObject(this.notas);
        if(!arr){
            arr=[];
        }

        var fecha=new Date();

        var y=fecha.getFullYear();
        var d=fecha.getDate();
        var di="";

        if(d<10){
            di="0"+d.toString();
        }else{
            di=d.toString();
        }

        var m=fecha.getMonth();
        var me=m+1;
        var mes="";
        if(me<10){
            mes="0"+me.toString();
        }else{
            mes=me.toString();
        }

        var nuevaNota={
            texto:this.nota,
            fecha:y+"-"+mes+"-"+di
        }

        arr.push(nuevaNota);

        var objEditar={notas:arr};
        var t=this;
        var fnVista=function() {
            t.toggleNota();
            t.set("nota",null);
        };

        this.updateTarea(objEditar,fnVista);
        


    }

    modificaTarea(){
        if(!this.nuevoEstatus || this.nuevoEstatus==null || this.nuevoEstatus.trim()==""){
            return PolymerUtils.Toast.show("selecciona una opción válida");
        }

        var obj={
            estatus:this.nuevoEstatus
        };

        var t=this;
        var fun=function() {
            t.toggleEstatus();
        }

        this.updateTarea(obj,fun);


    }

    updateTarea(obj,callback){
        var t=this;
        console.log("tareaActiva",this.idProyecto,this.tarea);
        var idPro=this.idProyecto;
        var idTarea=this.tareaActiva.id;
        var washingtonRef = firebase.firestore().collection("estatus-area").doc("sistemas")
        .collection("proyectos").doc(idPro).collection("tareas").doc(idTarea);
        
        return washingtonRef.update(obj).then(() => {
            PolymerUtils.Toast.show("Información actualizada");
            if(callback){
                callback();
            }
            
        }).catch((error) => {
            PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
            console.error("Error updating document: ", error);
            t.DialogLayout_closeDialog();
            
            


        });
    }

    


    getIcono(bol){
        return bol==true ? "clear" : "create";
    }
    toggleNota(){
        this.set("esNuevaNota",!this.esNuevaNota);
    }
    toggleDesc(){
        this.set("esEditaDesc",!this.esEditaDesc);
    }
    toggleCampo(){
        this.set("esEditaCampo",!this.esEditaCampo);        
    }
    toggleUpload(){
        this.set("esSubirArchivo",!this.esSubirArchivo);        
    }

    toggleEstatus(){
        this.set("esNuevoEstatus",!this.esNuevoEstatus);        
    }

    _cambiaCampos(obj){
        if(obj && obj!=null){
            this.set("descripcion",obj.descripcion);
            this.set("campos",obj.campos);

            var espacio=this.shadowRoot.querySelector("#vista-campos");
            espacio.innerHTML = obj.campos;

            this.set("notas",obj.notas);

            var str=obj.estatus;
            switch (str) {
                case "backlog":
                this.set("textoEstatus","Pendiente");
                break;
    
                case "progress":
                this.set("textoEstatus","En progreso");
                break;
    
                case "validate":
                this.set("textoEstatus","Validación");
                break;
    
                case "complete":
                this.set("textoEstatus","Completada");
                break;
            
                default:
                break;
            }
        }
    }

    _consultaTarea(obj){
        var t=this;
        if(obj && obj!=null){
            console.log("_consultaTarea",obj);
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "estatus-area/sistemas/proyectos/"+t.idProyecto+"/tareas/"+obj.id,
                observer:function(data){
                    if(data){
                        console.log("recibimos tarea",data);
                        t.set("tareaActiva",data);
                        
                    }else{
                        t.set("tareaActiva",null);
                    }
                }
            }));
        }
    }
}

customElements.define('my-tarea', MyTarea);