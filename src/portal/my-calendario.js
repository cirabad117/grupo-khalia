import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-fab/paper-fab.js';

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
                                <div style="position: fixed; bottom: 24px; right: 24px;">
                                    <div style="position: relative; cursor:pointer;" on-clicK="abreNuevo">
                                        <paper-fab style="color:white; background-color:var(--paper-blue-500);" icon="add"></paper-fab>
                                    </div>
                                </div>
                            </div>
                            <div name="lista">
                                aqui va en modo lista
                            </div>
                            
                        </iron-pages>
                        


                        
                    </div>
                </div>
            </div>
            

        `;
    }

    static get properties() {
        return {
            selected:{type:String,notify:true, value:"calendario"},
            listaActividades:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();

        if(this.lastFechas){
            this.lastFechas();
            this.set("lastFechas",null);
        }

        this.set("lastFechas",DataHelper.queryCollection(this,{
            "collection":"_fechas-khalia",
            "array":this.listaActividades,
            "arrayName":"listaActividades"
        }));
        
    }
    
    static get observers() {
        return [
            '_cargaCalendario(listaActividades,listaActividades.*)'
        ];
    }

   

    

    _cargaCalendario(arr){

        if(arr && arr.length>0){
            var calendarEl=this.shadowRoot.querySelector("#calendar");
            var nuevoArreglo=[];
            for(var i=0; i<arr.length;i++){
				
				var iterado=arr[i];
				var dato={
						title:iterado.nombre,
						start:iterado.fecha,
						id:iterado.id
					};
					nuevoArreglo.push(dato);
			}
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
					// ,timeGridWeek,timeGridDay,listButton,configButton
					right: 'dayGridMonth'
				},
				// initialDate: '2021-01-12',
				navLinks: true, // can click day/week names to navigate views
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
				// contentHeight: 500,
				eventClick: function(info) {
					var llave={
						titulo:info.event.title,
						fecha:info.event.start,
						id:info.event.id
					};
					if(llave){
						t.eligeActividad(llave);
					}
					//info.el.style.borderColor = 'red';
			  	}
			});

			var t=this;

			setTimeout( function () {
				calendar.render();
				
			}, 2000 );
        }


        
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