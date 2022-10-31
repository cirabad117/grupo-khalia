import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../orgchart.js';
import '../bootstrap.js';
import '../auth/my-vista-empleado.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';

class MyOrganigrama extends UtilsMixin(PolymerElement) {
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
				
				.orgchart .second-menu-icon {
					transition: opacity .5s;
					opacity: 0;
					right: -5px;
					top: -5px;
					z-index: 2;
					background-color: var(--paper-blue-700);
					color:white;
					border-radius:50%;
					font-size: 18px;
					position: absolute;
				}
				
				.orgchart .node:hover .second-menu-icon {
					opacity: 1;
				}
				
				.orgchart .node .second-menu {
					display: none;
					position: absolute;
					top: 0;
					right: -70px;
					border-radius: 35px;
					box-shadow: 0 0 4px 1px #999;
					background-color: #fff;
					z-index: 1;
				}
				
				.orgchart .node .second-menu .avatar {
					width: 60px;
					height: 60px;
					border-radius: 30px;
					float: left;
					margin: 5px;
				}
				
				.orgchart .node .title {
					height: 120px;
					border-radius: 0;
				}
				
				.orgchart .node .content {
					border: 0;
					font-weight: bold;
				}

				.orgchart .jefe .title {
					background-color: var(--paper-green-800);
				}
				
				.orgchart .admin .title {
					background-color: var(--paper-yellow-500);
				}
				.orgchart .sasisopa .title {
					background-color: var(--paper-blue-300);
				}
				.orgchart .sgm .title {
					background-color: var(--paper-orange-700);
				}
				.orgchart .emisiones .title {
					background-color: var(--paper-green-500);
				}
				.orgchart .seguridad .title {
					background-color: var(--paper-red-500);
				}
				.orgchart .sistemas .title {
					background-color: var(--paper-blue-500);
				}
				
				/* .orgchart .middle-level .content {
					border-color: #006699;
				} */
			</style>

			<div id="chart-container"></div>
		`;
	}
	
	static get properties() {
		return {
			objEmpleados:{type:Object, notify:true, observer:"_carga"},
			empleados:{type:Array, notify:true, value:[]}
		}
	}
	
	constructor() {
		super();
	}
	
	ready() {
		super.ready();
	}
	
	_carga(obj){
		var t=this;
		if(obj && obj!=null){
			var cc=this.shadowRoot.querySelector('#chart-container');
			if(cc){
				if(cc.innerHTML!=""){
					cc.innerHTML="";
				}
				$(cc).orgchart({
					'data' : obj,
					'depth': 2,
					'nodeTitle': 'name',
					'nodeContent': 'name',
					'createNode': function(node, data) {
						if(data.fotoUrl=="../images/khalia.jpeg"){
							node.children('.title').html('<img src="'+data.fotoUrl+'" class="img img-fluid">');

						}else{
							node.children('.title').html('<img src="'+data.fotoUrl+'" width="100%" height="100%" class="img img-fluid rounded-circle">');
							var nodo=node[0];
							let secondMenuIcon = document.createElement('iron-icon');
							
							secondMenuIcon.setAttribute('icon', 'open-in-new');
							secondMenuIcon.setAttribute('class','second-menu-icon p-1');
							secondMenuIcon.addEventListener('click', (event) => {
								console.log("click en usuario",data);
								t.muestraUsuario(data.id);
							});
							
							nodo.appendChild(secondMenuIcon)
							
						}

						
					}
				});
			}
		}else{
			var cc=this.shadowRoot.querySelector('#chart-container');
			cc.innerHTML="";
		}
	}

	muestraUsuario(id){
		var elegido=this.buscaObjectoArreglo(this.empleados,"uid",id);

		PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-vista-empleado",
			style:"width:500px;max-width:95%;",
			params:[elegido],
            negativeButton: {
                text: "Cerrar",
                action: function(dialog, element) {
                
                    dialog.close();
                }
            }
		});
	}
}

customElements.define('my-organigrama', MyOrganigrama);