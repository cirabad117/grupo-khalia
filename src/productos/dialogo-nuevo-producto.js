import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin';
import { UtilsMixin } from '../mixins/utils-mixin';

import "@polymer/paper-input/paper-input.js";
import '@polymer/paper-input/paper-textarea.js';
import '@vaadin/vaadin-select/vaadin-select.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

import '../general-controls/my-text-editor.js';

import '../kothing.js';

class DialogoNuevoProducto extends UtilsMixin(DialogLayoutMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="kothing">
                :host{
                    display:block;
                }
            </style>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <paper-input id="txtCod" label="codigo" value="{{codigo}}" error-message="ingrese un valor válido"></paper-input>
                        <paper-input id="txtNom" label="nombre del tramite" value="{{nombre}}" error-message="ingrese un valor válido"></paper-input>
                        
                        <vaadin-select id="selectDepa" label="Departamento" value="{{departamento}}" error-message="selecciona una opcion">
                            <template>
                                <vaadin-list-box>
                                    <vaadin-item value="SEGURIDAD">SEGURIDAD</vaadin-item>
                                    <vaadin-item value="IMPACTO">IMPACTO</vaadin-item>
                                    <vaadin-item value="SASISOPA">SASISOPA</vaadin-item>
                                </vaadin-list-box>
                            </template>
                        </vaadin-select>
                        
                        <vaadin-select id="selectDep" label="Dependencia" value="{{dependencia}}" error-message="selecciona una opcion">
                            <template>
                                <vaadin-list-box>
                                    <vaadin-item value="ASEA">ASEA</vaadin-item>
                                    <vaadin-item value="CRE">CRE</vaadin-item>
                                    <vaadin-item value="SENER">SENER</vaadin-item>
                                    <vaadin-item value="IMSS">IMSS</vaadin-item>
                                    <vaadin-item value="STPS">STPS</vaadin-item>
                                    <vaadin-item value="Otro">Otro</vaadin-item>
                                </vaadin-list-box>
                            </template>
                        </vaadin-select>

                        <paper-checkbox checked="{{esCotizacion}}">maneja tipo de cotizacion</paper-checkbox>
                        <template is="dom-if" if="{{esCotizacion}}">
                            <vaadin-select id="selectCotiza" label="tipo de cotizacion" value="{{cotizacion}}" error-message="selecciona una opcion">
                                <template>
                                    <vaadin-list-box>
                                        <vaadin-item value="por magnitud de empresa">por magnitud de empresa</vaadin-item>
                                        <vaadin-item value="por maquinaria">por maquinaria</vaadin-item>
                                        <vaadin-item value="por magnitud de quimicos">por magnitud de quimicos</vaadin-item>
                                        <vaadin-item value="por actividad">por actividad</vaadin-item>
                                        <vaadin-item value="por recipiente">por recipiente</vaadin-item>
                                        <vaadin-item value="por mts y proyecto">por mts y proyecto</vaadin-item>
                                        <vaadin-item value="por persona">por persona</vaadin-item>
                                        <vaadin-item value="por grupo">por grupo</vaadin-item>
                                        <vaadin-item value="por punto">por punto</vaadin-item>
                                    </vaadin-list-box>
                                </template>
                            </vaadin-select>
                        </template>
                    </div>

                   

                    <div class="col-md-12">
                        <paper-checkbox checked="{{esFundamento}}">Maneja fundamento legal</paper-checkbox>
                        <template is="dom-if" if="{{esFundamento}}">
                            <my-text-editor id="text-fundamento" texto-incrustar="{{textoFundamento}}"></my-text-editor>
                        </template>
                    </div>
                    
                    <div class="col-md-12">
                        <paper-checkbox checked="{{esAlcance}}">maneja alcance</paper-checkbox>
                        <template is="dom-if" if="{{esAlcance}}">
                            <my-text-editor id="text-alcance" texto-incrustar="{{textoAlcance}}"></my-text-editor>
                        </template>
                    </div>

                    <div class="col-md-12">
                        <paper-checkbox checked="{{esEntrega}}">maneja entregables</paper-checkbox>
                        <template is="dom-if" if="{{esEntrega}}">
                            <my-text-editor id="text-entregable" texto-incrustar="{{textoEntregable}}"></my-text-editor>
                        </template>
                    </div>
                    
                    <div class="col-md-12">
                        <paper-checkbox checked="{{esObserva}}">maneja observaciones</paper-checkbox>
                        <template is="dom-if" if="{{esObserva}}">
                            <my-text-editor id="text-observa" texto-incrustar="{{textoObservaciones}}"></my-text-editor>
                        </template>
                    </div>
                </div>
            </div>
            

        `;
    }

    static get properties() {
        return {
            esEditar:{type:Boolean, notify:true, value:false},

            productoActivo:{type:Object, notify:true,observer:"_llenaCampos"},

            idProd:{type:String, notify:true},
            codigo:{type:String, notify:true,},
            nombre:{type:String, notify:true,},
            departamento:{type:String, notify:true,},
            dependencia:{type:String, notify:true,},
            cotizacion:{type:String, notify:true,}
        }
    }

    constructor() {
        super();
    }

    _llenaCampos(objeto){
        if(objeto && objeto!=null){
            var obj=PolymerUtils.cloneObject(objeto);

            console.log("_llenaCampos",obj);
            this.set("idProd",obj.id);
            this.set("codigo",obj.codigo);
            this.set("nombre",obj.nombre);
            this.set("departamento",obj.departamento);
            this.set("dependencia",obj.dependencia);

            this.set("textoFundamento",obj.fundamento);
            this.set("textoAlcance",obj.alcance);
            this.set("textoEntregable",obj.entregable);
            this.set("textoObservaciones",obj.observaciones);

            if(obj.cotizacion){
                this.set("esCotizacion",true)
                this.set("cotizacion",obj.cotizacion);
            }

            var t=this;
            
            if(obj.esFundamento && obj.esFundamento==true){
                t.set("esFundamento",true);
            }else{
                t.set("esFundamento",false);
            }
    
            if(obj.esAlcance && obj.esAlcance==true){
                t.set("esAlcance",true);
            }else{
                t.set("esAlcance",false);
            }
    
            if(obj.esEntrega && obj.esEntrega==true){
                t.set("esEntrega",true);
            }else{
                t.set("esEntrega",false);
            }
    
            if(obj.esObserva && obj.esObserva==true){
                t.set("esObserva",true);
            }else{
                t.set("esObserva",false);
            }
       

            


            
        }
    }

    

    guardaProducto(){
        if(!this.codigo || this.codigo==null || this.codigo.trim()==""){
            return this.shadowRoot.querySelector("#txtCod").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtCod").invalid=false;
        }
        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.shadowRoot.querySelector("#txtNom").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtNom").invalid=false;
        }
        if(!this.departamento || this.departamento==null || this.departamento.trim()==""){
            return this.shadowRoot.querySelector("#selectDepa").invalid=true;
        }else{
            this.shadowRoot.querySelector("#selectDepa").invalid=false;
        }
        if(!this.dependencia || this.dependencia==null || this.dependencia.trim()==""){
            return this.shadowRoot.querySelector("#selectDep").invalid=true;
        }else{
            this.shadowRoot.querySelector("#selectDep").invalid=false;
        }

        var prod={
            _timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            nombre:this.nombre,
            codigo:this.codigo,
            departamento:this.departamento,
            dependencia:this.dependencia
        };

        if(this.esCotizacion && this.esCotizacion==true){
            var selectorExtra=this.shadowRoot.querySelector("#selectCotiza")
            if(!this.cotizacion || this.cotizacion==null || this.cotizacion.trim()==""){
                if(selectorExtra && selectorExtra!=null){
                    return selectorExtra.invalid=true;
                }else{
                    return PolymerUtils.Toast.show("selecciona una opcion de cotización");
                }         
            }else{
                if(selectorExtra && selectorExtra!=null){
                    selectorExtra.invalid=false;
                }
            }

            prod["cotizacion"]=this.cotizacion;
        }

        if(this.esFundamento==true){
            var texto=this.shadowRoot.querySelector("#text-fundamento").muestraTexto();

            if(!texto || texto==null || texto.trim()=="" || texto=="<p></p>" || texto=="<p><br></p>"){
                return PolymerUtils.Toast.show("escribe un texto valído");
            }else{
                prod["esFundamento"]=true;
                prod["fundamento"]=texto;
            }
        }else{
            prod["esFundamento"]=false;
        }

        if(this.esAlcance==true){
            var texto=this.shadowRoot.querySelector("#text-alcance").muestraTexto();

            if(!texto || texto==null || texto.trim()==""|| texto=="<p></p>" || texto=="<p><br></p>"){
                return PolymerUtils.Toast.show("escribe un texto valído");
            }else{
                prod["esAlcance"]=true;
                prod["alcance"]=texto;
            }
        }else{
            prod["esAlcance"]=false;
        }

        if(this.esEntrega==true){
            var texto=this.shadowRoot.querySelector("#text-entregable").muestraTexto();

            if(!texto || texto==null || texto.trim()==""|| texto=="<p></p>" || texto=="<p><br></p>"){
                return PolymerUtils.Toast.show("escribe un texto valído");
            }else{
                prod["esEntregable"]=true;
                prod["entregable"]=texto;
            }
        }else{
            prod["esEntregable"]=false;
        }

        if(this.esObserva==true){
            var texto=this.shadowRoot.querySelector("#text-observa").muestraTexto();

            if(!texto || texto==null || texto.trim()==""|| texto=="<p></p>" || texto=="<p><br></p>"){
                return PolymerUtils.Toast.show("escribe un texto valído");
            }else{
                prod["esObserva"]=true;
                prod["observaciones"]=texto;
            }
        }else{
            prod["esObserva"]=false;
        }



        var t=this;

        if(this.esEditar==true){
            var idEditar=this.idProd;
            firebase.firestore().collection("_productos-khalia").doc(idEditar).set(prod,{merge:true})
            .then(() => {
                PolymerUtils.Toast.show("Información actualizada con exito");
                if(t._dialog){
                    t.DialogLayout_closeDialog();
                }else{
                    console.log("no se detecta el dialogo");
                    t.despachaCierraDialogo();
                   
                }
                t.limpiaCampos();
            })
            .catch((error) => {
                PolymerUtils.Toast.show("Error al guardar; intentalo más tarde.");
                console.error("Error writing document: ", error);
            });
        }else{
            firebase.firestore().collection("_productos-khalia").add(prod).then(function(docRef) {
                PolymerUtils.Toast.show("producto aregado con éxito");
                if(t._dialog){
                    t.DialogLayout_closeDialog();
    
                }else{
                    console.log("no se detecta el dialogo");
                    t.despachaCierraDialogo();
                }
                t.limpiaCampos();
                
            }).catch(function(error) {
                console.error("Error adding document: ", error);
                PolymerUtils.Toast.show("Error al guardar, intentalo más tarde");
            });
        }




        
    }

    despachaCierraDialogo(){
        this.dispatchEvent(new CustomEvent('cierra-dialogo', {
            detail: {
                closed:true
            }
        }));
    }

    limpiaCampos(){
        this.set("codigo",null);
        this.set("dependencia",null);
        this.set("nombre",null);
        this.set("departamento",null);
    }
    

}

customElements.define('dialogo-nuevo-producto', DialogoNuevoProducto);