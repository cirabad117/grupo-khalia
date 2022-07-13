import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';



import '@polymer/paper-fab/paper-fab.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/vaadin-select/vaadin-select.js';
// import '@vaadin/select/vaadin-select.js';


import '../bootstrap.js';
class MySistemasMain extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
                
                .frontside {
                    margin-bottom: 30px;
                }

                .card {
                    background-color:var(--paper-blue-900);
                    min-height: 100px;
                    color:white;
                }
                .card:hover{
                    cursor:pointer;
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);

                }
            </style>

            <div class="container-fluid">
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand" >
                        <iron-icon icon="polymer"></iron-icon>
                        Departamento de Sistemas
                    </a>
                    <!-- <div class="form-inline my-2 my-lg-0">
                        <paper-tabs selected="{{selected}}" attr-for-selected="name" style="background-color:white;">
                            <paper-tab name="lista" onmouseover="PolymerUtils.Tooltip.show(event,'Clientes activos')">
                                <span><iron-icon icon="supervisor-account"></iron-icon></span>
                                
                            </paper-tab>
                            <paper-tab name="coment" onmouseover="PolymerUtils.Tooltip.show(event,'Comentarios')">
                                <span><iron-icon icon="feedback"></iron-icon></span>
                                
                            </paper-tab>
                        </paper-tabs>
                    </div> -->
                </nav>
                <div class="row">
                    <div class="col-md-12">
                        <iron-collapse id="collapse" opened="{{abierto}}">
                            <div class="d-flex align-items-center">
                                <div class="d-flex">
                                    <paper-input class="m-2" style="width:300px;"label="nombre del proyecto" value="{{nombre}}"></paper-input>
                                    <vaadin-select id="selectCotiza" class="m-3" label="plataforma" value="{{plataforma}}" error-message="selecciona una opcion">
                                        <template>
                                            <vaadin-list-box>
                                                <vaadin-item value="Web">Web</vaadin-item>
                                                <vaadin-item value="Movil">Móvil</vaadin-item>
                                                <vaadin-item value="PC">PC</vaadin-item>
                                            </vaadin-list-box>
                                        </template>
                                    </vaadin-select>
                                </div>
                                
                                <paper-button class="m-2" raised on-click="guardaProyecto">guardar</paper-button>
                            </div>
                        </iron-collapse>
                    </div>
                  
                    <template is="dom-repeat" items="[[proyectos]]">
                        <div class="col-xs-12 col-sm-6 col-md-4 m-2">
                            <div class="image-flip">
                                <div class="mainflip">
                                    <div class="frontside">
                                        <div class="card" on-click="abreProyecto">
                                            <div class="card-body text-center">
                                                <h4 class="card-title">[[item.nombre]]</h4>
                                                <p>[[item.plataforma]]</p>
                                                <!-- <p class="card-text">fecha de creación: [[PolymerUtils_getDateString(item._timestamp)]]</p> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                </div>

            </div>

            <div style="position: fixed; bottom: 24px; right: 24px;">
                <div style="position: relative; cursor:pointer;" on-clicK="abreNuevo" onmouseover="PolymerUtils.Tooltip.show(event,'Crear proyecto')">
                    <paper-fab icon="add" style="color:white; background-color:#0C2340;"></paper-fab>
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            abierto:{type:Boolean, notify:true, value:false},
            proyectos:{type:Array, notify:true,value:[]},
            items:{type:Array, notify:true, value:[
                { "label": 'Web', "value": 'Web'},
                { "label": 'PC', "value": 'PC'},
                { "label": 'Móvil', "value": 'Movil'}
              ]}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();

        if(this.lastInstalaciones){
            this.lastInstalaciones();
            this.set("lastInstalaciones",null);
        }

        this.set("lastInstalaciones",DataHelper.queryCollection(this,{
            "specialRef": sharedFirebase.collection("estatus-area").doc("sistemas").collection("proyectos"),
            "collection":"proyectos",
            "array":this.proyectos,
            "arrayName":"proyectos"
        }));
    }

    abreNuevo(){
        this.set("abierto",!this.abierto);
    }

    guardaProyecto(){
        var pro={
            nombre:this.nombre,
            plataforma:this.plataforma
        };
        var t=this;
        sharedFirebase.collection("estatus-area").doc("sistemas").collection("proyectos").add(pro)
        .then(function(docRef) {
            
            PolymerUtils.Toast.show("Proyecto creado con éxito");
            t.set("abierto",false);
            t.set("nombre","");
            t.set("plataforma","");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            PolymerUtils.Toast.show("Error al guardar");
        });
    }

    abreProyecto(e){
        var elegido=e.model.item;
        NavigationUtils.navigate("proyecto",{"id":elegido.id});
    }
}

customElements.define('my-sistemas-main', MySistemasMain);