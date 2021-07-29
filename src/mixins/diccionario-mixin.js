import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

let internalMixinDiccionario = function(superClass) {
    return class extends superClass {
        constructor() {
            super();
            var context=this;
            
        }
        
        static get properties() {
            return {
                listaEstatus:{type:Array, notify:true, value:[
                    {color:"#FFEB3B",base:"black",texto:"SIN RESPUESTA"},
                    {color:"#BA68C8",base:"black",texto:"PENDIENTE POR CONTACTAR"},
                    {color:"#1A237E",base:"white",texto:"ENVIADO"},
                    {color:"#F44336",base:"black",texto:"NO INTERESADO"},
                    {color:"#000000",base:"white",texto:"NO CONTACTAR"},
                    {color:"#18FFFF",base:"black",texto:"ENVIAR CORREO"},
                    {color:"#0277BD",base:"white",texto:"PENDIENTE POR COTIZAR"},
                    {color:"#FFA726",base:"white",texto:"ESPERANDO LLAMADA"},
                    {color:"#FF4081",base:"black",texto:"EN PROCESO DE VENTA"},
                    {color:"#4CAF50",base:"black",texto:"VENTA REALIZADA"},
                ]},

                listaActividades:{type:Array, notify:true, value:[
                    "llamar más tarde y/o investigar otro número",
                    "contactar de acuerdo a indicación",
                    "esperar respuesta",
                    "contactar cada dos meses solo 2 veces",
                    "evitar comunicación - eliminar prospecto",
                    "enviar catálogo de servicios",
                    "enviar cotización de acuerdo a solicitud",
                    "se comparten datos de contacto al cliente",
                    "seguimiento de cotización",
                    "seguimiento de servicios"
                ]}
            };
        }
    }
}
export const DiccionarioMixin = dedupingMixin(internalMixinDiccionario);