import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';
import './my-edita-rec.js'

// • Reconocimientos
// - Departamento del mes
// - Líder del mes
// - Gestor del mes

class MyReconocimiento extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                    
                }
                
                .cards {
                    width: 100%;
                    padding:30px;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: center;
                    -webkit-justify-content: center;
                }
                
                .card--1 .card__img, .card--1 .card__img--hover {
                    background-position: center; /* Center the image */
                    background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
                    background-image: url('../../images/khalia.jpeg');
                }
                /* .card--2 .card__img, .card--2 .card__img--hover {
                    background-image: url('https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
                } */
                .card__like {
                    width: 18px;
                }
                .card__clock {
                    width: 15px;
                    vertical-align: middle;
                    fill: #AD7D52;
                }
                .card__time {
                    font-size: 12px;
                    color: #AD7D52;
                    vertical-align: middle;
                    margin-left: 5px;
                }
                
                .card__clock-info {
                    float: right;
                }
                .card__img {
                    visibility: hidden;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    width: 100%;
                    height: 235px;
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px;
                }
                
                .card__info-hover {
                    position: absolute;
                    padding: 16px;
                    width: 100%;
                    opacity: 0;
                    top: 0;
                }
                
                .card__img--hover {
                    transition: 0.2s all ease-out;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    width: 100%;
                    position: absolute;
                    height: 235px;
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px;
                    top: 0;
                }
                
                .card {
                    margin-right: 25px;
                    transition: all .4s cubic-bezier(0.175, 0.885, 0, 1);
                    background-color: #fff;
                    min-width: 400px;
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0px 13px 10px -7px rgba(0, 0, 0,0.1);
                }
                .card:hover {
                    box-shadow: 0px 30px 18px -8px rgba(0, 0, 0,0.1);
                    transform: scale(1.10, 1.10);
                }
                
              
                
                .card__category {
                    font-family: 'Raleway', sans-serif;
                    text-transform: uppercase;
                    font-size: 13px;
                    letter-spacing: 2px;
                    font-weight: 500;
                    color: #868686;
                }
                
                .card__title {
                    margin-top: 5px;
                    margin-bottom: 10px;
                    font-family: 'Roboto Slab', serif;
                }
                
                .card__by {
                    font-size: 12px;
                    font-family: 'Raleway', sans-serif;
                    font-weight: 500;
                }
                
                .card__author {
                    font-weight: 600;
                    text-decoration: none;
                    color: #AD7D52;
                }
                
                .card:hover .card__img--hover {
                    height: 100%;
                    opacity: 0.3;
                }
                .card:hover .card__info {
                    background-color: transparent;
                    position: relative;
                }
               
            </style>
            
            <div class="container">
                <div class="jumbotron">
                    <h1 class="display-4">Reconocimientos de mes</h1>
                    <p class="lead">En esta seccion aparecen los reconocimientos del mes</p>
                </div>
                
                <div class="cards">

                
                <template is="dom-repeat" items="[[listaRecs]]">
                <div class="card card--1">
                        
                        
                        <div class="card__img" style$="background-image: url([[muestraImagen(item)]]);"></div>
                        <a href="#" class="card_link">
                            <div class="card__img--hover" style$="background-image: url([[muestraImagen(item)]]);"></div>
                        </a>
                        <div class="card__info">
                            <span class="card__category">[[muestraTitulo(item.id)]]</span>
                            <h3 class="card__title">[[muestraNombre(item)]]</h3>
                            <!-- <span class="card__by">by <a href="#" class="card__author" title="author">Celeste Mills</a></span> -->
                        </div>
                    </div>
                </template>
                






                    
                </div>
            </div>
            
            <div style="position: fixed; bottom: 24px; right: 24px;">
                <div style="position: relative; cursor:pointer;" on-clicK="editaRecs">
                    <paper-fab icon="create" style$="color:white;background-color:var(--paper-green-500);"></paper-fab>
                </div>
            </div>

         

        `;
    }

    static get properties() {
        return {
            listaRecs:{type:Array, notify:true, value:[]},
            personal:{type:Array, notify:true, value:[]}

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        var binder=new QueryBinder("reconocimientos");
        
        binder.bindArray(this,this.listaRecs,"listaRecs");
    }

    muestraTitulo(id){
        switch (id) {
            case "departamento":
            return "Departamento del mes";

            case "lider":
            return "Líder del mes";

            case "gestor":
            return "Gestor del mes";
        
            default:
            break;
        }
    }

    muestraNombre(obj){
        if(obj.id=="departamento"){
            return obj.nombre;
        }else{
            return obj.displayName;
        }
    }

    muestraImagen(obj){
        if(obj.id=="departamento"){
            return obj.logo;
        }else{
            if(obj.fotoUrl){
                return obj.fotoUrl;
            }
            
        }
    }

    editaRecs(){
        var users=PolymerUtils.cloneObject(this.personal);
        PolymerUtils.Dialog.createAndShow({
			type: "modal",
			element:"my-edita-rec",
            params:[users],
			title:"Modificar reconocimientos",
			style:"width:400px;max-width:95%;",
			positiveButton: {
                text: "guardar",
                style:"background-color:var(--paper-blue-500);color:white",
                action: function(dialog, element) {
                    element.guardaRecs();
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

customElements.define('my-reconocimiento', MyReconocimiento);