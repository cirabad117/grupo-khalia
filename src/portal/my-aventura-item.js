import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { UtilsMixin } from "../mixins/utils-mixin.js";

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

class MyAventuraItem extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
                
                .item {
                    margin: 10px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    width: 300px;
                    height:350px;
                }
                
                .item-header img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                .item-body {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 20px;
                    max-height: 250px;
                }
                h4:hover{
                    cursor:pointer;
                    text-decoration:underline;
                }
                .tag {
                    background: #cccccc;
                    border-radius: 50px;
                    font-size: 12px;
                    margin: 0;
                    color: #fff;
                    padding: 2px 10px;
                    text-transform: uppercase;
                    cursor: pointer;
                }
                .tag-teal {
                    background-color: #47bcd4;
                }
                .tag-purple {
                    background-color: #5e76bf;
                }
                .tag-pink {
                    background-color: #cd5b9f;
                }
                .card-body p {
                    font-size: 13px;
                    margin: 0 0 40px;
                }
                .user {
                    display: flex;
                    margin-top: auto;
                }

                
                .user img {
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                }
                .user-info h5 {
                    margin: 0;
                }
                .user-info small {
                    color: #545d7a;
                }
            </style>
            
            <div class="item">
                <div class="item-header" on-click="disparaAbre">
                    <img id="foto-aven" src="../../images/logo-khalia.jpeg" alt="img" />
                </div>
                <div class="item-body">
                    <h4 on-click="disparaAbre">[[aventura.titulo]] </h4>
                    <div class="user">
                        <img id="foto-user" src="../../images/user.png" alt="user" />
                        <div class="user-info">
                            <h5>[[aventura._user.displayName]]</h5>
                            <small>2h ago</small>
                        </div>
                        <paper-icon-button icon="delete" on-click="borraItem"></paper-icon-button>
                        
                        
                    </div>
                </div>
            </div>

        `;
    }

    static get properties() {
        return {
            aventura:{type:Object, notify:true,observer:"_asignaDatos"},
            empleados:{type:Array, notify:true,value:[]}
        }
    }
    
    static get observers() {
        return [
            '_buscaFoto(aventura,empleados,empleados.*)'
        ];
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    _asignaDatos(obj){
        if(obj && obj!=null){
            if(obj.fotoUrl && obj.fotoUrl!="ninguno"){
                console.log("fotoUrl",obj.fotoUrl);
                this.shadowRoot.querySelector("#foto-aven").src=obj.fotoUrl;
            }
        }
    }

    _buscaFoto(obj,arr){
        if(obj && obj!=null && arr && arr!=null && arr.length>0){
            var idEmp=obj._user.uid;

            var datosEmp=this.buscaObjectoArreglo(arr,"uid",idEmp);

            if(datosEmp!=null){
                if(datosEmp.fotoUrl){
                    this.shadowRoot.querySelector("#foto-user").src=datosEmp.fotoUrl;
                }
            }


        }
    }

    borraItem(){
        if(this.aventura.nombreFile && this.aventura.nombreFile!=null && this.aventura.nombreFile!="ninguno"){
            var foto=this.aventura.nombreFile;
            var storage = firebase.storage();
            var storageRef = storage.ref();
                var desertRef = storageRef.child('_grupo-khalia/actividades/' + foto);
    
                desertRef.delete().then(() => {
                  console.log("se borró la foto anterior");
                }).catch((error) => {
                  // Uh-oh, an error occurred!
                  console.log("error al eliminar la foto",error);
                });


        }


       
        
            var id=this.aventura.id;

        sharedFirebase.collection("actividades").doc(id).delete().then(() => {
            PolymerUtils.Toast.show("Actividad eliminada");
           
        }).catch((error) => {
            console.error("Error removing document: ", error);
            PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde");
        });
    }

    disparaAbre(){
        var t=this;
        this.dispatchEvent(new CustomEvent('abre-avent', {
            detail: {
                obj:t.aventura
            }
        }));
    }
}

customElements.define('my-aventura-item', MyAventuraItem);