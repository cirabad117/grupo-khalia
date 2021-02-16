import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

import '@polymer/app-route/app-location.js';

let internalMixinNavigation = function(superClass) {
    return class extends superClass {
        static get properties(){
            return{
                _routeParams:{
                    type:Boolean,
                    notify:true,
                    reflectToAttribute: true,
                    observer: "_innerParamsNavigationObserver"
                },
                _routeParamsChangeListeners:{
                    type:Array,
                    notify:true,
                    value: []
                }
            };
        }
        
        constructor(){
            super();
        }
        
        ready(){
            super.ready();
            var queryContainer=document.createElement("app-location");
            var context=this;
            queryContainer.addEventListener("query-params-changed",function(e){
                var params=e.detail.value;
                context.set("paramsActuales",params);
            });
            queryContainer.addEventListener("route-changed",function(e){
                context.set("rutaActual",e.detail.value);
            });
            this.shadowRoot.appendChild(queryContainer);
        }
        
        static get observers(){
            return[
                "_observeRutaParams(rutaActual,paramsActuales)"
            ];
        }
        
        _observeRutaParams(route,params){
            var context=this;
            var path=null;
            if(!route){
                return;
            }
            if(route.path){
                path=route.path;
                if(path.startsWith("/")){
                    path=path.substring(1);
                }
                if(path.endsWith("/")){
                    path=path.substring(-1);
                }
            }
            if(!path){
                path="";
            }
            var array=path.split("?");
            if(context._pageName){
                if(context._pageName==array[0].replace("/","").replace("/","")){
                    context.set("_routeParams",params);
                }
            }else{
                context.set("_routeParams",params);
            }
        }
        
        _innerParamsNavigationObserver(params){
            for(var i=0;i<this._routeParamsChangeListeners.length;i++){
                var listener=this._routeParamsChangeListeners[i];
                this._checkParamsListenerAction(listener);
            }
        }
        
        _bindParamsAction(listener){
            this.push("_routeParamsChangeListeners",listener);
            this._checkParamsListenerAction(listener);
        }
        
        _checkParamsListenerAction(listener){
            var bl=listener.checker(this._routeParams);
            return listener.action(bl);
        }
    }
}
export const NavigationMixin = dedupingMixin(internalMixinNavigation);