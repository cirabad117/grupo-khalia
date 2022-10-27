import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
import { DiccionarioMixin } from '../mixins/diccionario-mixin.js';

import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import '../controles-extra/checkbox-tree.js';

class MySelectorPerfil extends DiccionarioMixin(UtilsMixin(PolymerElement)) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }

                .item-lista{
                    border:solid 1px var(--paper-grey-200);
                }

                .item-lista:hover{
                    cursor:pointer;
                    text-decoration:underline;
                    background-color:var(--paper-grey-200);
                }
            </style>

            
            <iron-pages selected="{{selected}}" attr-for-selected="name">
                <div name="lista">
                    <paper-listbox>
                        <template is="dom-repeat" items="[[arrPerfiles]]" as="perfil">
                            <paper-item class="item-lista" on-click="eligePerfil">
                                <div>[[getNombrePerfil(perfil)]]</div>
                            </paper-item>
                        </template>
                    </paper-listbox>
                </div>
                <div name="selector" style="overflow-y:scroll;max-height:300px;">
                    <paper-item style="background-color:var(--paper-yellow-200);">
                        <paper-item-body>
                            <div>[[getNombrePerfil(elegido)]]</div>
                        </paper-item-body>
                        <paper-icon-button icon="close" on-click="quitaPerfil"></paper-icon-button>
                    </paper-item>
                    <checkbox-tree object-tree="[[mainTree]]" id="mainDomTree"></checkbox-tree>
                </div>
            </iron-pages>
            

        `;
    }

    static get properties() {
        return {
            selected:{type:String, notify:true,value:"lista"},
            elegido:{type:Object, notify:true},
            arrPerfiles:{type:Array, notify:true, value:[]},

            listaPermisos:{type:Object, notify:true,observer:"_asignaLista"}

        }
    }

    constructor() {
        super();

        var datos=StaticDomAccess.MAIN_TREE;
        this.set("mainTree",datos);
    }

    ready() {
        super.ready();
        var binder=new QueryBinder("perfiles");
        
        binder.bindArray(this,this.arrPerfiles,"arrPerfiles");
    }

    devuelveDatos(){
        console.log("devuelveDatos",this.elegido);

        if(!this.elegido || this.elegido==null){
            return PolymerUtils.Toast.show("selecciona un perfil válido");
        }


        var lista=this.shadowRoot.querySelector("#mainDomTree").getSelectedList();

        console.log("lista",lista);

        if(!lista || lista==null || JSON.stringify(lista) === '{}'){
            return PolymerUtils.Toast.show("Selecciona los accesos para el usuario");
        }

        var datos=PolymerUtils.cloneObject(this.elegido);
        delete datos.permisos;

         console.log("datos",datos);

        var obj={
            accessList:lista,
            puesto:datos
        };

        console.log("obj",obj);

        return obj;
    }

    _asignaLista(obj){
        if(obj && obj!=null){
            this.set("selected","selector");
            this.selectTree(obj);
        }
    }

    eligePerfil(e){
        var perfil=e.model.perfil;

        
        this.set("listaPermisos",perfil.permisos);
        var datos=PolymerUtils.cloneObject(perfil);
        delete datos.permisos;

        delete datos.id;
        delete datos._key;
        console.log("perfil",datos);
        this.set("elegido",datos);

    }

    quitaPerfil(){
        this.set("selected","lista");
        this.clearTree();
        this.set("elegido",null);
        this.set("listaPermisos",null); 
    }

    selectTree(list){
        var context=this;
        setTimeout(function(){
            
            context.shadowRoot.querySelector("#mainDomTree").selectTree(list);
        },500);
        
    }

    clearTree(){

        var context=this;
        setTimeout(function(){
            context.shadowRoot.querySelector("#mainDomTree").clearTree();
        },500);
        
    }

    getNombrePerfil(obj){
        if(obj && obj!=null){
            if(obj && obj.nombrePuesto){
                return obj.nombrePuesto;
            }else{
    
                var areas=this.areasKhalia;
    
    
                var nom=this.buscaObjectoArreglo(areas,"tipo",obj.area);
    
                if(obj.puesto=="liderArea"){
                    return "Líder" + " "+nom.nombre;
                }else{
                    return "Gestor" + " "+nom.nombre;
                }
            }
        }
      
    }

}

customElements.define('my-selector-perfil', MySelectorPerfil);