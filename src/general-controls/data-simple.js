import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class DataSimple extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                    margin:5px;
                }

                
            </style>

            <div style="display: flex;">
				<!-- <div style="margin-right: 8px; margin-top: 2px; margin-left: 2px;"><iron-icon style="min-width: 24px;" icon="[[icon]]"></iron-icon></div> -->
				<div>
					<div style$="font-weight: 400; color:[[_getTextColor(textColor)]]; font-size: 13px;">[[title]]</div>
					<div style$="font-weight: 500; color:[[_getTextColor(valueColor)]]; font-size: [[fontSize]];">{{valor}}</div>
				</div>
			</div>

        `;
    }

    static get properties() {
        return {
            fontSize:{type:String,notify:true,value: "13px"},
			textColor:{type:String,notify:true,value:"grey"},
			valueColor:{type:String,notify:true,value:"indigo"},
			icon:{type:String,notify:true,value:"add"},
			title:{type:String,notify:true},
			value:{type:String,notify:true,observer:"muestraValor"},
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