import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import './my-act-item.js';
import './my-nueva-act.js';
import '../controles-extra/dom-access.js';

import '../bootstrap.js';
class MyCursos extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
                
                
            </style>
            
            <div class="container d-flex flex-wrap">
                <template is="dom-repeat" items="[[cursos]]" filter="_esCurso">
                    <my-act-item id-item="[[item.id]]" nombre-file="[[item.nombreFile]]" titulo="[[item.titulo]]" descripcion="[[item.desc]]" fecha="[[item.fecha]]"
                    foto-url="[[item.fotoUrl]]"></my-act-item>
                </template>
            </div>

            <dom-access path="portal/edita">
                <div style="position: fixed; bottom: 24px; right: 24px;">
                    <div style="position: relative; cursor:pointer;" on-clicK="abreEvent">
                        <paper-fab style="color:white; background-color:var(--paper-blue-500);" icon="add"></paper-fab>
                    </div>
                </div>
            </dom-access>
        `;
    }

    static get properties() {
        return {

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    abreEvent(){
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
            title:"Nuevo curso",
			element:"my-nueva-act",
            params:["curso"],
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

    _esCurso(item) {
        return item.tipo == 'curso';
      }
}

customElements.define('my-cursos', MyCursos);