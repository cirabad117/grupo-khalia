import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { NavigationMixin } from "../mixins/navigation-mixin.js";

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js'


import './my-imagen-perfil.js';
import '../controles-extra/checkbox-tree.js';
import '../sistemas/my-sistemas-inventario.js';
import './my-selector-perfil.js';
import '../auth/my-vista-empleado.js';

import '../bootstrap.js';
import { UtilsMixin } from '../mixins/utils-mixin.js';
class MyUsuario extends UtilsMixin(NavigationMixin(PolymerElement)) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
            </style>
            
            <div class="container">
                <div class="card card-body">
                    <h5 class="card-title d-flex align-items-center" style="cursor:pointer;" on-click="volver">
                        <paper-icon-button icon="arrow-back">volver a mis usuarios</paper-icon-button>
                        Volver a la lista
                        
                    </h5>

                    <div class="row">
                        <div class="col-md-3">
                            <paper-listbox selected="{{selected}}" attr-for-selected="name" style="background-color:var(--paper-grey-200); cursor:pointer;">
                                
                                <paper-item name="datos">información del empleado</paper-item>
                                <paper-item name="imagen">Imagen</paper-item>
                                <paper-item name="present">Presentación</paper-item>
                                <paper-item name="pass">Modificar contraseña</paper-item>
                            
                            </paper-listbox>

                        </div>
                        <div class="col-md-9">
                            <iron-pages selected="{{selected}}" attr-for-selected="name">
                                <div name="datos">
                                    <div class="d-flex">
                                        <paper-input class="mr-3" id="txtUser" label="Nombre de usuario" value="{{user}}"
                                        error-message="valor inválido" disabled=></paper-input>

                                        <paper-input id="txtCod" label="Número de empleado" value="{{codigo}}" error-message="valor inválido"></paper-input>

                                        <paper-button class="ml-auto align-self-baseline"
                                        style="background-color:var(--paper-green-500);color:white;"
                                        on-click="guardaCampos"> Guardar cambios</paper-button>
                                       
                                    </div>

                                    <div class="d-flex">
                                        <paper-input style="width:60%;" id="txtNombre" value="{{nombre}}" label="Nombre completo" error-message="valor inválido"></paper-input>                  
                                        <vaadin-date-picker class="ml-3" label="Fecha de nacimiento" i18n="[[vaadinDateConfig]]" id="txtFecha" value="{{fechaNac}}"
                                        error-message="selecciona una fecha válida"></vaadin-date-picker>
                                    </div>
                                    
                                    <div>
                                        <span class="font-weight-bold">Lista de permisos</span>
                                        <my-selector-perfil id="select-perfil" lista-permisos="[[usuario.accessList]]" 
                                        elegido="[[usuario.puesto]]"></my-selector-perfil>
                                      
                                    </div>
                                    <hr>

                                    <div>
                                        <div class="d-flex align-items-baseline">
                                            <span class="font-weight-bold">Equipo Asigando</span>
                                            <div class="ml-auto">
                                                <button type="button" class="btn btn-primary" on-click="abreEquipo">{{muestraTexto(esAbierto)}}</button>
                                            </div>
                                        </div>
                                        
                                        <paper-listbox>
                                            <template is="dom-repeat" items="[[equipoAsignado]]">
                                                <paper-item>
                                                    <paper-item-body two-line>
                                                        <div>[[item.tipo]] - [[item.marca]]</div>
                                                        <div secondary>[[item.ns]]</div>
                                                    </paper-item-body>
                                                    <paper-icon-button icon="clear" on-click="quitaEquipo"></paper-icon-button>
                                                </paper-item>
                                            </template>
                                        </paper-listbox>
                                    </div>
                                    
                                    
                                    <div>
                                        <iron-collapse id="collapse" opened="{{esAbierto}}">
                                            <my-sistemas-inventario class="border border-info rounded-lg" border-primary rounded-lg es-vista-principal="[[vistaPrincipal]]"
                                            datos-equipo="[[datosEquipo]]" on-agrega-equipo="pushEquipo"></my-sistemas-inventario>
                                        </iron-collapse>
                                    </div>

                                </div>

                                <div name="imagen">
                                    <my-imagen-perfil url-imagen="[[usuario.fotoUrl]]" id-empleado="[[usuario.id]]" nombre-foto="[[usuario.nombreFoto]]"
                                    on-foto-guardada="actualizaFoto"></my-imagen-perfil>

                                </div>
                                <div name="present">
                                    <my-vista-empleado perfil="[[usuario]]" nombre-puesto="[[usuario.nombrePuesto]]"
                                    desc-puesto="[[usuario.descPuesto]]" bio="[[usuario.bio]]" es-editar="[[edita]]"></my-vista-empleado>
                                </div>
                                <div name="pass">
                                    <paper-input id="txtContra" class="m-1" value="{{pass}}" type="password" label="Contraseña" error-message="valor inválido"></paper-input>
                                    <paper-input id="txtConfirm" class="m-1" value="{{pass2}}" type="password" label="Confirmar contraseña" error-message="valor inválido"></paper-input>
                                
                                    <paper-button style="background-color:var(--paper-blue-500);color:white;" on-click="actualizaPass">Cambiar contraseña</paper-button>
                                </div>
                               
                            </iron-pages>
                        
                        </div>
                    
                    </div>
                 
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            _routeParams:{observer: "_routeChanged"},
            usuario:{type:Object, notify:true,observer:"_muestraDatos"},
            selected:{type:String, notify:true,value:"datos"},
            datosEquipo:{type:Array, notify:true, value:[]},
            vistaPrincipal:{type:Boolean, notify:true,value:false},
            esAbierto:{type:Boolean, notify:true,value:false},

            datosEquipo:{type:Array, notify:true, value:[
                {"titulo":"Número de serie","dato":"ns"},
                {"titulo":"Tipo","dato":"tipo"},
                {"titulo":"Marca","dato":"marca"},
                {"titulo":"Acciones","listaAcciones":[
                    {"accion":"accionItem","icono":"icons:add","texto":"agregar equipo"},
                ]}
            ]},

            edita:{type:Boolean, notify:true, value:true}
        }
    }

    constructor() {
        super();
        var datos=StaticDomAccess.MAIN_TREE;
        this.set("mainTree",datos);
    }

    ready() {
        super.ready();
    }

    pushEquipo(e){
        var arreglo=PolymerUtils.cloneObject(this.equipoAsignado);
        if(!arreglo){
            arreglo=[];
        }
        arreglo.push(e.detail.equipo);

        console.log("arreglo",arreglo);
        this.set("equipoAsignado",arreglo);
    }

    quitaEquipo(e){
        var item=e.model.index;
        var arr=PolymerUtils.cloneObject(this.equipoAsignado);
        arr.splice(item,1);
        this.set("equipoAsignado",arr);
    }

  
    muestraTexto(bol){
        return bol==true?"Cerrar":"Asignar equipo";
    }

    abreEquipo(){
        this.set("esAbierto",!this.esAbierto);
    }

    actualizaPass(){
        if(!this.pass || this.pass==null || this.pass.trim()==""){
            return this.shadowRoot.querySelector("#txtContra").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtContra").invalid=false;
        }

        var ps=this.pass;
        
        if(ps.length<6){
            this.shadowRoot.querySelector("#txtContra").errorMessage="mínimo 6 caracteres";
            return this.shadowRoot.querySelector("#txtContra").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtContra").errorMessage="valor inválido";
            this.shadowRoot.querySelector("#txtContra").invalid=false;
        }

        
        if(!this.pass2|| this.pass2==null || this.pass2.trim()==""){
            return this.shadowRoot.querySelector("#txtConfirm").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtConfirm").invalid=false;
        }

        var ps2=this.pass2;

        if(ps!=ps2){
            this.shadowRoot.querySelector("#txtConfirm").errorMessage="las contraseñas no coinciden";
            return this.shadowRoot.querySelector("#txtConfirm").invalid=true;
        }else{
            this.shadowRoot.querySelector("#txtConfirm").invalid=false;
        }

        console.log("vamos a modificar esta contraseña",this.usuario,this.pass);


        var t=this;

        var objUser={
            uid:this.usuario.uid,
            email:this.usuario.email,
            displayName:this.usuario.displayName,
            password:this.pass,
            
        };

        var t=this;
        var actualizaPassword = firebase.functions().httpsCallable('actualizaPassword');
        actualizaPassword(objUser).then(function (result) {
           
            
            var idUser=t.usuario.uid;
            var washingtonRef = firebase.firestore().collection("usuarios").doc(idUser);
            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                password:t.pass
            }).then(() => {
                PolymerUtils.Toast.show("Contraseña actualizada con exito.");

                
               // t.actualizaCliente(cliente);
            
            }).catch((error) => {
                PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
                console.error("Error updating document: ", error);
            });

        }).catch(function (error) {
            console.log("error",error);
            PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde");
       
        });
    }
    
    actualizaFoto(e){
        var idEditar=this.usuario.uid;
        var washingtonRef = firebase.firestore().collection("usuarios").doc(idEditar);
        return washingtonRef.update({
            fotoUrl:e.detail.direccion,
            nombreFoto:e.detail.nombreArchivo
        }).then(() => {
            PolymerUtils.Toast.show("Foto actualizada con éxito");
        }).catch((error) => {
            PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
            console.error("Error updating document: ", error);
        });
    }


    guardaCampos(){
        if(!this.codigo || this.codigo==null || this.codigo.trim()==""){
            return this.$.txtCod.invalid=true;
        }else{
            this.$.txtCod.invalid=false;
        }

        if(!this.nombre || this.nombre==null || this.nombre.trim()==""){
            return this.$.txtNombre.invalid=true;
        }else{
            this.$.txtNombre.invalid=false;
        }

        if(!this.fechaNac || this.fechaNac==null || this.fechaNac.trim()==""){
            return this.$.txtFecha.invalid=true;
        }else{
            this.$.txtFecha.invalid=false;
        }

        var datosPerfil=null;

        var selector=this.shadowRoot.querySelector("#select-perfil");
        console.log("selector",selector);
        if(selector){
            datosPerfil=selector.devuelveDatos();
        }

        if(!datosPerfil || datosPerfil==null){
            return PolymerUtils.Toast.show("no hay datos de perfil válidos");
        }
     

        var nuevoUsuario={
            codigo:this.codigo,
            displayName:this.nombre,
            password:this.pass,
            accessList:datosPerfil.accessList,
            puesto:datosPerfil.puesto,
            fechaNac:this.fechaNac
        };

        if(this.equipoAsignado && this.equipoAsignado.length>0){
            nuevoUsuario["equipoAsignado"]=this.equipoAsignado;
        }

        var idUser=this.usuario.uid;
        var washingtonRef = firebase.firestore().collection("usuarios").doc(idUser);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update(nuevoUsuario).then(() => {
            PolymerUtils.Toast.show("Usuario actualizado éxito");
           
            
           // t.actualizaCliente(cliente);
        
        }).catch((error) => {
            PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
            console.error("Error updating document: ", error);
        });
    }

    _muestraDatos(obj){
        if(obj && obj!=null){
            var arr=obj.email.split("@");
            this.set("user",arr[0]);
            this.set("nombre",obj.displayName);
            this.set("codigo",obj.codigo);
            this.set("fechaNac",obj.fechaNac);
            this.set("pass",obj.password);
            this.set("pass2",obj.password);

            

            if(obj.equipoAsignado){
                this.set("equipoAsignado",obj.equipoAsignado)
            }
        }

    }

    _routeChanged(params){
        var t=this;
		if(params && params!=null && params.id){
            var id=params.id;
            if(this.lastAbonosQuery){
                this.lastAbonosQuery();
            }
            
            this.set("lastAbonosQuery",DataHelper.queryDocument(this,{
                doc: "usuarios/"+id,
                observer:function(obj){
                    if(obj){
                        t.set("usuario",obj);
                        
                    }
                }
            }));

		}else{
            t.set("usuario",null);
        }
	}

    volver(){
        NavigationUtils.navigate("usuarios");
    }
}

customElements.define('my-usuario', MyUsuario);