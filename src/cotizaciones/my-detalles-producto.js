import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';


class MyDetallesProducto extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>

            <div id="contenedor">
                [[datos.nombre]]
            </div>

        `;
    }

    static get properties() {
        return {
            datos:{type:Object, notify:true,observer:"_creaHtml"}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    _creaHtml(obj){
        if(obj && obj!=null){


            var elemento=this.shadowRoot.querySelector("#contenedor");

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

            elemento.innerHTML=cadena;
        }
    }


    
}

customElements.define('my-detalles-producto', MyDetallesProducto);