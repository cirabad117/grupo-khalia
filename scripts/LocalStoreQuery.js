class LocalStoreQueryClass{
    constructor(OMNIPOTENT_KEY){
        this.callbacks=[];
        this.mainKey=OMNIPOTENT_KEY;
        this.querySnapshots={};
        this.localStore=new Storage({
            configName: 'inner-negocio-data',
            defaults: {

            }
        });
    }
    set(field,value){
        this.localStore.set(field,value);
        this._callFieldCallbacks(field);
    }
    get(field,defa){
        var value=this.localStore.get(field);
        if(!defa){
            defa=null;
        }
        if(!value || value.trim()==""){
            return defa;
        }
        return value;
    }
    addFieldCallback(name,callback){
        this.callbacks.push({"name":name,"callback":callback});

        
        callback(this.get(name,null));
        
        
    }
    _callFieldCallbacks(name){
        for(var i=0;i<this.callbacks.length;i++){
            var calla=this.callbacks[i];
            if(calla && calla.callback && calla.name==name){
                calla.callback(this.get(name,null));
            }
        }
    }

  
}