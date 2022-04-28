import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { NavigationMixin } from '../mixins/navigation-mixin.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import '../general-controls/data-simple.js';
import './dialogo-nuevo-producto.js';

import '../bootstrap.js';

class MyVistaProducto extends NavigationMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                .btn-accion{
                    
                    margin:5px;
                    border-radius:50%;
                    color:var(--paper-grey-600);
                    background-color:var(--paper-grey-100);
                }

                .btn-accion:hover{
                    background-color:var(--paper-blue-400);
                    color:white;
                }

              

                .titulo:hover{
                    text-decoration:underline;
                    cursor:pointer;
                }

                
            </style>
            
            <nav class="navbar" style="background-color:var(--paper-yellow-200);color:#000000;">
                <span class="navbar-brand text-wrap titulo" on-click="regresa">
                    <iron-icon icon="arrow-back"></iron-icon>
                    [[producto.nombre]]
                    
                </span>

                <div class="d-flex">
                    <template is="dom-if" if="[[esEditar]]">
                        <paper-icon-button class="btn-accion"
                        onmouseover="PolymerUtils.Tooltip.show(event,'Guardar cambios')"
                        icon="icons:save" on-click="disparaVentanaProd">
                        </paper-icon-button>

                        <paper-icon-button class="btn-accion"
                        onmouseover="PolymerUtils.Tooltip.show(event,'Cancelar')"
                        icon="icons:clear" on-click="cambiaInfo">
                        </paper-icon-button>
                    </template>
                    
                    <template is="dom-if" if="[[!esEditar]]">
                        <paper-icon-button class="btn-accion"
                        onmouseover="PolymerUtils.Tooltip.show(event,'Editar producto')"
                        icon="icons:create" on-click="cambiaEdita">
                        </paper-icon-button>
                        
                        <paper-icon-button class="btn-accion"
                        onmouseover="PolymerUtils.Tooltip.show(event,'Eliminar')"
                        icon="icons:delete" on-click="eliminaProd">
                        </paper-icon-button>

                    </template>
                
                
                </div>

            </nav>

            <div class="card">
                <div class="card-body">

                
                <iron-pages selected="{{selected}}" attr-for-selected="name">
                    <div name="info">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="d-flex align-items-center flex-wrap">
                                        <data-simple style="padding:5px;"dato="[[producto.codigo]]"
                                        titulo="Código de producto"></data-simple>

                                        <data-simple style="padding:5px;"dato="[[producto.departamento]]"
                                        titulo="Departamento"></data-simple>

                                        <data-simple style="padding:5px;"dato="[[producto.dependencia]]"
                                        titulo="Dependencia"></data-simple>

                                        <data-simple style="padding:5px;"dato="[[producto.cotizacion]]"
                                        titulo="Maneja tipo de cotización"></data-simple>
                                    </div>

                                    <div id="products" class="m-3"></div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div name="editar">
                        <dialogo-nuevo-producto style="margin:10px;" id="ventana-editar"
                        es-editar="[[esEditar]]" producto-activo="{{producto}}"></dialogo-nuevo-producto>
                    </div>
                </iron-pages>
                



                

                </div>
            </div>

          

        `;
    }



    static get properties() {
        return {
            producto:{type:Object, notify:true,observer:"_creaHtml"},
            _routeParams:{observer: "_routeChanged"},
            esEditar:{type:Boolean, notify:true, value:true},
            selected:{type:String, notify:true, value:"info"},
            esEditar:{type:Boolean, notify:true, value:false}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    _creaHtml(obj){

        if(obj && obj!=null){
            console.log("_creaHtml",obj);
            var pro=this.shadowRoot.querySelector("#products");

            var cadena="";

            if(obj.fundamento){
                cadena=cadena+"<p><b>Fundamento legal</b><br>"+obj.fundamento+"</p>";
            }else{
                cadena=cadena+"<p><b>Sin fundamento legal</b><br></p>";
            }

            if(obj.alcance){
                cadena=cadena+"<p><b>Alcance</b><br>"+obj.alcance+"</p>";
            }else{
                cadena=cadena+"<p><b>Sin alcance</b><br></p>";
            }
            if(obj.entregable){
                cadena=cadena+"<p><b>Entregable</b><br>"+obj.entregable+"</p>";
            }else{
                cadena=cadena+"<p><b>Sin lista de entregables</b><br></p>";
            }

       
            pro.innerHTML=cadena;
        }
        
       
        
    }

    regresa(){
        this.cambiaInfo();
        NavigationUtils.navigate("productos");

    }

    cambiaEdita(){
        this.set("esEditar",true);
        this.set("selected","editar");
        
    }
    cambiaInfo(){
        this.set("esEditar",false);
        this.set("selected","info");
        
    }

    disparaVentanaProd(){
        var dialogo=this.shadowRoot.querySelector("#ventana-editar");
        dialogo.guardaProducto();
        
    }

    _routeChanged(params){
        var t=this;
		if(params && params!=null && params.id){
            console.log("recibimos id de producto");
            var id=params.id;
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "_productos-khalia/"+id,
                observer:function(obj){
                    if(obj){
                        t.set("producto",obj);
                        
                    }else{
                        t.set("producto",null);
                    }
                }
            }));

		}else{
            t.set("producto",null);
        }
	}

    eliminaProd(){
        var elegido=this.producto;
        var id=elegido.id;

        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Eliminar producto",
            message:"El producto <strong>"+elegido.codigo+"</strong> y toda su información relacionada no podrá recuperarse. ¿Desea continuar?",
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

customElements.define('my-vista-producto', MyVistaProducto);