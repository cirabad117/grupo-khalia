import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js'

import '../bootstrap.js';
class MyProyectoItem extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    
                }

                .tarea:hover{
                    cursor:pointer;
                    text-decoration:underline;
                }
            </style>

            <h5 style="margin:5px;">[[titulo]]</h5>

            <paper-listbox>
                <template is="dom-repeat" id="lista" items="{{itemsTareas}}" filter="{{_filtraTareasTipo(tipo)}}"
                sort="_ordenaItems">
                    
                    <paper-item class="tarea"  style$="margin:3px; background-color:[[item.modulo.fondo]]; color:[[item.modulo.txtColor]];">
                        <paper-item-body on-click="eligeTarea">
                            <div>[[item.nombreTarea]]</div>
                        </paper-item-body>
                        
                        <template is="dom-if" if="[[item._deleted]]" restamp>
                            <paper-icon-button icon="delete" on-click="borraItem"></paper-icon-button>
                        </template>
                        
                        <template is="dom-if" if="[[!item._deleted]]" restamp>
                            <paper-icon-button icon="clear" on-click="ocultaItem"></paper-icon-button>
                        </template>

                    </paper-item>
                        
                </template>
            </paper-listbox>


        `;
    }

    static get properties() {
        return {
            idProyecto:{type:String, notify:true},
            titulo:{type:String, notify:true},
            tipo:{type:String, notify:true},
            tareas:{type:Array, notify:true, value:[]},
            itemsTareas:{type:Array, notify:true, value:[]},
        }
    }

    static get observers() {
        return [
            '_changed(tareas,tareas.*)'
        ];
    }

    _changed(arr){
        var nuevoArreglo=PolymerUtils.cloneObject(arr);
        this.set("itemsTareas",nuevoArreglo);
    }

    eligeTarea(e){
        var elegido=e.model.item;
        this.dispatchEvent(new CustomEvent('elige-tarea', {
            detail: {
                tarea:elegido
            }
        }));
    }

    ocultaItem(e){
        var t=this;
        var tarea=e.model.item;
        var col="estatus-area/sistemas/proyectos/"+this.idProyecto+"/tareas";
         PolymerUtils.Dialog.createAndShow({
			type: "modal",
            message:"la tarea seleccionada no se mostrará en el proyecto. ¿Desea continuar?",
			style:"width:700px;max-width:95%;",
           
            positiveButton: {
                text: "Quitar del proyecto",
                action: function(dialog, element) {
                    DataHelper.pseudoDeleteDocument(this,{"collection":col,"doc":tarea.id,"success":function(){
                        PolymerUtils.Toast.show("Tarea eliminada con éxito");
                        dialog.close();
                    }});
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

    borraItem(e){
        var t=this;
        var tarea=e.model.item;
        var col="estatus-area/sistemas/proyectos/"+this.idProyecto+"/tareas";
         PolymerUtils.Dialog.createAndShow({
			type: "modal",
            message:"la tarea seleccionada sera eliminada definivamente del proyecto. ¿Desea continuar?",
			style:"width:700px;max-width:95%;",
           
            positiveButton: {
                text: "Eliminar",
                action: function(dialog, element) {
                    firebase.firestore().collection(col).doc(tarea.id).delete().then(() => {
                        PolymerUtils.Toast.show("Tarea eliminada del proyecto");
                        dialog.close();
                    }).catch((error) => {
                        PolymerUtils.Toast.show("Error al eliminar");
                        console.error("Error removing document: ", error);
                    });
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

    _filtraTareasTipo(tipo){
        this.$.lista.render();
        return function(item) {
            
                return item.estatus==tipo;
            }
        
    }

    _ordenaItems(a,b){
        var textoA=a.modulo.nombre.toLowerCase();
        var textoB=b.modulo.nombre.toLowerCase();
        if(textoA==textoB){
            return 0;
        }
        else{
            return (textoA<textoB ? -1 : 1);
        }
    }

}

customElements.define('my-proyecto-item', MyProyectoItem);