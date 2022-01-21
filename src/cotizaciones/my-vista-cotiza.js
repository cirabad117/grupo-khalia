import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { NavigationMixin } from "../mixins/navigation-mixin.js";
import { UtilsMixin } from '../mixins/utils-mixin.js';

import './my-detalles-producto.js';

import '../bootstrap.js';
class MyVistaCotiza extends UtilsMixin(NavigationMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
                table, th, td {
  border:1px solid black;
}
            </style>

            <div class="container">
                <div class="card">
                    <div class="card-header">
                        datos de la cotización
                        <paper-button raised on-click="descarga">descargar</paper-button>
                    </div>
                    
                    
                    
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <p style="text-align:left;">
                                    <b>FECHA: [[PolymerUtils_getFullSpanishDate(cotizacion._timestamp)]]</b>
                                    <br>
                                    <b>FOLIO: </b><b>[[muestraCodigo(cotizacion.id)]]</b>
                                </p>
                                <p style="text-align:right;">
                                    <b>RAZÓN SOCIAL: </b>[[cotizacion.cliente.razon]]<br>
                                    <b>DIRIGIDO A: </b>[[cotizacion.nombreDirigido]]<br>
                                    <b>P R E S E N T E</b> 
                                </p>
                                <p>
                                    <b>¿QUIÉNES SOMOS?</b>
                                    Un grupo integro en consultoría y gestoría enfocado en materia ambiental y de seguridad, con servicios eficientes y de calidad para nuestros clientes ante instituciones gubernamentales correspondientes.
                                </p>
                                <p>
                                    <b>MISIÓN</b>
                                    Resguardar la regularización de nuestros clientes en base a nuestro equipo multidisciplinario y capacitado, brindando servicios acreditados por las autoridades correspondientes.
                                </p>


                                <div id="products"></div>



                                <!-- <template is="dom-repeat" items="[[listaProductos]]">
                                    <my-detalles-producto datos="[[item]]">

                                    </my-detalles-producto>
                                </template> -->










                                <p>
                                    <b>PROPUESTA ECONÓMICA</b>
                                    <br>RESUMEN DE PRECIOS
                                    <table style="width:100%;">
                                        <template is="dom-repeat" items="[[listaProductos]]">
                                            <tr>
                                                <td>[[item.nombre]]</td>
                                                <td>$10000</td>
                                            </tr>
                                        </template>

                                    </table>
                                    
                                   
                                    <br>
                                    *La Propuesta No Incluye Impuestos.
                                </p>
                                <p>
                                    <b>FORMA DE PAGO</b>
                                    50% para inicio de trámites y 50% al término de la misma.
                                </p>
                                <p>
                                    <b>VIGENCIA DE LA PROPUESTA</b>
                                    15 días naturales a partir de su emisión. 
                                </p>
                                <div id="observa"></div> 
                                <p>
                                    <b>DATOS BANCARIOS: </b><br>
                                    <b>RAZÓN SOCIAL:</b> GRUPO KHALIA QUERETARO S DE RL DE CV<br>
                                    <b>RFC:</b> GKQ201015CS2<br>
                                    <b>BANCO:</b> BANCOMER<br>
                                    <b>CUENTA:</b> 0116400957<br>
                                    <b>CLAVE:</b> 0126 8000 1164 009574<br>
                                    <b>NÚMERO DE TARJETA:</b> 4555 1130 0801 9269<br>

                                    <b>ENVÍO DE COMPROBANTE DE PAGO:</b><br>
                                    contacto@grupokhalia.com<br>
                                    <b>TEL:</b> 442 251 1652<br>
                                </p>
                                <p>
                                    Sin otro particular por el momento, reciba un cordial saludo quedando a su distinguida consideración.
                                </p>
                                <p>
                                    ATENTAMENTE
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>












            




































        `;
    }

    static get properties() {
        return {
            cotizacion:{type:Object, notify:true,observer:"_asignaProductos"},
            listaProductos:{type:Array, notify:true, value:[]},
            _routeParams:{observer: "_routeChanged"},
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    descarga(){
        var element = this.shadowRoot.querySelector('.card-body');
        var opt={
            margin:1,
            filename:'myfile.pdf',
            image:{type:'jpeg',quality:0.98},
            html2canvas:{scale:2},
            jsPDF:{unit:'in',format:'letter',orientation:'portrait'}
        };
        html2pdf(element, opt);
    }

    muestraCodigo(str){
        if(str && str!=null && str.trim()!=""){
            let length = str.length;
            var restante=4-length;
            if(restante>0){
                for(var i=0;i<restante;i++){
                    str=0+str;
                }
            }
            
            return "GK-"+str;
        }else{
            return "-"
        }
       
    }

    _asignaProductos(obj){

        if(obj && obj!=null){
            if(obj.listaProds){
                this.set("listaProductos",obj.listaProds);
                var arr=obj.listaProds;
                var observa=this.shadowRoot.querySelector("#observa");
                var pro=this.shadowRoot.querySelector("#products");

                var cuerpo="";
                var cadena="<b>OBSERVACIONES</b><br>"
                for(var i=0;i<arr.length;i++){
                    var texto=this._creaHtml(arr[i]);
                    cuerpo=cuerpo+texto;


                    if(arr[i].observaciones){
                        cadena=cadena+arr[i].observaciones;
                       
                    }
                }

                observa.innerHTML=cadena;
                pro.innerHTML=cuerpo
            }
        }
    }


    _creaHtml(obj){
        
        // var elemento=this.shadowRoot.querySelector("#contenedor");

            var cadena="<p style='text-align:center;'><b style='background-color:var(--paper-blue-700);color:white;padding: 10px;font-size: 20px;'>"+obj.nombre+"</b><br></p>";

            if(obj.fundamento){
                cadena=cadena+"<p><b>Fundamento legal</b><br>"+obj.fundamento+"</p>";
            }

            if(obj.alcance){
                cadena=cadena+"<p><b>Alcance</b><br>"+obj.alcance+"</p>";
            }
            if(obj.entregable){
                cadena=cadena+"<p><b>Entregable</b><br>"+obj.entregable+"</p>";
            }

            return cadena;

            // elemento.innerHTML=cadena;
        
    }


    _routeChanged(params){
        var t=this;
		if(params && params!=null && params.id){
            console.log("recibimos datos navegacion",params);
            var id=params.id;
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "_cotizaciones-khalia/"+id,
                observer:function(obj){
                    if(obj){
                        t.set("cotizacion",obj);
                        
                    }
                }
            }));

		}else{
            t.set("cotizacion",null);
        }
	}
}

customElements.define('my-vista-cotiza', MyVistaCotiza);