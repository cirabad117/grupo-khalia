import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

let internalMixinCliente = function(superClass) {
    return class extends superClass {
        constructor() {
            super();
            var context=this;
            DataController.addOmnipotentNegocioCallback(function(datosNegocio){
                if(datosNegocio){
                    context.set("_cliente",datosNegocio);
                }else{
                    context.set("_cliente",null);
                }
                context.set("_loadedCliente",true);
            });
        }
        
        static get properties() {
            return {
                _cliente:{type:Object,notify:true,value: null},
                _loadedCliente:{type:Boolean,notify:true,value: false}
            };
        }
    }
}
export const MainClienteMixin = dedupingMixin(internalMixinCliente);