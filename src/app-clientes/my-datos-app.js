import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

import '../general-controls/data-simple.js';

import '../bootstrap.js';


class MyDatosApp extends DialogLayoutMixin(UtilsMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                paper-listbox{
                    cursor:pointer;
                    --paper-listbox-background-color:#F5F5F5;
                }
            </style>

            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <paper-listbox selected="{{vista}}">
                            <paper-item>Información general</paper-item>
                            <paper-item>Actualizar membresia</paper-item>
                            <paper-item>Cancelar membresia</paper-item>
                        </paper-listbox>
                    </div>
                    <div class="col-md-9">
                        <iron-pages selected="{{vista}}">
                            <div>
                                <div class="d-flex flex-wrap align-items-center">
                                    <data-simple  style="padding:5px;"font-size="25px"value="[[cliente.id]]" title="clave de producto"></data-simple>
                                    <data-simple  style="padding:5px;"font-size="25px"value="[[cliente.tipoMembresia.tipo]]" title="tipo de vigencia"></data-simple>
                                    <data-simple  style="padding:5px;"font-size="25px"value="[[showEstatus(cliente)]]" title="estatus de membresia"></data-simple>
                                    <data-simple  style="padding:5px;"font-size="25px"value="[[PolymerUtils_getDateString(cliente._fechaLimite)]]" title="vigencia de membresia"></data-simple>
                                </div>
                                <div>
                                    <div>usuarios registrados</div>
                                    <div class="d-flex flex-wrap align-items-center">
                                        <template is="dom-repeat" items="[[listaUsuarios]]">
                                            <div class="alert alert-primary" role="alert">
                                                usuario: [[item.displayName]]<br>
                                                contraseña: [[item.password]]

                                            </div>
                                            
                                        </template>

                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="d-flex align-items-center">
                                    <vaadin-combo-box class="flex-fill" id="combo-vigencia" label="Tipo de membresia" selected-item="{{nuevaVigencia}}"
                                    items="[[listaOpciones]]" item-label-path="tipo" item-id-path="cantidad">
                                        <template>
                                            <b>[[item.tipo]]</b>
                                            [[item.explicacion]]
                                        </template>
                                    </vaadin-combo-box>
                                    <data-simple class="flex-fill" font-size="15px" value="{{muestraNuevaFecha(fechaActual,nuevaVigencia)}}" title="fecha de vigencia"></data-simple>
                                </div>
                                <paper-button style="margin:10px;background-color:var(--paper-green-500);color:white;" on-click="modificaMembresia">actualizar</paper-button>

                            </div>
                            <div>
                                <p>
                                    El cliente tendra bloqueado el acceso a la plataforma de forma permanente.
                                    Todo acceso realizado con la llave de producto ya no sera
                                    válido.
                                </p>
                                <paper-button style="background-color:white;color:var(--paper-red-500);margin:5px;"
                                on-click="cancela">
                                    Cancelar membresia
                                </paper-button>

                            </div>
                        </iron-pages>

                    </div>
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            vista:{type:Number, notify:true, value:0},
            cliente:{type:Object, notify:true,observer:"_muestraInfo"},
            fechaActual:{type:Object, notify:true},
        
            nuevaVigencia:{type:Object, notify:true},
            listaOpciones:{type:Array, notify:true, value:[
                {"tipo":"Versión de prueba","explicacion":"15 días","cantidad":15},
                {"tipo":"Básica","explicacion":"1 mes","cantidad":30},
                {"tipo":"Completa","explicacion":"1 año","cantidad":365}
            ]},

            listaUsuarios:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
        var fecha=firebase.firestore.Timestamp.now().toDate();

        if(fecha && fecha!=null){
            this.set("fechaActual",fecha);
        }else{
            var fechaEquipo=new Date();
            this.set("fechaActual",fechaEquipo);
        }
        

    }

    ready() {
        super.ready();
    }

   _muestraInfo(obj){
       if(obj && obj!=null){
           var llave=obj.id;
           var binder=new QueryBinder("usuarios",{
               "specialRef":firebase.firestore().collection("_clientes").doc(llave).collection("usuarios")
            });
        
        binder.bindArray(this,this.listaUsuarios,"listaUsuarios");
       }
   }

    muestraNuevaFecha(fecha,dato){
        if(!fecha || fecha==null || !dato || dato==null){
            return "-";
        }else{
            var fechaBase=new Date(fecha.getTime());
            var numDias=dato.cantidad;
            var nuevaFecha=Sugar.Date.advance(fechaBase, { days: numDias });

            return Sugar.Date.medium(nuevaFecha,'es');
        }
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

    muestraFecha(fecha,dato){
        if(!fecha || fecha==null || !dato || dato==null){
            return "-";
        }else{
            var fechaBase=new Date(fecha.getTime());
            var numDias=dato.cantidad;
            var nuevaFecha=Sugar.Date.advance(fechaBase, { days: numDias });
            var noTime = new Date(nuevaFecha.getFullYear(), nuevaFecha.getMonth(), nuevaFecha.getDate());

            return firebase.firestore.Timestamp.fromDate(noTime);
        }
    }




    modificaMembresia(){
        var nuevaFecha=this.muestraFecha(this.fechaActual,this.nuevaVigencia);

        var id=this.cliente.id;
        var t=this;
        var washingtonRef = firebase.firestore().collection("_clientes").doc(id);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            _cancelada:false,
            _fechaLimite: nuevaFecha,
            tipoMembresia:t.nuevaVigencia
        }).then(() => {
            PolymerUtils.Toast.show("Membresia actualizada con éxito");
            
            t.DialogLayout_closeDialog();
        }).catch((error) => {
            PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
            console.error("Error updating document: ", error);
        });


    }

    cancela(){
       

        var id=this.cliente.id;
        var t=this;
        var washingtonRef = firebase.firestore().collection("_clientes").doc(id);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            _cancelada:true
        
        }).then(() => {
            PolymerUtils.Toast.show("Membresia actualizada con éxito");
            
            t.DialogLayout_closeDialog();
        }).catch((error) => {
            PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
            console.error("Error updating document: ", error);
        });


    }
}

customElements.define('my-datos-app', MyDatosApp);