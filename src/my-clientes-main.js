import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-fab/paper-fab.js';


import './clientes/my-nuevo-cliente.js';
import './clientes/my-cliente-item.js';

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
					style="margin: 8px 24px;"
					cliente="[[item]]"></my-cliente-item>
				</template>
            
            <div style="position: fixed; bottom: 24px; right: 24px;">
				<div style="position: relative; cursor:pointer;" on-clicK="abreNuevoCliente">
					<paper-fab icon="add"></paper-fab>
				</div>
			</div>

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
        if(this.lastClientes){
            this.lastClientes();
            this.set("lastClientes",null);
        }

        this.set("lastClientes",DataHelper.queryCollection(this,{
            "collection":"_clientes-khalia",
            "array":this.listaClientes,
            "arrayName":"listaClientes"
        }));
    }

    abreDetalleCliente(e){
        var elegido=e.model.item;
        NavigationUtils.navigate("cliente",{"id":elegido.id})
    }

    abreNuevoCliente(){
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-nuevo-cliente",
			
			style:"width:400px;max-width:95%;",
			positiveButton: {
                text: "Crear",
                action: function(dialog, element) {
                    element.guardaCliente();
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

customElements.define('my-clientes-main', MyClientesMain);