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

                
            </style>
            
            <div class="form-group bg-light text-primary">
                <label for="inputAddress">[[titulo]]</label>
                <input type="text" readonly class="form-control" id="inputAddress" value="[[dato]]">
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
            this.set("valor",va);
        }else{
            this.set("valor"," - ");
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