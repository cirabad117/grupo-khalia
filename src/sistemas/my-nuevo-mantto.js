import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';

import './my-mantto-item.js';

import '../bootstrap.js';

class MyNuevoMantto extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <paper-radio-group selected="{{tipo}}">
                            <paper-radio-button name="PREVENTIVO">MANTENIMIENTO PREVENTIVO</paper-radio-button>
                            <paper-radio-button name="CORRECTIVO">MANTENIMIENTO CORRECTIVO</paper-radio-button>
                        </paper-radio-group>
                        <template is="dom-if" if="{{esCorrectivo(tipo)}}">
                            <paper-input label="Motivo de la inspección" value="{{motivo}}"></paper-input>
                        </template>

                        <paper-tabs selected="{{selected}}" attr-for-selected="name">
                            
                            <paper-tab name="inventario">inventario</paper-tab>
                            <paper-tab name="personal">personal</paper-tab>
                            
                        </paper-tabs>

                        
                        <iron-pages selected="{{selected}}" attr-for-selected="name">
                            <div name="inventario" style="overflow-y:scroll;max-height:200px;">
                                <paper-listbox>
                                    <template is="dom-repeat" items="[[inventario]]" as="equipo">
                                        <paper-item on-click="agregaEquipo">
                                            <paper-item-body>
                                                <div>[[equipo.tipo]] - [[equipo.marca]]</div>
                                                <div secondary>
                                                    [[equipo.ns]]
                                                </div>
                                            </paper-item-body>
                                            
                                        </paper-item>
                                    </template>
                                </paper-listbox>

                            </div>
                            <div name="personal" style="overflow-y:scroll;max-height:200px;">
                                responsable
                                <paper-listbox>
                                    <template is="dom-repeat" items="[[listaEmpleados]]" as="emp">
                                        <paper-item on-click="muestraEquipo">
                                            [[emp.displayName]]
                                        </paper-item>
                                    </template>
                                </paper-listbox>
                                <paper-listbox>
                                    <template is="dom-repeat" items="[[listaEquipo]]" as="equipo">
                                        <paper-item on-click="agregaEquipo">
                                        <paper-item-body>
                                                <div>[[equipo.tipo]] - [[equipo.marca]]</div>
                                                <div secondary>
                                                    [[equipo.ns]]
                                                </div>
                                            </paper-item-body>
                                        </paper-item>
                                    </template>
                                </paper-listbox>
                            </div>
                        </iron-pages>
                        
                        
                        
                        
                    </div>
                    <div class="col-md-8" style="max-height:350px; overflow-y:scroll;">
                        <template is="dom-repeat" items="[[equipoElegido]]" as="revisar">
                            <my-mantto-item equipo="[[revisar]]"></my-mantto-item>
                        </template>
                    </div>
                </div>
            </div>
            
            

        `;
    }

    static get properties() {
        return {
            listaEmpleados:{type:Array, notify:true, value:[]},
            inventario:{type:Array, notify:true, value:[]},
            empleado:{type:Object, notify:true,observer:"_buscaEquipo"},
            selected:{type:String, notify:true,observer:"_ajustaSize"},

            listaEquipo:{type:Array, notify:true,value:[]},
            equipoElegido:{type:Array, notify:true,value:[]},


        }
    }

    constructor(emp) {
        super();

        if(emp){
            this.set("listaEmpleados",emp);
        }
    }

    ready() {
        super.ready();
        var binder=new QueryBinder("usuarios",{
            "specialRef":firebase.firestore().collection("estatus-area").doc("sistemas").collection("inventario")
        });
        binder.bindArray(this,this.inventario,"inventario");
    }

    esCorrectivo(str){
        return str=="CORRECTIVO";
    }

    _ajustaSize(str){
        if(str && str!=null){
            this.DialogLayout_notifyResize();
        }
    }

    _buscaEquipo(emp){
        if(emp && emp.equipoAsignado){
            this.set("listaEquipo",emp.equipoAsignado);
            this.DialogLayout_notifyResize();
        }
    }

    muestraEquipo(e){
        var elegido=e.model.emp;
        console.log("elegido",elegido);
        this.set("empleado",elegido);
        this.DialogLayout_notifyResize();
    }

    agregaEquipo(e){
        var elegido=e.model.equipo;

        var nuevoArr=PolymerUtils.cloneObject(this.equipoElegido);
        if(!nuevoArr){
            nuevoArr=[];
        }
        nuevoArr.push(elegido);

        this.set("equipoElegido",nuevoArr);
        this.DialogLayout_notifyResize();
    }

    guardaMantto(){

        if(!this.tipo || this.tipo==null || this.tipo.trim()==""){
            return PolymerUtils.Toast.show("selecciona un tipo de mantenimiento");
        }

        if(this.tipo=="CORRECTIVO"){
            if(!this.motivo || this.motivo==null || this.motivo.trim()==""){
                return PolymerUtils.Toast.show("selecciona un tipo de mantenimiento");
            }
        }

        var equipos=this.shadowRoot.querySelectorAll("my-mantto-item");
        var mantto=[];
        
        for(var i=0;i<equipos.length;i++){
            var dato=equipos[i].devuelveMantto();
            mantto.push(dato);
        }
        console.log("mantto",mantto);
        if(!mantto || mantto.length<=0){
            return PolymerUtils.Toast.show("selecciona equipo para revisar");
        }
        var registro={
            _timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            equipos:mantto
        };

        if(this.tipo=="CORRECTIVO"){
            registro["motivo"]=this.motivo;
            
        }


        if(this.selected=="personal"){
            if(!this.empleado || this.empleado==null){
                return PolymerUtils.Toast.show("seleccione un empleado");
            }else{
                var emp=PolymerUtils.cloneObject(this.empleado);
                delete emp._timestamp;
                delete emp.accessList;
                delete emp.email;
                delete emp.equipoAsignado;
                delete emp.password;
                delete emp.profile;
                delete emp.id;
                delete emp._key;
                registro["empleado"]=emp;
            }
        }

        var t=this;

        firebase.firestore().collection("estatus-area").doc("sistemas").collection("mantenimiento").add(registro)
            .then(() => {
                PolymerUtils.Toast.show("Registro guardado con éxito");
                t.DialogLayout_closeDialog();
            })
            .catch((error) => {
                PolymerUtils.Toast.show("Error al guardar; intentalo más tarde.");
                console.error("Error writing document: ", error);
            });




    }

    
}

customElements.define('my-nuevo-mantto', MyNuevoMantto);