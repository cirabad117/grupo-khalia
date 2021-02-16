import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

import '@vaadin/vaadin-notification/vaadin-notification.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';

let internalMixinNotificacion = function(superClass) {
    return class extends superClass {
        
        ready(){
            super.ready();

            var t=this;

            var vaadinNotificacion=document.createElement("vaadin-notification");
            vaadinNotificacion.id="vaadin-notification";
            this.shadowRoot.appendChild(vaadinNotificacion);

            var vaadinDialog=document.createElement("vaadin-dialog");
            vaadinDialog.id="vaadin-dialog";
            this.shadowRoot.appendChild(vaadinDialog);

        }

        dialogoCreate(){
            const dialog = this.shadowRoot.querySelector('#vaadin-dialog');
            dialog.renderer = function(root, dialog) {
                // Check if there is a DOM generated with the previous renderer call to update its content instead of recreation
                if (root.firstElementChild) {
                    return;
                }
                
                const div = window.document.createElement('div');
                div.textContent = 'Are you sure?';
                const br = window.document.createElement('br');
                const okButton = window.document.createElement('vaadin-button');
                okButton.setAttribute('theme', 'primary');
                okButton.textContent = 'OK';
                okButton.setAttribute('style', 'margin-right: 1em');
                okButton.addEventListener('click', function() {
                    dialog.opened = false;
                });
                
                const cancelButton = window.document.createElement('vaadin-button');
                cancelButton.textContent = 'Cancel';
                cancelButton.addEventListener('click', function() {
                    dialog.opened = false;
                });
                root.appendChild(div);
                root.appendChild(br);
                root.appendChild(okButton);
                root.appendChild(cancelButton);
            };
            dialog.opened=true;
              
        }
        
        /**
         * 
         * @param {*} objNoti objeto  para definir todo lo que contiene toast
         * @param {String} objNoti.texto contenido del toast
         * @param {String} objNoti.titulo titulo del toast
         * @param {Number} objNoti.duracion duracion del toast
         * @param {Boolean} obj.esError da estilo como error
         * 
         */
        notificacionCreate(objNoti){
            const notification = this.shadowRoot.querySelector('#vaadin-notification');

            if(objNoti.duracion){
                notification.duration=objNoti.duracion;
            }
            notification.renderer = function(root) {
                // Check if there is a content generated with the previous renderer call not to recreate it.
                if (root.firstElementChild) {
                  return;
                }
                const container = window.document.createElement('div');

                if(objNoti.esError && objNoti.esError==true){
                    container.style="color:var(--paper-red-700);"
                }

                if(objNoti.titulo){
                    const boldText = window.document.createElement('b');
                    boldText.textContent = objNoti.titulo;
                    container.appendChild(boldText);

                    const br = window.document.createElement('br');
                    container.appendChild(br);

                }
                

                const plainText = window.document.createTextNode(objNoti.texto);
                container.appendChild(plainText);

                root.appendChild(container);
            };
            notification.open();
              
        }
    }
}
export const NotificacionMixin = dedupingMixin(internalMixinNotificacion);