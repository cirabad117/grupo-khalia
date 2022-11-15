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
                    {color:"#FF9800",base:"black",texto:"SIN RESPUESTA"},
                    {color:"#B3E5FC",base:"black",texto:"DATOS INCORRECTOS"},
                    {color:"#D32F2F",base:"white",texto:"VOLVER A CONTACTAR", esComentario:true},
                    {color:"#BDBDBD",base:"black",texto:"NO INTERESADO", esComentario:true},
                    {color:"#000000",base:"white",texto:"NO CONTACTAR",esComentario:true},
                    {color:"#2E7D32",base:"white",texto:"COTIZACIÓN"},

                    // {color:"#1A237E",base:"white",texto:"ENVIADO"},
                    // {color:"#F44336",base:"black",texto:"NO INTERESADO"},
                    // {color:"#000000",base:"white",texto:"NO CONTACTAR"},
                    // {color:"#18FFFF",base:"black",texto:"ENVIAR CORREO"},
                    // {color:"#0277BD",base:"white",texto:"PENDIENTE POR COTIZAR"},
                    // {color:"#FFA726",base:"white",texto:"ESPERANDO LLAMADA"},
                    // {color:"#FF4081",base:"black",texto:"EN PROCESO DE VENTA"},
                    // {color:"#4CAF50",base:"black",texto:"VENTA REALIZADA"},
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
                ]},

                areasKhalia:{type:Array, notify:true, value:[
                    {tipo:"admin",nombre:"Administración",logo:"../../images/areas/admin.png"},
                    {tipo:"ventas",nombre:"Ventas y Marketing",logo:"../../images/areas/campana_digital.png"},
                    {tipo:"sasisopa",nombre:"SASISOPA",logo:"../../images/areas/sasisopa.png"},
                    {tipo:"sgm",nombre:"SGM",logo:"../../images/areas/sgm.png"},
                    {tipo:"emisiones",nombre:"Emisiones",logo:"../../images/areas/emisiones.png"},
                    {tipo:"seguridad",nombre:"Seguridad",logo:"../../images/areas/seguridad.png"},
                    {tipo:"sistemas",nombre:"Sistemas",logo:"../../images/areas/sistemas.png"},
                ]}
            };
        }
    }
}
export const DiccionarioMixin = dedupingMixin(internalMixinDiccionario);