import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import '../bootstrap.js';

class MyManttoItem extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                .notification {
                    position: relative;
                    display: inline-block;
                }
                .notification .badge {
                    position: absolute;
                    top: 0px;
                    right: -10px;
                    border-radius: 50%;
                    border:solid 1px red;
                    background:red;
                    color: white;
                }
            </style>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        

                        <div class="">
                            <img class="img-fluid" width="200" height="200" src$="[[getImage(equipo.tipo)]]">
                            

                        </div>
                        
                        
                        
                    </div>
                    <div class="col-md-9 notification">
                    <paper-icon-button class="badge" icon="close" on-click="quitaItem">quitar</paper-icon-button>
                    <paper-textarea label="Inspección ocular" value="{{inspec::input}}"></paper-textarea>

                        <div>
                            enciende
                            <paper-radio-group selected="{{enciende}}">
                                <paper-radio-button name="SI">SI</paper-radio-button>
                                <paper-radio-button name="NO">NO</paper-radio-button>
                            </paper-radio-group>
                        </div>
                        <div>
                            botones completos
                            <paper-radio-group selected="{{botones}}">
                                <paper-radio-button name="SI">SI</paper-radio-button>
                                <paper-radio-button name="NO">NO</paper-radio-button>
                            </paper-radio-group>    
                        </div>
                        <div>
                            funciona correctamente
                            <paper-radio-group selected="{{funciona}}">
                                <paper-radio-button name="SI">SI</paper-radio-button>
                                <paper-radio-button name="NO">NO</paper-radio-button>
                            </paper-radio-group>
                        </div>
                        <template is="dom-if" if="{{noFunciona(funciona)}}">
                            <paper-textarea label="Describa la falla" value="{{descFalla}}"><paper-textarea>
                        </template>

                    </div>
                </div>
            </div>

            
            
           
            

            
            
            

        `;
    }

    static get properties() {
        return {
            num:{type:Number, notify:true},
            equipo:{type:Object, notify:true},
            inspec:{type:String, notify:true, value:"No se detectan detalles"}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    quitaItem(){
        console.log("quitaItem",this.num);
        var t=this;
        this.dispatchEvent(new CustomEvent('quita-item', {
            detail: {
                equipo:t.num
            }
        }));
    }

    devuelveMantto(){
        if(!this.inspec || this.inspec==null || this.inspec.trim()==""){
            return PolymerUtils.Toast.show("Ingresa una inspección válida");
        }
        if(!this.enciende || this.enciende==null || this.enciende.trim()==""){
            return PolymerUtils.Toast.show("Selecciona una opción en encendido");
        }
        if(!this.botones || this.botones==null || this.botones.trim()==""){
            return PolymerUtils.Toast.show("Selecciona una opción en botones");
        }
        if(!this.funciona || this.funciona==null || this.funciona.trim()==""){
            return PolymerUtils.Toast.show("Selecciona una opción en funcionamiento");
        }

        if(this.funciona=="NO"){
            if(!this.descFalla || this.descFalla==null || this.descFalla.trim()==""){
                return PolymerUtils.Toast.show("Selecciona una opción en funcionamiento");
            }
        }

        var item=PolymerUtils.cloneObject(this.equipo);
        delete item._timestamp

        item["inspeccion"]=this.inspec;
        item["enciende"]=this.enciende;
        item["botones"]=this.botones;
        item["funciona"]=this.funciona;

        if(this.funciona=="NO"){
            item["descFalla"]=this.descFalla;
        }

        return item;
    }

    getImage(tipo){
        switch (tipo) {
            case "LAPTOP":
            return "../../images/sistemas/laptop.jpg";

            case "MOUSE":
            return "../../images/sistemas/mouse.png";  

            case "CARGADOR":
            return "../../images/sistemas/cargador.jpg";
 
            case "TELÉFONO":
            return "../../images/sistemas/telefono.png";  
        
            default:
            return "../../images/sistemas/hw.png";
        }
    }

    noFunciona(str){
        return str=="NO";
    }
}

customElements.define('my-mantto-item', MyManttoItem);