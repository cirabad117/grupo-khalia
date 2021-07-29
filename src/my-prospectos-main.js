import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/iron-icons/iron-icons.js';

import './general-controls/my-cliente-item.js';
import './prospectos/dialogo-nuevo-prospecto.js';
import './prospectos/my-prospecto.js';

import './bootstrap.js';


class MyProspectosMain extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="container-fluid">
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="btn-toolbar mt-3" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group mr-2" role="group" aria-label="First group">
                                <button type="button" class="btn btn-secondary">
                                    <span>
                                        <iron-icon icon="filter-list"></iron-icon>
                                    </span>
                                </button>
                                <button type="button" class="btn btn-secondary">
                                    <span>
                                        <iron-icon icon="expand-less"></iron-icon>
                                    </span></button>
                                <button type="button" class="btn btn-secondary">
                                    <span>
                                        <iron-icon icon="expand-more"></iron-icon>
                                    </span>
                                </button>
                                
                            </div>
                            
                            <div class="input-group">
                                
                                <input type="text" class="form-control" placeholder="Buscar" aria-label="Input group example" aria-describedby="btnGroupAddon">
                                <div class="input-group-prepend">
                                    <div class="input-group-text" id="btnGroupAddon"><iron-icon icon="search"></iron-icon></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="col-md-12">
                        <template is="dom-repeat" items="[[listaProspectos]]" >
                            <my-prospecto prospecto="[[item]]"></my-prospecto>
                            <!-- <my-cliente-item es-cliente="[[item._esCliente]]" on-click-cliente="abreProspecto" on-click-opcion="modificaEstadoCliente" style="margin: 8px 24px;"
                            cliente="[[item]]"></my-cliente-item> -->
                        </template>
                    </div>
                </div>
            </div>
            
            <div style="position: fixed; bottom: 24px; right: 24px;">
				<div style="position: relative; cursor:pointer;" on-clicK="abreNuevoCliente">
					<paper-fab icon="add"></paper-fab>
				</div>
			</div>

        `;
    }

    static get properties() {
        return {
            listaProspectos:{type:Array, notify:true, value:[]}

        };
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        var binder=new QueryBinder("_clientes-khalia",{
            "specialRef":firebase.firestore().collection("_clientes-khalia").where("_esCliente","==",false)
        });
        
        binder.bindArray(this,this.listaProspectos,"listaProspectos");

        // binder.bindArray(this,this.collectionB,"collectionB",function(item){
        //     return item.color=="verde";
        // });
    }

    abreProspecto(e){
        var elegido=e.detail.datos;
        NavigationUtils.navigate("prospecto",{"id":elegido.id})
    }

    abreNuevoCliente(){
        //NavigationUtils.navigate("nuevo-prospecto");
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Agregar prospecto",
			element:"dialogo-nuevo-prospecto",
			
			style:"width:95%;",
			positiveButton: {
                text: "Crear",
                action: function(dialog, element) {
                    element.guardaCliente();
                }
            },
            negativeButton: {
                text: "Cerrar",
                action: function(dialog, element) {
                    element.limpiaDatos();
                    dialog.close();
                }
            }
		});
    }

    modificaEstadoCliente(e){
        //NavigationUtils.navigate("nuevo-prospecto");
        var elegido=e.detail.datos;
        var id=elegido.id;
        
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Confirmar nuevo cliente",
            message:"El prospecto seleccionado se convertirá en cliente de Grupo Khalia. ¿Desea continuar con la accion actual?",
			//element:"dialogo-nuevo-prospecto",
			
			style:"width:400px;max-width:95%;",
			positiveButton: {
                text: "Crear",
                action: function(dialog, element) {
                    var washingtonRef = firebase.firestore().collection("_clientes-khalia").doc(id);
                    // Set the "capital" field of the city 'DC'
                    return washingtonRef.update({
                        _esCliente: true
                    }).then(() => {
                        PolymerUtils.Toast.show("Nuevo cliente agregado con éxito");
                        dialog.close();
                    }).catch((error) => {
                        PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
                        console.error("Error updating document: ", error);
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
}

customElements.define('my-prospectos-main', MyProspectosMain);