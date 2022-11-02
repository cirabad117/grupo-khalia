import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DiccionarioMixin } from '../mixins/diccionario-mixin.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';

import '../bootstrap.js';


class MyVistaEmpleado extends DiccionarioMixin(UtilsMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    overflow-y:scroll;
                    max-height:350px;
                }
            </style>
            
            <template is="dom-if" if="[[!esEditar]]">
                <div class="container d-flex justify-content-center align-items-center">
                    <div class="card py-4">
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="round-image">
                                <img src$="[[muestraImagen(perfil.fotoUrl)]]" class="rounded-circle" width="97">
                            </div>
                        </div>
                        
                        <div class="text-center">
                            <h4 class="mt-3">[[perfil.displayName]]</h4>
                            <span>[[getPuesto(perfil.puesto)]]</span>
                        
                            <div class="px-5">
                                <p class="content">Fecha de nacimiento:[[muestraFecha(perfil.fechaNac)]]</p>
                                <p class="content">[[perfil.bio]]</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            
            <template is="dom-if" if="[[esEditar]]">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="round-image">
                        <img src$="[[muestraImagen(perfil.fotoUrl)]]" class="rounded-circle" width="97">
                    </div>
                </div>
                
                <paper-input label="Nombre" value="{{nombre}}"></paper-input>
                
                <vaadin-date-picker label="Fecha de nacimiento" i18n="[[vaadinDateConfig]]" value="{{nuevaFecha}}"
                error-message="selecciona una fecha válida"></vaadin-date-picker>
                
                <paper-textarea label="Mi presentación" value="{{bio}}"></paper-textarea>
                
                <paper-button style="background-color:var(--paper-blue-500);color:white;"
                on-click="guardaCambios">guardar cambios</paper-button>
            </template>

        `;
    }

    static get properties() {
        return {
            esEditar:{type:Boolean, notify:true, value:false},
            perfil:{type:Object, notify:true}
        }
    }

    constructor(obj,edit) {
        super();

        if(obj){
            this.set("perfil",obj);
            this.set("nombre",obj.displayName);
            this.set("nuevaFecha",obj.fechaNac);
            this.set("bio",obj.bio);
        }

        if(edit){
            this.set("esEditar",edit);
        }
    }

    ready() {
        super.ready();
    }

    muestraImagen(str){
       if(str && str!=null){
        return str;
       }else{
        return "../../images/user.png";
       }
    }

    getPuesto(obj){
        if(obj.nombrePuesto){
            return obj.nombrePuesto;
        }else{
            var area=this.buscaObjectoArreglo(this.areasKhalia,"tipo",obj.area);

            if(obj.cargo=="liderArea"){
                return "Líder "+area.nombre;
            }else{
                return "Gestor "+area.nombre;
            }
        }
    }

    muestraFecha(fecha){
        var arr=fecha.split("-");
        var nuevo=arr[1]+"-"+arr[2]+"-"+arr[0];
        var fechaBase=new Date(nuevo);
        return Sugar.Date.medium(fechaBase,'es');
    }

    guardaCambios(){

        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return PolymerUtils.Toast.show("Agrega un nombre válido");
        }
        if(!this.nuevaFecha || this.nuevaFecha==null || this.nuevaFecha.trim()==""){
            return PolymerUtils.Toast.show("Selecciona una fecha válida");
        }
        if(!this.bio || this.bio==null || this.bio.trim()==""){
            return PolymerUtils.Toast.show("escribe un adescripcion válida");
        }

        var id=this.perfil.uid;
        var t=this;
        var washingtonRef = firebase.firestore().collection("usuarios").doc(id);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            displayName:t.nombre,
            fechaNac:t.nuevaFecha,
            bio:t.bio
        }).then(() => {
            PolymerUtils.Toast.show("Usuario actualizado con éxito");
           
        }).catch((error) => {
            PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
            console.error("Error updating document: ", error);
        });
    }
}

customElements.define('my-vista-empleado', MyVistaEmpleado);