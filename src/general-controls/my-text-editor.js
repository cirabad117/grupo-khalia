import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../kothing.js';

class MyTextEditor extends PolymerElement {
    static get template() {
        return html`
            <style include="kothing">
                :host{
                    display:block;
                }
            </style>
            
            <textarea id="my-editor"></textarea>

        `;
    }

    static get properties() {
        return {
            objEditor:{type:Object, notify:true},

            textoIncrustar:{type:String, notify:true}
        }
    }

    constructor() {
        super();
    }
    /**
      * Array of strings describing multi-property observer methods and their
      * dependant properties
      */
    static get observers() {
        return [
            '_activaAgregar(objEditor,textoIncrustar)'
        ];
    }

    ready() {
        super.ready();
        var t=this;

        var config={
		
			lang:t.configLenguaje,

			  imageResizing: true,
			
			toolbarItem: [
				['undo', 'redo'],
				['bold', 'underline', 'italic', 'strike', 'fontColor', 'hiliteColor'],
				['outdent', 'indent', 'align', 'list'],

				['table'],
				
				
		
			  ],
			width: '100%',
			height:'100px',
		  };

        var edit=this.shadowRoot.querySelector("#my-editor");
		const editor=KothingEditor.create(edit, config);
       
        this.set("objEditor",editor);
    }

    _activaAgregar(obj,txt){
        console.log("_activa agregar",txt);
        if(obj && obj!=null && txt && txt!=null && txt.trim()!=""){
            obj.setContents(txt);
        }
    }

    muestraTexto(){
        var editor=this.objEditor;
        var texto=editor.getContents();
        return texto;
    }

    // escribeTexto(txt){
    //     var editor=this.objEditor;
    //     console.log("editor",editor);
    //     if(editor && editor!=null && txt && txt!=null && txt.trim()!=""){
    //        this.setTimeout(() => {
    //         editor.setContents(txt);
    //        }, 1000);
           
            
       
            
    //     }
        
    // }
}

customElements.define('my-text-editor', MyTextEditor);