import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

import './general-controls/my-lista-general.js';
import './app-clientes/my-nuevo-app.js';
import './app-clientes/my-datos-app.js';
import './app-clientes/my-comentarios-app.js';

import './bootstrap.js';

class MyAppClientes extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                paper-tabs paper-tab.iron-selected {
                    background-color: var(--paper-blue-300);
                }
            </style>
            
            <div class="container">
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand" >
                        <iron-icon icon="important-devices"></iron-icon>
                        App Clientes
                    </a>
                    <div class="form-inline my-2 my-lg-0">
                        <paper-tabs selected="{{selected}}" attr-for-selected="name" style="background-color:white;">
                            <paper-tab name="lista" onmouseover="PolymerUtils.Tooltip.show(event,'Clientes activos')">
                                <span><iron-icon icon="supervisor-account"></iron-icon></span>
                                
                            </paper-tab>
                            <paper-tab name="coment" onmouseover="PolymerUtils.Tooltip.show(event,'Comentarios')">
                                <span><iron-icon icon="feedback"></iron-icon></span>
                                
                            </paper-tab>
                        </paper-tabs>
                    </div>
                </nav>
                
                <iron-pages selected="{{selected}}" attr-for-selected="name">
                    <div name="lista">
                        <my-lista-general titulo-pagina="App Clientes" vista="appClientes" arreglo-items="{{listaClientesApp}}"
             
                        lista-filtro="[[listaFiltroApp]]" lista-ordena="[[opcionesOrdena]]"
                        lista-cols="[[datosApp]]"
                        funcion-buscar="[[funcionFiltraApp]]" funcion-ordenar="[[funcionOrdena]]"
                        on-ejecuta-accion="abreNuevoApp" on-ejecuta-item="abreClienteApp"
                        color-boton="#BF360C"></my-lista-general>
                    </div>
                    <div name="coment">
                        <my-comentarios-app></my-comentarios-app>
                    </div>
                    <div name="elegido">
                        <div class="card">
                            <div class="card-body">
                                
                                <h3 class="card-title" on-click="navegaCliente">
                                    <span>
                                        <paper-icon-button icon="arrow-back" on-click="backLista"></paper-icon-button>
                                    </span>
                                    [[datosCliente.razon]]
                                </h3>
                                <my-datos-app cliente="[[datosCliente]]"></my-datos-app>
                            </div>
                        </div>
                    </div>
                   
                </iron-pages>
                
            </div>
            
            
        `;
    }

    static get properties() {
        return {
            listaUsuarios:{type:Array, notify:true, value:[]},
            selected:{type:String, notify:true, value:"lista"},
            datosApp:{type:Array, notify:true, value:[
                {"titulo":"Clave de producto","dato":"_key"},
                {"titulo":"Razón social","dato":"razon"},
                {"titulo":"Fecha de creación","dato":"_timestamp"},
                {"titulo":"Membresía","dato":"tipoMembresia","valorInterno":"tipo"},
                {"titulo":"Estado","dato":"objCliente"},
                {"titulo":"Acciones","listaAcciones":[
                    {"accion":"disparaAccionItem","icono":"icons:input","texto":"Ver detalles"},
                ]}
                
            ]},
            listaClientesApp:{type:Array, notify:true, value:[]},

            listaFiltroApp:{type:Array, notify:true, value:[

                {color:"#FFEB3B",base:"black",texto:"ESTATUS ACTIVA"},
                {color:"#FFEB3B",base:"black",texto:"ESTATUS FINALIZADA"},
                {color:"#FFEB3B",base:"black",texto:"ESTATUS CANCELADA",esSeparador:true},
                {color:"#FFEB3B",base:"black",texto:"MEMBRESIA DE PRUEBA"},
                {color:"#FFEB3B",base:"black",texto:"MEMBRESIA BASICA"},
                {color:"#FFEB3B",base:"black",texto:"MEMBRESIA COMPLETA"},
                
            ]},

            opcionesOrdena:{type:Array, notify:true, value:[
                {"opcion":"claveAs","texto":"Clave de producto (A -Z)"},
                {"opcion":"claveDe","texto":"Clave de producto (Z - A)"},
                {"opcion":"razonAs","texto":"Razón social (A -Z)"},
                {"opcion":"razonDe","texto":"Razón social (Z - A)"},
                {"opcion":"fechaAs","texto":"Fecha de creación (más antiguo)"},
                {"opcion":"fechaDe","texto":"Fecha de creación (más reciente)"}
                
            ]},

            funcionFiltraApp:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionFiltraApp",
                    funcion:function(clienteApp,texto,filtro) {
                        var fecha=firebase.firestore.Timestamp.now().toDate();

                        if(fecha && fecha!=null){
                            var fechaActual=fecha;
                        }else{
                            var fechaEquipo=new Date();
                            var fechaActual=fechaEquipo;
                        }
                       
                    
                        if(filtro=='todos'){
                            if((clienteApp.razon && clienteApp.razon.toLowerCase().indexOf(texto)!=-1) ||(clienteApp.id && clienteApp.id.toLowerCase().indexOf(texto)!=-1)){
                                return clienteApp;
                            }
                        }else{
                            console.log("filtro",filtro);
                            if(clienteApp._cancelada && clienteApp._cancelada==true){
                                var esActivado= "cancelada";
                            }else{
                                var fechaProducto=PolymerUtils.getDateFromTimestamp(clienteApp._fechaLimite);
                    
                                var diasRestantes=Sugar.Date.daysUntil(fechaActual, fechaProducto);
                    
                                if(diasRestantes<=0){
                                    var esActivado= "finalizada";
                                }else{
                                    var esActivado= "activa";
                                }
                    
                    
                            }

                            if(filtro=="ESTATUS ACTIVA"){
                                if(esActivado=="activa"){
                                    if((clienteApp.razon && clienteApp.razon.toLowerCase().indexOf(texto)!=-1) || (clienteApp.id && clienteApp.id.toLowerCase().indexOf(texto)!=-1)){
                                        return clienteApp;
                                    }
                                }
                            }else if(filtro=="ESTATUS FINALIZADA"){
                                if(esActivado=="finalizada"){
                                    if((clienteApp.razon && clienteApp.razon.toLowerCase().indexOf(texto)!=-1) || (clienteApp.id && clienteApp.id.toLowerCase().indexOf(texto)!=-1)){
                                        return clienteApp;
                                    }
                                }
                            }else if(filtro=="ESTATUS CANCELADA"){
                                if(esActivado=="cancelada"){
                                    if((clienteApp.razon && clienteApp.razon.toLowerCase().indexOf(texto)!=-1) || (clienteApp.id && clienteApp.id.toLowerCase().indexOf(texto)!=-1)){
                                        return clienteApp;
                                    }
                                }
                            }else if(filtro=="MEMBRESIA DE PRUEBA"){
                                
                              
                                if(
                                    clienteApp.tipoMembresia.cantidad==15 
                                ){
                                    return clienteApp;
                                }

                            }else if(filtro=="MEMBRESIA BASICA"){
                                if(
                                    clienteApp.tipoMembresia.cantidad==30 
                                ){
                                    return clienteApp;
                                }
                                
                            }else if(filtro=="MEMBRESIA COMPLETA"){
                                if(
                                    clienteApp.tipoMembresia.cantidad==365 
                                ){
                                    return clienteApp;
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
                        
                        var textoA=a.razon.toLowerCase();
                        var textoB=b.razon.toLowerCase();
                        var at=PolymerUtils.convertFirebaseTimestamp(a._timestamp);
                        var bt=PolymerUtils.convertFirebaseTimestamp(b._timestamp);
                    
                        switch (str) {
                            case "claveAs":
                                if(a.id==b.id){
                                    return 0;
                                }
                                else{
                                    return (a.id<b.id ? -1 : 1);
                                }
                            break;
                            case "claveDe":
                                if(a.id==b.id){
                                    return 0;
                                }else{
                                    return (a.id>b.id ? -1 : 1);
                                } 
                            break;
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

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        var binder=new QueryBinder("_clientes",{
            "specialRef":firebase.firestore().collection("_clientes")
        });
        
        binder.bindArray(this,this.listaClientesApp,"listaClientesApp");
    }

    showEstatus(obj){
        if(obj._cancelada && obj._cancelada==true){
            return "cancelada";
        }else{
            var fechaProducto=this.PolymerUtils_getDateFromTimestamp(obj._fechaLimite);
            var fechaActual=this.fechaActual;

            var diasRestantes=Sugar.Date.daysUntil(fechaActual, fechaProducto);

            if(diasRestantes<=0){
                return "finalizada";
            }else{
                return "activa";
            }
            //return diasRestantes;


        }
    }

    backLista(){
        console.log("se dispara backLista");
        this.set("selected","lista");
    }

    abreClienteApp(e){
        console.log("abreClienteApp",e);
        var elegido=e.detail.objeto.dato;
        

        this.set("selected","elegido");
        this.set("datosCliente",elegido);
        // PolymerUtils.Dialog.createAndShow({
		// 	type: "modal",
		// 	element:"my-datos-app",
		// 	style:"width:700px;max-width:95%;",
        //     params:[elegido],
        //     negativeButton: {
        //         text: "Cerrar",
        //         action: function(dialog, element) {
        //             dialog.close();
        //         }
        //     }
		// });
    }

    abreNuevoApp(){
        var arrUsers=PolymerUtils.cloneObject(this.listaUsuarios);
       PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-nuevo-app",
			title:"Agregar cliente a plataforma",
			style:"width:600px;max-width:95%;",
            params:[arrUsers],
			positiveButton: {
                text: "Crear",
                action: function(dialog, element) {
                    element.accionBotonGuardar();
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

customElements.define('my-app-clientes', MyAppClientes);