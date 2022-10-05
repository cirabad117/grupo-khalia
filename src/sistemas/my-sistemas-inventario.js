import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../general-controls/my-lista-general.js';
import './my-datos-equipo.js';

class MySistemasInventario extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <my-lista-general arreglo-items="[[inventario]]"
            lista-filtro="[[listaTipo]]" lista-ordena="[[opcionesOrdena]]"
            lista-cols="[[datosEquipo]]" es-principal="{{esVistaPrincipal}}"
            funcion-ordenar="[[funcionOrdenaEquipo]]" funcion-buscar="[[funcionFiltraEquipo]]"
            on-ejecuta-accion="abreNuevoEquipo" on-ejecuta-item="ejecutaAccionItem"></my-lista-general>

        `;
    }

    static get properties() {
        return {
            esVistaPrincipal:{type:Boolean, notify:true,value:true},
            inventario:{type:Array, notify:true, value:[]},
            datosEquipo:{type:Array, notify:true, value:[
                {"titulo":"Número de serie","dato":"ns"},
                {"titulo":"Tipo","dato":"tipo"},
                {"titulo":"Marca","dato":"marca"},
                {"titulo":"Acciones","listaAcciones":[
                    {"accion":"accionItem","icono":"icons:input","texto":"Abrir detalles"},
                    {"accion":"eliminar","icono":"icons:delete-forever","texto":"Eliminar"}
                ]}
            ]},
            listaTipo:{type:Array, notify:true,value:[
                {color:"#FFEB3B",base:"black",texto:"LAPTOP"},
                {color:"#FFEB3B",base:"black",texto:"IMPRESORA"},
                {color:"#FFEB3B",base:"black",texto:"MOUSE"},
                {color:"#FFEB3B",base:"black",texto:"CARGADOR"},
                {color:"#FFEB3B",base:"black",texto:"MOCHILA"},
                {color:"#FFEB3B",base:"black",texto:"TELÉFONO"},
                {color:"#FFEB3B",base:"black",texto:"OTROS"},
            ]},
            opcionesOrdena:{type:Array, notify:true, value:[
                {"opcion":"nsAs","texto":"Número de serie (A - Z)"},
                {"opcion":"nsDe","texto":"Número de serie (Z - A)"},
                {"opcion":"marcaAs","texto":"Marca (A - Z)"},
                {"opcion":"marcaDe","texto":"Marca (Z - A)"},
                {"opcion":"fechaAs","texto":"Fecha de creación (más antiguo)"},
                {"opcion":"fechaDe","texto":"Fecha de creación (más reciente)"}
                
            ]},
            funcionFiltraEquipo:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionFiltraProd",
                    funcion:function(item,texto,filtro) {
                        var busca=texto.toLowerCase();
                        if(filtro=="todos"){
                            if((item.ns&&item.ns.replace(/\s|_|\(|\)/g, "-").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().indexOf(busca)!=-1) || 
                            (item.marca &&item.marca.toLowerCase().indexOf(busca)!=-1)){
                                return item;
                            }
                        }else{
                            if(item.tipo==filtro){
                                if((item.ns&&item.ns.replace(/\s|_|\(|\)/g, "-").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().indexOf(busca)!=-1) || 
                                (item.marca &&item.marca.toLowerCase().indexOf(busca)!=-1)){
                                    return item;
                                }
                            }
                            
                        }
                    }
                }
            },
            funcionOrdenaEquipo:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionOrdenaProd",
                    funcion:function(a,b,str) {

                        var textoA=a.ns.toLowerCase();
                        var textoB=b.ns.toLowerCase();
                        var codA=a.marca.toLowerCase();
                        var codB=b.marca.toLowerCase();

                        var at=PolymerUtils.convertFirebaseTimestamp(a._timestamp);
                        var bt=PolymerUtils.convertFirebaseTimestamp(b._timestamp);
                    
                        switch (str) {
                            case "nsAs":
                                if(textoA==textoB){
                                    return 0;
                                }
                                else{
                                    return (textoA<textoB ? -1 : 1);
                                }
                            break;
                            case "nsDe":
                                if(codA==codB){
                                    return 0;
                                }else{
                                    return (codA>codB ? -1 : 1);
                                } 
                            break;
                            case "marcaAs":
                                if(codA==codB){
                                    return 0;
                                }else{
                                    return (codA<codB ? -1 : 1);
                                } 
                            break;
                            case "marcaDe":
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

        if(this.lastInstalaciones){
            this.lastInstalaciones();
            this.set("lastInstalaciones",null);
        }

        this.set("lastInstalaciones",DataHelper.queryCollection(this,{
            "specialRef": sharedFirebase.collection("estatus-area").doc("sistemas").collection("inventario"),
            "collection":"inventario",
            "array":this.inventario,
            "arrayName":"inventario"
        }));
    }

    abreNuevoEquipo(){
            PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-datos-equipo",
			title:"Agregar equipo",
			style:"width:600px;max-width:95%;",
            params:['crear'],
			positiveButton: {
                text: "Crear",
                action: function(dialog, element) {
                    element.ejecutaAccion();
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

    ejecutaAccionItem(e){
        console.log("ejecutaItem",e.detail.objeto);
        var item=e.detail.objeto;

        if(this.esVistaPrincipal==true){
            if(item.texto=="accionItem"){
                PolymerUtils.Dialog.createAndShow({
                    type: "modal",
                    element:"my-datos-equipo",
                    title:"Agregar equipo",
                    style:"width:600px;max-width:95%;",
                    params:['editar',item.dato],
                    positiveButton: {
                        text: "Guardar cambios",
                        action: function(dialog, element) {
                            element.ejecutaAccion();
                        }
                    },
                    negativeButton: {
                        text: "Cerrar",
                        action: function(dialog, element) {
                            dialog.close();
                        }
                    }
                });
    
            }else{
                PolymerUtils.Dialog.createAndShow({
                    type: "modal",
                    title:"Eliminar equipo",
                    message:"Una vez realizada la accion no se podrá recuperar la información. ¿Desea continuar?",
                    style:"width:600px;max-width:95%;",
                    saveSpinner:{
                        message:"Eliminando equipo"
                      },
                    positiveButton: {
                        text: "Eliminar",
                        action: function(dialog, element) {
                            var id=item.dato.id;
                            firebase.firestore().collection("estatus-area").doc("sistemas").collection("inventario").doc(id).delete().then(() => {
                                PolymerUtils.Toast.show("Producto eliminado con éxito");
                                
                                dialog.close();
                            }).catch((error) => {
                                PolymerUtils.Toast.show("Error al eliminiar. Intentalo más tarde.");
        
                                dialog.setSaving(false);
                                console.error("Error removing document: ", error);
                            });
                        }
                    },
                    negativeButton: {
                        text: "Cancelar",
                        action: function(dialog, element) {
                            dialog.close();
                        }
                    }
                });
            }

        }else{
            this.dispatchEvent(new CustomEvent('agrega-equipo', {
                detail: {
                    equipo:item.dato
                }
            }));
        }




        

    }
}

customElements.define('my-sistemas-inventario', MySistemasInventario);