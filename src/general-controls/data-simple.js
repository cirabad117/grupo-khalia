import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';

class DataSimple extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    margin:5px;
                }

                .titulo{
                    font-style:italic;
                    font-size: small;
                    margin: 0 !important;
                    color:var(--paper-grey-700);
                }

                .texto{
                    font-weight:bold;
                    font-size:20px;
                    font-family: Arial, Helvetica, sans-serif;
                    color:var(--paper-blue-700);
                }

                .contenedor{
                    margin:5px;
                }
               

                
            </style>
            
            <div class="contenedor">
                <label class="titulo" for="inputAddress">[[titulo]]</label>
                <p class="texto" id="inputAddress" >[[muestraValor(dato)]]</p>
            </div>
            
           

        `;
    }

    static get properties() {
        return {
            fontSize:{type:String,notify:true,value: "13px"},
			textColor:{type:String,notify:true,value:"grey"},
			valueColor:{type:String,notify:true,value:"indigo"},
			icon:{type:String,notify:true,value:"add"},
			titulo:{type:String,notify:true},
			dato:{type:String,notify:true,observer:"muestraValor"},
            valor:{type:String,notify:true}
        }
    }

    constructor() {
        super();
    }

    muestraValor(va){
        if(va && va!=null && va.trim()!=""){
            return va;
        }else{
            return " - ";
        }
    }

    ready() {
        super.ready();
    }

    _getTextColor(textColor){
		if(textColor=="white"){
			return "white";
		}
		else return " var(--paper-"+textColor+"-600)";
	}
}

customElements.define('data-simple', DataSimple);