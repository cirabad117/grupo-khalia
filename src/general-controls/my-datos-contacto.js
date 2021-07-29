import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';

class MyDatosContacto extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <div style="display:flex; align-items:center;">
                <div style="flex-grow:1;">contactos de prospecto</div>
                <div style="flex-grow:0;">

                    <paper-icon-button icon="add" on-click="cambiaBol"></paper-icon-button>
                
                </div>
            </div>
            
            <iron-collapse opened="{{esAgregar}}">
                <div class="row">
                    <div class="col-md-12">
                        <p>agregar contacto de prospecto</p>
                        
                        <div class="d-flex flex-wrap align-items-center">
                            <paper-input style="padding:8px;" id="txtNombre" label="Nombre" error-message="valor inválido" value="{{nombre}}"></paper-input>
                            <paper-input style="padding:8px;" label="puesto" value="{{puesto}}"></paper-input>
                           
                        </div>
                        
                        <div class="d-flex flex-wrap align-items-center" >
                            <vaadin-select label="tipo de telefono" value="{{tipoTel}}">
                                <template>
                                    <vaadin-list-box>
                                        <vaadin-item value="celular">celular</vaadin-item>
                                        <vaadin-item value="oficina">oficina</vaadin-item>
                                        <vaadin-item value="otro">otro</vaadin-item>
                                    </vaadin-list-box>
                                </template>
                            </vaadin-select>
                            <paper-input style="padding:8px;" id="txtTel" label="Telefono" value="{{tel}}" error-message="ingresa un valor válido"></paper-input>
                
                            <paper-icon-button style="background-color:#E0E0E0; border-radius:50%;" icon="add" on-click="agregaTelefono"></paper-icon-button>
                            
                            
                            
                        </div>

                        <div id="lista-tels" style="overflow-y:scroll;max-height:70px;">
                            <vaadin-list-box>
                                <template is="dom-repeat" items="[[listaTels]]" as="tels" restamp>
                                    <vaadin-item>[[tels.tipo]]: [[tels.telefono]]</vaadin-item>
                                </template>
                            </vaadin-list-box>
                        </div>

                        <div class="d-flex flex-wrap align-items-center">
                            <paper-input style="padding:8px;" label="Correo electrónico" value="{{email}}"></paper-input>
                            
                            <paper-icon-button style="background-color:#E0E0E0; border-radius:50%;" icon="add" on-click="agregaEmail"></paper-icon-button>
                        </div>

                        <div id="lista-email" style="overflow-y:scroll;max-height:70px;">
                            <vaadin-list-box>
                                <template is="dom-repeat" items="[[listaEmails]]" as="email" restamp>
                                    <vaadin-item>[[email]]</vaadin-item>
                                </template>
                            </vaadin-list-box>
                        </div>

                        <div style="padding:8px;">
                            <button style="padding:8px;" class="btn btn-sm btn-primary" on-click="agregaContacto">agregar contacto</button>
                        </div>
                        
                        
                    </div>

                    
                    
                </div>
            </iron-collapse>
            
            
            <iron-collapse opened="{{!esAgregar}}">
                <template is="dom-repeat" items="[[listaContactos]]">
                    <item-contacto style="border:solid 1px var(--paper-blue-300);border-radius:10px;margin:5px;" datos-contacto="[[item]]" index-contacto="[[index]]" on-quita-contacto="spliceContactos"></item-contacto>
                </template>
            </iron-collapse>
            
            


        `;
    }

    static get properties() {
        return {
            infoCliente:{type:Object, notify:true},
            esAgregar:{type:Boolean, notify:true,value:false},

            listaContactos:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    cambiaBol(){
        this.set("esAgregar",!this.esAgregar);
    }

    agregaContacto(){

        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.shadowRoot.querySelector("#txtNombre").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtNombre").invalid=false;
        }
        var nuevo={
            nombreCliente:this.nombre,
            
        };

        if(this.tel && this.tel!=null && this.tel.trim()!=""){
            nuevo["telefono"]=this.tel;
        }

        if(this.email && this.email!=null && this.email.trim()!=""){
            nuevo["email"]=this.email;
        }

        


        this.push("listaContactos",nuevo);
        this.limpiaCamposContacto();
    }
}

customElements.define('my-datos-contacto', MyDatosContacto);