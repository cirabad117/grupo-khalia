import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-fab/paper-fab.js';


import './clientes/my-nuevo-cliente.js';
import './general-controls/my-lista-general.js';
import { DiccionarioMixin } from './mixins/diccionario-mixin.js';


class MyClientesMain extends DiccionarioMixin(PolymerElement) {
    static get template() {
        return html`
            <style >
                :host{
                    display:block;
                }
            </style>
            
            <my-lista-general titulo-pagina="Clientes" vista="clientes" arreglo-items="[[listaClientes]]"
            estilo-navega="background-color:var(--paper-green-200);color:#000000;" icono="icons:assignment-ind"
            lista-filtro="[[listaEstatus]]" lista-ordena="[[opcionesOrdena]]"
            funcion-buscar="[[funcionCliente]]" funcion-ordenar="[[funcionOrdena]]"

            lista-cols="[[datosCliente]]"

            on-ejecuta-accion="abreNuevoCliente" on-ejecuta-item="abreDetalleCliente" on-elimina-item="eliminaCliente"
            color-boton="var(--paper-blue-800)">
            </my-lista-general>

        `;
    }

    static get properties() {
        return {
            listaClientes:{type:Array, notify:true, value:[]},
            opcionesOrdena:{type:Array, notify:true, value:[
               
                {"opcion":"razonAs","texto":"Razón social (ascendente)"},
                {"opcion":"razonDe","texto":"Razón social (descendente)"},
                {"opcion":"fechaAs","texto":"Fecha de creación (ascendente)"},
                {"opcion":"fechaDe","texto":"Fecha de creación (descendente)"},
                
            ]},

            datosCliente:{type:Array, notify:true, value:[
                {"titulo":"Razón social","dato":"razon"},
                
                {"titulo":"Agente","dato":"agente","valorInterno":"displayName"},
                {"titulo":"Estatus","dato":"listaSeguimiento"},
                {"titulo":"Fecha de creación","dato":"_timestamp"},
                {"titulo":"Acciones","listaAcciones":[
                    {"accion":"disparaAccionItem","icono":"icons:find-in-page","texto":"Abrir cliente"},
                    {"accion":"disparaAccionEliminar","icono":"icons:delete-forever","texto":"Eliminar"}
                ]}
            ]},

            funcionCliente:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionCliente",
                    funcion:function(prospecto,texto,filtro) {
                        var estatus=null;
                        if(prospecto.listaSeguimiento){
                            estatus=PolymerUtils.getLastItemEstatusFecha(prospecto.listaSeguimiento);
                        }
                    
                        if(filtro=='todos'){
                            if((prospecto.razon && prospecto.razon.toLowerCase().indexOf(texto)!=-1) ||(prospecto.alias && prospecto.alias.toLowerCase().indexOf(texto)!=-1)){
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
                        }else{
                            if(estatus!=null && estatus.texto==filtro){
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
                }
            },

            funcionOrdena:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionOrdena",
                    funcion:function(a,b,str) {
                        var at=PolymerUtils.convertFirebaseTimestamp(a._timestamp);
                        var bt=PolymerUtils.convertFirebaseTimestamp(b._timestamp);
                        var textoA=a.razon.toLowerCase();
                        var textoB=b.razon.toLowerCase();
                    
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

        };
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        
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
        //NavigationUtils.navigate("cliente");
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-nuevo-cliente",
			title:"Agregar cliente",
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "guardar",
                style:"background-color:var(--paper-blue-500);color:white",
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

    eliminaCliente(e){
        var elegido=e.detail.valor;
        var id=elegido.id;

        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Eliminar cliente",
            message:"El cliente <strong>"+elegido.razon+"</strong> y toda su información relacionada no podrá recuperarse. ¿Desea continuar?",
			saveSpinner:{
				message:"Eliminando cliente"
			  },
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "Elimniar",
                style:"background-color:var(--paper-red-500);color:white;",
                action: function(dialog, element) {
                    dialog.setSaving(true);
                    firebase.firestore().collection("_clientes-khalia").doc(id).delete().then(() => {
                        PolymerUtils.Toast.show("Cliente eliminado con éxito");
                        
                        dialog.close();
                    }).catch((error) => {
                        PolymerUtils.Toast.show("Error al eliminiar. Intentalo más tarde.");

                        dialog.setSaving(false);
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
}

customElements.define('my-clientes-main', MyClientesMain);