import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-fab/paper-fab.js';
import './my-calendar-item.js';

import './nueva-fecha.js';

import '../calendar-css.js';
import '../bootstrap.js';
class MyCalendario extends PolymerElement {
    static get template() {
        return html`
            <style include="calendar-css bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div class="container-fluid">

                <nav class="navbar bg-light">
					<span class="navbar-brand">
                        Calendario khaliano
                        <!-- <paper-spinner active="{{esCargando}}"></paper-spinner> -->
					</span>
                    <div class="form-inline">
						<paper-tabs selected="{{selected}}" attr-for-selected="name">
							<paper-tab onmouseover="PolymerUtils.Tooltip.show(event,'Calendario')" name="calendario">
								<iron-icon icon="date-range"></iron-icon>
							</paper-tab>
							<paper-tab onmouseover="PolymerUtils.Tooltip.show(event,'Lista')" name="lista">
								<iron-icon icon="list"></iron-icon>
							</paper-tab>
                            
						</paper-tabs>
					</div>
				</nav>

                <div class="card">
                    <div class="card-body">
                        <iron-pages selected="{{selected}}" attr-for-selected="name">
                            <div name="calendario">
                                <div style="width:95%;" id="calendar"></div>
                            </div>
                            <div name="lista">
                                <div class="row">
									<div class="col-md-12">
                                        <div class="table-responsive" style="max-height:450px;overflow-y:scroll;">
											<table class="table table-bordered">
												<thead class="thead-light">
													<tr>
														<th scope="col">Fecha</th>
														<th scope="col">Actividad</th>
														<th scope="col">Acciones</th>
													</tr>
												</thead>
												<tbody>
													<template is="dom-repeat" items="[[actKhalia]]">
                                                        <tr>
															<td style$="{{muestraTextoColor(item.fecha)}}">
																[[getTexto(item)]]
															</td>
															<td>
                                                                <span class="badge m-1"
                                                                style$="background-color:[[item.tipo.fondo]];color:[[item.tipo.color]];">
                                                                    [[item.tipo.texto]]
                                                                </span>
                                                                [[item.nombre]]
															</td>
															<td>
																<my-calendar-item obj-fecha="[[item]]"></my-calendar-item>
															</td>
														</tr>
													</template>
												</tbody>
											</table>
										</div>
									</div>
                                </div>
                            </div>
                        </iron-pages>
                    </div>
                </div>

            </div>
            
            <div style="position: fixed; bottom: 24px; right: 24px;">
                <div style="position: relative; cursor:pointer;" on-clicK="abreNuevo">
                    <paper-fab style="color:white; background-color:var(--paper-blue-500);" icon="add"></paper-fab>
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            selected:{type:String,notify:true, value:"calendario"},
            listaActividades:{type:Array, notify:true, value:[]},
            actKhalia:{type:Array, notify:true, value:[]},
            listaUsuarios:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();  
    }
    
    static get observers() {
        return [
            '_cargaCalendario(listaActividades.*,listaUsuarios.*)'
        ];
    }
    
    _cargaCalendario(act,use){
        var arr=act.base;
        var usr=use.base;
        console.log("usr",usr);
        console.log("arr",arr);

        if( arr && arr.length>0 && usr && usr.length>0){
            console.log("usr && usr.length>0 && arr && arr.length>0", arr && arr.length>0 && usr && usr.length>0);
            
            var fechaActual=new Date();
            var yearActual=fechaActual.getFullYear();
            
            var nuevoArreglo=[];
            var nuevasActividades=[];
            
            for(var i=0; i<arr.length;i++){
				var iterado=arr[i];
                nuevasActividades.push(iterado);
                
                var dato={
                    title:iterado.nombre,
                    start:iterado.fecha,
                    id:iterado.id,
                    backgroundColor:iterado.tipo.fondo
                };
                nuevoArreglo.push(dato);
			}
            
            for(var j=0;j<usr.length;j++){
                var emp=usr[j];
                var arrEmp=emp.fechaNac.split("-");
		        var nuevoFe=yearActual+"-"+arrEmp[1]+"-"+arrEmp[2];
                
                var act={
                    uid:emp.uid,
                    fecha:emp.fechaNac,
                    nombre:emp.displayName,
                    tipo:{
                        color:"black",
                        fondo:"var(--paper-yellow-500)",
                        texto:"Cumpleaños",
                    }
                };

                nuevasActividades.push(act);

                var cal={
                    title:"Cumpleaños " + emp.displayName,
                    start:nuevoFe,
                    id:emp.uid,
                    backgroundColor:"var(--paper-yellow-500)",
                    textColor:"black"
                };
                nuevoArreglo.push(cal);
            }

            var t=this;

            var calendarEl=this.shadowRoot.querySelector("#calendar");

			var calendar = new FullCalendar.Calendar(calendarEl, {
				customButtons: {
					refreshBtn: {
						text: "Recargar",
						click: function () {
							calendar.gotoDate(new Date());
						}
					},
                },
				headerToolbar: {
					left: 'prev,next today,refreshBtn',
					center: 'title',
                    right: 'dayGridMonth'
				},
                navLinks: true,
                nowIndicator: true,
				locale:"es",
				buttonText:{
					prev:"<",
					next:">"
				},
				buttonIcons:false,
				firstDay:0,
				weekNumbers: false,
				weekNumberCalculation: 'ISO',
				editable: true,
				selectable: true,
				dayMaxEvents: true, // allow "more" link when too many events
				events: nuevoArreglo,
				windowResizeDelay:500,
				height:"auto",
                eventClick: function(info) {
                    console.log("eventClick",info.event.id,info.event.title);
                    t.abreEvento(info.event.id);
					// var llave={
					// 	titulo:info.event.title,
					// 	fecha:info.event.start,
					// 	id:info.event.id
					// };
					// if(llave){
					// 	t.eligeActividad(llave);
					// }
					
			  	}
			});
            
            setTimeout( function () {
				calendar.render();
				
			}, 2000 );

            this.set("actKhalia",nuevasActividades);
        }
    }
    
    getObjFecha(fe){
		var arr=fe.split("-");
		var nuevoFe=arr[0]+"/"+arr[1]+"/"+arr[2];
		return new Date(nuevoFe);
	}
	
	getTexto(fe){
        console.log("getTexto",fe);
		var fechaItem=this.getObjFecha(fe.fecha);
		if(!isNaN(fechaItem)){
			return Sugar.Date.medium(fechaItem,'es');
		}else{
			return fe;
		}
	}

    muestraTextoColor(fe){
		var fechaItem=new Date(fe);
		var dias=Sugar.Date.daysFromNow(fechaItem);
		if(dias>=-10 && dias<0){
			return "color:var(--paper-red-500);";
		}else if(dias>=0 && dias<=20){
			return "color:var(--paper-blue-700);";
		}
	}

    abreEvento(id){
        console.log("abreEvento",id);
    }

    abreNuevo(){
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Nueva actividad",
			element:"nueva-fecha",
			style:"width:400px;max-width:95%;",
			positiveButton: {
                text: "Guardar",
                style:"background-color:var(--paper-green-500);color:white;",
                action: function(dialog, element) {
                    element.guardaFecha();
                }
            },
            negativeButton: {
                text: "Cerrar",
                action: function(dialog, element) {
                
                    dialog.close();
                }
            }
		});
    }
}

customElements.define('my-calendario', MyCalendario);