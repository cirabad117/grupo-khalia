import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-item/paper-item-body.js';

import './my-nuevo-seg.js';
import '../controles-extra/dom-access.js';

import '../bootstrap.js';
class MySeguridad extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                .link:hover{
                    cursor:pointer;
                    text-decoration:underline;
                }

                .carta{
                    margin:5px;
                    background-color: white;
                    border-radius: 5px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
                    
                }
                
              
                .carta:hover{
                    background-color: var(--paper-blue-50);
                    cursor:pointer;
                    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                    
                }
                
               
            </style>

            <div class="container">
                
                <iron-pages selected="{{vista}}" attr-for-selected="name">
                    <div name="lista">
                        <div class="row">

                            <div class="col-md-3">
                                <paper-listbox selected="{{selected}}" attr-for-selected="name">
                                    <paper-item name="normas">Normas</paper-item>
                                    <paper-item name="avisos">Avisos de seguridad</paper-item>
                                </paper-listbox>
                            </div>
                            
                            <div class="col-md-9">
                                <template is="dom-repeat" items="[[listaDocs]]" filter="{{_separaSecciones(selected)}}">
                                    <div class="carta">
                                        <paper-icon-item>
                                            <paper-item-body two-line on-click="abreArchivo">
                                                <div style="color: var(--paper-blue-grey-600); font-weight: 500; font-size: 20px;">[[item.titulo]]</div>
                                                <div secondary>[[PolymerUtils_getDateString(item._timestamp)]]</div>
                                            </paper-item-body>
                                            <dom-access path="portal/edita">
                                                <paper-icon-button class="botonSube" icon="delete" on-click="borraItem"></paper-icon-button>
                                            </dom-access>
                                       </paper-icon-item> 
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div name="lector">
                        <div class="card">
                            <div class="card-header d-flex flex-wrap align-items-center link" on-click="cierraLector">
                                <iron-icon icon="arrow-back"></iron-icon>
                                <h4>[[objeto.titulo]]</h4>
                            </div>
                            <div class="card-body">
                                <template is="dom-if" if="{{esArchivo(objeto)}}" restamp>
                                    <div class="embed-responsive embed-responsive-1by1">
                                        <iframe class="embed-responsive-item" src='[[objeto.archivoUrl]]' height='400px'></iframe>
                                    </div>
                                </template>
                                <template is="dom-if" if="{{!esArchivo(objeto)}}" restamp>
                                    <div id="doc-texto"></div>
                                </template>
                            </div>
                        </div>
                    </div>
                </iron-pages>
            
            </div>
            
            <dom-access path="portal/edita">
                <div style="position: fixed; bottom: 24px; right: 24px;">
                    <div style="position: relative; cursor:pointer;" on-clicK="abreNuevoDoc">
                        <paper-fab style="color:white; background-color:var(--paper-blue-500);" icon="add"></paper-fab>
                    </div>
                </div>
            </dom-access>
        `;
    }

    static get properties() {
        return {
            listaDocs:{type:Array, notify:true, value:[]},
            vista:{type:String, notify:true, value:"lista"},
            selected:{type:String, notify:true, value:"normas", observer:"_limpiaVista"},
            objeto:{type:Object, notify:true,observer:"_creaLector"}

        }
    }

    constructor() {
        super();
    }

    esArchivo(obj){
        if(obj && obj.nombreArchivo){
            return true;
        }else{
            return false;
        }
    }

    _limpiaVista(str){
        if(str && str!=null){
           this.cierraLector();
        }
    }

    _creaLector(obj){
        if(obj && obj!=null && obj.doc){
            var pro=this.shadowRoot.querySelector("#doc-texto");
            pro.innerHTML=obj.doc;
        }
    }
    ready() {
        super.ready();
        var binder2=new QueryBinder("documentos");
        
        binder2.bindArray(this,this.listaDocs,"listaDocs");
    }

    abreArchivo(e){
        this.set("objeto",e.model.item);
        this.set("vista","lector");
    }

    cierraLector(){
        this.set("objeto",null);
        this.set("vista","lista");
    }

    borraItem(e){
        var elegido=e.model.item;
        console.log("elegido",elegido);

        PolymerUtils.Dialog.createAndShow({
            type: "modal",
            
            title:"Eliminar comunicado",
            message:"El item seleccionado no podra recuperarse. ¿Desea continuar?",
            style:"width:800px;max-width:95%;",
            saveSpinner:{
				message:"Eliminando item.."
			  },
            positiveButton: {
                text: "Eliminar",
                action: function(dialog, element) {
                    dialog.setSaving(true);
                    
                    var storage = firebase.storage();
                    var storageRef = storage.ref();
                    if(elegido.nombreArchivo && elegido.nombreArchivo!=null){
                        var desertRef = storageRef.child('_grupo-khalia/docs/' + elegido.nombreArchivo);
                        desertRef.delete().then(() => {
                            console.log("se borró el archivo");
                        }).catch((error) => {
                            console.log("error al eliminar la foto",error);
                        });
                    }
                    
                    var id=elegido.id;
                    
                    firebase.firestore().collection("documentos").doc(id).delete().then(() => {
                        PolymerUtils.Toast.show("Comunicado eliminado con éxito");
                        
                        dialog.close();
                    }).catch((error) => {
                        PolymerUtils.Toast.show("Error al eliminiar. Intentalo más tarde.");

                        dialog.setSaving(false);
                        console.error("Error removing document: ", error);
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

  
    abreNuevoDoc(){
        PolymerUtils.Dialog.createAndShow({
            type: "modal",
            element:"my-nuevo-seg",
            title:"Nuevo comunicado de seguridad",
            style:"width:800px;max-width:95%;",
            positiveButton: {
                text: "Guardar",
                action: function(dialog, element) {
                    element.guardaRegistro()
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

    _separaSecciones(str){
        return function(item) {
            
            return item.seccion==str;
        }
    }
}

customElements.define('my-seguridad', MySeguridad);