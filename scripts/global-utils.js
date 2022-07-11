var PolymerUtils={
    monthsNames:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],

    _bigUtilsMap:{},
    isPrimitive: function(test) {
        return (test !== Object(test)) || typeof(test)=="string";
    },
    isFunction: function(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    },
    convertFirebaseTimestamp: function(timestamp){
        var tiempo=0;
        if(typeof timestamp=="object" && timestamp!=null && timestamp.seconds){
            var nanos=timestamp.nanoseconds+"";
            while(nanos.length<3){
                nanos="0"+nanos;

            }
            tiempo = Number(timestamp.seconds + "" + nanos.substring(0, 3));
            //  console.log(timestamp);
        }
        else {
            return timestamp;
        }
        return tiempo;

    },
    getLastItemEstatusFecha:function(arreglo){
        
        console.log("recibimos lsita de seguimiento",arreglo);
        var comparar=function(a,b){
            
            var nameA = a.fechaGuardado; 
            var nameB = b.fechaGuardado; 
            if (nameA > nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
    
            // names must be equal
            return 0;
        };

        var ordenado=arreglo.sort(comparar);
        var ultimo=ordenado[0];

        if(ultimo && ultimo!=null){
            return ultimo.estatus;
        }else{
            return null;
        }
    
},
    showFileInput:function(type,callback){
        var inputFile = document.createElement("input");
        inputFile.type="file";
        if(type){
            inputFile.accept=type.join(",");
        }
        inputFile.style = "display:none;";
        inputFile.addEventListener("change",function(e){
          if(e.target.files && e.target.files[0]){
            if(callback)
            callback(e.target.files[0]);
            
          
          }
          else{
              PolymerUtils.Toast.show("No seleccionaste ningún archivo");
          }
          
            document.getElementById("unique-main-app-body-file-input").removeChild(inputFile);
        
        });
        
        document.getElementById("unique-main-app-body-file-input").appendChild(inputFile);
       
       inputFile.click();

    },
    fixDataForFirebase: function (data,ignoreMissing) {
        var objectKeys = Object.keys(data);

        var fixed = {};
        if (Array.isArray(data)) {
            fixed = [];
        }
        if(typeof(ignoreMissing)=="undefined" || ignoreMissing==null){
            ignoreMissing=true;
        }
        for (var i = 0; i < objectKeys.length; i++) {
            var llave = objectKeys[i];
            var obj = data[llave];
            if (llave.startsWith("___")) {
                continue;
            }
            if(!ignoreMissing){
                if (typeof obj == "undefined" || obj == null || (typeof obj == "string" && obj.trim() == "")) {

                    return { "error": { "source": llave.replace("_number_", "").replace("_string_", "") } };
                }
            }
            else{
                if (typeof obj == "undefined" || obj == null || (typeof obj == "string" && obj.trim() == "")) {

                    continue;
                }
            }
            
            if (((typeof llave) == "string") && llave.startsWith("_number_")) {
                if (typeof obj == "string")
                    fixed[llave.replace("_number_", "")] = parseFloat(obj.trim());
                else fixed[llave.replace("_number_", "")] = obj;
            }
            else if (((typeof llave) == "string") && llave.startsWith("_string_")) {
                if (typeof obj == "string")
                    fixed[llave.replace("_number_", "")] = obj.trim();
                else fixed[llave.replace("_number_", "")] = (obj + "").trim();


            }
            else if(typeof obj=="object" && Object.prototype.toString.call(obj)=== '[object Date]'){
                fixed[llave]=obj;
            }

            else if (typeof obj == "object" || Array.isArray(obj)) {
                fixed[llave] = PolymerUtils.fixDataForFirebase(obj,ignoreMissing);

            }
            else {
                fixed[llave] = obj;
            }
        }
        return fixed;
    },
    objectEquals: function(a,b){
        if(a==null && b==null){
            return true;
        }
        if(a==null || b==null){
            return false;
        }

     //   console.log("A",a,"B",b);
        var aKeys=Object.keys(a);
        var bKeys=Object.keys(b);
        if(aKeys.length==bKeys.length){
            var cierto=true;
            for(var i=0;i<aKeys.length;i++){
                if(b[aKeys[i]]!=a[aKeys[i]]){
                    cierto=false;
                    break;
                }
            }
       //     console.log("Cierto",cierto);
            return cierto;
        }

        return false;
    },
    cloneObject: function (original,firstLevel) {
        if (!original) {
            return null;
        }
        if(this.isFunction(original)){
            return null;
        }
        if(original)
        if (original instanceof Array) {
            var copy = [];
            for (var i = 0; i < original.length; i++) {
                if(this.isPrimitive(original[i])){
                    copy[i] = (original[i]);
                    
                }
                else{
                    if(!firstLevel)
                    copy[i] = this.cloneObject(original[i]);
                    else 
                    copy[i] = (original[i]);
                }
            }
            return copy;
        }
        else {
            var keys = Object.keys(original);
            var copy = {};
            for (var i = 0; i < keys.length; i++) {
                if(this.isPrimitive(original[keys[i]])){
                    copy[keys[i]] = (original[keys[i]]);
                    
                }
                else{
                    if(!firstLevel)
                    copy[keys[i]] = this.cloneObject(original[keys[i]]);
                    else 
                    copy[keys[i]] = (original[keys[i]]);
                }
            }
            return copy;
        }

    },
    getVariable: function(field){
        return this._bigUtilsMap[field];
    },
    getDateObjectFromString: function(string){
        return new Date(string+" GMT-5");
    },
    
    getHourString: function (timestamp) {
        if (typeof timestamp == "object" && timestamp != null && timestamp.seconds) {
            var nanos = timestamp.nanoseconds + "";
            while (nanos.length < 3) {
                nanos = "0" + nanos;
            }
            timestamp = Number(timestamp.seconds + "" + nanos.substring(0, 3));
        }
        var date = new Date(timestamp);
        if (!this.monthsNames[date.getMonth()]) {
            date = new Date(0);
        }
        return date.getHours() + ":" + (date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes());

    },

    getDateFromTimestamp: function (timestamp) {
        if (typeof timestamp == "object" && timestamp != null && timestamp.seconds) {
            var nanos = timestamp.nanoseconds + "";
            while (nanos.length < 3) {
                nanos = "0" + nanos;
            }
            timestamp = Number(timestamp.seconds + "" + nanos.substring(0, 3));
        }

        var date = new Date(timestamp);
        if (!this.monthsNames[date.getMonth()]) {
            date = new Date(0);
            return null;
        }
        return date;
    },
    getFullSpanishDate: function(timestamp){
        if (typeof timestamp == "object" && timestamp != null && timestamp.seconds) {
            var nanos = timestamp.nanoseconds + "";
            while (nanos.length < 3) {
                nanos = "0" + nanos;
            }
            timestamp = Number(timestamp.seconds + "" + nanos.substring(0, 3));
        }
        var date = new Date(timestamp);
        if (!this.monthsNames[date.getMonth()]) {
            date = new Date(0);
        }
        var fecha = date.getDate() + "/" + this.monthsNames[date.getMonth()].substring(0, 3) + "/" + date.getFullYear();
        if (date.getTime() == 0) {
            return "principio";
        }
        return date.fullSpanishDate();

    },
    getTimeString: function (timestamp) {
        if (typeof timestamp == "object" && timestamp != null && timestamp.seconds) {
            var nanos = timestamp.nanoseconds + "";
            while (nanos.length < 3) {
                nanos = "0" + nanos;
            }
            timestamp = Number(timestamp.seconds + "" + nanos.substring(0, 3));
        }

        var date = new Date(timestamp);
        if (!this.monthsNames[date.getMonth()]) {
            date = new Date(0);

        }

        var fecha = date.getDate() + "/" + this.monthsNames[date.getMonth()].substring(0, 3) + "/" + date.getFullYear();
        
        if (date.getTime() == 0) {
            return "principio";
        }


        return date.getHours() + ":" + (date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()) + ", " + fecha;

    },
    getDateString: function (timestamp, yesterday,separator,numberOfLetters,includeWeekDay) {
        // console.log(timestamp);   
        if(!numberOfLetters){
            numberOfLetters=3;
        }
        if(!separator){
            separator="/";
        }
        if(!includeWeekDay){
            includeWeekDay=false;
        }
        if (typeof timestamp == "object" && timestamp != null && timestamp.seconds) {
            var nanos = timestamp.nanoseconds + "";
            while (nanos.length < 3) {
                nanos = "0" + nanos;
            }
            timestamp = Number(timestamp.seconds + "" + nanos.substring(0, 3));
            //              console.log(timestamp);
        }

        var date = new Date(timestamp);
        if (!this.monthsNames[date.getMonth()]) {
            date = new Date(0);
        }
        if (yesterday) {

            date.setDate(date.getDate() - 1);

        }
        var fecha = date.getDate() + separator + this.monthsNames[date.getMonth()].substring(0, numberOfLetters) + separator + date.getFullYear();
        if(includeWeekDay==true){
            return semana[date.getDay()]+" "+fecha;
        }
        else{
            return fecha;

        }

    },

    iterateArray: function (array, action) {
        if (!array) {
            return;
        }
        if (!action) {
            console.log("No action function defined for iteration");
            return;
        }
        for (var i = 0; i < array.length; i++) {
            if (action) {
                action(array[i], i);
            }
        }

    },

    Tooltip:{
        show: function(event,value){
            var offsetX=2;
            var offsetY=10;
            var x = event.clientX+offsetX;
            var y = event.clientY+offsetY;

            var div=document.createElement("div");
            var rightC=false;
                
            if(x+500>window.innerWidth){
                rightC=true;
            }

            if(rightC){
                div.setAttribute("style",`max-width: 400px; opacity: 0.9; position: fixed; z-index: 999 !important; top: `+y+`px; right: `+(window.innerWidth-x)+`px; background-color: #212121; color: white; padding: 2px 8px; border-radius: 3px; font-size: 15px;`);

            }else{
                div.setAttribute("style",`max-width: 400px; opacity: 0.9; position: fixed; z-index: 999 !important; top: `+y+`px; left: `+x+`px; background-color: #212121; color: white; padding: 2px 8px; border-radius: 3px; font-size: 15px;`);

            }
            div.innerHTML=value;    

            var parent=document.getElementById("unique-main-app-body-tooltip-div");
            var target=event.target;
            
            var moveFunc, clickFunc, outFunc;
            moveFunc=function(moveEvent){
        
                var x = moveEvent.clientX+offsetX;
                var y = moveEvent.clientY+offsetY;
              
                    div.style.top=y+"px";
                if(rightC){

                    div.style.right=(window.innerWidth-x)+"px";
                }
                else{
                    div.style.left=x+"px";

                }
            };
            clickFunc=function(){
                while(parent.firstChild){
               
                    parent.removeChild(parent.firstChild);
                   
                }
              
                target.removeEventListener("mouseout",outFunc);    
                target.removeEventListener("mousemove",moveFunc);   
                target.removeEventListener("click",clickFunc);    
            };
            
            div.addEventListener("click",clickFunc);
            outFunc=function(){
                while(parent.firstChild){
               
                    parent.removeChild(parent.firstChild);
                   
                }
             
                target.removeEventListener("mouseout",outFunc);    
                target.removeEventListener("mousemove",moveFunc);    
                target.removeEventListener("click",clickFunc);    
            };
            while(parent.firstChild){
               
                parent.removeChild(parent.firstChild);
               
            }
            target.addEventListener("mousemove",moveFunc);
            target.addEventListener("click",clickFunc);
            target.addEventListener("mouseout",outFunc);
        
            parent.appendChild(div);
        }
    },

    Dialog:{
        _animationActivated:true,
        initAnimationActivatedListener:function(){
            var t=this;
            LocalStoreQuery.addFieldCallback("_animationActivated",function(data){
                if(data!=null){
                    t._animationActivated=(data=="true");
                }else{
                    t._animationActivated=true;
                }
            });
        },
        
        createAndShow: function(options){
            var element=null;
            if(options.element){
                if(options.params){
                    var pams=options.params;
                    var helper=document.createElement(options.element);
                    element=new helper.constructor(...pams);
                    delete helper;
                    helper=null;
                }else{
                    element=document.createElement(options.element);

                }
               
            }
            var otherFunctions=[];
            var style = document.createElement('style');
            style.type = 'text/css';
            
            var dialog=document.createElement("paper-dialog");
            
            dialog.appendChild(style);

            dialog.setAttribute("style","border-radius: 6px;");

          
            var spinner=null;
            if(options.saveSpinner && options.saveSpinner.enabled!=false){
                var saveDiv=document.createElement("div");
                saveDiv.setAttribute("style","margin: 0 !important;");
                var estilo = document.createElement('style');
                estilo.type = 'text/css';
                estilo.innerHTML=`.spinner{
                position: absolute; top: 0; right: 0; left: 0; bottom: 0;
                opacity: 0;
                display: none;
                border-radius: 6px;
                background-color: white;
                text-align: center;
                transition: opacity 0.5s;
                z-index: -1;}
                .spinner.saving{
                display: block;
                opacity: 1;
                z-index: 999 !important;
                }`;
                spinner=document.createElement("div");
                spinner.classList.add("spinner");
                var htmlText=`
                <div style="width: 100%; height: 100%; display: flex; 
                align-items: center;
                justify-content: center;
                flex-direction: column;">
                <div style="font-size: 16px;">[[spinnerText]]</div>
                <br />
                <paper-spinner active></paper-spinner>
                </div>`;
                if(options.saveSpinner.message){
                    htmlText=htmlText.replace("[[spinnerText]]",options.saveSpinner.message);
                }else{
                    htmlText=htmlText.replace("[[spinnerText]]","");
                }
                spinner.innerHTML=htmlText;
                spinner.appendChild(estilo);
                saveDiv.appendChild(spinner);
                dialog.appendChild(saveDiv);
                dialog.setSaving=function(saving){
                    dialog.saving=saving;
                    if(saving){
                        spinner.classList.add("saving");
                    }else{
                        spinner.classList.remove("saving");
                    }
                };
                if(options.saveSpinner.saving){
                    dialog.setSaving(true);
                }
            }

            if(options.style){
                dialog.setAttribute("style",dialog.getAttribute("style")+options.style);
            }

            var scrollable=document.createElement("paper-dialog-scrollable");
            
           
            if(options.element){
                element._dialog=dialog;
                scrollable.appendChild(element);
            }
            
            if(options.type){
                var type=options.type;
                if(type=="with-backdrop"){
                    dialog.withBackdrop=true;
                }else if(type=="modal"){
                    dialog.modal=true;
                }else{
                    dialog.withBackdrop=false;
                    dialog.modal=false;
                }

            }else{
                dialog.withBackdrop=true;
            }

            dialog.entryAnimation=null;
            dialog.exitAnimation=null;
            
            var titleContainer=document.createElement("div");
            titleContainer.setAttribute("style","margin-top: 0 !important; padding: 0 !important;");
            if(options.title){
                var titleDiv=document.createElement("div");
                titleDiv.setAttribute("style","flex-grow: 100;margin-bottom: 0;line-height: 1.5;font-weight: 500; font-size: 20px;")
                var h2=document.createElement("div");
                h2.setAttribute("style","display: -ms-flexbox; display: flex;-ms-flex-align: start;align-items: flex-start;-ms-flex-pack: justify;justify-content: space-between;padding: 1rem 1rem;border-bottom: 1px solid #dee2e6;border-top-left-radius: calc(0.3rem - 1px);border-top-right-radius: calc(0.3rem - 1px);");

                if(typeof(title)=="object"){
                    // h2.innerText=options.title.string;
                     titleDiv.innerHTML=options.title.text;
 
                    }
                 else{
                     
 //                    h2.innerText=options.title;
                     titleDiv.innerHTML=options.title;
 
                 }

                 h2.appendChild(titleDiv);
                titleContainer.appendChild(h2);
                
            }
            dialog.appendChild(titleContainer);
             
            if(options.message){
                var message=document.createElement("p");
                message.setAttribute("style","font-weight: 400; font-size: 17px; color: var(--paper-grey-700); line-height: 25px;");
                if(options.message.style){
                    message.setAttribute("style",message.getAttribute("style")+options.message.style);
                }
                if(typeof(options.message)=="object"){
                    message.innerHTML=options.message.text;
                }else{
                    message.innerHTML=options.message;
                }
                dialog.appendChild(message);
            }
            
            var elementReadyListener=null;
            if(options.element && options.elementReady){
                elementReadyListener=function(e){
                    if(e.target.tagName.toLowerCase()=="paper-dialog"){
                        options.elementReady(element,dialog);
                    }
                };
                dialog.addEventListener("iron-overlay-opened",elementReadyListener);
            }

            var dialogClosedListener=null;
            if(options.onDialogClosed){
                dialogClosedListener=function(e){
                var parent=
                    document.getElementById("unique-main-app-body-dialog-div");
                    if(e.target.tagName.toLowerCase()==("paper-dialog") && parent.contains(dialog)){
                        options.onDialogClosed(element,dialog);
                    }

                };
                dialog.addEventListener("iron-overlay-closed",dialogClosedListener);

            }
            
            dialog.appendChild(scrollable);
            
            if(options.positiveButton || options.negativeButton){
                var buttons=document.createElement("div");
                buttons.className="buttons";
                buttons.setAttribute("style","display: -ms-flexbox;display: flex;ms-flex-wrap: wrap;flex-wrap: wrap;ms-flex-align: center;align-items: center;ms-flex-pack: end;justify-content: flex-end;padding: 0.75rem;border-top: 1px solid #dee2e6;border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);");
                if(options.negativeButton){
                    var cancelButton=document.createElement("paper-button");
                    cancelButton.setAttribute("style","font-weight: 500;");
                    cancelButton.innerText=options.negativeButton.text;
                    cancelButton.raised=(options.negativeButton.raised==true);
                    if(options.negativeButton.style){
                        okButton.setAttribute("style",okButton.getAttribute("style")+options.negativeButton.style);
                    }
                    if(options.negativeButton.action){
                        var negativeFunction=function(){
                            options.negativeButton.action(dialog,element);
                        };
                        otherFunctions.push({"name":"click","elemento":cancelButton,"funcion":negativeFunction});
                        cancelButton.addEventListener("click",negativeFunction);
                    }else{
                        var negativeFunction=function(){
                            dialog.close();
                        };
                        otherFunctions.push({"name":"click","elemento":cancelButton,"funcion":negativeFunction});
                        cancelButton.addEventListener("click",negativeFunction);
                    }
                    buttons.appendChild(cancelButton);
                }
                
                if(options.positiveButton){
                    var okButton=document.createElement("paper-button");
                    okButton.setAttribute("style","font-weight: 500;");
                    
                    okButton.raised=(options.positiveButton.raised==true);
                    if(options.positiveButton.style){
                        okButton.setAttribute("style",okButton.getAttribute("style")+options.positiveButton.style);
                    }
                    okButton.innerText=options.positiveButton.text;
                    if(options.positiveButton.action){
                        var positiveFunction=function(){
                            options.positiveButton.action(dialog,element);
                        };
                        otherFunctions.push({"name":"click","elemento":okButton,"funcion":positiveFunction});
                        okButton.addEventListener("click",positiveFunction);
                    }else{
                        var positiveFunction=function(){
                            dialog.close();
                        };
                        otherFunctions.push({"name":"click","elemento":okButton,"funcion":positiveFunction});
                        okButton.addEventListener("click",positiveFunction);
                    }
                    buttons.appendChild(okButton);
                }
                dialog.appendChild(buttons);
            }
            
            var ironMediaQuery=document.createElement("iron-media-query");
            ironMediaQuery.query="(max-width: 640px)";
            var funcion=function(e){
                var small=e.detail.value;
                if(small){
                    dialog.classList.add("small-class");
                }else{
                    dialog.classList.remove("small-class");
                }
            };
            ironMediaQuery.addEventListener("query-matches-changed",funcion);
            dialog.appendChild(ironMediaQuery);
           
            return PolymerUtils.Dialog.show(dialog,funcion,otherFunctions,elementReadyListener,dialogClosedListener);
        },
        
        show: function (dialog,funcion,otherFunctions,elementReadyListener,dialogClosedListener) {
            dialog.addEventListener("iron-overlay-closed", function (e) {
                var parent=document.getElementById("unique-main-app-body-dialog-div");
                if(e.target.tagName.toLowerCase()==("paper-dialog") && parent.contains(dialog)){
                    if(elementReadyListener){
                        dialog.removeEventListener("iron-overlay-opened",elementReadyListener);
                    }
                    if(dialogClosedListener){
                        dialog.removeEventListener("iron-overlay-closed",dialogClosedListener);
                    }
                    if(funcion){
                        dialog.removeEventListener("query-matches-changed",funcion);
                    }
                    if(otherFunctions){
                        for(var i=0;i<otherFunctions.length;i++){
                            var functionObject=otherFunctions[i];
                            functionObject.elemento.removeEventListener(functionObject.name,functionObject.funcion);
                        }
                    }
                    parent.removeChild(dialog);
                }
               
            });
            document.getElementById("unique-main-app-body-dialog-div").appendChild(dialog);
            dialog.open();
            return dialog;
        }
    },//Dialogo
    
    Toast:{
        clearToasts: function(){
            var myNode = document.getElementById("unique-main-app-body-toast-div");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        },
        
        show: function (message, duration, wideLayout, dialog, buttonText, buttonColor) {
            this.newToast(message, duration, wideLayout, dialog, buttonText, buttonColor).open();
        },
      
       
        newToast: function (message, duration) {
            wideLayout = document.body.clientWidth <= 640;
            var t = message;
            if(typeof(message)=="object"){
                t=JSON.stringify(t);
            }
            var d = duration;
            var toast = document.createElement("paper-toast");
            
            toast.innerHTML = t;
    
            if (d != null){
                toast.duration = d;
            }
                
            if (wideLayout) {
                toast.style = "width: 100%;" +
                "min-width: 0;" +
                "border-radius: 0;" +
                "padding-top: 12px;" +
                "margin: 0;";
            }else {
                toast.style = "";
            }
            
            toast.addEventListener("iron-overlay-closed", function () {
                var parent=document.getElementById("unique-main-app-body-toast-div");
                if(parent.contains(toast)){
                    parent.removeChild(toast);
                }
            });
            document.getElementById("unique-main-app-body-toast-div").appendChild(toast);
    
            return toast;
        }
    
    
    }
};