import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';


let ddd = function(superClass) {
    return class extends superClass {
        
        static get properties(){
            return{
                _dialog:{
                    type:Object,
                    notify:true
                },
                _dialogField:{
                    type:String,
                    notify:true,
                    observer: "_dialogFieldCompletelyChanged"
                }
            };
        }

        constructor(field){
            super();
           
        }
        ___setupPolymerClickEvent(node){
            var context=this;        
            node.addEventListener("click",function(e){
                
                var eventExecute="context."+node.getAttribute("polymer-click"); 
                if(eventExecute.indexOf("(")==-1){
                    eventExecute=eventExecute+"()";
                }
                console.error("Event",eventExecute);
                eval(eventExecute);
            });
        }
        
        ___setupPolymerBinding(node){
            var polymerField=node.getAttribute("polymer-value");
            var bindings=this.___polymerBindings;
            if(!bindings){
                this.set("___polymerBindings",[]);
            }

            this.push("___polymerBindings",{node:node,field:polymerField});
            node.innerHTML=this[polymerField];
        }
        set(campo,data){
            super.set(campo,data);
            var bindings=this.___polymerBindings;
            if(!bindings){
                return;
            }
            for(var i=0;i<bindings.length;i++){
                var node=bindings[i].node;
                var field=bindings[i].field;
                if(campo==field){
                    node.innerHTML=data;
                }

            }
        }
        ready(){
            super.ready();
            if(this._dialog){
                var actionsList=this._dialog.querySelectorAll("[polymer-click]");
                if(actionsList){
                    for(var i=0;i<actionsList.length;i++){
                        this.___setupPolymerClickEvent(actionsList[i]);
                    }
                }
                var valuesList=this._dialog.querySelectorAll("[polymer-value]");
                if(valuesList){
                    for(var i=0;i<valuesList.length;i++){
                        this.___setupPolymerBinding(valuesList[i]);
                    }
                }
            }
        }
        
        _dialogFieldCompletelyChanged(value){
            if(value){
                this.set("_field",value);
                this.set(value,{});
            }

        }
        DialogLayout_reloadTitle() {
            if (this._dialog) {
                this._dialog.reloadTitle();
            }
        }
        
        DialogLayout_updateTitle(title) {
            if (this._dialog) {
                this._dialog.updateTitle(title);
            }
        }
        
        DialogLayout_closeDialog(){
            if(this._dialog){
                this._dialog.close();
            }
            this.dispatchEvent(new CustomEvent('custom-dialog-closed', { detail: {closed: true} }));
        }
        DialogLayout_notifyMultipleResize(){
            var context=this;
            context.__notifyResize(50);
            context.__notifyResize(150);
            context.__notifyResize(250);
            context.__notifyResize(350);
            context.__notifyResize(450);
            context.__notifyResize(550);
            context.__notifyResize(650);
            context.__notifyResize(750);
            context.__notifyResize(850);
            
            context.__notifyResize(950);
            
            context.__notifyResize(1050);
            context.__notifyResize(100);
            context.__notifyResize(200);
            context.__notifyResize(300);
            context.__notifyResize(400);
            context.__notifyResize(500);
            context.__notifyResize(600);
            context.__notifyResize(700);
            context.__notifyResize(800);
            context.__notifyResize(900);
            context.__notifyResize(1000);
        }
        
        __notifyResize(time){
            var t=this;
            if(!time){
                time=500;
            }
            setTimeout(function(){
              t.DialogLayout_notifyResize();
      
            },time);
        }

        DialogLayout_notifyResize(){
            if(this._dialog){
                this._dialog.notifyResize();
            }
        }
        DialogLayout_clearFields(){
            if(this._dialog){
                if(this._field){
                    this.set(this._field,{});
                }
            }
        }

        DialogLayout_setSaving(saving){
            if(this._dialog){
                this._dialog.setSaving(saving);
            }
        }

        DialogLayout_clickNegativeButton(){
            if(this._dialog){
                var pButton=this._dialog.querySelector(".negativeButtonClassForLayout");
                if(pButton){
                    pButton.click();
                }else{
                    console.warn("There's no negative button in your custom element");
                }
            }
        }
        DialogLayout_callPolymerContextEvent(functionString,params){
            return "var div=event.target.closest('.super-polymer-title-container'); div.dispatchEvent(new CustomEvent('call-event', {detail: {funcion: `context."+functionString+"("+params.join(",")+")`}}))";
        }
        DialogLayout_clickPositiveButton(){
            if(this._dialog){
                var pButton=this._dialog.querySelector(".positiveButtonClassForLayout");
                if(pButton){
                    pButton.click();
                }else{
                    console.warn("There's no positive button in your custom element");
                }
            }
        }
    }
}
export const DialogLayoutMixin = dedupingMixin(ddd);