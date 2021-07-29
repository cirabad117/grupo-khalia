
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
    insert(context,object,success,error,options){
        var opts={"collection":this.collection,"object":object,
        "success":success,"error":error};
        if(options){
            var llaves=Object.keys(options);
            for(var i=0;i<llaves.length;i++){
                opts[llaves[i]]=options[llaves[i]];
            }
        }
        DataHelper.insert(context,opts);


    }
    update(context,object,success,error,options){
        var opts={"doc":this.collection+"/"+object[DataHelper.standardItemKey],"object":object,
        "success":success,"error":error};
        if(options){
            var llaves=Object.keys(options);
            for(var i=0;i<llaves.length;i++){
                opts[llaves[i]]=options[llaves[i]];
            }
        }
        DataHelper.update(context,opts);


    }
    insertWithAutoIncrement(context,object,success,error,options){
        var opts={"collection":this.collection,"object":object,
        "success":success,"error":error};
        if(options){
            var llaves=Object.keys(options);
            for(var i=0;i<llaves.length;i++){
                opts[llaves[i]]=options[llaves[i]];
            }
        }
        DataHelper.insertWithAutoIncrement(context,opts);
    }
    findKey(key){
        var objeto=null;
        PolymerUtils.iterateArray(this._mainList,function(item){
            if(item[DataHelper.standardItemKey]==key){
                objeto=item;
            }
        });
        return objeto;
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
                }
                else{
               
                    arreglo.context.push(arreglo.arrayName,object);
            
                }
            });
        }
        notifyChange(object,field,value){
             
            if(!object){
                console.error("Can't notify changes of null object");
                return;
            }
            object[field]=value;
            var cantidad=1;
            var index=this._mainList.indexOf(object);
            var beforeObject=this._mainList[index];
            if(object)
            this._mainList.splice(index,cantidad,object);
            else this._mainList.splice(index,cantidad);

            PolymerUtils.iterateArray(this.arrays,function(arreglo){
               
                    var indice=(beforeObject ? (arreglo.array.indexOf(beforeObject)) : index);
                     if(object){
                         if(arreglo.filter ){
                             if(arreglo.filter(object)){
                     
                              arreglo.context.set(arreglo.arrayName+"."+indice+"."+field,null);
                              arreglo.context.set(arreglo.arrayName+"."+indice+"."+field,value);
                     
                             }
                             
                         }
                         else{
                            arreglo.context.set(arreglo.arrayName+"."+indice+"."+field,null);
                            arreglo.context.set(arreglo.arrayName+"."+indice+"."+field,value);
                   
                     
                         }
                         
                     }
                     else  arreglo.context.splice(arreglo.arrayName,indice,cantidad);
             
                 
             });
        }
        notifyChanges(object){
            
            if(!object){
                console.error("Can't notify changes of null object");
                return;
            }
            var cantidad=1;
            var index=this._mainList.indexOf(object);
            var beforeObject=this._mainList[index];
            if(object)
            this._mainList.splice(index,cantidad,object);
            else this._mainList.splice(index,cantidad);

            PolymerUtils.iterateArray(this.arrays,function(arreglo){
              
                    var indice=(beforeObject ? (arreglo.array.indexOf(beforeObject)) : index);
                    console.log("Nuevo indice",indice);
                     if(object){
                         if(arreglo.filter ){
                             if(arreglo.filter(object)){
                             
                                 arreglo.context.splice(arreglo.arrayName,indice,cantidad,object);
                     
                             }
                             
                         }
                         else{
                            arreglo.context.splice(arreglo.arrayName,indice,cantidad,object);
                     
                         }
                         
                     }
                     else  arreglo.context.splice(arreglo.arrayName,indice,cantidad);
             
                 
             });
        }
        
        notifyChangesSubproperties(object){
            if(!object){
                console.error("Can't notify changes of null object");
                return;
            }
         
            var cantidad=1;
            var index=this._mainList.indexOf(object);
            if(object)
            this._mainList.splice(index,cantidad,object);
            else this._mainList.splice(index,cantidad);

            PolymerUtils.iterateArray(this.arrays,function(arreglo){
               
                    
                    for(var i=0;i<arreglo.array.length;i++){

                        var item=arreglo.array[i];
                        if(!item){
                            continue;
                        }
                        if(item[DataHelper.standardItemKey]==object[DataHelper.standardItemKey]){
                            console.log("Notifying docked mouse item!",item);
                            var llaves=Object.keys(item);
                            PolymerUtils.iterateArray(llaves,function(llav){
                                arreglo.context.set(arreglo.arrayName+"."+i+"."+llav,item[llav]);
                                
                            });
                            arreglo.context.notifyPath(arreglo.arrayName);
                            break;
                        }

                    }

                      
             });
        }
        
        splice(arrayName,index,cantidad,object){
          
            if(this.whenRemoved){
                this.whenRemoved(this._mainList[index]);
            }
            
            var beforeObject=this._mainList[index];
            if(object)
            this._mainList.splice(index,cantidad,object);
            else this._mainList.splice(index,cantidad);

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
                            
                        }
                        else{
                            arreglo.context.splice(arreglo.arrayName,(beforeObject ? (arreglo.array.indexOf(beforeObject)) : index),cantidad,object);
                    
                        }
                        
                    }
                    else  arreglo.context.splice(arreglo.arrayName,(beforeObject ? (arreglo.array.indexOf(beforeObject)) : index),cantidad);
            
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
                        //    if(context[arrayName]==array)
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
                var queryOptions={"collection":this.collection,
                "array":this._mainList,
                "arrayName":"_mainList"};

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
               
                    this.snapshotReference=DataHelper.queryCollection(
                        this,
                        queryOptions);
    

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