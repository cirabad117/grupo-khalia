class FieldsQueryClass{
    constructor(OMNIPOTENT_KEY){
      

        this.callbacks=[];
        this.querySnapshots={};


        this.updateNegocioKey(OMNIPOTENT_KEY);


        

      }
      updateNegocioKey(OMNIPOTENT_KEY){
        if(OMNIPOTENT_KEY){
          this.mainKey=OMNIPOTENT_KEY;
          this.registerFieldQuery("Negocio","_negocios/"+OMNIPOTENT_KEY,true);
          this.registerFieldQuery("LlaveReal","_keys/"+OMNIPOTENT_KEY,true);
          
          this.registerFieldQuery("Language","stats/language");
          this.registerFieldQuery("GlobalOptionsDocument","global-options/options");
          this.registerFieldQuery("TicketStructureDocument","global-options/ticket-structure");
          this.registerFieldQuery("ComandaStructureDocument","global-options/comanda-structure");
          this.registerFieldQuery("WhenPrintOptions","global-options/when-print-options");
          
          this.registerFieldQuery("Stats","stats/list");
          this.registerFieldQuery("FirebaseLogo","settings/logo");
          
          this.registerFieldQuery("LandingPageData","settings/sitio-web");
          
          this.registerFieldQuery("UberData","_app/uber",true);
          this.registerFieldQuery("AppVersion","_app/version",true);
          this.registerFieldQuery("FirebaseLogoDocs","settings/logo-doc");
          this.registerFieldQuery("DeviceSettings","settings/devices/"+PolymerUtils.getVariable("uniqueId")+"/almacen");
        }

      }
    
    addFieldCallback(name,callback){
        this.callbacks.push({"name":name,"callback":callback});

        if(this.querySnapshots[name] && this.querySnapshots[name].data){
            callback(this.querySnapshots[name].data);
        }
        else{
            callback(null);
        }
        
    }
    _callFieldCallbacks(name){
    //  console.warn("Calling Field callbacks",name);
        for(var i=0;i<this.callbacks.length;i++){
            var calla=this.callbacks[i];
            if(calla && calla.callback && calla.name==name){
                calla.callback(this.querySnapshots[name].data);
            }
        }
    }

    registerFieldQuery(name,doc,upperKey){
        
          if(this.querySnapshots[name] && this.querySnapshots[name].snapshot){
            this.querySnapshots[name].snapshot();
   
        }  
          var context=this;
          
          this.querySnapshots[name]={};
          this.querySnapshots[name].snapshot=DataHelper.queryDocument(this,{
            doc: doc,
            upperKey:upperKey,
            observer:function(obj){
              if(obj){
                context.querySnapshots[name].data=obj;
              }
              else{
                context.querySnapshots[name].data=null;
              }
              context._callFieldCallbacks(name);
      
            }
          });
          this._callFieldCallbacks(name);
    }
}


window.FieldsQuery=new FieldsQueryClass(null);