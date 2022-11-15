import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner.js';

import '../general-controls/my-doc-upload.js';
import '../controles-extra/dom-access.js';

import '../bootstrap.js';
class MyDialogoGk extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    overflow-y:scroll;
                    max-height:500px;
                }
            </style>

            <div class="container">
                <div class="d-flex align-items-center">
                    <h3>[[itemActual.titulo]]</h3>
                    <div class="ml-auto">
                    <dom-access path="portal/edita">
                        <paper-icon-button icon$="{{muestraIcono(selected)}}" on-click="cambia"></paper-icon-button>
                    </dom-access>
                    </div>
                </div>
                
                <iron-pages selected="{{selected}}" attr-for-selected="name">

                    <div name="mostrar">
                        <div class="embed-responsive embed-responsive-1by1">
                            <iframe class="embed-responsive-item" src='[[objMostrar.archivoUrl]]' height='450px'></iframe>
                        </div>
                    </div>

                    <div name="editar">
                        <my-doc-upload id="carga-item" carpeta-guardar="_grupo-khalia/docs"
                        on-archivo-guardado="guardaItem" style="margin:10px;"></my-doc-upload>
                        <div class="d-flex flex-row-reverse">
                            <template is="dom-if" if="[[esGuardando]]">
                                <paper-spinner active></paper-spinner>
                            </template>
                            <paper-button style="background-color:var(--paper-green-700);color:white;"
                            on-click="guardaArchivo">Guardar archivo</paper-button>
                        </div>
                    </div>
                
                </iron-pages>
                
            </div>

        `;
    }

    static get properties() {
        return {
            itemActual:{type:Object, notify:true, observer:"_consultaItem"},
            objMostrar:{type:Object, notify:true},
            selected:{type:String, notify:true, value:"mostrar"},
            esGuardando:{type:Boolean, notify:true, value:false}
        }
    }

    constructor(obj) {
        super();

        if(obj){
            this.DialogLayout_notifyMultipleResize();
            this.set("itemActual",obj);
        }
    }

    _consultaItem(item){
        var t=this;
        if(item && item!=null){
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "documentos/"+item.nombre,
                observer:function(obj){
                    if(obj){
                        t.set("objMostrar",obj);
                    }
                }
            }));
        }
    }

    ready() {
        super.ready();
    }

    muestraIcono(str){
        return str=="editar" ? "close":"create";
    }

    cambia(){
        if(this.selected=="mostrar"){
            this.set("selected","editar");
        }else{
            this.set("selected","mostrar");
        }
        
    }

    guardaArchivo(){
        this.shadowRoot.querySelector("#carga-item").guardaDocumento();

    }

    guardaItem(e){
        this.set("esGuardando",true);
        var storage = firebase.storage();
        var storageRef = storage.ref();
       

        if(this.objMostrar && this.objMostrar!=null && this.objMostrar.nombreArchivo){
            var nombre=this.objMostrar.nombreArchivo;
            var desertRef = storageRef.child('_grupo-khalia/docs/' + nombre);

            desertRef.delete().then(() => {
              console.log("se borró el archivo anterior");
            }).catch((error) => {
              // Uh-oh, an error occurred!
              console.log("error al eliminar la foto",error);
            });
        }




        var guardar={
            archivoUrl:e.detail.direccion,
            nombreArchivo:e.detail.nombreArchivo,
           
        }

        var t=this;

        var nombreDoc=this.itemActual.nombre

        firebase.firestore().collection("documentos").doc(nombreDoc).set(guardar)
        .then(() => {
            PolymerUtils.Toast.show("Documento actualizado con éxito");
            this.set("esGuardando",false);
            t.cambia();
        })
        .catch((error) => {
            this.set("esGuardando",false);
            PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde.");
            console.error("Error writing document: ", error);
        });
    }
    
}

customElements.define('my-dialogo-gk', MyDialogoGk);