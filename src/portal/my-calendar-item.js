import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import './nueva-fecha.js';
import '../controles-extra/dom-access.js';

class MyCalendarItem extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>

<dom-access path="portal/edita">

            <template is="dom-if" if="[[objFecha.id]]">
                <paper-icon-button onmouseover="PolymerUtils.Tooltip.show(event,'Renovar actividad')"
                icon="update" on-click="actualizaTarea"></paper-icon-button>
                
                <paper-icon-button onmouseover="PolymerUtils.Tooltip.show(event,'Editar')"
                icon="create" on-click="modificaTarea"></paper-icon-button>
                
                <paper-icon-button onmouseover="PolymerUtils.Tooltip.show(event,'Borrar')"
                icon="delete" on-click="eliminaTarea"></paper-icon-button>
            </template>
</dom-access>
            <template is="dom-if" if="[[objFecha.uid]]">
                <paper-icon-button onmouseover="PolymerUtils.Tooltip.show(event,'Ver empleado')"
                icon="open-in-new" on-click="navegaUser"></paper-icon-button>
            </template>

        

        `;
    }

    static get properties() {
        return {

            id:{type:String, notify:true},
            objFecha:{type:Object, notify:true,observer:"_revisaFecha"},
            tituloAct:{type:String, notify:true},
            esEditar:{type:Boolean, notify:true},
            estatus:{type:String, notify:true, value:"pendiente"},
            muestraMensaje:{type:Boolean, notify:true, value:false}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    navegaUser(){
        var t=this;
        NavigationUtils.navigate("usuario",{id:t.objFecha.uid});
    }

    getTexto(fe){
        var arr=fe.split("-");
        var nuevoFe=arr[0]+"/"+arr[1]+"/"+arr[2];
        var fechaItem=new Date(nuevoFe);
        if(!isNaN(fechaItem)){
           return Sugar.Date.medium(fechaItem,'es');
        }else{
            return fe;
        }
        
    }

    _revisaFecha(fe){
        var fechaItem=new Date(fe);
        var dias=Sugar.Date.daysFromNow(fechaItem);
        if(dias>=-10&& dias<=20){
            this.set("muestraMensaje",true);
        }
    }

    modificaTarea(){
        var obj=this.objFecha;
        var t=this;
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			title:"Modificar evento",
            element:"nueva-fecha",
            params:[obj],
			style:"width:400px;max-width:95%;",
			positiveButton: {
                text: "actualizar fecha",
                action: function(dialog, element) {
                    
                    element.guardaFecha();
                }
            },
            negativeButton: {
                text: "cancelar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});
    }

   


    actualizaTarea(){
        var t=this;

        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			title:"actualizar estado de actividad",
            message:'La actividad  "'+t.objFecha.nombre+'" actualizará su fecha en el calendario al próximo año. ¿Desea continuar?',
            
			style:"width:400px;max-width:95%;",
			positiveButton: {
                text: "actualizar estado",
                action: function(dialog, element) {
                    
                    var id=t.objFecha.id;
                    var fechaEditar=new Date(t.fecha);
                    var nuevaFecha=Sugar.Date.advance(fechaEditar, { years: 1 });
                    var texto=Sugar.Date.format(nuevaFecha, '%F');
                    var washingtonRef = sharedFirebase.collection("_fechas-khalia").doc(id);
                    return washingtonRef.update({
                        fecha: texto
                    }).then(() => {
                        PolymerUtils.Toast.show("Programa actualizado");
                        dialog.close();
                    }).catch((error) => {
                        PolymerUtils.Toast.show("Error. intentalo más tarde");
                        console.error("Error updating document: ", error);
                    });
                }
            },
            negativeButton: {
                text: "cancelar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});
        
    }

    eliminaTarea(){
        var t=this;

        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			title:"Eliminar actividad",
            message:'La actividad  "'+t.objFecha.nombre+'" será retirada del programa anual. ¿Desea continuar?',
            
			style:"width:400px;max-width:95%;",
			positiveButton: {
                text: "Eliminar",
                action: function(dialog, element) {
                    
                    var id=t.objFecha.id;
                  
                    sharedFirebase.collection("_fechas-khalia").doc(id).delete().then(() => {
                        PolymerUtils.Toast.show("Actividad eliminada");
                        dialog.close();
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                        PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde");
                    });
                }
            },
            negativeButton: {
                text: "cancelar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});
        
    }
}

customElements.define('my-calendar-item', MyCalendarItem);