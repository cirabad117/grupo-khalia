import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-item/paper-item-body';

import '../clientes/my-crea-cliente.js';
class MyClienteItem extends UtilsMixin(PolymerElement) {
    
    static get template() {
		return html`
			<style>
				:host{
					display: block;
				}
                .carta{
                    background-color: white;
                    border-radius: 5px;
                    
                }
                
                .carta.iron-selected{
                    background-color: var(--paper-blue-100);
                }
                .carta:hover{
                    background-color: var(--paper-blue-50);
                }
                
                .carta-1 {
                    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
                }
                .carta-1:hover {
                    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                }
                .avatar{
                    border: 1px solid var(--paper-grey-500);
                    border-radius: 50px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-color: white;
                    width: 48px !important;
                    height: 48px !important;
                    margin-right: 8px;
                }

                .datos:hover{
                    cursor:pointer;
                }
			</style>
            
            <div class="carta carta-1">
                <paper-icon-item>
                    <!-- <div class="avatar" style$="background-image: url('[[pedido.restaurantLogo.url]]');" slot="item-icon"></div> -->
                    <paper-item-body class="datos" two-line on-click="disparaAccion">
                        <div>[[cliente.razon]] - [[cliente.alias]]</div>
                        <div secondary>
                            fecha de creación: [[PolymerUtils_getTimeString(cliente._timestamp)]]
                        </div>
                    </paper-item-body>

                    <paper-icon-button icon="{{muestraIcono(esCliente)}}" on-click="disparaBoton"></paper-icon-button>
                    <!-- on-click="disparaAccion" -->
                    
                    <!-- <div  style="color: var(--paper-blue-grey-600); font-weight: 500; font-size: 20px;"></div> -->
                </paper-icon-item>
              
            </div>
		`;
    }//template
    
    static get properties() {
        return {
            cliente:{type:Object, notify:true},
            esCliente:{type:Boolean, notify:true}
        };
    }

    disparaAccion(){
        var t=this;
        this.dispatchEvent(new CustomEvent('click-cliente', {
            detail: {
                datos:t.cliente
            }
        }));
    }

    disparaBoton(){
        var t=this;
        this.dispatchEvent(new CustomEvent('click-opcion', {
            detail: {
                datos:t.cliente
            }
        }));
    }

    muestraIcono(bol){
        if(bol==true){
            return "work";
        }else{
            return "add";
        }
    }

    // disparaAccion(){
    //     if(this.esCliente==false){
    //         this.muestraCamposCliente();
    //     }
    // }

    // muestraCamposCliente(){
    //     PolymerUtils.Dialog.createAndShow({
    //         type: "modal",
    //         title:"Agregar prospecto a clientes",
	// 		element:"my-crea-cliente",
    //         style:"width:400px;max-width:95%;",
	// 		positiveButton: {
    //             text: "Crear",
    //             action: function(dialog, element) {
    //                 element.guardaCliente();
    //             }
    //         },
    //         negativeButton: {
    //             text: "Cerrar",
    //             action: function(dialog, element) {
    //                 dialog.close();
    //             }
    //         }
	// 	});
    // }
    
    
}

customElements.define('my-cliente-item', MyClienteItem);