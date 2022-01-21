import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-fab/paper-fab.js';


import './clientes/my-nuevo-cliente.js';
import './general-controls/my-lista-general.js';


class MyClientesMain extends PolymerElement {
    static get template() {
        return html`
            <style >
                :host{
                    display:block;
                }
            </style>
            
            <my-lista-general vista="clientes" arreglo-items="[[listaClientes]]"
            lista-filtro="[[listaEstatus]]" lista-ordena="[[opcionesOrdena]]"
            funcion-buscar="[[funcionCliente]]"

            lista-cols="[[datosCliente]]"

            on-ejecuta-accion="abreNuevoCliente" on-ejecuta-item="abreDetalleCliente"
            color-boton="var(--paper-blue-800)">
            </my-lista-general>

        `;
    }

    static get properties() {
        return {
            listaClientes:{type:Array, notify:true, value:[]},
            opcionesOrdena:{type:Array, notify:true, value:[
               
                {"opcion":"razonAs","texto":"razón social (ascendente)"},
                {"opcion":"razonDe","texto":"razón social (descendente)"},
                {"opcion":"fechaAs","texto":"fecha de creacion (ascendente)"},
                {"opcion":"fechaDe","texto":"fecha de creacion (descendente)"},
                
            ]},

            datosCliente:{type:Array, notify:true, value:[
                {"titulo":"razon social","dato":"razon"},
                {"titulo":"alias","dato":"alias"},
                {"titulo":"agente","dato":"agente","valorInterno":"displayName"},
            ]},

            funcionCliente:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionCliente",
                    funcion:function(prospecto,texto) {
                        if((prospecto.razon && prospecto.razon.toLowerCase().indexOf(texto)!=-1) || (prospecto.alias && prospecto.alias.toLowerCase().indexOf(texto)!=-1)){
                            return prospecto;
                        }else{
                            var arreglo=prospecto.listaContactos;
                            if(arreglo){
                                for(var i=0; i<arreglo.length;i++){
                                    var item=arreglo[i];
                                    if((item.nombreCliente && item.nombreCliente.toLowerCase().indexOf(texto)!=-1) || (item.puesto && item.puesto.toLowerCase().indexOf(texto)!=-1)){
                                        return prospecto;
                                    }
                                }
                            }
                        }
                    }
                }
            }

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
    limpia(){
        this.set("busqueda",null);
    }

    _buscaProspecto(texto){

        if(!texto || texto.trim()==""){
            return null;
        }

        if(texto){
            texto=texto.toLowerCase();
        }
       
        
            console.log("_buscaProspecto",texto);
            return function(prospecto){
                if((prospecto.razon && prospecto.razon.toLowerCase().indexOf(texto)!=-1) || (prospecto.alias && prospecto.alias.toLowerCase().indexOf(texto)!=-1)){
                    return prospecto;
                }
                else{
                    var arreglo=prospecto.listaContactos;
                    if(arreglo){
                        for(var i=0; i<arreglo.length;i++){
                            var item=arreglo[i];
                            console.log("(item.nombreCliente && item.nombreCliente.toLowerCase().indexOf(texto)) || (item.puesto && item.puesto.toLowerCase().indexOf(texto)",(item.nombreCliente && item.nombreCliente.toLowerCase().indexOf(texto)) || (item.puesto && item.puesto.toLowerCase().indexOf(texto)));
                            if((item.nombreCliente && item.nombreCliente.toLowerCase().indexOf(texto)!=-1) || (item.puesto && item.puesto.toLowerCase().indexOf(texto)!=-1)){
                                return prospecto;
                            }
                        }
                    }
                    
                }
            }
        

    }

    abreDetalleCliente(e){
        var elegido=e.detail.valor;
        NavigationUtils.navigate("cliente",{"id":elegido.id});
    }

    abreNuevoCliente(){
        NavigationUtils.navigate("cliente");
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