
class QueryBinder{

    constructor(collection,options,specialRef,whenAdded,whenRemoved){
        this.collection=collection;
        this.arrays=[];
        this.whenAdded=whenAdded;
        this.whenRemoved=whenRemoved;
        this.specialRef=specialRef;
        this.snapshotReference=null,
        this._mainList=[];
        this.already=false;
        this.options=options;
        this.setupQuery();

    }
    
    getMainList(){
        return this._mainList;
    }
    
    push(arrayName,object){
        this._mainList.push(object);
        if(this.whenAdded){
            this.whenAdded(object);
        }
        
        PolymerUtils.iterateArray(this.arrays,function(arreglo){
            if(arreglo.filter){
                if(arreglo.filter(object)){
                    arreglo.context.push(arreglo.arrayName,object);
                }
            }else{
                arreglo.context.push(arreglo.arrayName,object);
            }
        });
    }
    
    splice(arrayName,index,cantidad,object){
        if(this.whenRemoved){
            this.whenRemoved(this._mainList[index]);
        }
        
        var beforeObject=this._mainList[index];
        if(object){
            this._mainList.splice(index,cantidad,object);
        }else{
            this._mainList.splice(index,cantidad);
        }
        if(object){
            if(this.whenAdded){
                this.whenAdded(object);
            }
        }
        
        PolymerUtils.iterateArray(this.arrays,function(arreglo){
            if(object){
                if(arreglo.filter ){
                    if(arreglo.filter(object)){
                        arreglo.context.splice(arreglo.arrayName,(beforeObject ? (arreglo.array.indexOf(beforeObject)) : index),cantidad,object);
                    }
                }else{
                    arreglo.context.splice(arreglo.arrayName,(beforeObject ? (arreglo.array.indexOf(beforeObject)) : index),cantidad,object);
                }
            }else{
                arreglo.context.splice(arreglo.arrayName,(beforeObject ? (arreglo.array.indexOf(beforeObject)) : index),cantidad);
            }
        });
    }
    
    unbindArray(context){
        var t=this;
        PolymerUtils.iterateArray(this.arrays,function(arreglo){
            if(arreglo.context==context){
                arreglo.context.splice(arreglo.arrayName,0,arreglo.array.length);
                t.arrays.splice(t.arrays.indexOf(arreglo),1);
            }
        });
    }
    
    bindArray(context,array,arrayName,filter){
        this.setupQuery();
        context.set(arrayName,null);
        var arrr=[];
        array=arrr;
        context.set(arrayName,arrr);
        this.arrays.push({"context":context,"array":arrr,"arrayName":arrayName,"filter":filter});
        context.splice(arrayName,0,array.length);
        PolymerUtils.iterateArray(this._mainList,function(object){
            if(filter){
                if(filter(object)){
                    context.push(arrayName,object);
                }
            }
            else{
                context.push(arrayName,object);
            }
        });
    }
    
    setupQuery(){
        if(!this.already){
            var queryOptions={
                "collection":this.collection,
                "array":this._mainList,
                "arrayName":"_mainList"
            };
            
            if(this.specialRef){
                queryOptions.specialRef=this.specialRef;
            }
            
            var opts=this.options;
            if(opts){
                var llaves=Object.keys(opts);
                for(var i=0;i<llaves.length;i++){
                    queryOptions[llaves[i]]=opts[llaves[i]];
                }
            }
            this._mainList.splice(0,this._mainList.length);
            this.snapshotReference=DataHelper.queryCollection(this,queryOptions);
            this.already=true;
        }
    }
    
    reloadQuery(){
        if(this.snapshotReference){
            this.snapshotReference();
        }
        this.already=false;
        this.setupQuery();
    }
}