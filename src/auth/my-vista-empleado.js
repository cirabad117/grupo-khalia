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
                <div class="container" >
                    <div class="row">
                        <div class="col-md-3 d-flex flex-column justify-content-center text-center">
                            <img src$="[[muestraImagen(perfil.fotoUrl)]]" class="img-fluid">
                            <h6 class="mt-1 ml-auto mr-auto text-center">[[perfil.displayName]]</h6>
                        </div>
                        <div class="col-md-9" style$="[[muestraEstilo(perfil)]]">
                        <div>
                            
                            <h3 class="mt-2 font-weight-bold">[[perfil.nombrePuesto]]</h3>
                            <h6 class="mt-3">[[perfil.descPuesto]]</h6>

                            <div class="blockquote-footer text-light"><cite>"[[perfil.bio]]"</cite></div>
                           
                         
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
                
               

                <paper-textarea label="Nombre de puesto" value="{{nombrePuesto}}"></paper-textarea>
                <paper-textarea label="descripción" value="{{descPuesto}}"></paper-textarea>
                
                <paper-textarea label="Presentación" value="{{bio}}"></paper-textarea>
                
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
            
            this.set("nombrePuesto",obj.nombrePuesto);
            this.set("descPuesto",obj.descPuesto);
            this.set("bio",obj.bio);
        }

        if(edit){
            this.set("esEditar",edit);
        }
    }

    ready() {
        super.ready();
    }

    

    muestraEstilo(obj){
        console.log("obj estilo",obj);

        return obj.puesto.tipo=="jefe" || obj.puesto.cargo=="liderArea"?"color:white;background-color:#11273c;":"color:#071c51;background-color:white;";
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

      
        if(!this.nombrePuesto || this.nombrePuesto==null || this.nombrePuesto.trim()==""){
            return PolymerUtils.Toast.show("escribe un adescripcion válida");
        }

        if(!this.descPuesto || this.descPuesto==null || this.descPuesto.trim()==""){
            return PolymerUtils.Toast.show("escribe un adescripcion válida");
        }


        if(!this.bio || this.bio==null || this.bio.trim()==""){
            return PolymerUtils.Toast.show("escribe un adescripcion válida");
        }

        var id=this.perfil.uid;
        var t=this;
        var washingtonRef = firebase.firestore().collection("usuarios").doc(id);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
      
            nombrePuesto:t.nombrePuesto,
            descPuesto:t.descPuesto,
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