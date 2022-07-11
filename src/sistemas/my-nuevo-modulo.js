

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-swatch-picker/paper-swatch-picker.js';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin';

class MyNuevoModulo extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <paper-input style="width:250px;"label="nombre" value="{{nombreMod}}" ></paper-input>
            
            <div>
                <label id="label1">Color</label>
                <paper-swatch-picker color="{{color}}" aria-labelledby="label1"></paper-swatch-picker>
            </div>
            <paper-checkbox checked="{{esOscuro}}">texto oscuro</paper-checkbox>

        `;
    }

    static get properties() {
        return {
            idProyecto:{type:String,notify:true},
            modulos:{type:Array, notify:true, value:[]}
        }
    }

    constructor(id,arr) {
        super();

        if(id){
            this.set("idProyecto",id);
        }

        if(arr){
            this.set("modulos",arr);
        }
    }

    ready() {
        super.ready();
    }

    guardaModulo(){
        console.log("datos",this.nombreMod,this.color,this.esOscuro);
        var id=this.idProyecto;
        var arr=PolymerUtils.cloneObject(this.modulos);

        if(!arr || arr==null){
            arr=[];
        }

        if(this.esOscuro==true){
            var texto="black";
        }else{
            var texto="white";
        }

        var obj={
            nombre:this.nombreMod,
            fondo:this.color,
            txtColor:texto

        }
        arr.push(obj);

        var t=this;
        var washingtonRef = sharedFirebase.collection("estatus-area").doc("sistemas").collection("proyectos").doc(id);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            
            modulos:arr
        }).then(() => {
            PolymerUtils.Toast.show("Módulos actualizados");
            t.DialogLayout_closeDialog();
           
        }).catch((error) => {
            PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
            console.error("Error updating document: ", error);
        });




       
    }
}

customElements.define('my-nuevo-modulo', MyNuevoModulo);