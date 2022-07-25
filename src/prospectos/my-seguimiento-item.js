import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';

class MySeguimientoItem extends  PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <div style="font-size: 16px; font-weight: 500;">
                <span class="badge" style$="padding:5px; background-color:[[objEstatus.color]];color:[[objEstatus.base]];">
                    {{objEstatus.texto}} - [[muestraFecha(fechaUltimoSeg)]]
                </span>

               
            </div>

        `;
    }

    static get properties() {
        return {

            objBuscar:{type:Array, notify:true,value:[]},
            objEstatus:{type:Object,notify:true},
            fechaUltimoSeg:{type:Number, notify:true}

        }
    }

    static get observers() {
        return [
            '_llenaCampos(objBuscar,objBuscar.*)'
        ];
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    muestraFecha(value){
        return PolymerUtils.getTimeString(value);

    }

    _llenaCampos(obj){
        console.log("se dispara observer",obj)





        if(obj && obj.length && obj .length>0){
            this.set("listaSeguimiento",obj);

            var objEs=this.muestraEstatus(obj);
            console.log("recibimos estatus reciente",objEs);
            this.set("objEstatus",objEs.estatus);
            this.set("fechaUltimoSeg",objEs.fechaGuardado);
        }else{
            this.set("objEstatus",{texto:"no hay datos de seguimiento",base:"black",color:"white"});
        }

        
    }

    muestraEstatus(arreglo){
        console.log("recibimos lsita de seguimiento",arreglo);
        var comparar=function(a,b){
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
        };

        var ordenado=arreglo.sort(comparar);
        var ultimo=ordenado[0];

        if(ultimo && ultimo!=null){
            return ultimo;
        }else{
            return {texto:"no hay datos de seguimiento",base:"white",color:"black"};
        }
    }
}

customElements.define('my-seguimiento-item', MySeguimientoItem);