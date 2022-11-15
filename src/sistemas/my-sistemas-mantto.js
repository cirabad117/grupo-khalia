import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../general-controls/my-lista-general.js';
import './my-nuevo-mantto.js';
import './my-registro-mantto.js';
class MySistemasMantto extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <my-lista-general arreglo-items="[[registros]]"
            lista-filtro="[[listaTipo]]" lista-ordena="[[opcionesOrdena]]"
            lista-cols="[[datosMantto]]" color-boton="var(--paper-green-600)"
            funcion-ordenar="[[funcionOrdenaEquipo]]" funcion-buscar="[[funcionFiltraEquipo]]"
            on-ejecuta-accion="abreNuevoMantto" on-ejecuta-item="abreRegistro"></my-lista-general>

        `;
    }

    static get properties() {
        return {
            registros:{type:Array, notify:true, value:[]},
            datosMantto:{type:Array, notify:true, value:[
                {"titulo":"Fecha de registro","dato":"_timestamp"},
                {"titulo":"Empleado","dato":"empleado","valorInterno":"displayName"},
                {"titulo":"Tipo de mantenimiento","dato":"tipo"},
                {"titulo":"Acciones","listaAcciones":[
                    {"accion":"accionItem","icono":"icons:input","texto":"Abrir detalles"},
                    // {"accion":"eliminar","icono":"icons:delete-forever","texto":"Eliminar"}
                ]}
            ]},
            listaTipo:{type:Array, notify:true,value:[
                {color:"#FFEB3B",base:"black",texto:"PREVENTIVO"},
                {color:"#FFEB3B",base:"black",texto:"CORRECTIVO"},
            ]},
            opcionesOrdena:{type:Array, notify:true, value:[
                {"opcion":"fechaAs","texto":"Fecha de creación (más antiguo)"},
                {"opcion":"fechaDe","texto":"Fecha de creación (más reciente)"}
                
            ]},
            funcionFiltraEquipo:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionFiltraProd",
                    funcion:function(item,texto,filtro) {
                        var busca=texto.toLowerCase();
                        if(filtro=="todos"){
                            return item;
                            
                        }else{
                            if(item.tipo==filtro){
                                return item.tipo;
                                
                            }
                            
                        }
                    }
                }
            },
            funcionOrdenaEquipo:{
                type:Object,
                notify:true,
                value:{
                    nombre:"funcionOrdenaProd",
                    funcion:function(a,b,str) {
                        var at=PolymerUtils.convertFirebaseTimestamp(a._timestamp);
                        var bt=PolymerUtils.convertFirebaseTimestamp(b._timestamp);
                    
                        switch (str) {
                           
                            case "fechaAs":
                                if(at==bt){
                                    return 0;
                                }else{
                                    return (at<bt ? -1 : 1);
                                }
                            break;
                            case "fechaDe":
                                if(at==bt){
                                    return 0;
                                }else{
                                    return (at>bt ? -1 : 1);
                                }
                            break;

                            default:
                            break;
                        }
                    }
                }
            },

            listaUsuarios:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();

        var binder=new QueryBinder("mantenimiento",{
            "specialRef":firebase.firestore().collection("estatus-area").doc("sistemas").collection("mantenimiento").orderBy("_timestamp", "desc")
        });
        binder.bindArray(this,this.registros,"registros");
    }

    abreRegistro(e){
        console.log("abreRegistro",e.detail.objeto.dato);
        var dato=e.detail.objeto.dato;
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-registro-mantto",
            params:[dato],
			
			style:"width:95%;",
			
            negativeButton: {
                text: "Cerrar",
                action: function(dialog, element) {
                    dialog.close();
                }
            }
		});
    }

    abreNuevoMantto(){
        var arr=this.listaUsuarios;
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-nuevo-mantto",
            params:[arr],
			title:"Nuevo registro de mantenimiento",
			style:"width:95%;",
			positiveButton: {
                text: "guardar",
                style:"background-color:var(--paper-blue-500);color:white",
                action: function(dialog, element) {
                    element.guardaMantto();
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
}

customElements.define('my-sistemas-mantto', MySistemasMantto);