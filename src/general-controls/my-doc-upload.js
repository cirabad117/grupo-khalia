import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js';
import { UtilsMixin } from "../mixins/utils-mixin.js";

class MyDocUpload extends UtilsMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }

                #drop-area {
                    border: 2px dashed #ccc;
                    border-radius: 20px;
                    font-family: sans-serif;
                    margin: 20px auto;
                    padding: 20px;
                }
                
                #drop-area.highlight {
                    border-color: purple;
                }
                p {
                    margin-top: 0;
                }
                .my-form {
                    margin-bottom: 10px;
                }
                #gallery {
                    margin-top: 10px;
                }
                #gallery img {
                    width: 150px;
                    margin-bottom: 10px;
                    margin-right: 10px;
                    vertical-align: middle;
                }
                .button {
                    display: inline-block;
                    padding: 10px;
                    background: #ccc;
                    cursor: pointer;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                .button:hover {
                    background: #ddd;
                }
                #fileElem {
                    display: none;
                }
            </style>
            <div id="drop-area" on-drop="dropHandler" on-dragover="dragOverHandler">
                <p>[[textoDoc]]</p>
                <input type="file" id="fileElem" on-change="handleFileSelect">
                <label class="button" for="fileElem">seleccionar archivo</label>
            </div>

            
            

        `;
    }

    static get properties() {
        return {

            localFile:{type:Object, notify:true,observer:"_cargaArchivo"},
            textoDoc:{type:String, notify:true,value:"Arrastra tu archivo a esta zona o seleccionalo desde tu equipo"},

            direccionGuardar:{type:String, notify:true},
            documento:{type:Object, notify:true},
            puntoSasi:{type:Object, notify:true},

            carpetaGuardar:{type:String, notify:true}

        }
    }

    constructor(dir,doc,pun) {
        super();

        if(dir && dir!=null){
            this.set("direccionGuardar",dir);
        }
        if(doc && doc!=null){
            this.set("documento",doc);
        }
        if(pun && pun!=null){
            this.set("puntoSasi",pun);
        }

    }

    ready() {
        super.ready();
    }

    muestraTiempo(fecha){
        var hoy=new Date();
        var fechaElegida=new Date(fecha);

        return Sugar.Date.range(hoy,fechaElegida).days();

    }

    guardaDocumento(){

        if(!this.localFile || this.localFile==null){
            return PolymerUtils.Toast.show("selecciona un archivo");
        }
        var guardar=this.localFile;

        var t=this;
        var carpeta=this.carpetaGuardar;
        var options={
            "path": "_clientes/" + HELPER_OMNIPOTENT_KEY+"/"+carpeta,
            "name": guardar.nombre,
            "success": function(downloadUrl) {
                t.disparaArchivoGuardado(downloadUrl,guardar.nombre);

                
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
        
        DataHelper.Storage._actualFirebaseUpload(options,file);
        
    }

    disparaArchivoGuardado(url, nombre){
        this.dispatchEvent(new CustomEvent('archivo-guardado', {
            detail: {
                direccion:url,
                nombreArchivo:nombre
            }
        }));
    }


    _cargaArchivo(obj){
        if(obj && obj!=null){
            this.set("textoDoc",obj.nombre);
        }
    }

    disparaAccionGuardar(){
        if(!this.localFile || this.localFile==null){
            return PolymerUtils.Toast.show("selecciona un archivo")
        }else{
            var t=this;
            this.dispatchEvent(new CustomEvent('guarda-doc', {
                detail: {
                    archivo:t.localFile
                }
            }));
        }
        
    }

    handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        // files is a FileList of File objects. List some properties.
        
        for (var i = 0, f; f = files[i]; i++) {
            var nombre=f.name;
            var archivo=f;



            this.set("localFile",{"nombre":nombre,"file":archivo});
            // output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            // f.size, ' bytes, last modified: ',f.lastModifiedDate.toLocaleDateString(), '</li>');
        }
        //document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    }
    
    dropHandler(ev) {
        
        // Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
            for (var i = 0; i < ev.dataTransfer.items.length; i++) {
                // Si los elementos arrastrados no son ficheros, rechazarlos
                if (ev.dataTransfer.items[i].kind === 'file') {
                    var file = ev.dataTransfer.items[i].getAsFile();
                    this.set("localFile",{"nombre":file.name,"file":file});
                }
            }
        } else {
            // Usar la interfaz DataTransfer para acceder a el/los archivos
            for (var i = 0; i < ev.dataTransfer.files.length; i++) {
                this.set("localFile",{"nombre":files[i].name,"file":files[i]});
            }
        }
        // Pasar el evento a removeDragData para limpiar
        this.removeDragData(ev);
    }
    
    dragOverHandler(ev) {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
    }
    
    removeDragData(ev) {
        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to remove the drag data
            ev.dataTransfer.items.clear();
        } else {
            // Use DataTransfer interface to remove the drag data
            ev.dataTransfer.clearData();
        }
    }
}

customElements.define('my-doc-upload', MyDocUpload);