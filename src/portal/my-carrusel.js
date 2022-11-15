import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import '../controles-extra/dom-access.js';

class MyCarrusel extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                .image-upload{
                    border:solid 1px var(--paper-grey-600);
                    padding:10px;
                }

                .image-upload:hover{
                    cursor:pointer;
                    text-decoration:underline;
                }
                
                .image-upload>input {
                    display: none;

                }

                .slider-wrapper {
                    position: relative;
                    overflow: hidden;
                }
                
                .slides-container {
                    height: 530px;
                    width: 100%;
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    overflow: scroll;
                    scroll-behavior: smooth;
                    scrollbar-width: none; 
                    -ms-overflow-style: none;  
                }
               
                .slides-container::-webkit-scrollbar { 
                    width: 0;
                    height: 0;
                }
                
                .slide {
                    width: 100%;
                    height: 100%;
                    flex: 1 0 100%;
                }
                
                .slide-arrow {
                    position: absolute;
                    display: flex;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    height: 60px;
                    background-color: white;
                    border: none;
                    width: 35px;
                    font-size: 40px;
                    padding: 0;
                    cursor: pointer;
                    opacity: 0.5;
                    transition: opacity 100ms;
                    z-index:1;
                }
                
                .slide-arrow:hover,
                .slide-arrow:focus {
                    opacity: 1;
                }
                
                #slide-arrow-prev {
                    left: 0;
                    padding-left: 0.75rem;
                    border-radius: 0 2rem 2rem 0;
                    padding-top:0.1rem;
                }
                
                #slide-arrow-next {
                    right: 0;
                    padding-left: 0.75rem;
                    padding-top:0.1rem;
                    border-radius: 2rem 0 0 2rem;
                }

                .slide-boton {
                    position: absolute;
                    border-radius:50%;
                    display: flex;
                    top: 0;
                    font-size: 20px;
                    background-color: var(--paper-red-500);
                    color:white;
                    border: none;
                    padding: 0 !important;
                    cursor: pointer;
                    transition: opacity 100ms;
                    z-index:1;
                }

                #boton-borra {
                    top:5;
                    right: 0;
                    padding-left: 0.75rem;
                  
                } 
                
                .dot {
                    cursor: pointer;
                    height: 15px;
                    width: 15px;
                    margin: 0 2px;
                    background-color: #bbb;
                    border-radius: 50%;
                    display: inline-block;
                    transition: background-color 0.6s ease;
                }
                .active, .dot:hover {
                    background-color: #717171;
                }

                .texto-banner{
                    width:100%;
                    position: absolute;
                    bottom: 8px;
                    background-color:var(--paper-grey-200);
                    font-size:30px;
                    padding:10px;
                    text-align:center;
                }
             
            </style>
            
            <div class="slider-wrapper">
                <button class="slide-arrow" id="slide-arrow-prev" on-click="movePrev">
                    &#8249;
                </button>
                <button class="slide-arrow" id="slide-arrow-next" on-click="moveNext">
                    &#8250;
                </button>
                

                
                
                
                <ul class="slides-container" id="slides-container">
                    <template is="dom-repeat" items="[[listaImagenes]]">
                        <li class="slide" style$="position: relative;
                        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.6) 100%), url([[item.fotoUrl]]) no-repeat;background-size: cover;">

                        <dom-access path="portal/edita">
                        <paper-icon-button class="slide-boton" id="boton-borra" icon="delete" on-click="borraImagen"></paper-icon-button>
                        </dom-access>
                            <p class="texto-banner">[[item.texto]]</p>
                        </li>
                    </template>
                    
                    
                </ul>
                <div style="text-align:center">
                    <template id="vista-puntos" is="dom-repeat" items="[[listaImagenes]]">
                        <span class="dot" on-click="currentSlide"></span>
                    </template>
                    
                </div>
            </div>



            <dom-access path="portal/edita">
            <button type="button" class="btn btn-primary" on-click="toggleImagen">Agregar imagen</button>
            
            <iron-collapse opened="{{opened}}">
                <div class="d-flex">
                <paper-input class="m-2" style="width:50%;" label="Mensaje del banner" value="{{texto}}"></paper-input>
                
                <div class="image-upload">
                    <label for="file-input" style="color:var(--paper-blue-700);">
                        <iron-icon icon="camera-enhance"></iron-icon> [[nombreFoto]]
                    </label>
                    
                    <input id="file-input" accept="image/*" type='file' id="imgInp" on-change="asignaVista"/>
                    
                    
                </div>
                </div>

                <div>
                    <button type="button" class="btn btn-success" on-click="cargaImagen">Guardar</button>
                    <button type="button" class="btn btn-secondary" on-click="toggleImagen">Cancelar</button>
                </div>
            
               
            </iron-collapse>
            </dom-access>

        `;
    }

    static get properties() {
        return {
            opened:{type:Boolean, notify:true,value:false},
            listaImagenes:{type:Array, notify:true, value:[
                {fotoUrl:"../../images/khalia.jpeg",texto:"Bienvenido a Grupo Khalia"}
            ]},
            nombreFoto:{type:String,notify:true, value:"Seleccionar imagen"}

        }
    }

    constructor() {
        super();
    }

    toggleImagen(){
        this.set("opened",!this.opened);
        this.shadowRoot.querySelector("#file-input").value=null;
        this.set("nombreFoto","Seleccionar imagen");


    }

    ready() {
        super.ready();

        var t=this;
        var binder=new QueryBinder("carrusel");
        
        binder.bindArray(this,this.listaImagenes,"listaImagenes");

        var position=0;

        setInterval(() => {
            
            const slidesContainer = this.shadowRoot.querySelector("#slides-container");
            const slide = this.shadowRoot.querySelector(".slide");
            const slides=this.shadowRoot.querySelectorAll(".slide");
            if(slides && slides.length && slides.length>0){
                const slideWidth = slide.clientWidth;
                slidesContainer.scrollLeft += slideWidth;
                position++;
                if(position==slides.length){
                    position=0;
                    slidesContainer.scrollLeft=0;
    
                }
            }
            
          
       
        }, 5000);
    }

    currentSlide(e){
        console.log("currentSlide",e.model.index);
        var num=e.model.index;
        var actual=num+1;
        const slidesContainer = this.shadowRoot.querySelector("#slides-container");
        const slide = this.shadowRoot.querySelector(".slide");
        const slideWidth = slide.clientWidth;
        if(actual==1){
            slidesContainer.scrollLeft =0;
        }else{
            slidesContainer.scrollLeft =slideWidth*actual;
        }

       
       

       

    }

    moveNext(){
        const slidesContainer = this.shadowRoot.querySelector("#slides-container");
        const slide = this.shadowRoot.querySelector(".slide");
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;

    }
    movePrev(){
        const slidesContainer = this.shadowRoot.querySelector("#slides-container");
        const slide = this.shadowRoot.querySelector(".slide");
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
        
    }

    asignaVista(e){
        console.log("asignaVista",e);
        var file = e.target.files[0]
       
        if (file) {
            // console.log("file",file);

            // this.shadowRoot.querySelector("#user-photo").src = URL.createObjectURL(file);
            this.set("nuevaImagen",file);
            this.set("nombreFoto",file.name);
        }
    }

    cargaImagen(){
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var guardar=null;

        

        const [archivo] = this.shadowRoot.querySelector("#file-input").files;
        if (archivo) {
            console.log("guardar",archivo);
            guardar=archivo;
           
        }else{
            return PolymerUtils.Toast.show("Selecciona una imagen");

        }


        var dialog=PolymerUtils.Dialog.createAndShow({
            type: "modal",
            saveSpinner:{
                message: "Agregando banner...",
                saving: true
            },
            style:"width: 400px; height: 300px;",
            smallStyle: "width: 95% !important;"
        });
        
     
        var t=this;
        var uploadTask = storageRef.child('_grupo-khalia/carrusel/' + guardar.name).put(guardar);


        var t=this;
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
                }
            },(error) => {
                console.log("error carga",error);
                PolymerUtils.Toast.show("Error al cargar la imagen");

            },() => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                   

                    var pro={
                        fotoUrl:downloadURL,
                        nombreFoto:guardar.name,
                        texto:t.texto
                    };

                    sharedFirebase.collection("carrusel").add(pro)
                    .then(function(docRef) {
                        
                        PolymerUtils.Toast.show("banner agergado con exito");
                        t.toggleImagen();
                        t.set("nuevaImagen",null);
                        dialog.close();
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                        dialog.close();
                        PolymerUtils.Toast.show("Error al guardar");
                    });




                    // var washingtonRef = firebase.firestore().collection("estatus-area").doc("carrusel");
                    // // Set the "capital" field of the city 'DC'
                    // return washingtonRef.update(
                    //     {
                    //         listaCarrusel:arr
                    //     }
                    // ).then(() => {
                    //     PolymerUtils.Toast.show("Foto actualizada con éxito");
                    //     t.set("nuevaImagen",null);
                    //     t.toggleImagen();
                       
                        
                    //    // t.actualizaCliente(cliente);
                    
                    // }).catch((error) => {
                    //     PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
                    //     console.error("Error updating document: ", error);
                    // });
                    
                });
            }
        );
    }


    borraImagen(e){

        var banner=e.model.item;
        console.log("borraImagen",e.model.item);

        var storage = firebase.storage();
        var storageRef = storage.ref();
            var desertRef = storageRef.child('_grupo-khalia/carrusel/' + banner.nombreFoto);

            desertRef.delete().then(() => {
              console.log("se borró la foto anterior");
            }).catch((error) => {
              // Uh-oh, an error occurred!
              console.log("error al eliminar la foto",error);
            });
        
            var id=banner.id;

        sharedFirebase.collection("carrusel").doc(id).delete().then(() => {
            PolymerUtils.Toast.show("Banner eliminado");
           
        }).catch((error) => {
            console.error("Error removing document: ", error);
            PolymerUtils.Toast.show("Error al actualizar. Intentalo más tarde");
        });
    }
}

customElements.define('my-carrusel', MyCarrusel);