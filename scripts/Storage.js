
class Storage {
  constructor() {
/*    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.configName + '.json');
    
    this.data = parseDataFile(this.path, opts.defaults);
    console.log("pipipipipi",this.path);*/
    
    //this.db=new PouchDB(opts.configName);
    
  }
  
  // This will just return the property on the `data` object
  get(key) {
    
    return localStorage.getItem(key);
    
  }
  
  // ...and this will set it
  set(key, val) {
    localStorage.setItem(key,val);
  }
}