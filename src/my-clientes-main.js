import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-fab/paper-fab.js';


import './clientes/my-nuevo-cliente.js';
import './general-controls/my-cliente-item.js';

import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-icons/iron-icons.js';

class MyClientesMain extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <template is="dom-repeat" items="[[listaClientes]]" >
					<my-cliente-item on-click="abreDetalleCliente"
                    es-cliente="[[item._esCliente]]"
                    
					style="margin: 8px 24px;"
					cliente="[[item]]"></my-cliente-item>
				</template>
            
            <!-- <div style="position: fixed; bottom: 24px; right: 24px;">
            
				<div style="position: relative; cursor:pointer;" on-clicK="abreNuevoCliente">
					<paper-fab icon="add"></paper-fab>
				</div>
			</div> -->

        `;
    }

    static get properties() {
        return {
            listaClientes:{type:Array, notify:true, value:[]}

        };
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        var binder=new QueryBinder("_clientes-khalia",{
            "specialRef":firebase.firestore().collection("_clientes-khalia").where("_esCliente","==",true)
        });
        
        binder.bindArray(this,this.listaClientes,"listaClientes");
    }

    abreDetalleCliente(e){
        var elegido=e.model.item;
        NavigationUtils.navigate("cliente",{"id":elegido.id})
    }

    abreNuevoCliente(){
        NavigationUtils.navigate("nuevo-prospecto");
        // PolymerUtils.Dialog.createAndShow({
		// 	type: "modal",
		// 	element:"my-nuevo-cliente",
			
		// 	style:"width:400px;max-width:95%;",
		// 	positiveButton: {
        //         text: "Crear",
        //         action: function(dialog, element) {
        //             element.guardaCliente();
        //         }
        //     },
        //     negativeButton: {
        //         text: "Cerrar",
        //         action: function(dialog, element) {
        //             dialog.close();
        //         }
        //     }
		// });
    }
}

customElements.define('my-clientes-main', MyClientesMain);