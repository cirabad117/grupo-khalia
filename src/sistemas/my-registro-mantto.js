import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';


import '../bootstrap.js';

class MyRegistroMantto extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    max-height:450px;
                    overflow-y:scroll;
                }
            </style>

            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-sm table-bordered font-weight-bold" style="padding:0 !important;">
                            <tr >
                                <td rowspan="2" class="text-center">
                                <img src="../../images/khalia.jpeg" class="img img-fluid" width="100" height="100">
                                </td>
                                <td rowspan="2">
                                <div class="text-center mt-4" style="font-size:20px;">SISTEMA DE PROCEDIMIENTOS DE FORMATOS INTERNOS</div>
                                </td>
                                <td>Código: XX</td>
                            </tr>
                            <tr>
                                <td>Revision: 01</td>
                            </tr>
                            <tr style="background-color:var(--paper-green-900);color:white;">
                                <td colspan="3" class="text-center"><div>FORMATO DE INSPECCIÓN DE EQUIPOS ELECTRÓNICOS</div></td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-sm table-bordered font-weight-bold text-center">
                            <tr>
                                <td style="background-color:var(--paper-green-900);color:white;">FECHA</td>
                                <td>[[PolymerUtils_getDateString(registro._timestamp)]]</td>
                                <td style="background-color:var(--paper-green-900);color:white;">NOMBRE RESPONSABLE</td>
                                <td>[[getResponsable(registro)]]</td>
                                <td style="background-color:var(--paper-green-900);color:white;">NÚMERO DE EMPLEADO</td>
                                <td>[[getNumResponsable(registro)]]</td>
                            </tr>
                            <tr>
                                <td style="background-color:var(--paper-green-900);color:white;">MOTIVO DE LA INSPECCIÓN</td>
                                <td colspan="5">[[muestraMotivo(registro)]]</td>

                            </tr>
                        </table>
                    </div>
                </div>

                <template is="dom-repeat" items="[[registro.equipos]]">

                
                <div class="row">
                    <div class="col-md-6">
                        <table class="table table-sm table-bordered font-weight-bold text-center">
                            <tr>
                                <td colspan="6" style="background-color:var(--paper-green-900);color:white;">[[item.tipo]]</td>
                            </tr>
                            <tr>
                                <td style="background-color:var(--paper-grey-200);">MARCA</td>
                                <td>[[item.marca]]</td>
                                <td style="background-color:var(--paper-grey-200);">MODELO</td>
                                <td>[[item.modelo]]</td>
                                <td style="background-color:var(--paper-grey-200);">N/S</td>
                                <td>[[item.ns]]</td>
                            </tr>
                            <tr>
                                <td colspan="6">INSPECCIÓN OCULAR</td>
                            </tr>
                            <tr>
                                <td colspan="6"><img src$="[[getImage(item.tipo)]]" class="img img-fluid" width="200" height="200"></td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <table class="table table-sm table-bordered font-weight-bold text-center">
                            <tr>
                                <td style="background-color:var(--paper-grey-200);">ENCIENDE</td>
                                <td>[[item.enciende]]</td>
                                <td style="background-color:var(--paper-grey-200);">BOTONES COMPLETOS</td>
                                <td>[[item.botones]]</td>
                                <td style="background-color:var(--paper-grey-200);">¿FUNCIONA CORRECTAMENTE?</td>
                                <td>[[item.funciona]]</td>
                                
                            </tr>
                            <tr>
                                <td colspan="6">[[item.descFalla]]</td>
                            </tr>
                           
                            
                        </table>
                        <table class="table table-sm table-bordered font-weight-bold text-center">
                        <tr>
                                <td style="background-color:var(--paper-grey-200);">DETALLES VISUALES</td>
                                <td>[[item.inspeccion]]</td>
                            </tr>
                           
                        </table>
                    </div>
                </div><!--row item equipo-->
                </template>

            </div>

        `;
    }

    static get properties() {
        return {
            registro:{type:Object, notify:true}
        }
    }

    constructor(obj) {
        super();
        if(obj){
            this.set("registro",obj);
        }
    }

    ready() {
        super.ready();
    }

    getNumResponsable(obj){
        if(obj && obj.empleado && obj.empleado.codigo){
            return obj.empleado.codigo;
        }else{
            return "NO APLICA";
        }
    }
    getResponsable(obj){
        if(obj && obj.empleado && obj.empleado.displayName){
            return obj.empleado.displayName;
        }else{
            return "NO APLICA";
        }
    }
    muestraMotivo(obj){

        if(obj && obj!=null){
            var texto="MANTENIMIENTO "+obj.tipo;

            if(obj.motivo){
                texto=texto+" - "+obj.motivo;
            }

            return texto;
        }
       

        
    }

    getImage(tipo){
        switch (tipo) {
            case "LAPTOP":
            return "../../images/sistemas/laptop.jpg";

            case "MOUSE":
            return "../../images/sistemas/mouse.png";  

            case "CARGADOR":
            return "../../images/sistemas/cargador.jpg";
 
            case "TELÉFONO":
            return "../../images/sistemas/telefono.png";  
        
            default:
            return "../../images/sistemas/hw.png";
        }
    }
}

customElements.define('my-registro-mantto', MyRegistroMantto);