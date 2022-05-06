import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DiccionarioMixin } from './mixins/diccionario-mixin.js';

import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-dialog/paper-dialog.js';

import './general-controls/my-lista-general.js';
import './prospectos/dialogo-nuevo-prospecto.js';

import './bootstrap.js';

class MyProspectosMain extends DiccionarioMixin(PolymerElement) {
    
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>

            <my-lista-general titulo-pagina="Prospectos" vista="prospectos" icono="communication:contact-phone"
            estilo-navega="background-color:var(--paper-blue-50);color:#000000;" arreglo-items="[[listaProspectos]]"
            lista-filtro="[[listaEstatus]]" lista-ordena="[[opcionesOrdena]]" lista-cols="[[datosProspecto]]"
            funcion-buscar="[[funcionProspecto]]" funcion-ordenar="[[funcionOrdena]]"
            on-ejecuta-accion="abreNuevoCliente" on-ejecuta-item="abreProspecto"
            on-elimina-item="eliminaProspecto"
            color-boton="var(--paper-green-600)"></my-lista-general>


        `;
    }

    static get properties() {
        return {
            listaUsuarios:{type:Array, notify:true, value:[]},
            listaProspectos:{type:Array, notify:true, value:[]},
            busqueda:{type:String, notify:true},
            filtroEstatus:{type:String, notify:true, value:"todos"},
            modoOrdena:{type:String, notify:true},

            datosProspecto:{type:Array, notify:true, value:[
                {"titulo":"Razón social","dato":"razon"},
                {"titulo":"Fecha de creación","dato":"_timestamp"},
                {"titulo":"Estatus de prospecto","dato":"listaSeguimiento"},
                {"titulo":"Acciones","listaAcciones":[
                    {"accion":"disparaAccionItem","icono":"icons:find-in-page","texto":"Abrir prospecto"},
                    {"accion":"disparaAccionEliminar","icono":"icons:delete-forever","texto":"Eliminar"}
                ]}
            ]},

            opcionesOrdena:{type:Array, notify:true, value:[
                {"opcion":"razonAs","texto":"Razón social (ascendente)"},
                {"opcion":"razonDe","texto":"Razón social (descendente)"},
                {"opcion":"fechaAs","texto":"Fecha de creación (ascendente)"},
                {"opcion":"fechaDe","texto":"Fecha de creación (descendente)"}
                
            ]},

            funcionProspecto:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionProspecto",
                    funcion:function(prospecto,texto,filtro) {
                        var estatus=null;
                        if(prospecto._esCliente==false && prospecto.listaSeguimiento){
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

    limpia(){
        this.set("busqueda",null);
    }

    ready() {
        super.ready();
        // var binder=new QueryBinder("_clientes-khalia",{
        //     "specialRef":firebase.firestore().collection("_clientes-khalia").where("_esCliente","==",false)
        // });
        
        // binder.bindArray(this,this.listaProspectos,"listaProspectos");

    }

    abreProspecto(e){
        var elegido=e.detail.valor;

        NavigationUtils.navigate("prospecto",{id:elegido.id})
        
    }

    abreNuevoCliente(){
        var arrUsers=PolymerUtils.cloneObject(this.listaUsuarios);
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Agregar prospecto",
			element:"dialogo-nuevo-prospecto",
            params:[arrUsers],
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "Guardar prospecto",
                style:"background-color:var(--paper-green-500);color:white;",
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

    eliminaProspecto(e){
        var elegido=e.detail.valor;
        var id=elegido.id;

        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Eliminar prospecto",
            message:"El prospecto <strong>"+elegido.razon+"</strong> y toda su información relacionada no podrá recuperarse. ¿Desea continuar?",
			saveSpinner:{
				message:"Eliminando prospecto"
			  },
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "Elimniar",
                style:"background-color:var(--paper-red-500);color:white;",
                action: function(dialog, element) {
                    dialog.setSaving(true);
                    firebase.firestore().collection("_clientes-khalia").doc(id).delete().then(() => {
                        PolymerUtils.Toast.show("Prospecto eliminado con éxito");
                        
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

customElements.define('my-prospectos-main', MyProspectosMain);