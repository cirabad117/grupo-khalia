import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../orgchart.js';
import '../bootstrap.js';
class MyOrganigrama extends PolymerElement {
    static get template() {
        return html`
            <style include="orgchart bootstrap">
                :host{
                    display:block;
                }

                ::-webkit-scrollbar {
					width: 10px;
				}
				::-webkit-scrollbar-track {
					background: #f1f1f1;
				}
				::-webkit-scrollbar-thumb {
					background: #888;
				}
				::-webkit-scrollbar-thumb:hover {
					background: #555;
				}
				
				#chart-container {
  font-family: Arial;
  height: 420px;
 
  overflow: auto;
  text-align: center;
}

.orgchart {
  background: #fff; 
}
.orgchart td.left, .orgchart td.right, .orgchart td.top {
  border-color: #aaa;
}
.orgchart td>.down {
  background-color: #aaa;
}

.orgchart .node .title {
					height: 120px;
					border-radius: 0;
				}
				
				.orgchart .node .content {
					border: 0;
					margin:10px;
					font-weight: bold;
				}
.orgchart .middle-level .title {
  background-color: #006699;
}
.orgchart .middle-level .content {
  border-color: #006699;
}
.orgchart .product-dept .title {
  background-color: #009933;
}
.orgchart .product-dept .content {
  border-color: #009933;
}
.orgchart .rd-dept .title {
  background-color: #993366;
}
.orgchart .rd-dept .content {
  border-color: #993366;
}
.orgchart .pipeline1 .title {
  background-color: #996633;
}
.orgchart .pipeline1 .content {
  border-color: #996633;
}
.orgchart .frontend1 .title {
  background-color: #cc0066;
}
.orgchart .frontend1 .content {
  border-color: #cc0066;
}

#github-link {
  position: fixed;
  top: 0px;
  right: 10px;
  font-size: 3em;
}
            </style>

<div id="chart-container"></div>

        `;
    }

    static get properties() {
        return {
            objEmpleados:{type:Object, notify:true, observer:"_carga"}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    _carga(obj){
        if(obj && obj!=null){

            var cc=this.shadowRoot.querySelector('#chart-container');

            
			
            if(cc){
                if(cc.innerHTML!=""){
                    cc.innerHTML=""
                }
                console.log("cc",cc);
                $(cc).orgchart({
                    'data' : obj,
                    'depth': 2,
                    'nodeTitle': 'name',
                    'nodeContent': 'name',
                    'createNode': function(node, data) {
                        node.children('.title').html('<img src="'+data.fotoUrl+'" widht="100%" height="100%" class="img img-fluid">');
                    }
                });
            }
            

        }else{
            var cc=this.shadowRoot.querySelector('#chart-container');
            cc.innerHTML="";
        }
    }
}

customElements.define('my-organigrama', MyOrganigrama);