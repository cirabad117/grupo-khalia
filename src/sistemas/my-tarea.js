import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "../mixins/dialog-layout-mixin.js";

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/iron-icons/iron-icons.js';
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
                    <template is="dom-if" if="{{!esNuevoEstatus}}">
                        <span class="badge badge-primary" on-click="toggleEstatus">
                            [[muestraEstatus(tarea.estatus)]]
                        </span>
                    </template>
                </h4>
                
                <template is="dom-if" if="{{esNuevoEstatus}}">
                    <div class="ml-4">
                        <vaadin-select id="comboPeriodoNom" label="Estado de la tarea"
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
                        
                        <paper-button raised on-click="modificaTarea">Aplicar estatus</paper-button>
                        <paper-button raised on-click="toggleEstatus">Cancelar</paper-button>
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
                            <paper-icon-button icon="cloud-upload" on-click="toggleUpload"></paper-icon-button>

                            <template is="dom-if" if="{{esEditaCampo}}">
                                <paper-icon-button  icon="save" on-click="guardaCampo"></paper-icon-button>
                            </template>
                            
                            
                            <paper-icon-button  icon$="{{getIcono(esEditaCampo)}}" on-click="toggleCampo"></paper-icon-button>
                        </div>
                    </div>
                    
                    <template is="dom-if" if="{{!esEditaCampo}}">
                        <div class="carta" id="vista-campos">
                            
                        </div>
                    </template>
                    <template is="dom-if" if="{{esEditaCampo}}">
                        <my-text-editor id="text-campos" texto-incrustar="{{campos}}"></my-text-editor>
                    </template>

                    <template is="dom-if" if="{{esSubirArchivo}}" restamp>
                        <my-doc-upload id="carga-item" carpeta-guardar="_gkhalia/sistemas"
                        on-archivo-guardado="guardaArchivoFirebase" style="margin:10px;"></my-doc-upload>
                        <div class="d-flex flex-row-reverse">
                            <button type="button" class="btn btn-outline-primary m-1" on-click="carga">Guardar archivo</button>
                            <button type="button" class="btn btn-outline-secondary m-1" on-click="toggleUpload">Cancelar</button>
                        </div>
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
                            <paper-item>
                                <paper-item-body two-line>
                                    <div>[[item.texto]]</div>
                                    <div secondary>[[item.fecha]]</div>
                                </paper-item-body>
                            </paper-item>
                        </template>

                    </paper-listbox>
                </div>
                
            </div>



        `;
    }

    static get properties() {
        return {
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

    muestraEstatus(str){
        switch (str) {
            case "backlog":
            return "Pendiente";

            case "progress":
            return "En progreso";

            case "validate":
            return "Validación";

            case "complete":
            return "Completada";
        
            default:
            break;
        }
    }

    carga(){

        if(this.tarea.nombreArchivo && this.tarea.nombreArchivo.trim()!=""){
            var storage = firebase.storage();
            var storageRef = storage.ref();

            
            var doc=this.objActivo.nombreArchivo;
            var ubicacion="_gkhalia/sistemas/"+doc;

            var desertRef = storageRef.child(ubicacion);
            desertRef.delete().then(function() {
            }).catch(function(error) {
                console.error("error al eliminar archivo",error);
            });
        }
        this.shadowRoot.querySelector("#carga-item").guardaDocumento();

        
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
        };

        this.updateTarea(objEditar,fnVista);


    }

    guardaArchivoFirebase(e){
        var dia=PolymerUtils.Dialog.createAndShow({
            type: "modal",
            saveSpinner:{
                message: "Subiendo archivo",
                saving: true
            },
            style:"width: 400px; height: 300px;",
            smallStyle: "width: 95% !important;"
		});
        var url=e.detail.direccion;
        var texto=e.detail.nombreArchivo;

       
        var doc={
            ubicacionArchivo:url,
            nombreArchivo:texto
        };

        var t=this;
        var fun=function() {
            dia.close();
            t.toggleUpload();
        }

        this.updateTarea(doc,fun);


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