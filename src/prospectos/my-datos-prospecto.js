import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';
import { NavigationMixin } from '../mixins/navigation-mixin.js';

import '../general-controls/my-datos-contacto.js';
import '../general-controls/my-datos-seguimiento.js';
import '../general-controls/data-simple.js';
import '../controles-extra/selector-usuarios.js';

import '../bootstrap.js';

class MyDatosProspecto extends NavigationMixin(DialogLayoutMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <div class="container-fluid">
                <div class="card">
                    <div class="card-header">
                        
                        <paper-icon-button icon="arrow-back" on-click="navegaLista"></paper-icon-button>
                        
                        Informacion del prospecto
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <template is="dom-if" if="[[esEditar]]">
                                    <paper-input id="txtAlias" label="Razón social"
                                    value="{{razon}}" error-message="valor inválido"></paper-input>
                                    
                                    <paper-input id="txtAlias" label="Alias"
                                    value="{{alias}}" error-message="valor inválido"></paper-input>

                                    <selector-usuarios etiqueta="Agente" usuario-elegido="{{agente}}"></selector-usuarios>
                                    
                                    <paper-input id="txtAlias" label="Franquicia"
                                    value="{{franquicia}}" error-message="valor inválido"></paper-input>

                                    <button type="button" class="btn btn-sm btn-success" on-click="actualizaDatos">
                                        <span>
                                            <iron-icon icon="save"></iron-icon>
                                        </span>guardar cambios
                                    </button>
                                    
                                    <button type="button" class="btn btn-sm btn-light" on-click="cambiaEdita">
                                        <span>
                                            <iron-icon icon="clear"></iron-icon>
                                        </span>cancelar
                                    </button>
                                </template>

                                <template is="dom-if" if="[[!esEditar]]">
                                    <div style="display:flex;">
                                        <data-simple value="{{razon}}" title="Nombre o razón social" font-size="20px"></data-simple>
                                        <paper-icon-button style="background-color:#FFECB3;border-radius:50%;" icon="create" on-click="cambiaEdita"></paper-icon-button>

                                    </div>
                                    <data-simple value="{{alias}}" title="alias" font-size="20px"></data-simple>
                                    <data-simple value="{{nombreAgente}}" title="Agente" font-size="20px"></data-simple>
                                    <data-simple value="{{franquicia}}" title="Franquicia" font-size="20px"></data-simple>

                                    <paper-button on-click="cambiaCliente" raised style="background-color:var(--paper-blue-500);color:white;">
                                        <span>
                                        <iron-icon icon="supervisor-account"></iron-icon>
                                        </span>
                                        agregar a clientes
                                    </paper-button>
                                </template>
                            </div>

                            <div class="col-md-9">
                                <my-datos-seguimiento  on-despacha-dialogo="updateDialogo"
                                style="margin:10px; padding:10px; background-color:#F5F5F5; border-radius:10px;"
                                id-prospecto="[[prospecto.id]]" arreglo-seguimiento="[[listaSeguimiento]]">
                                </my-datos-seguimiento>
                                
                                <my-datos-contacto on-despacha-dialogo="updateDialogo"
                                style="margin:10px; padding:10px; background-color:#F5F5F5; border-radius:10px;"
                                id-prospecto="[[prospecto.id]]" arreglo-contactos="[[listaContactos]]">
                                </my-datos-contacto>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            prospecto:{type:Object, notify:true,observer:"_llenaCampos"},
            esEditar:{type:Boolean, notify:true, value:false},
            razon:{type:String, notify:true},
            agente:{type:Object, notify:true},
            nombreAgente:{type:String, notify:true},
            alias:{type:String, notify:true},
            listaSeguimiento:{type:Array, notify:true, value:[]},
            listaContactos:{type:Array, notify:true, value:[]},

            _routeParams:{observer: "_routeChanged"},

        }
    }
    
    constructor() {
        super();
    }

    cambiaEdita(){
        this.set("esEditar",!this.esEditar);
    }

    navegaLista(){
        NavigationUtils.navigate("prospectos");
    }
    
    _routeChanged(params){
        var t=this;
        if(params && params!=null && params.id){
            console.warn("se ejecuta _routeChanged",params);
            
            
            var t=this;
            
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "_clientes-khalia/"+params.id,
                observer:function(obj){
                    if(obj){
                        console.log("recibimos consulta",obj);
                        t.set("prospecto",obj);
                        
                        
                        // t.DialogLayout_notifyResize();
                        // console.log("_dialog",t._dialog);
                    }else{
                        t.set("prospecto",null);
                        // t.DialogLayout_notifyResize();
                        // console.log("_dialog",t._dialog);
                    }
                }
            }));

        }else{
            t.set("prospecto",null);
        }
	}

    updateDialogo(){
        this.__notifyResize(500);
    }

    ready() {
        super.ready();
    }

    _llenaCampos(obj){
        if(obj && obj!=null){
            if(obj.razon){
                this.set("razon",obj.razon);
            }else{
                this.set("razon",null);
            }

            if(obj.agente){
                this.set("nombreAgente",obj.agente.displayName);
                this.set("agente",obj.agente);
            }else{
                this.set("nombreAgente",null);
                this.set("agente",null);
            }


            if(obj.alias){
                this.set("alias",obj.alias);
            }else{
                this.set("alias",null);
            }

            if(obj.franquicia){
                this.set("franquicia",obj.franquicia);
            }else{
                this.set("franquicia",null);
            }
            if(obj.listaContactos){
                
                var arrCon=PolymerUtils.cloneObject(obj.listaContactos);
                console.log("hay contactos",arrCon);
                this.set("listaContactos",arrCon);
            }
            if(obj.listaSeguimiento){
                var arrSeg=PolymerUtils.cloneObject(obj.listaSeguimiento);
                this.set("listaSeguimiento",arrSeg);
            }
         
        }

        
        
    }

    cambiaCliente(){
        var idEditar=this.prospecto.id;
        var t=this;



        PolymerUtils.Dialog.createAndShow({
            title:"Nuevo cliente",
			type: "modal",
            style:"width:400px;max-width:95%;",
            saveSpinner:{message:"guardando cliente"},
            message:"El prospecto seleccionado sera agregado a la lista de clientes activos. ¿Desea continuar?",
			positiveButton: {
                text: "crear cliente",
                action: function(dialog, element) {
                    t.DialogLayout_setSaving(true);
                    var washingtonRef = firebase.firestore().collection("_clientes-khalia").doc(idEditar);
                    return washingtonRef.update({
                        _esCliente: true
                    }).then(() => {
                        PolymerUtils.Toast.show("Cliente creado con éxito");
                        t.DialogLayout_closeDialog();
                        NavigationUtils.navigate("clientes");
                        
                    }).catch((error) => {
                        t.DialogLayout_setSaving(false);
                        console.error("Error updating document: ", error);
                        PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde.");
                    });
                }
            },
            negativeButton: {
                text: "cancelar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});
















        
        

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
    
    if(this.agente){
        actualizado["agente"]=this.agente;
    }

    var t=this;
    firebase.firestore().collection("_clientes-khalia").doc(idEditar).set(actualizado,{merge:true})
    .then(() => {
        PolymerUtils.Toast.show("Información actualizada con exito");
        t.cambiaEdita();
    })
    .catch((error) => {
        PolymerUtils.Toast.show("Error al guardar; intentalo más tarde.");
        console.error("Error writing document: ", error);
    });
}
    
}

customElements.define('my-datos-prospecto', MyDatosProspecto);