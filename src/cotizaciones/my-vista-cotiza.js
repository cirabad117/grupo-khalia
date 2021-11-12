import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { NavigationMixin } from "../mixins/navigation-mixin.js";

import '../bootstrap.js';
class MyVistaCotiza extends NavigationMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="container">
                <div class="card">
                    <div class="card-header">
                        datos de la cotización
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <p style="text-align:left;">
                            <b>FECHA</b>
                            <br>
<b>FOLIO</b>
<b>GK-</b>
</p>

<p style="text-align:right;">
<b>RAZÓN SOCIAL</b><br>
<b>DIRIGIDO A</b><br>
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
<p>
<b>FUNDAMENTO LEGAL</b>
Los artículos 2, fracción I, 26 y 33, fracciones I, IV, XXI, XXVIII y XXXI, de la Ley Orgánica de la Administración Pública Federal; 4 de la Ley Federal del Procedimiento Administrativo; 118 y 121 de la Ley de Hidrocarburos; 117 y 120 de la Ley de la Industria Eléctrica; 79, 80 y 81 del Reglamento de la Ley de Hidrocarburos; 86 y 87, párrafos primero, segundo y tercero, del Reglamento de la Ley de la Industria Eléctrica, y 4 del Reglamento Interior de la Secretaría de Energía.
</p>
<p>
<b>ALCANCE</b>
Recepción y evaluación de información.
La descripción del proyecto y de su área de influencia.
Identificación y caracterización de comunidades y pueblos que se ubican en el área de influencia del proyecto.
La identificación, caracterización, predicción y valoración de los impactos sociales positivos y negativos que podrían derivarse del proyecto.
Las medidas de prevención y mitigación, y los planes de gestión social
</p>

<p>
<b>ENTREGABLES</b>
Carpeta física del EVIS. 
Respaldo digital del EVIS.
Acuse de Recepción por parte de la Secretaría de Energía.

</p>



<p>
<b>PROPUESTA ECONÓMICA</b>

RESUMEN DE PRECIOS
EVALUACIÓN DE IMPACTO SOCIAL (EVIS)
$10,000

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
<p>
<b>OBSERVACIONES</b>
Se recuerda que el tiempo de la evaluación, gestión y entrega del trámite, estarán estrechamente ligados a la recepción de la documentación requerida.
Nuestro compromiso es acortar los tiempos hasta donde sea posible, con la seguridad de que el proyecto cubrirá con lo necesario de acuerdo a los términos de Ley.
</p>
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
            cotizacion:{type:Object, notify:true},
            _routeParams:{observer: "_routeChanged"},
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
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
                        
                    }else{
                        
                    }
                }
            }));

		}else{
            t.set("prospecto",null);
        }
	}
}

customElements.define('my-vista-cotiza', MyVistaCotiza);