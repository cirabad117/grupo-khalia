import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../bootstrap.js';
class MyImagenPerfil extends PolymerElement {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }

                .image-upload>input {
                    display: none;

                }
            </style>
            
            <img id="user-photo" src$="[[urlImagen]]" width="200" height="200" class="img-fluid rounded-circle img-thumbnail shadow-sm">
            <div class="image-upload">
                <label for="file-input" style="color:var(--paper-blue-700);">
                <iron-icon icon="add"></iron-icon> Agregar imagen
            </label>
            <input id="file-input" accept="image/*" type='file' id="imgInp" on-change="asignaVista"/>
        </div>


        <template is="dom-if" if="{{muestraBoton(activaGuarda,esNuevo)}}">
            <paper-button raised on-click="cargaImagen">Actualizar imagen</paper-button>
        </template>
        

        `;
    }

    static get properties() {
        return {
            urlImagen:{type:String, notify:true,value:"../../images/user.png"},
            nuevaImagen:{type:Object, notify:true,observer:"_muestraGuardar"},
            activaGuarda:{type:Boolean, notify:true, value:false},

            esNuevo:{type:Boolean, notify:true, value:false},

            nombreFoto:{type:String, notify:true}
           

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    muestraBoton(activo,nuevo){

        if(activo==true && nuevo==false){
            return true;
        }else{
            return false;
        }
        
    }

    returnImagen(url){
        return url
    }

    _muestraGuardar(obj){
        if(obj && obj!=null){
            this.set("activaGuarda",true);

        }else{
            this.set("activaGuarda",false);

        }
    }

   cargaImagen(){
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var guardar=null;

        if(this.nombreFoto && this.nombreFoto!=null){
            var desertRef = storageRef.child('_grupo-khalia/personal/' + this.nombreFoto);

            desertRef.delete().then(() => {
              console.log("se borró la foto anterior");
            }).catch((error) => {
              // Uh-oh, an error occurred!
              console.log("error al eliminar la foto",error);
            });
        }

        const [archivo] = this.shadowRoot.querySelector("#file-input").files;
        if (archivo) {
            console.log("guardar",archivo);
            guardar=archivo;
           
        }else{
            return PolymerUtils.Toast.show("Selecciona una imagen");

        }

        console.log("guardar",guardar);
        
        var t=this;
        var options={
            "path": "_grupo-khalia/personal",
            "name": guardar.name,
            "success": function(downloadUrl) {
                t.disparaFoto(downloadUrl,guardar.name);

                
            },
            "onProgress": function(p) {
                //   context.updateProgress(p);
                //  context.updateProgress(p);
            },
            "onPaused": function() {    

            },
            "onResumed": function() {

            },
            "error": function(err) {
                PolymerUtils.Toast.show("Error al cargar el archivo");
                console.error("firebase storage", err);
            }
        };

        var file=guardar.file;
        
        DataHelper.Storage._actualFirebaseUpload(options,guardar);
        
     
        // var t=this;
        // var uploadTask = storageRef.child('_grupo-khalia/personal/' + guardar.name).put(guardar);
      

        // var idEditar=this.idEmpleado;
        // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot) => {
        //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           
        //     switch (snapshot.state) {
        //         case firebase.storage.TaskState.PAUSED: // or 'paused'
        //         console.log('Upload is paused');
        //         break;
        //         case firebase.storage.TaskState.RUNNING:
        //             console.log('Upload is running');
        //             break;
        //         }
        //     },(error) => {
        //         console.log("error carga",error);
        //         PolymerUtils.Toast.show("Error al cargar la imagen");

        //     },() => {
        //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        //             var washingtonRef = firebase.firestore().collection("usuarios").doc(idEditar);
        //             // Set the "capital" field of the city 'DC'
        //             return washingtonRef.update(
        //                 {
        //                     fotoUrl:downloadURL,
        //                     nombreFoto:guardar.name
        //                 }
        //             ).then(() => {
        //                 PolymerUtils.Toast.show("Foto actualizada con éxito");
        //                 t.set("nuevaImagen",null);
                       
                        
        //                // t.actualizaCliente(cliente);
                    
        //             }).catch((error) => {
        //                 PolymerUtils.Toast.show("Error al actualizar; intentalo más tarde");
        //                 console.error("Error updating document: ", error);
        //             });
                    
        //         });
        //     }
        // );
    }

    asignaVista(e){
        console.log("asignaVista",e);
        var file = e.target.files[0]
       
        if (file) {
            console.log("file",file);

            this.shadowRoot.querySelector("#user-photo").src = URL.createObjectURL(file);
            this.set("nuevaImagen",file);
        }
    }

    disparaFoto(url, nombre){
        this.dispatchEvent(new CustomEvent('foto-guardada', {
            detail: {
                direccion:url,
                nombreArchivo:nombre
            }
        }));
    }

    borraImagen(){
        this.shadowRoot.querySelector("#file-input").files=null;
        this.shadowRoot.querySelector("#file-input").value=null;
        this.shadowRoot.querySelector("#user-photo").src = "../../images/user.png";
        this.set("nuevaImagen",null);
        this.set("urlImagen","../../images/user.png");
    }



    
}

customElements.define('my-imagen-perfil', MyImagenPerfil);