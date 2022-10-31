import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';
import { DiccionarioMixin } from '../mixins/diccionario-mixin.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

class MyVistaEmpleado extends DiccionarioMixin(UtilsMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
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

                            <p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                        </div>
                    </div>
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            perfil:{type:Object, notify:true}
        }
    }

    constructor(obj) {
        super();

        if(obj){
            this.set("perfil",obj);
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
}

customElements.define('my-vista-empleado', MyVistaEmpleado);