import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import './productos/dialogo-nuevo-producto.js';
import './general-controls/my-lista-general.js';
import './productos/dialogo-nuevo-producto.js';

import './bootstrap.js';

class MyProductosMain extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <nav class="navbar navbar-light" style="background-color:var(--paper-yellow-200);color:#000000;">
                <a class="navbar-brand">
                    <iron-icon icon="icons:class"></iron-icon>
                    Control de productos
                </a>
            </nav>

            
            <my-lista-general titulo-pagina="" vista="productos" arreglo-items="[[listaProductos]]"
            estilo-navega="" icono=""
            lista-filtro="[[listaSeccion]]" lista-ordena="[[opcionesOrdena]]"
            lista-cols="[[datosProd]]"
            funcion-ordenar="[[funcionOrdenaProd]]" funcion-buscar="[[funcionFiltraProd]]"
            on-ejecuta-accion="abreNuevoProd" on-ejecuta-item="ejecutaAccionItem"></my-lista-general>


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

            datosProd:{type:Array, notify:true, value:[
                {"titulo":"Código","dato":"codigo"},
                {"titulo":"Nombre","dato":"nombre"},
                {"titulo":"Departamento","dato":"departamento"},
                {"titulo":"Dependencia","dato":"dependencia"},
                {"titulo":"Acciones","listaAcciones":[
                    {"accion":"accionItem","icono":"icons:input","texto":"Mostrar producto"},
                    {"accion":"eliminar","icono":"icons:delete-forever","texto":"Eliminar"}
                ]}
            ]},

            opcionesOrdena:{type:Array, notify:true, value:[
                {"opcion":"codAs","texto":"Código (A - Z)"},
                {"opcion":"codDe","texto":"Código (Z - A)"},
                {"opcion":"razonAs","texto":"Nombre del producto (A - Z)"},
                {"opcion":"razonDe","texto":"Nombre del producto (Z - A)"},
                
            ]},
            funcionFiltraProd:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionFiltraProd",
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
            funcionOrdenaProd:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionOrdenaProd",
                    funcion:function(a,b,str) {

                        var textoA=a.nombre.toLowerCase();
                        var textoB=b.nombre.toLowerCase();
                        var codA=a.codigo.toLowerCase();
                        var codB=b.codigo.toLowerCase();
                    
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
                                if(codA==codB){
                                    return 0;
                                }else{
                                    return (codA>codB ? -1 : 1);
                                } 
                            break;
                            case "codAs":
                                if(codA==codB){
                                    return 0;
                                }else{
                                    return (codA<codB ? -1 : 1);
                                } 
                            break;
                            case "codDe":
                                if(textoA==textoB){
                                    return 0;
                                }else{
                                    return (textoA>textoB ? -1 : 1);
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
        
    }

    cambiaOrdena(e){
        console.log("cambiaOrdena",e.target.id);
    }

    abreNuevoProd(){

        // NavigationUtils.navigate("producto");
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"dialogo-nuevo-producto",
			title:"Agregar cliente",
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "guardar",
                style:"background-color:var(--paper-blue-500);color:white",
                action: function(dialog, element) {
                    element.guardaProducto();
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
        var elegido=e.detail.objeto;

        if(elegido.texto=="eliminar"){
            this.eliminaProd(elegido.dato);
        }else{
            this.abreInfo(elegido.dato);
        }
    }

    abreInfo(prod){
        
        NavigationUtils.navigate("producto",{id:prod.id});

    }

    eliminaProd(prod){
        
        var id=prod.id;

        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Eliminar producto",
            message:"El producto <strong>"+prod.codigo+"</strong> y toda su información relacionada no podrá recuperarse. ¿Desea continuar?",
			saveSpinner:{
				message:"Eliminando producto"
			  },
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "Elimniar",
                style:"background-color:var(--paper-red-500);color:white;",
                action: function(dialog, element) {
                    dialog.setSaving(true);
                    firebase.firestore().collection("_productos-khalia").doc(id).delete().then(() => {
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
                text: "Cerrar",
                action: function(dialog, element) {
                
                    dialog.close();
                }
            }
		});
    }
}

customElements.define('my-productos-main', MyProductosMain);