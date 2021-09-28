import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';

class MySeguimientoItem extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <div style="font-size: 16px; font-weight: 500;">
                <span class="badge" style$="padding:5px; background-color:[[objEstatus.color]];color:[[objEstatus.base]];">
                    {{objEstatus.texto}}
                </span>
            </div>

        `;
    }

    static get properties() {
        return {

            objBuscar:{type:Object, notify:true,observer:"_llenaCampos"},
            objEstatus:{type:Object,notify:true}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    _llenaCampos(obj){
        if(obj && obj!=null){
            
            if(obj.listaSeguimiento){
                this.set("listaSeguimiento",obj.listaSeguimiento);

                var obj=this.muestraEstatus(obj.listaSeguimiento);
                this.set("objEstatus",obj)
            }else{
                this.set("objEstatus",{texto:"no hay datos de seguimiento",base:"white",color:"black"}
                );
            }
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
            return ultimo.estatus;
        }else{
            return {texto:"no hay datos de seguimiento",base:"white",color:"black"};
        }
    }
}

customElements.define('my-seguimiento-item', MySeguimientoItem);