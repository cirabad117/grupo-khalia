import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import './productos/dialogo-nuevo-producto.js';
import './general-controls/my-lista-general.js';
// import './productos/dialogo-prod-info.js';

class MyProductosMain extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <my-lista-general vista="productos" arreglo-items="[[listaProductos]]" titulo="codigo"
            lista-filtro="[[listaSeccion]]" lista-ordena="[[opcionesOrdena]]"
            funcion-ordenar="[[funcionOrdena]]" funcion-buscar="[[funcionFiltra]]"
            on-ejecuta-accion="abreNuevoProd" on-ejecuta-item="abreInfo"></my-lista-general>

         



        `;
    }

    static get properties() {
        return {
            listaProductos:{type:Array, notify:true, value:[]},
            listaSeccion:{type:Array, notify:true, value:[

                {color:"#FFEB3B",base:"black",texto:"IMPACTO"},
                {color:"#FFEB3B",base:"black",texto:"SEGURIDAD"},
                {color:"#FFEB3B",base:"black",texto:"SASISOPA",esSeparador:true},
                {color:"#1A237E",base:"white",texto:"ASEA"},
                {color:"#1A237E",base:"white",texto:"CRE"},
                {color:"#1A237E",base:"white",texto:"SENER"},
                {color:"#1A237E",base:"white",texto:"IMSS"},
                {color:"#1A237E",base:"white",texto:"STPS"},
                {color:"#1A237E",base:"white",texto:"Otro"},
            ]},

            opcionesOrdena:{type:Array, notify:true, value:[
                {"opcion":"razonAs","texto":"nombre del producto (ascendente)"},
                {"opcion":"razonDe","texto":"nombre del producto (descendente)"},
                
            ]},
            funcionFiltra:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionProspecto",
                    funcion:function(item,texto,filtro) {
                        var busca=texto.toLowerCase();
                        if(filtro=="todos"){
                            if((item.nombre&&item.nombre.replace(/\s|_|\(|\)/g, "-").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().indexOf(busca)!=-1) || 
                            (item.codigo &&item.codigo.toLowerCase().indexOf(busca)!=-1)){
                                return item;
                            }
                        }else{
                            if(item.departamento==filtro || item.dependencia==filtro){
                                if((item.nombre&&item.nombre.replace(/\s|_|\(|\)/g, "-").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().indexOf(busca)!=-1) || 
                                (item.codigo &&item.codigo.toLowerCase().indexOf(busca)!=-1)){
                                    return item;
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
                        // var at=PolymerUtils.convertFirebaseTimestamp(a._timestamp);
                        // var bt=PolymerUtils.convertFirebaseTimestamp(b._timestamp);
                        var textoA=a.nombre.toLowerCase();
                        var textoB=b.nombre.toLowerCase();
                    
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
                            // case "fechaAs":
                            //     if(at==bt){
                            //         return 0;
                            //     }else{
                            //         return (at<bt ? -1 : 1);
                            //     }
                            // break;
                            // case "fechaDe":
                            //     if(at==bt){
                            //         return 0;
                            //     }else{
                            //         return (at>bt ? -1 : 1);
                            //     }
                            // break;
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
        var binder=new QueryBinder("_productos-khalia");
        
        binder.bindArray(this,this.listaProductos,"listaProductos");
    }

    cambiaOrdena(e){
        console.log("cambiaOrdena",e.target.id);
    }

    abreNuevoProd(){
        NavigationUtils.navigate("producto");
        // PolymerUtils.Dialog.createAndShow({
		// 	type: "modal",
        //     title:"Agrear nuevo producto",
		// 	element:"dialogo-nuevo-producto",
			
		// 	style:"width:400px;max-width:95%;",
		// 	positiveButton: {
        //         text: "Crear",
        //         action: function(dialog, element) {
        //             element.guardaProducto();
                    
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

    abreInfo(e){
        var elegido=e.detail.valor;
        NavigationUtils.navigate("producto",{id:elegido.id});
        // PolymerUtils.Dialog.createAndShow({
		// 	type: "modal",
        //     title:"Información del producto",
		// 	element:"dialogo-prod-info",
		// 	params:[elegido],
		// 	style:"width:400px;max-width:95%;",
		
        //     negativeButton: {
        //         text: "Cerrar",
        //         action: function(dialog, element) {
                    
        //             dialog.close();
        //         }
        //     }
		// });
    }
}

customElements.define('my-productos-main', MyProductosMain);