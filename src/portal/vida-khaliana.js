// • Vida Khaliana:
// - Cumpleaños
// - Avisos de eventos /fiestas
// - Aniversarios
// - Aventuras

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-icons/notification-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import './my-act-item.js';
import './my-nueva-act.js';
import './my-aventura-item.js';
import './aventura-dialog';
import '../controles-extra/dom-access.js';

import '../bootstrap.js';
class VidaKhaliana extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
                .items {
                    
                    display: flex;
                    justify-content: space-evenly;
                    flex-wrap: wrap;
                    overflow-y: scroll;
                    max-height:460px;
                }

               
                .avatar {
                    background-size: cover;
                    background-position: center;
                    border-radius: 50%;
                    min-width: 50px !important;
                    min-height: 50px !important;
                    max-width: 50px !important;
                    max-height: 50px !important;
                    border: solid 1px #E0E0E0;
                }
            </style>
            
            <div class="container">
                <div class="row">

                    <div class="col-md-8">
                        <div style="width:100%;" class="d-flex flex-wrap align-items-center">
                            <h3>Aventuras</h3>
                            <dom-access path="portal/edita">
                            <paper-icon-button class="ml-auto" icon="add" on-click="creaAvent"></paper-icon-button>
                        </dom-access>
                        </div>
                        
                        <div class="items">
                            <template is="dom-repeat" items="[[eventos]]" as="ave" filter="_esAventura">
                                <my-aventura-item  aventura="[[ave]]" empleados="[[personal]]" on-abre-avent="abreAvent"></my-aventura-item>
                            </template>
                        </div>
                    
                    </div>

                    <div class="col-md-4">

                        <div class="card">
                            <div class="card-header">Cumpleaños</div>
                            <div class="card-body">
                                <paper-listbox>
                                    <template is="dom-repeat" items="[[personal]]" as="cumple"  filter="_muestraMes">
                                        <paper-icon-item>
                                            <div class="avatar" slot="item-icon" style$="background-image:url([[getImagenCumple(cumple.fotoUrl)]])">
                                            </div>
                                            
                                            <paper-item-body two-line>
                                                <div>[[cumple.displayName]]</div>
                                                <div secondary>[[muestraFecha(cumple.fechaNac)]]</div>
                                            </paper-item-body>
                                        </paper-icon-item>
                                    </template>
                                </paper-listbox>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header d-flex flex-wrap align-items-center">
                                <span>Aniversarios</span>
                                <dom-access path="portal/edita">
                                    <paper-icon-button class="ml-auto" icon="add" on-click="abreAni"></paper-icon-button>
                                </dom-access>
                            </div>
                            <div class="card-body">
                                <paper-listbox>
                                    <template is="dom-repeat" items="[[eventos]]" as="ani" filter="_esAniversario">
                                        <paper-icon-item>
                                            <iron-icon icon="notification:event-note" slot="item-icon"></iron-icon>
                                            <paper-item-body two-line on-click="abreAniver">
                                                <div>[[ani.titulo]]</div>
                                                <div secondary>[[muestraFecha(ani.fecha)]]</div>
                                            </paper-item-body>
                                            
                                            <paper-icon-button icon="delete" on-click="borraAniver"></paper-icon-button>
                                            
                                        </paper-icon-item>
                                    </template>
                                </paper-listbox>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>

            <br>
            

            <div class="container">
                <div class="d-flex flex-wrap align-items-center">
                    <h3>Proximos eventos</h3>
                    <dom-access path="portal/edita">
                    <paper-icon-button class="ml-auto" icon="add" on-click="abreEvent"></paper-icon-button>
                    </dom-access>
                </div>
                
                <div class="d-flex flex-wrap">
                    <template is="dom-repeat" items="[[eventos]]" filter="_esEvento">
                        <my-act-item id-item="[[item.id]]" nombre-file="[[item.nombreFile]]" titulo="[[item.titulo]]" descripcion="[[item.desc]]" fecha="[[item.fecha]]"
                        foto-url="[[item.fotoUrl]]"></my-act-item>
                    </template>
                </div>
                
                
            </div>

        `;
    }

    static get properties() {
        return {
            personal:{type:Array, notify:true,value:[]},
            fechas:{type:Array, notify:true,value:[]},
            eventos:{type:Array, notify:true,value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    getImagenCumple(str){
        if(str && str!=null){
            return str;
        }else{
            return "../../images/user.png";
        }
    }

    muestraImagen(obj){
        if(obj && obj.fotoUrl && obj.fotoUrl!="ninguno"){
            return obj.fotoUrl;
        }else{
            return "../../images/khalia.jpeg";
        }
    }

    abreEvent(){
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Nuevo evento",
			element:"my-nueva-act",
            params:["evento"],
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "Guardar",
                style:"background-color:var(--paper-green-500);color:white;",
                action: function(dialog, element) {
                    element.ejecutaGuardar();
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

    abreAvent(e){
        var elegido=e.detail.obj;
        console.log("elegido",elegido);

        this.abreDetalleAct(elegido);
        
    }

    abreAniver(e){
        var elegido=e.model.ani;
        console.log("elegido",elegido);

        this.abreDetalleAct(elegido);
        
    }


    abreDetalleAct(act){
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"aventura-dialog",
            params:[act],
			style:"width:600px;max-width:95%;",
			
            negativeButton: {
                text: "Cerrar",
                action: function(dialog, element) {
                
                    dialog.close();
                }
            }
		});
    }

    creaAvent(){
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Agregar historia",
			element:"my-nueva-act",
            params:["aventura"],
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "Guardar",
                style:"background-color:var(--paper-green-500);color:white;",
                action: function(dialog, element) {
                    element.ejecutaGuardar();
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

    muestraFecha(fecha){
        var arr=fecha.split("-");
        var nuevo=arr[1]+"-"+arr[2]+"-"+arr[0];
        var fechaBase=new Date(nuevo);
        return Sugar.Date.medium(fechaBase,'es');
    }

    borraAniver(e){
        var elegido=e.model.ani;
        console.log("borraAniver",elegido);
        if(elegido.nombreFile && elegido.nombreFile!=null && elegido.nombreFile!="ninguno"){
            var foto=elegido.nombreFile;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var desertRef = storageRef.child('_grupo-khalia/actividades/' + foto);
            desertRef.delete().then(() => {
                console.log("se borró la foto anterior");
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log("error al eliminar la foto",error);
            });
        }
        
        var id=elegido.id;

        sharedFirebase.collection("actividades").doc(id).delete().then(() => {
            PolymerUtils.Toast.show("Actividad eliminada");
           
        }).catch((error) => {
            console.error("Error removing document: ", error);
            PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde");
        });
    }

    abreAni(){
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Nuevo aniversario",
			element:"my-nueva-act",
            params:["aniversario"],
			style:"width:500px;max-width:95%;",
			positiveButton: {
                text: "Guardar",
                style:"background-color:var(--paper-green-500);color:white;",
                action: function(dialog, element) {
                    element.ejecutaGuardar();
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

    _muestraMes(item){
        var actual=new Date();
        var mesActual=actual.getMonth();

        var arr=item.fechaNac.split("-");
        var nuevo=arr[1]+"-"+arr[2]+"-"+arr[0];
        var fechaBase=new Date(nuevo);
        var mesBas=fechaBase.getMonth();

        return mesActual==mesBas;
    }

    _esEvento(item) {
        return item.tipo == 'evento';
      }

      _esAniversario(item) {
        var actual=new Date();
        var mesActual=actual.getMonth();

        var arr=item.fecha.split("-");
        var nuevo=arr[1]+"-"+arr[2]+"-"+arr[0];
        var fechaBase=new Date(nuevo);
        var mesBas=fechaBase.getMonth();
        return item.tipo == 'aniversario' && mesActual==mesBas;
      }
      _esAventura(item) {
        return item.tipo == 'aventura';
      }
}

customElements.define('vida-khaliana', VidaKhaliana);