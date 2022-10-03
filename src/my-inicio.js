import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { AuthMixin } from './mixins/auth-mixin.js';

import './auth/my-inicio-sesion.js';
import './portal/my-carrusel.js';


import './bootstrap.js';
import './orgchart.js';

class MyInicio extends AuthMixin(PolymerElement) {
	static get template() {
		return html`
			<style include="bootstrap orgchart">
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
				.chart-container {
					float: left;
					position: relative;
					display: inline-block;
					top: 10px;
					left: 0px;
					height: 1100px;
					width: 50%;
					overflow: hidden;
					text-align: center;
				}
				
				.orgchart {
					background: #fff;
					border: 0;
					padding: 0;
				}
				
				.orgchart>.spinner {
					color: rgba(255, 255, 0, 0.75);
				}
				
				.orgchart .node .title {
					background-color: #fff;
					color: #000;
					height: 120px;
					border-radius: 0;
				}
				
				.orgchart .node .content {
					border: 0;
					background-color: #b80036;
					color: #fff;
					font-weight: bold;
				}
				
				.orgchart .node>.spinner {
					color: rgba(184, 0, 54, 0.75);
				}
				
				.orgchart.r2l .node,
				.orgchart.l2r .node {
					width: 130px;
				}

				.orgchart .node:hover {
					background-color: rgba(255, 255, 0, 0.6);
				}
				
				.orgchart .node.focused {
					background-color: rgba(255, 255, 0, 0.6);
				}
				
				.orgchart .node .edge {
					color: rgba(0, 0, 0, 0.6);
				}
				
				.orgchart .edge:hover {
					color: #000;
				}
				
				.orgchart td.left,
				.orgchart td.top,
				.orgchart td.right {
					border-color: #999;
				}
				
				.orgchart td>.down {
					background-color: #999;
				}
			</style>
			
			<template is="dom-if" if="[[_loggedUser]]">
				<!-- <img class="img img-fluid mx-auto d-block" src="../images/logo-khalia10.jpeg"> -->
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-12">
							<nav class="navbar navbar-light" >
								<a class="navbar-brand">
									<iron-icon icon="icons:list"></iron-icon>
									Tablero de avisos
								</a>
								[[fechaActual]]
							</nav>
						</div>
						<div class="col-sm-10">
							<my-carrusel></my-carrusel>
						</div>
						<div class="col-sm-2" style="overflow-y:scroll;max-height:350px;">
							<template is="dom-repeat" items="[[itemsPortal]]">
								<div class="card card-body bg-light" on-click="navegaPortal">
									[[item.nombre]]
								</div>
							</template>
						</div>
					</div>
					<hr>
				</div>
				
				<div class="container-fluid text-center">
					<h3>Acerca de Grupo Khalia</h3>
					<br>
					<div class="row">
						<div class="col-sm-3">
							<img src="../images/fair.png" class="img-fluid rounded-circle bg-secondary m-4" style="width:60%" alt="Image">
							<p>POLÍTICA</p>
						</div>
						<div class="col-sm-3">
							<img src="../images/leadership.png" class="img-fluid rounded-circle bg-secondary m-4" style="width:60%" alt="Image">
							<p>MISIÓN Y VISIÓN</p>
						</div>
						<div class="col-sm-3">
							<img src="../images/value.png" class="img-fluid rounded-circle bg-secondary m-4" style="width:60%" alt="Image">
							<p>VALORES</p>
						</div>
						<div class="col-sm-3">
							<img src="../images/workspace.png" class="img-fluid rounded-circle bg-secondary m-4" style="width:60%" alt="Image">
							<p>TU LUGAR DE TRABAJO</p>
						</div>
					</div>
					<hr>
				</div>
				<br>
				<div class="container-fluid text-center">
					<h3>Conoce a tus compañeros</h3>
					<paper-button raised on-click="carga">cargar</paper-button>
					<div id="chart-container"></div>
				</div>
			</template>
			<template is="dom-if" if="[[!_loggedUser]]">
				<div class="background-container" style="display: flex; align-items: center; justify-content: center; flex-direction: column; height: 100vh;">
					<div style="width: 450px; max-width: 95%; height: auto; max-width: 95%; background-color: white; border-radius: 10px; border: 1px solid var(--paper-grey-100);">
						<img class="img img-fluid mx-auto d-block" src="../images/logo-khalia10.jpeg">
						<div class="title-container"  style="position: relative;">
						</div>
						<div class="big-container" style="padding: 24px 0px;">
							<my-inicio-sesion></my-inicio-sesion>
						</div>
					</div>
				</div>
			</template>
		`;
	}
	
	static get properties() {
		return {
			itemsPortal:{type:Array, notify:true,value:[
				{nombre:"Vida Khaliana",vista:"vida-khaliana"},
				{nombre:"Reconocimientos",vista:"reconocimiento"},
				{nombre:"Seguridad y Salud",vista:"seguridad"},
				{nombre:"Medio Ambiente",vista:"ambiente"},
				{nombre:"Cursos",vista:"cursos"},
				{nombre:"Buzón",vista:"buzon"},
			]}
		}
	}
	
	constructor(){
		super();
	}
	
	ready(){
		super.ready();
		this.set("fechaActual",Sugar.Date.medium(new Date(),'es'));
	}
	navegaPortal(e){
		var elegido=e.model.item;
		console.log("navegaPortal",elegido);
		NavigationUtils.navigate("portal",{vista:elegido.vista});
	}
	
	carga(){
		var datascource = {
			'name': 'Lao Lao',
			'title': 'general manager',
			'children': [
				{'name': 'Bo Miao', 'title': 'department manager', 'className': 'middle-level',
				'children': [
					{ 'name': 'Li Jing', 'title': 'senior engineer', 'className': 'product-dept' },
					{ 'name': 'Li Xin', 'title': 'senior engineer', 'className': 'product-dept',
					'children': [
						{ 'name': 'To To', 'title': 'engineer', 'className': 'pipeline1' },
							{ 'name': 'Fei Fei', 'title': 'engineer', 'className': 'pipeline1' },
							{ 'name': 'Xuan Xuan', 'title': 'engineer', 'className': 'pipeline1' }
						]
					}
				]},
				{ 'name': 'Su Miao', 'title': 'department manager', 'className': 'middle-level',
				'children': [
					{ 'name': 'Pang Pang', 'title': 'senior engineer', 'className': 'rd-dept' },
					{ 'name': 'Hei Hei', 'title': 'senior engineer', 'className': 'rd-dept',
					'children': [
						{ 'name': 'Xiang Xiang', 'title': 'UE engineer', 'className': 'frontend1' },
						{ 'name': 'Dan Dan', 'title': 'engineer', 'className': 'frontend1' },
						{ 'name': 'Zai Zai', 'title': 'engineer', 'className': 'frontend1' }
					]}
				]}
			]
		};
		var cc=this.shadowRoot.querySelector('#chart-container');
		console.log("cc",cc);
		$(cc).orgchart({
			'data' : datascource,
			'depth': 2,
			'nodeTitle': 'name',
			'nodeContent': 'name',
			'createNode': function($node, data) {
				$node.children('.title').html('<img src="https://dabeng.github.io/OrgChart/img/2016nba/raptors.jpg" widht="100%" height="100%">');
			}
		});
	}



}

customElements.define('my-inicio', MyInicio);