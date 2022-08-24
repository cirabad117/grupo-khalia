
class NavigationUtilsClass{

    constructor(params){
        this.route= null,
        this._loggedUser= null;
        this._authFired= false;
        this.routeName= null;
        this.page= null;
        this.context=null;
    }
    
    setRoute(context, route, routeName,routeParams,paramsName) {
        this.context = context;
        this.routeName = routeName;
        this.route = route;
        this.routeParams=routeParams;
        this.paramsName=paramsName;
    }
    
    goBack(){
        window.history.back();
    }

    navigate(string,params){
        if (!this.route) {
            console.error("No se encuentra la ruta");
        }
        
        if(string && string.startsWith("/")){
            string=string.substring(1);
        }
        
        var pName=this.context[this.routeName].path;
        if(pName.startsWith("/")){
            pName=pName.substring(1);
        }
        
        this.context.set(this.routeName + ".path", string);
        
        if(params){
            this.context.set(this.paramsName,params);
        }else{
            this.context.set(this.paramsName,{});
        }
         
    }
}

var NavigationUtils=null;
function _initNavigationUtils(context, route, routeName,routeParams,paramsName){
    if(!NavigationUtils){
        NavigationUtils=new NavigationUtilsClass();
        NavigationUtils.setRoute(context,route,routeName,routeParams,paramsName); 
        
    }
}
