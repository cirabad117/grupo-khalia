import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DiccionarioMixin } from './mixins/diccionario-mixin.js';


import './general-controls/my-lista-general.js';

import './prospectos/dialogo-nuevo-prospecto.js';
import './prospectos/my-prospecto.js';
import './prospectos/my-datos-prospecto.js';

import './bootstrap.js';


class MyProspectosMain extends DiccionarioMixin(PolymerElement) {
    static get template() {
        return html`
            <style >
                :host{
                    display:block;
                }
            </style>

            <my-lista-general vista="prospectos" arreglo-items="[[listaProspectos]]"
            lista-filtro="[[listaEstatus]]" lista-ordena="[[opcionesOrdena]]"
            lista-cols="[[datosProspecto]]"
            funcion-buscar="[[funcionProspecto]]" funcion-ordenar="[[funcionOrdena]]"
            on-ejecuta-accion="abreNuevoCliente" on-ejecuta-item="abreProspecto"
            color-boton="var(--paper-green-600)"></my-lista-general>


        `;
    }

    static get properties() {
        return {
            listaProspectos:{type:Array, notify:true, value:[]},
            busqueda:{type:String, notify:true},
            filtroEstatus:{type:String, notify:true, value:"todos"},
            modoOrdena:{type:String, notify:true},

            datosProspecto:{type:Array, notify:true, value:[
                {"titulo":"razon social","dato":"razon"},
                {"titulo":"estatus de prospecto","dato":"listaSeguimiento"}
            ]},

            opcionesOrdena:{type:Array, notify:true, value:[
                {"opcion":"razonAs","texto":"razón social (ascendente)"},
                {"opcion":"razonDe","texto":"razón social (descendente)"},
                {"opcion":"fechaAs","texto":"fecha de creacion (ascendente)"},
                {"opcion":"fechaDe","texto":"fecha de creacion (descendente)"}
                
            ]},

            funcionProspecto:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionProspecto",
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

    limpia(){
        this.set("busqueda",null);
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
        var elegido=e.detail.valor;

        NavigationUtils.navigate("prospecto",{id:elegido.id})
        
        // PolymerUtils.Dialog.createAndShow({
		// 	type: "modal",
		// 	element:"my-datos-prospecto",
		// 	params:[elegido],
		// 	style:"width:95%;",
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

    abreNuevoCliente(){
        //NavigationUtils.navigate("nuevo-prospecto");
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Agregar prospecto",
			element:"dialogo-nuevo-prospecto",
			
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "Guardar prospecto",
                action: function(dialog, element) {
                    element.guardaCliente();
                }
            },
            negativeButton: {
                text: "Cerrar",
                action: function(dialog, element) {
                    // element.limpiaDatos();
                    dialog.close();
                }
            }
		});
    }

    // _buscaProspecto(texto){

    //     if(!texto || texto.trim()==""){
    //         return null;
    //     }

    //     if(texto){
    //         texto=texto.toLowerCase();
    //     }
       
        
    //         console.log("_buscaProspecto",texto);
    //         return function(prospecto){
    //             if((prospecto.razon && prospecto.razon.toLowerCase().indexOf(texto)!=-1) || (prospecto.alias && prospecto.alias.toLowerCase().indexOf(texto)!=-1)){
    //                 return prospecto;
    //             }
    //             else{
    //                 var arreglo=prospecto.listaContactos;
    //                 if(arreglo){
    //                     for(var i=0; i<arreglo.length;i++){
    //                         var item=arreglo[i];
    //                         if((item.nombreCliente && item.nombreCliente.toLowerCase().indexOf(texto)!=-1) || (item.puesto && item.puesto.toLowerCase().indexOf(texto)!=-1)){
    //                             return prospecto;
    //                         }
    //                     }
    //                 }
                    
    //             }
    //         }
        

    // }


    _ordenaRegistros(str){

        if(str){
            return function(a,b){
                
            };
        }

        
    }


    computeFilter(string,directa,inventario,word) {
            
        // return a filter function for the current search string
        if(word){
            word=word.toLowerCase().trim();
        }
        return function(employee) {
  //			  console.log("Employee",employee);
  //console.log("Comparing: ",employee,string);
                  
         return (
             (
                 (string && string!="todo") ? employee.catId==string : true) &&
                 (directa ? employee.ventaDirecta==true : true) &&
                  (inventario ? employee.manejaInventario==true : true) &&
                  (word ? employee.description.toLowerCase().indexOf(word)!=-1 : true)
                  );
        };
      
    }

    // modificaEstadoCliente(e){
    //     //NavigationUtils.navigate("nuevo-prospecto");
    //     var elegido=e.detail.datos;
    //     var id=elegido.id;
        
    //     PolymerUtils.Dialog.createAndShow({
	// 		type: "modal",
    //         title:"Confirmar nuevo cliente",
    //         message:"El prospecto seleccionado se convertirá en cliente de Grupo Khalia. ¿Desea continuar con la accion actual?",
	// 		//element:"dialogo-nuevo-prospecto",
			
	// 		style:"width:400px;max-width:95%;",
	// 		positiveButton: {
    //             text: "Crear",
    //             action: function(dialog, element) {
                    
                    
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

customElements.define('my-prospectos-main', MyProspectosMain);