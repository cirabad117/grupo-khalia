import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { NavigationMixin } from "../mixins/navigation-mixin.js";

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-icons/social-icons.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';

import '../general-controls/item-contacto.js';
import '../general-controls/my-datos-seguimiento.js';
import '../general-controls/my-datos-contacto.js';

import '../bootstrap.js';

class MyProspecto extends NavigationMixin(UtilsMixin(PolymerElement)) {
    static get template() {
        return html`
            <!-- <style include="bootstrap">
                :host{
                    display:block;
                    margin:10px;
                }

                h5:hover{
                    cursor:pointer;
                }

          
                
            </style>
            
            <div class="media bg-light m-2 ">
                <div class="media-body">
                    <h5 class="mt-0">{{razon}}
                        <span class="badge" style$="padding:5px; background-color:[[objEstatus.color]];color:[[objEstatus.base]]; ">{{objEstatus.texto}}</span>
                        
                        <paper-icon-button icon="social:person-add" on-click="navegaCliente" class="btn btn-primary btn-sm" style="margin:5px;background-color:var(--paper-blue-500);color:white;"></paper-icon-button>
                        
                    </h5>
                    <div id="content-extra" class="row" on-click="muestra">
                        <div class="col-md-12">
                            <p><span><iron-icon icon="exit-to-app"></iron-icon></span>mostrar Información</p>
                        </div>
                    </div>
                    
                </div>
            </div> -->

            <style include="bootstrap">
				:host{
					display: block;
				}
                .carta{
                    background-color: white;
                    border-radius: 5px;
                    margin: 8px 24px;
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
			</style>
            
            <div class="carta carta-1" >
                <div style="display: flex; padding: 8px 16px; ">
                    <div>
                        <div style="font-size: 22px; font-weight: 500; color: var(--paper-indigo-500);">{{prospecto.razon}}</div>
                        <div style="font-size: 16px; font-weight: 500;">
                            <span class="badge" style$="padding:5px; background-color:[[objEstatus.color]];color:[[objEstatus.base]];">
                                {{objEstatus.texto}}
                            </span>
                        </div>
                    </div>
                    <div style="flex-grow: 1000;"></div>
                    <div style="text-align: right;">
                        <div style="font-size: 16px; font-weight: 400; color: var(--paper-blue-grey-500);">fecha de creación</div>
                        <div style="font-weight: 400; font-size: 16px;">[[PolymerUtils_getTimeString(prospecto._timestamp)]]</div>
                    </div>
                </div>
            </div>
            
         

            
        `;
    }

    static get properties() {
        return {
            prospecto:{type:Object, notify:true,observer:"_llenaCampos"},

            objEstatus:{type:Object, notify:true},
            listaContactos:{type:Array, notify:true, value:[]},
            listaSeguimiento:{type:Array, notify:true, value:[]},
            objCliente:{type:Object, notify:true},
            // _routeParams:{observer: "_routeChanged"},

            bolInfo:{type:Boolean, notify:true, value:false},
            bolConta:{type:Boolean, notify:true, value:false},
            bolExtra:{type:Boolean, notify:true, value:false},

            accionesExtra:{type:Boolean, notify:true, value:false}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
      
    }

    navegaCliente(e){
        var elegido=this.prospecto;
        NavigationUtils.navigate("cliente",{id:elegido.id})
    }
    
    muestraEstatus(arreglo){
        console.log("recibimos lsita de seguimiento",arreglo);
        var comparar=function(a,b){
            var nameA = a.fechaGuardado; 
            var nameB = b.fechaGuardado; 
            if (nameA > nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
    
            // names must be equal
            return 0;
        };

        var ordenado=arreglo.sort(comparar);
        var ultimo=ordenado[0];

        if(ultimo && ultimo!=null){
            return ultimo.estatus;
        }else{
            return {texto:"no hay datos de seguimiento",base:"white",color:"black"};
        }
    }
    
    cambiaVista(){
        t.set("accionesExtra",!t.accionesExtra);
    }

    muestraIcono(bol){
        if(bol==true){
            return "expand-less";
        }else{
            return "expand-more";
        }
    }

    

    actualizaDatos(){
        var idEditar=this.prospecto.id;

        if(!this.razon || this.razon==null || this.razon.trim()==""){
            return PolymerUtils.Toast.show("Ingresa un nombre válido");
        }

        var actualizado={
            razon:this.razon
        };

        
        if(this.alias){
            actualizado["alias"]=this.alias;
        }

        if(this.franquicia){
            actualizado["franquicia"]=this.franquicia;
        }
        
        firebase.firestore().collection("_clientes-khalia").doc(idEditar).set(actualizado,{merge:true})
        .then(() => {
            PolymerUtils.Toast.show("Información actualizada con exito");
        })
        .catch((error) => {
            PolymerUtils.Toast.show("Error al guardar; intentalo más tarde.");
            console.error("Error writing document: ", error);
        });
    }
    
    spliceContactos(e){
        var eliminar=e.detail.indexEliminar;
        this.splice("listaContactos",eliminar,1);

    }

    _llenaCampos(obj){
        if(obj && obj!=null){
            if(obj.razon){
                this.set("razon",obj.razon);
            }
            if(obj.alias){
                this.set("alias",obj.alias);
            }

            if(obj.franquicia){
                this.set("franquicia",obj.franquicia);
            }
            if(obj.listaContactos){
                this.set("listaContactos",obj.listaContactos);
            }
            if(obj.listaSeguimiento){
                this.set("listaSeguimiento",obj.listaSeguimiento);

                var obj=this.muestraEstatus(obj.listaSeguimiento);
                this.set("objEstatus",obj)
            }else{
                this.set("objEstatus",{texto:"no hay datos de seguimiento",base:"white",color:"black"}
                );
            }
        }
        
    } 

}

customElements.define('my-prospecto', MyProspecto);