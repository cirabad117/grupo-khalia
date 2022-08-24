class FieldsQueryClass{
	constructor(OMNIPOTENT_KEY){
		this.callbacks=[];
		this.querySnapshots={};
		this.updateNegocioKey(OMNIPOTENT_KEY);
	}
	updateNegocioKey(OMNIPOTENT_KEY){
		if(OMNIPOTENT_KEY){
			this.mainKey=OMNIPOTENT_KEY;
		}
	}
	
	addFieldCallback(name,callback){
		this.callbacks.push({"name":name,"callback":callback});
		if(this.querySnapshots[name] && this.querySnapshots[name].data){
			callback(this.querySnapshots[name].data);
		}else{
			callback(null);
		}
	}
	
	_callFieldCallbacks(name){
		for(var i=0;i<this.callbacks.length;i++){
			var calla=this.callbacks[i];
			if(calla && calla.callback && calla.name==name){
				calla.callback(this.querySnapshots[name].data);
			}
		}
	}
	
	
}


window.FieldsQuery=new FieldsQueryClass(null);