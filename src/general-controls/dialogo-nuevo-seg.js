import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin';
import { DiccionarioMixin } from '../mixins/diccionario-mixin';

class DialogoNuevoSeg extends DialogLayoutMixin(DiccionarioMixin(PolymerElement)) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <vaadin-combo-box id="txtEstatus" selected-item="{{estatusElegido}}" label="estatus" error-message="valor inválido"
            items="[[listaEstatus]]" item-label-path="texto" item-id-path="color">
                <template>
                    <b style$="background-color:[[item.color]];color:[[item.base]]">[[item.texto]]</b>
                </template>
            </vaadin-combo-box>

            <!-- <vaadin-combo-box id="txtActividad"  items="[[listaActividades]]" label="actividad a realizar"
            selected-item="{{actividad}}" error-message="selecciona una opcion">
            </vaadin-combo-box> -->

            <template is="dom-if" if="{{esComentario(estatusElegido)}}">
            <paper-textarea style="max-width:400px;"id="txtComentario" label="comentario" value="{{comentario}}"></paper-textarea>

            </template>
            
        `;
    }

    static get properties() {
        return {
            idProspecto:{type:String, notify:true},
            arregloSeguimiento:{type:Array, notify:true, value:[]}
        }
    }

    constructor(id, arr) {
        super();

        if(id){
            this.set("idProspecto",id);
        }
        if(arr){
            this.set("arregloSeguimiento",arr);
        }
    }

    ready() {
        super.ready();
    }

    esComentario(obj){
        if(obj && obj.esComentario && obj.esComentario){
            this.DialogLayout_notifyResize();
            return true;

        }else{
            this.DialogLayout_notifyResize();
            return false;

        }
    }

    agregaEstatus(){
        var arreglo=this.arregloSeguimiento;
        if(!arreglo){
            arreglo=[];
        }

        var timeSt=new Date().getTime();
        var nuevo={
            fechaGuardado:timeSt
        };
        
        if(!this.estatusElegido || this.estatusElegido==null){
            return this.shadowRoot.querySelector("#txtEstatus").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtEstatus").invalid=false;
            nuevo["estatus"]=this.estatusElegido;
        }
        
        // if(!this.actividad || this.actividad==null || this.actividad.trim()==""){
        //     return this.shadowRoot.querySelector("#txtActividad").invalid=true;
        // }else{
        //     this.shadowRoot.querySelector("#txtActividad").invalid=false;
        //     nuevo["actividad"]=this.actividad;
        // }

        if(this.estatusElegido.esComentario && this.estatusElegido.esComentario==true){
            if(!this.comentario || this.comentario==null || this.comentario.trim()==""){
                return this.shadowRoot.querySelector("#txtComentario").invalid=true;
            }else{
                this.shadowRoot.querySelector("#txtComentario").invalid=false;
                nuevo["comentario"]=this.comentario;
            }
        }

        
        
        console.log("nuevo seguimiento",nuevo);

        arreglo.push(nuevo);

        var id=this.idProspecto
        var t=this;
        var washingtonRef = firebase.firestore().collection("_clientes-khalia").doc(id);
        return washingtonRef.update({
            listaSeguimiento: arreglo
        }).then(() => {
            console.log("Document successfully updated!");
            t.DialogLayout_closeDialog();
        }).catch((error) => {
            PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde");
            console.error("Error updating document: ", error);
        });
    }
}

customElements.define('dialogo-nuevo-seg', DialogoNuevoSeg);