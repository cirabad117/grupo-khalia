import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DiccionarioMixin } from '../mixins/diccionario-mixin.js';

import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-select/vaadin-select.js';
import '@polymer/paper-input/paper-textarea.js'

import '../bootstrap.js';

class MyDatosSeguimiento extends DiccionarioMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>

            <div style="display:flex; align-items:center;">
                <div style="flex-grow:1;">historial de seguimiento</div>
                <div style="flex-grow:0;">
                    <paper-icon-button icon="add" on-click="cambiaBol"></paper-icon-button>
                
                </div>
            </div>
            
            <iron-collapse opened="{{esAgregar}}">
                <div style="display: flex; padding: 8px; align-items:center; flex-wrap:wrap;">
                    <div style="flex-grow: 0;margin:5px;">
                        <vaadin-combo-box id="txtEstatus" selected-item="{{estatusElegido}}" label="estatus" error-message="valor inválido"
                        items="[[listaEstatus]]" item-label-path="texto" item-id-path="color">
                            <template>
                                <b style$="background-color:[[item.color]];color:[[item.base]]">[[item.texto]]</b>
                            </template>
                        </vaadin-combo-box>
                    </div>
                    
                    <div style="flex-grow: 0; margin:5px;">
                        <vaadin-select id="txtActividad" label="actividad a realizar" value="{{actividad}}" error-message="selecciona una opcion">
                            <template>
                                <vaadin-list-box>
                                    <template is="dom-repeat" items="[[listaActividades]]">
                                        <vaadin-item value="[[item]]">[[item]]</vaadin-item>
                                    </template>
                                </vaadin-list-box>
                            </template>
                        </vaadin-select> 
                    </div>
                    <div style="flex-grow:1; margin:5px;">
                        <paper-textarea style="max-width:400px;"id="txtComentario" label="comentario" value="{{comentario}}"></paper-textarea>
                    </div>
                    
                </div>
                <div style="flex-grow:1; margin:5px;">
                    <button class="btn btn-sm" style="border:solid 1px var(--paper-green-500);color:var(--paper-green-500);background-color:white;" on-click="agregaEstatus">
                        <span>
                            <iron-icon icon="add"></iron-icon>
                        </span>
                        agregar estatus
                    </button>
                </div>
            </iron-collapse>

            
            <iron-collapse opened="{{!esAgregar}}">
                <paper-listbox>

                    <template is="dom-repeat" items="[[arregloSeguimiento]]" as="seg" sort="sort">
                        <paper-item>
                            <paper-item-body two-line>
                                <div style$="background-color:[[seg.estatus.color]];color:[[seg.estatus.base]]">[[seg.estatus.texto]]</div>
                                <div secondary>[[muestraFecha(seg.fechaGuardado)]] - [[seg.actividad]]</div>
                            </paper-item-body>
                           
                        </paper-item>
                    </template>
                
                </paper-listbox>
            </iron-collapse>
            

        `;
    }

    static get properties() {
        return {
            idProspecto:{type:String, notify:true},
            esAgregar:{type:Boolean, notify:true,value:false},
            arregloSeguimiento:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    cambiaBol(){
        this.set("esAgregar",!this.esAgregar);
    }

    muestraFecha(value){
        return PolymerUtils.getTimeString(value);

    }

    agregaEstatus(){


        var arreglo=this.arregloSeguimiento;
        if(!arreglo){
            arreglo=[];
        }

        var timeSt=new Date().getTime();
        // var fecha=this.PolymerUtils_getTimeString(timeSt);

        
        var nuevo={
            fechaGuardado:timeSt
            
        };
        
        if(!this.estatusElegido || this.estatusElegido==null){
            return this.shadowRoot.querySelector("#txtEstatus").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtEstatus").invalid=false;
            nuevo["estatus"]=this.estatusElegido;
        }
        
        if(!this.actividad || this.actividad==null || this.actividad.trim()==""){
            return this.shadowRoot.querySelector("#txtActividad").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtActividad").invalid=false;
            nuevo["actividad"]=this.actividad;
        }

        if(!this.comentario || this.comentario==null || this.comentario.trim()==""){
            return this.shadowRoot.querySelector("#txtComentario").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtComentario").invalid=false;
            nuevo["comentario"]=this.comentario;
        }

       
        
        //this.push("listaSeguimiento",nuevo);
        //this.limpiaCamposSeguimiento();

        console.log("nuevo seguimiento",nuevo);

        arreglo.push(nuevo);

        var id=this.idProspecto

        var washingtonRef = firebase.firestore().collection("_clientes-khalia").doc(id);

// Set the "capital" field of the city 'DC'
return washingtonRef.update({
    listaSeguimiento: arreglo
})
.then(() => {
    console.log("Document successfully updated!");
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
    }

    sort(a, b) {
        var nameA = a.fechaGuardado; 
        var nameB = b.fechaGuardado; 
        if (nameA > nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }

   
}

customElements.define('my-datos-seguimiento', MyDatosSeguimiento);