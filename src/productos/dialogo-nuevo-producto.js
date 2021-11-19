import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin';

import "@polymer/paper-input/paper-input.js";
import '@vaadin/vaadin-select/vaadin-select.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

import '../kothing.js';
import { UtilsMixin } from '../mixins/utils-mixin';
class DialogoNuevoProducto extends UtilsMixin(DialogLayoutMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="kothing">
                :host{
                    display:block;
                }
            </style>
            
            
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

            <div>
            <label for="entrega">Entregables</label>
            <textarea id="entrega" class="my-editor"></textarea>
            </div>

            <div>
            <label for="marco">fundamento legal</label>
            <textarea id="marco" class="my-editor"></textarea>
            </div>
            <!-- <paper-input label="fundamento legal" value="{{nuevoEntregable}}"></paper-input> -->

            <!-- <paper-input label="alcance" value="{{nuevoEntregable}}"></paper-input> -->

            <div>
                <p>Entregables</p>
                <!-- <paper-input label="agregar entregable" value="{{busqueda}}">
                    <paper-icon-button slot="suffix" on-click="sumaEntregable" icon="add" alt="agrega" title="agrega">
                    </paper-icon-button>
                </paper-input> -->
                
                <!-- <paper-listbox style="max-height:250px;overflow-y:scroll;">
                    <template is="dom-repeat" items="{{entregables}}">
                        <paper-item>
                            <paper-item-body>
                                <div>[[item.razon]]</div>
                            </paper-item-body>
                        </paper-item>
                    </template>
                </paper-listbox> -->
            </div>

            


            

        `;
    }

    static get properties() {
        return {
            esEditar:{type:Boolean, notify:true, value:false},
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

    ready() {
        super.ready();
        var t=this;

        var edit=this.shadowRoot.querySelectorAll(".my-editor");
		const editor=KothingEditor.create(edit, {
			// All of the plugins are loaded in the "window.KothingEditor" object in kothing-editor.min.js file
			// Insert options
		
			// formats: [
			// 	'p', 'div', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
			//   ],
           
			lang:t.configLenguaje,

			  imageResizing: true,
			
			toolbarItem: [
				['undo', 'redo'],
				// ['font', 'fontSize', 'formatBlock'],
				['bold', 'underline', 'italic', 'strike', 'fontColor', 'hiliteColor'],
				['outdent', 'indent', 'align', 'list'],
				['table'],
				
				
		
			  ],
			width: '100%',
			height:'100px',
		  });

		  //this.$.btnGuardar.addEventListener('click', e => {this._handleClick(e,editor)});
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