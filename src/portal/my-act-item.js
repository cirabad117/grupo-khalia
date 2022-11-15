import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../controles-extra/dom-access.js';

class MyActItem extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }

                .card {
                    width: 300px;
                    margin:5px;
                    background-color: #fff;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    -webkit-transition: box-shadow 0.5s;
                    transition: box-shadow 0.5s;
                    position:relative;
                }
                
                .card a {
                    color: inherit;
                    text-decoration: none;
                }
                .card:hover {
                    box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
                }
                
                .card__date {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                    padding-top: 10px;
                    border-radius: 50%;
                    color: #fff;
                    text-align: center;
                    font-weight: 700;
                    line-height: 13px;
                }
                
                .card__date__day {
                    font-size: 14px;
                }
                
                .card__date__month {
                    text-transform: uppercase;
                    font-size: 10px;
                }
                
                .card__thumb {
                    height: 245px;
                    overflow: hidden;
                    background-color: #000;
                    -webkit-transition: height 0.5s;
                    transition: height 0.5s;
                }
                
                .card__thumb img {
                    width: 100%;
                    display: block;
                    opacity: 1;
                    -webkit-transform: scale(1.5);
                    transform: scale(1.5);
                    -webkit-transition: opacity 0.5s, -webkit-transform 0.5s;
                    transition: opacity 0.5s, -webkit-transform 0.5s;
                    transition: opacity 0.5s, transform 0.5s;
                    transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s;
                }
                
                .card:hover .card__thumb {
                    height: 130px;
                }
                
                .card:hover .card__thumb img {
                    opacity: 0.6;
                    -webkit-transform: scale(1.2);
                    transform: scale(1.2);
                }
                
                .card__body {
                    position: relative;
                    height: 185px;
                    padding: 20px;
                    -webkit-transition: height 0.5s;
                    transition: height 0.5s;
                }
                
                .card:hover .card__body {
                    height: 300px;
                }
                
                .card__category {
                    position: absolute;
                    top: -25px;
                    left: 0;
                    height: 25px;
                    padding: 0 15px;
                    background-color: coral;
                    color: #fff;
                    text-transform: uppercase;
                    font-size: 11px;
                    line-height: 25px;
                }
                
                .card__title {
                    margin: 0;
                    padding: 0 0 10px 0;
                    color: #000;
                    font-size: 22px;
                    font-weight: bold;
                    text-transform: uppercase;
                }
                
                .card__subtitle {
                    margin: 0;
                    padding: 0 0 10px 0;
                    font-size: 19px;
                    color: coral;
                }
                
                .card__description {
                    position: absolute;
                    left: 20px;
                    right: 20px;
                    bottom: 56px;
                    margin: 0;
                    padding: 0;
                    color: #666C74;
                    line-height: 27px;
                    opacity: 0;
                    -webkit-transform: translateY(45px);
                    transform: translateY(45px);
                    -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
                    transition: opacity 0.3s, -webkit-transform 0.3s;
                    transition: opacity 0.3s, transform 0.3s;
                    transition: opacity 0.3s, transform 0.3s, -webkit-transform 0.3s;
                    -webkit-transition-delay: 0s;
                    transition-delay: 0s;
                }
                
                .card:hover .card__description {
                    opacity: 1;
                    -webkit-transform: translateY(0px);
                    transform: translateY(0px);
                    -webkit-transition-delay: 0.2s;
                    transition-delay: 0.2s;
                }
                
                .card__footer {
                    position: absolute;
                    bottom: 12px;
                    left: 20px;
                    right: 20px;
                    font-size: 11px;
                    color: #A3A9A2;
                }
                
                .icon {
                    display: inline-block;
                    vertical-align: middle;
                    margin: -2px 0 0 2px;
                    font-size: 18px;
                }
                
                .icon+.icon {
                    padding-left: 10px;
                }
                .card_boton {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 45px;
                    height: 45px;
                    padding-top: 10px;
                    border-radius: 50%;
                    color: #fff;
                    text-align: center;
                    font-weight: 700;
                    line-height: 13px;
                }
            </style>
            
            <div class="card">
                <div class="card__thumb">
                    <img id="img-item" src="../../images/khalia.jpeg" />
                </div>
                <div class="card__date" style$="background-color:[[colorFecha]];">
                    <span class="card__date__day">[[dia]]</span>
                    <br/>
                    <span class="card__date__month">[[mes]]</span>
                </div>

                <div class="card_boton">
                <dom-access path="portal/edita">
                    <paper-icon-button style="background-color:white;color:var(--paper-red-500);border-radius:50%;" icon="delete" on-click="borraItem"></paper-icon-button>
                    </dom-access>
                </div>

                <div class="card__body">
                    <h2 class="card__title"><a href="#">[[titulo]]</a></h2>
                    <p class="card__description">[[descripcion]]</p>
                </div>
                <!-- <div class="card__footer">
                    <span class="icon ion-clock"></span> 10 mins ago
                    <span class="icon ion-chatbox"></span><a href="#"> 145 comments</a>
                </div> -->
            </div>

            

        `;
    }

    static get properties() {
        return {
            idItem:{type:String, notify:true},
            nombreFile:{type:String, notify:true},
            colorFecha:{type:String, notify:true},
            titulo:{type:String, notify:true},
            descripcion:{type:String, notify:true},
            fecha:{type:String, notify:true,observer:"_muestraDatos"},
            fotoUrl:{type:String, notify:true,observer:"_muestraImagen"}
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

   

    _muestraDatos(str){
        if(str && str!=null && str.trim()!=""){
            var hoy=new Date();

            var arr=str.split("-");
            var nuevo=arr[1]+"-"+arr[2]+"-"+arr[0];
            var fechaBase=new Date(nuevo);

            if(Sugar.Date.daysSince(hoy,fechaBase)>=5){
                this.set("colorFecha","var(--paper-red-500)");
            }else{
                this.set("colorFecha","var(--paper-green-500)");
            }


            
            var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
            this.set("dia",fechaBase.getDate());

            this.set("mes",monthNames[fechaBase.getMonth()]);

        }
    }

    _muestraImagen(str){
        var itemImg=this.shadowRoot.querySelector("#img-item");
        if(str && str!=null){
            itemImg.src=str;
        }else{
            itemImg.src="../../images/khalia.jpeg";
        }

        console.log("itemImg",itemImg.src);
    }

    borraItem(){
        if(this.nombreFile && this.nombreFile!=null && this.nombreFile!="ninguno"){
            var foto=this.nombreFile;
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


       
        
            var id=this.idItem;

        sharedFirebase.collection("actividades").doc(id).delete().then(() => {
            PolymerUtils.Toast.show("Actividad eliminada");
           
        }).catch((error) => {
            console.error("Error removing document: ", error);
            PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde");
        });
    }
}

customElements.define('my-act-item', MyActItem);