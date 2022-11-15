import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin.js';

import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-input/paper-input.js';
import '@vaadin/vaadin-select/vaadin-select.js';
import '@polymer/iron-pages/iron-pages.js';

import '../controles-extra/checkbox-tree.js';

import '../bootstrap.js';

class MyNuevoPerfil extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <paper-radio-group selected="{{selected}}">
                <paper-radio-button name="jefe" on-click="ajusta">Nivel gerencial</paper-radio-button>
                <paper-radio-button name="empleado" on-click="ajusta">Empleado</paper-radio-button>
            </paper-radio-group>
            
            <iron-pages selected="{{selected}}" attr-for-selected="name">
                <div name="jefe">
                    <paper-input label="Nombre del puesto" value="{{nombrePuesto}}"></paper-input>
                </div>
                <div name="empleado">
                    <paper-radio-group selected="{{cargo}}">
                        <paper-radio-button name="liderArea">Líder de departamento</paper-radio-button>
                        <paper-radio-button name="gestor">Gestor</paper-radio-button>
                    </paper-radio-group>
                    
                    <vaadin-select id="comboArea" label="Departamento"
                    value="{{area}}" error-message="seleccione una opción">
                        <template>
                            <vaadin-list-box>
                                <vaadin-item value="admin">Administración</vaadin-item>
                                <vaadin-item value="ventas">Ventas y Marketing</vaadin-item>
                                <vaadin-item value="sasisopa">SASISOPA</vaadin-item>
                                <vaadin-item value="sgm">SGM</vaadin-item>
                                <vaadin-item value="emisiones">Emisiones</vaadin-item>
                                <vaadin-item value="seguridad">Seguridad</vaadin-item>
                                <vaadin-item value="sistemas">Sistemas</vaadin-item>
                            </vaadin-list-box>
                        </template>
                    </vaadin-select>
                    <div>
                        <span class="font-weight-bold">Lista de permisos</span>
                        <div style="max-height:150px; overflow-y:scroll;">
                            <checkbox-tree object-tree="[[mainTree]]" id="mainDomTree"></checkbox-tree>
                        </div>
                    </div>
                </div>
            </iron-pages>
            
        `;
    }

    static get properties() {
        return {
            
        }
    }

    constructor() {
        super();

        var datos=StaticDomAccess.MAIN_TREE;
        this.set("mainTree",datos);
    }

    ready() {
        super.ready();
    }

    ajusta(){
        this.DialogLayout_notifyResize();
    }

    guardaPerfil(){
        if(!this.selected || this.selected==null || this.selected.trim()==""){
            return PolymerUtils.Toast.show("Selecciona un tipo de perfil");
        }

        var perfil={
            tipo:this.selected
        };

        if(this.selected=="jefe"){
            if(!this.nombrePuesto || this.nombrePuesto==null || this.nombrePuesto.trim()==""){
                return PolymerUtils.Toast.show("Escribe un nombre válido");
            }else{
                perfil["nombrePuesto"]=this.nombrePuesto;
                perfil["permisos"]={allAccess:true};
            }
        }else{
            if(!this.cargo || this.cargo==null || this.cargo.trim()==""){
                return PolymerUtils.Toast.show("Selecciona un puesto válido");
            }else{
                perfil["cargo"]=this.cargo;
            }

            if(!this.area || this.area==null || this.area.trim()==""){
                return PolymerUtils.Toast.show("Selecciona un departamento válido");
            }else{
                perfil["area"]=this.area;
            }

            var lista=this.$.mainDomTree.getSelectedList();

            if(JSON.stringify(lista) === '{}'){
                return PolymerUtils.Toast.show("Selecciona los permisos para el perfil");
            }

            perfil["permisos"]=lista;
        }

        console.log("perfil",perfil);
        this.DialogLayout_setSaving(true);

        var t=this;

        sharedFirebase.collection("perfiles").add(perfil).then(function(docRef) {
            PolymerUtils.Toast.show("Perfil creado con éxito");
            t.DialogLayout_closeDialog();
        }).catch(function(error) {
            t.DialogLayout_setSaving(false);
            console.error("Error adding document: ", error);
            PolymerUtils.Toast.show("Error al guardar");
        });



    }
}

customElements.define('my-nuevo-perfil', MyNuevoPerfil);