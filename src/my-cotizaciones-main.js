import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from "./mixins/dialog-layout-mixin.js";

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';

import './general-controls/my-lista-general.js';
import './cotizaciones/my-cotiza-dialog.js';
import './cotizaciones/my-autoriza-coti.js';

import './bootstrap.js';

class MyCotizacionesMain extends DialogLayoutMixin(PolymerElement) {
	static get template() {
		return html`
			<style include="bootstrap">
				:host{
					display:block;
				}
			</style>

            <template is="dom-if" if="{{esVistaPrincipal}}">
                <nav class="navbar navbar-light" style="background-color:var(--paper-red-100);color:#000000;">
                    <a class="navbar-brand">
                        <iron-icon icon="icons:list"></iron-icon>
                        Cotizaciones
                    </a>
                </nav>
            </template>
			
			
			<my-lista-general vista="cotizacion" arreglo-items="[[listaCotizaciones]]" titulo="cliente.razon"
            es-principal="{{esVistaPrincipal}}"
            lista-filtro="[[listaEstatus]]" lista-ordena="[[opcionesOrdena]]"
			lista-cols="[[datosCotiza]]"
			funcion-buscar="[[funcionCotizacion]]" funcion-ordenar="[[funcionOrdenaCoti]]"
            on-ejecuta-accion="abreNuevaCotizacion" on-ejecuta-item="ejecutaAccionItem"></my-lista-general>

		`;
	}
	
	static get properties() {
		return {
            clienteActivo:{type:String, notify:true},

            esVistaPrincipal:{type:Boolean, notify:true,value:true},
			listaCotizaciones:{type:Array, notify:true, value:[]},
			datosCotiza:{type:Array, notify:true, value:[
                {"titulo":"Folio","dato":"id"},
                {"titulo":"Fecha de creación","dato":"_timestamp"},
				{"titulo":"Razón social","dato":"cliente","valorInterno":"razon"},
                {"titulo":"Estatus","dato":"estatus"},
                {"titulo":"Acciones","listaAcciones":[
                    {"accion":"accionItem","icono":"icons:input","texto":"Abrir cotización"},
                    {"accion":"aceptar","icono":"icons:check","texto":"Aceptar cotización"},
                    {"accion":"declinar","icono":"icons:clear","texto":"Declinar cotizacion"},
                   
                ]}
				
            ]},

			opcionesOrdena:{type:Array, notify:true, value:[
                {"opcion":"razonAs","texto":"Razón social (A - Z)"},
                {"opcion":"razonDe","texto":"Razón social (Z - A)"},
                {"opcion":"fechaAs","texto":"Fecha de creación (más antiguo)"},
                {"opcion":"fechaDe","texto":"Fecha de creación (más reciente)"}
                
            ]},

			funcionCotizacion:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionProspecto",
                    funcion:function(prospecto,texto,filtro) {
						if((prospecto.id && prospecto.id.toLowerCase().indexOf(texto)!=-1) ||
						(prospecto.cliente.razon && prospecto.cliente.razon.toLowerCase().indexOf(texto)!=-1) ||
						(prospecto.cliente.alias && prospecto.cliente.alias.toLowerCase().indexOf(texto)!=-1) ||
						(prospecto.nombreDirigido && prospecto.nombreDirigido.toLowerCase().indexOf(texto)!=-1)){
							return prospecto;
						}
                        
                    }
                }
            },
			
			funcionOrdenaCoti:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionOrdena",
                    funcion:function(a,b,str) {
                        var at=PolymerUtils.convertFirebaseTimestamp(a._timestamp);
                        var bt=PolymerUtils.convertFirebaseTimestamp(b._timestamp);
                        var textoA=a.cliente.razon.toLowerCase();
                        var textoB=b.cliente.razon.toLowerCase();
                    
                        switch (str) {
                            case "razonAs":
                                if(textoA==textoB){
                                    return 0;
                                }
                                else{
                                    return (textoA<textoB ? -1 : 1);
                                }
                            break;
                            case "razonDe":
                                if(textoA==textoB){
                                    return 0;
                                }else{
                                    return (textoA>textoB ? -1 : 1);
                                } 
                            break;
                            case "fechaAs":
                                if(at==bt){
                                    return 0;
                                }else{
                                    return (at<bt ? -1 : 1);
                                }
                            break;
                            case "fechaDe":
                                if(at==bt){
                                    return 0;
                                }else{
                                    return (at>bt ? -1 : 1);
                                }
                            break;
                            default:
                            break;
                        }
                    }
                }
            }
		}
	}
	
	constructor() {
		super();
	}
	
	ready() {
		super.ready();

		
	}

	abreNuevaCotizacion(){
        if(this.clienteActivo && this.clienteActivo!=null && this.clienteActivo.trim()!=""){
            NavigationUtils.navigate("nueva-cotizacion",{"id":this.clienteActivo});
            
        }else{
            NavigationUtils.navigate("nueva-cotizacion");
        }
        
		
	}

    ejecutaAccionItem(e){
        var elegido=e.detail.objeto;

        var accion=elegido.texto;

        var folio=this.getId(elegido.dato.id);

        var t=this;

        switch (accion) {
            case "accionItem":
                PolymerUtils.Dialog.createAndShow({
                    type: "modal",
                    element:"my-cotiza-dialog",
                    title:"Cotización",
                    style:"width:350px;max-width:95%;",
                    params:[elegido.dato],
                
                    negativeButton: {
                        text: "Cerrar",
                        action: function(dialog, element) {
                            dialog.close();
                        }
                    }
                });
                
            break;
            case "aceptar":
                PolymerUtils.Dialog.createAndShow({
                    type: "modal",
                    title:"Aceptar cotización",
                    element:"my-autoriza-coti",
                    // message:"Si la cotización pertenece a un prospecto, será agregado a la lista de clientes activos. ¿Desea continuar?",
                    style:"width:350px;max-width:95%;",
                   params:[elegido.dato],
                    positiveButton: {
                        text: "aceptar",
                        action: function(dialog, element) {
                            t.modificaCoti(elegido.dato.id,"aceptada",elegido.dato.cliente);
                        }
                    },
                    negativeButton: {
                        text: "Cancelar",
                        action: function(dialog, element) {
                            dialog.close();
                        }
                    }
                });
                
                
            break;
            case "declinar":
                
                PolymerUtils.Dialog.createAndShow({
                    type: "modal",
                    title:"Declinar cotización<br>"+folio+" - "+elegido.dato.cliente.razon,
                    message:"¿Desea eliminar la cotización seleccionada?",
                    style:"width:350px;max-width:95%;",
                   
                    positiveButton: {
                        text: "declinar",
                        action: function(dialog, element) {
                            t.modificaCoti(elegido.dato.id,"declinada",elegido.dato.cliente);
                        }
                    },
                    negativeButton: {
                        text: "Cancelar",
                        action: function(dialog, element) {
                            dialog.close();
                        }
                    }
                });
                
            break;
        
            default:
            break;
        }

    }


    modificaCoti(id,est,cliente){
        var t=this;
        var idCoti=id;
        var obj={
            estatus:est
        }
        var washingtonRef = firebase.firestore().collection("_cotizaciones-khalia").doc(idCoti);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update(obj).then(() => {
            PolymerUtils.Toast.show("Cotización actualizada éxito");
            t.actualizaCliente(cliente);
            
            t.DialogLayout_closeDialog();
        }).catch((error) => {
            PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
            console.error("Error updating document: ", error);
        });
    }

    actualizaCliente(cliente){
        var idCliente=cliente.id
        var sfDocRef = firebase.firestore().collection("_clientes-khalia").doc(idCliente);
        return firebase.firestore().runTransaction((transaction) => {
            return transaction.get(sfDocRef).then((sfDoc) => {
                if (!sfDoc.exists) {
                    console.error("Document does not exist!");
                }else{
                    var estado = sfDoc.data()._esCliente;

                    if(estado==false){
                        transaction.update(sfDocRef, { _esCliente: true });
                    }
                
                }
                
            });
        }).then(() => {
            console.log("Transaction successfully committed!");
        }).catch((error) => {
            console.log("Transaction failed: ", error);
        });
    }

    getId(str){
        let length = str.length;
            var restante=4-length;
            if(restante>0){
                for(var i=0;i<restante;i++){
                    str=0+str;
                }
            }
            
            return "GK-"+str;
    }

}

customElements.define('my-cotizaciones-main', MyCotizacionesMain);