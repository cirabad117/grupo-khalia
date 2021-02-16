var HELPER_OMNIPOTENT_KEY = null;
class DataHelperClass {
    constructor(activationKey) {
        HELPER_OMNIPOTENT_KEY = activationKey;
        var context = this;
        firebase.auth().onAuthStateChanged(function(user) {

            if (user) {
                context.setFirebaseUser(user);
                //if ("undefined" != typeof AndroidApp) {}
                
            } else {
                context.setFirebaseUser(null);
                //if ("undefined" != typeof AndroidApp) {}
            }
        });
        this.dataUserCallbacks = [];
        this.firebaseUser = null;
        this.dataUser = null;
        this._lastDataUserQuery = null;
        this.standardItemKey = "id";
        this.setOnce = !1;
        this._paymentAccess=true;
        this.Storage = this.getStorageObject();
        this.auth = this.getAuthObject()
    }
    setStandardKey(key) {
        this.standardItemKey = key
    }
    getStorageObject() {
        var context = this;
        return {
            downloadBlob: function(options) {
                DataHelper.Storage.getDownloadURL({
                    path: options.path,
                    name: options.name,
                    success: function(downloadUrl) {
                        fetch(downloadUrl).then(res=>res.blob())// Gets the response and returns it as a blob
                        .then(blob=>{
                            if (options.success) {
                                options.success(blob, options.name)
                            }
                        }
                        ).catch(function(error) {
                            if (options.error) {
                                options.error(error)
                            }
                        })
                    },
                    error: function(error) {
                        console.log("Error while getting download URL", error)
                    }
                })
            },
            downloadFile: function(options) {
                DataHelper.Storage.getDownloadURL({
                    path: options.path,
                    name: options.name,
                    success: function(downloadUrl) {
                        //   console.log("DownloadUrl",downloadUrl);
                        fetch(downloadUrl).then(res=>res.blob())// Gets the response and returns it as a blob
                        .then(blob=>{
                            saveAs(blob, options.name);
                            if (options.success) {
                                options.success(downloadUrl)
                            }
                        }
                        ).catch(function(error) {
                            if (options.error) {
                                options.error(error)
                            }
                        })
                    },
                    error: function(error) {
                        console.log("Error while getting download URL", error)
                    }
                })
            },
            getDownloadURL: function(options) {
                var fileRef = firebase.storage().ref().child(options.path + "/" + options.name)
                  , errorCallback = options.error
                  , successCallback = options.success;
                fileRef.getDownloadURL().then(function(url) {
                    if (successCallback) {
                        successCallback(url)
                    }
                }).catch(function(error) {
                    if (errorCallback) {
                        errorCallback(error)
                    }
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                    case "storage/object-not-found":
                        console.error("No existe el objeto indicado en " + options.path + "/" + options.name);
                        break;
                    case "storage/unauthorized":
                        console.error("You don't have permission to access this file", error);
                        break;
                    case "storage/canceled":
                        console.error("Upload was cancelled", error);
                        break;
                    case "storage/unknown":
                        console.error("An error ocurred while getting the file url", error);
                        break;
                    default:
                        console.error("Error while fetching the file url", error);
                        break;
                    }
                })
            },
            _convertImageToCanvas: function(image) {
                var canvas = document.createElement("canvas");
                document.body.appendChild(canvas);
                canvas.style = "display: none;";
                canvas.width = image.width;
                canvas.height = image.height;
                canvas.getContext("2d").drawImage(image, 0, 0);
                return canvas
            },
            _canvasAddLeftTransparecy: function(image, left) {
                var canvas = document.createElement("canvas");
                document.body.appendChild(canvas);
                canvas.style = "display: none;";
                canvas.width = image.width + left;
                canvas.height = image.height;
                canvas.getContext("2d").drawImage(image, left, 0);
                return canvas
            },
            _convertCanvasToImage: function(canvas, filename) {
                var dataurl = canvas.toDataURL("image/png");
                console.warn("DATA URL", dataurl);
                var arr = dataurl.split(",")
                  , mime = arr[0].match(/:(.*?);/)[1]
                  , bstr = atob(arr[1])
                  , n = bstr.length
                  , u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new File([u8arr],filename,{
                    type: mime
                })
            },
            _actualFirebaseUpload: function(options, file) {
                var path = options.path
                  , name = options.name
                  , uploadDone = options.success
                  , errorFunction = options.error
                  , onPaused = options.onPaused
                  , onResumed = options.onResumed
                  , progressCallback = options.onProgress
                  , storageRef = firebase.storage().ref()
                  , ref = null;
                if (name) {
                    ref = storageRef.child(path + "/" + name + "." + file.name.split(".").pop());
                    if (1 < name.split(".").length) {
                        var extension = name.split(".").pop();
                        ref = storageRef.child(path + "/" + name.replace("." + extension, "") + "." + extension)
                    }
                } else {
                    ref = storageRef.child(path + "/" + file.name)
                }
                var task = ref.put(file);
                task.on("state_changed", function(snapshot) {
                    var progress = 100 * (snapshot.bytesTransferred / snapshot.totalBytes);
                    if (progressCallback) {
                        progressCallback(progress)
                    }
                    switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        if (onPaused) {
                            onPaused(progress)
                        }
                        // console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        if (onResumed) {
                            onResumed(progress)
                        }
                        //   console.log('Upload is running');
                        break;
                    }
                }, function(error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }
                }, function() {
                    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        if (uploadDone) {
                            uploadDone(downloadURL)
                        }
                    })
                })
            },
            _actualFirebasePhotoUpload: function(options, file, width, height) {
                var path = options.path
                  , name = options.name
                  , uploadDone = options.success
                  , errorFunction = options.error
                  , context = this
                  , onPaused = options.onPaused
                  , onResumed = options.onResumed
                  , progressCallback = options.onProgress
                  , leftMargin = options.leftMargin
                  , storageRef = firebase.storage().ref()
                  , isImage = file.type.startsWith("image/");
                if (!isImage) {
                    console.error("The selected file is not an image file, it can't be scaled", file);
                    //PolymerUtils.Toast.show("El archivo seleccionado no es una imagen",9000);
                    return
                }
                var reader = new FileReader;
                reader.onloadend = function() {
                    var img = document.createElement("img");
                    img.style = "display: none;";
                    document.body.appendChild(img);
                    img.onload = function() {
                        var canvas = null
                          , finalImg = file;
                        if (!file.name.endsWith(".png")) {
                            console.warn("NOT PNG");
                            canvas = context._convertImageToCanvas(img);
                            finalImg = context._convertCanvasToImage(canvas, file.name)
                        } else {
                            console.warn("YES PNG");
                            //                    console.error("YES PNGGGGG");
                        }
                        if(options.minimum){
                            var minWidth=options.minimum.width;
                            var minHeight=options.minimum.height;

                            if(img.width>img.height){
                                height=minHeight;
                                width=minHeight*(img.width/img.height);
                            }
                            else if(img.width<img.height){
                                
                                width=minWidth;
                                height=minWidth*(img.height/img.width);
                            }

                        
                        }

                        //console.warn("Final IMG",finalImg);
                        ImageTools.resize(finalImg, {
                            width: width,
                            // maximum width
                            height: height // maximum height
                        }, function(blob, didItResize) {
                            console.log("Did it resize?", didItResize);
                            if (leftMargin && !isNaN(leftMargin)) {
                                var objectURL = URL.createObjectURL(blob)
                                  , myImage = document.createElement("img");
                                myImage.onload = function() {
                                    var realCanvas = DataHelper.Storage._canvasAddLeftTransparecy(myImage, leftMargin);
                                    realCanvas.toBlob(function(blobFinal) {
                                        var ref = null;
                                        if (name) {
                                            ref = storageRef.child(path + "/" + name + "." + file.name.split(".").pop());
                                            if (1 < name.split(".").length) {
                                                var extension = name.split(".").pop();
                                                ref = storageRef.child(path + "/" + name.replace("." + extension, "") + "." + extension)
                                            }
                                        } else {
                                            ref = storageRef.child(path + "/" + file.name)
                                        }
                                        var task = ref.put(blobFinal);
                                        task.on("state_changed", function(snapshot) {
                                            var progress = 100 * (snapshot.bytesTransferred / snapshot.totalBytes);
                                            if (progressCallback) {
                                                progressCallback(progress)
                                            }
                                            switch (snapshot.state) {
                                            case firebase.storage.TaskState.PAUSED:
                                                if (onPaused) {
                                                    onPaused(progress)
                                                }
                                                // console.log('Upload is paused');
                                                break;
                                            case firebase.storage.TaskState.RUNNING:
                                                if (onResumed) {
                                                    onResumed(progress)
                                                }
                                                //   console.log('Upload is running');
                                                break;
                                            }
                                        }, function(error) {
                                            if (errorFunction) {
                                                errorFunction(error)
                                            }
                                        }, function() {
                                            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                                if (uploadDone) {
                                                    uploadDone(downloadURL)
                                                }
                                            })
                                        })
                                    });
                                    //                              var realImage=DataHelper.Storage._convertCanvasToImage(realCanvas,"logo_edited");
                                    //                             context.downloadLogo(realImage);
                                }
                                ;
                                myImage.src = objectURL
                            } else {
                                var ref = null;
                                if (name) {
                                    ref = storageRef.child(path + "/" + name + "." + file.name.split(".").pop());
                                    if (1 < name.split(".").length) {
                                        var extension = name.split(".").pop();
                                        ref = storageRef.child(path + "/" + name.replace("." + extension, "") + "." + extension)
                                    }
                                } else {
                                    ref = storageRef.child(path + "/" + file.name)
                                }
                                var task = ref.put(blob);
                                task.on("state_changed", function(snapshot) {
                                    var progress = 100 * (snapshot.bytesTransferred / snapshot.totalBytes);
                                    if (progressCallback) {
                                        progressCallback(progress)
                                    }
                                    switch (snapshot.state) {
                                    case firebase.storage.TaskState.PAUSED:
                                        if (onPaused) {
                                            onPaused(progress)
                                        }
                                        // console.log('Upload is paused');
                                        break;
                                    case firebase.storage.TaskState.RUNNING:
                                        if (onResumed) {
                                            onResumed(progress)
                                        }
                                        //   console.log('Upload is running');
                                        break;
                                    }
                                }, function(error) {
                                    if (errorFunction) {
                                        errorFunction(error)
                                    }
                                }, function() {
                                    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                        if (uploadDone) {
                                            uploadDone(downloadURL)
                                        }
                                    })
                                })
                            }
                        })
                    }
                    ;
                    img.src = reader.result
                }
                ;
                reader.readAsDataURL(file)
            },
            uploadFile: function(options) {
                var type = options.fileTypes;
                PolymerUtils.showFileInput(type, function(file) {
                    DataHelper.Storage._actualFirebaseUpload(options, file)
                })
            },
            uploadImage: function(options) {
                var type = options.fileTypes;
                PolymerUtils.showFileInput(type, function(file) {
                    DataHelper.Storage._actualFirebasePhotoUpload(options, file, options.width, options.height)
                })
            }
        }
    }
    setFirebaseUser(user) {
        var old = this.firebaseUser;
        if (this._lastDataUserQuery) {
            this._lastDataUserQuery()
        }
        this.firebaseUser = user;
        //  console.warn("firebase CCC",user);
        if (user && !old || user && old && user.uid != old.uid) {
            var context = this;
            this._lastDataUserQuery = sharedFirebase.collection("usuarios").doc(user.uid).onSnapshot(function(doc) {
                if (doc.data()) {
                    var data = doc.data();
                    data.emailVerified = !0 == user.emailVerified;
                    console.warn("USER DATA",data,old);
                    
                    // if (data.profile && data.profile.id) {
                    //     if (context._lastProfileQuery) {
                    //         context._lastProfileQuery()
                    //     }
                    //     console.error("PROFILE USER",data.profile);
                    //     for(var p=0;p<window._localProfilesList.length;p++){
                    //         var profileItem=window._localProfilesList[p];
                    //         if(profileItem.id==data.profile.id){
                    //             data.accessList = profileItem.accessList;
                    //             console.log("%c LOCAL LOGGED USER ACCESS LIST " + data.displayName, "background: #222; color: #bada55", data.accessList);
                                
                    //             context.setDataUser(null);
                    //             context.setDataUser(data);
                    //             return;
                    //         }

                    //     }
                    //     context._lastProfileQuery = sharedFirebase.collection("user-profiles").doc(data.profile.id).onSnapshot(function(profileDoc) {
                    //         if (profileDoc.data()) {
                    //             data.accessList = profileDoc.data().accessList;
                    //             console.log("%c LOGGED USER ACCESS LIST " + data.displayName, "background: #222; color: #bada55", data.accessList);
                                
                    //             context.setDataUser(null)
                    //             context.setDataUser(data)

                    //         } else {
                    //             data.accessList = {};
                    //             context.setDataUser(data);
                    //             //    console.log("No access list");
                    //         }
                    //     })
                    // } else {
                    //     data.accessList = {};
                    //     context.setDataUser(data)
                    // }
                    context.setDataUser(data);
                } else {
                    context.setDataUser(context._generateDataUser())
                }
            })
        } else {
            this.setDataUser(null)
        }
    }
    //Función que retorna el objeto firebaseUser tal cual.
    getFirebaseUser() {
        return this.firebaseUser
    }
    //Función que retorna un objeto conteniendo el uid, displayName e email deol objeto firebaseUser:
    _generateDataUser() {
        if (!this.firebaseUser) {
            return null
        }
        var user = {};
        if (this.firebaseUser.uid) {
            user.uid = this.firebaseUser.uid
        }
        user.emailVerified = !0 == this.firebaseUser.emailVerified;
        if (this.firebaseUser.displayName) {
            user.displayName = this.firebaseUser.displayName
        }
        if (this.firebaseUser.email) {
            user.email = this.firebaseUser.email
        }
        return user
    }
    
    loadFirebaseController(dataUser) {
        var nowRegister=new Date();
        nowRegister.setHours(0);
        nowRegister.setMinutes(0);
        nowRegister.setSeconds(0);
        nowRegister.setMilliseconds(0);
        // DataController.registerQueryBinder({
        //     name:"DevicePrinters",
        //     collection:"device-printers/"+PolymerUtils.getVariable("uniqueId")+"/list"
        // });


        if (dataUser) {



            // console.log("STATIC DOM ACCESS PATH",StaticDomAccess.hasPath("servicios-entrega"))
// if(StaticDomAccess.hasPath("servicios-entrega")){
//     DataController.registerQueryBinder({
//         name: "NotificationsShow",
//         collection: "notifications-show",
//         options: {
//         //    autoQuery: false,
//             specialRef: sharedFirebase.collection("notifications-show").orderBy("_timestamp","desc").where("_timestamp",">=",nowRegister)
//         }
//     });
// }
            /*  if(dataUser && dataUser.accessList && dataUser.accessList["administrador"]){
             console.warn("I'M ADMINnNNNNNNNNNNNNNNNNNNNNNNN!",dataUser);
             DataController.registerQueryBinder({name:"Participantes",collection: "participantes",includeDeleted:true,
                options:{includeDeleted:true,specialRef:sharedFirebase.collection("participantes").orderBy("displayName")}});
            
            }
            else{
                console.warn("I'M NOOOOOOOOOOOT!",dataUser);
             
                DataController.registerQueryBinder({name:"Participantes",collection: "participantes",
                options:{specialRef:sharedFirebase.collection("participantes").where("encargado.uid","==",dataUser.uid).orderBy("displayName")}});

            }*/
            /*            if(StaticDomAccess.hasPath("administrador")){
                DataController.registerQueryBinder({name:"Grupos",collection: "grupos",options:{specialRef:sharedFirebase.collection("grupos").orderBy("name")}});
                DataController.registerQueryBinder({name:"Peticiones",collection: "peticiones",options:{specialRef:sharedFirebase.collection("peticiones").orderBy("_timestamp")}});
                DataController.registerQueryBinder({name:"Participantes",collection: "participantes",
                options:{includeDeleted:true,specialRef:sharedFirebase.collection("participantes").orderBy("negocio")}});
            
            }
            else{
                DataController.registerQueryBinder({name:"Grupos",collection: "grupos",options:{specialRef:sharedFirebase.collection("grupos").where("encargado.uid","==",dataUser.uid).orderBy("name")}});
                DataController.registerQueryBinder({name:"Peticiones",collection: "peticiones",options:{specialRef:sharedFirebase.collection("peticiones").where("_user.uid","==",dataUser.uid).orderBy("_timestamp")}});
                DataController.registerQueryBinder({name:"Participantes",collection: "participantes",
                options:{specialRef:sharedFirebase.collection("participantes").where("encargado.uid","==",dataUser.uid).orderBy("negocio")}});

            }*/
            
/*            DataController.registerQueryBinder({
                name: "Bancos",
                collection: "bancos",
                options: {
                    specialRef: sharedFirebase.collection("bancos").orderBy("name")
                }
            });*/
       
            //     DataController.registerQueryBinder({name:"Envios",collection:"envios"});
            /*DataController.Gastos.getQuery();*/
           // DataController.Categories.getQuery();
            //DataController.Cuentas.getQuery();
        } else {/*if(DataController.Grupos){
                DataController.Grupos.getQuery().killQuery();
            }*/
        }
    }
    _addPaymentAccessCallback(callback){
        if(!this._paymentAccessCallbacks){
            this._paymentAccessCallbacks=[];
        }
        if(callback!=null){
            callback(this._paymentAccess);
            this._paymentAccessCallbacks.push(callback);

        }
    }
    _setPaymentAccess(bolValue){
        var beforeValue=this._paymentAccess;
        this._paymentAccess=bolValue;

        console.error("NEW PAYMENT ACCESS",bolValue);
        if(bolValue!=beforeValue){
            if(this._paymentAccessCallbacks){
                for(var i=0;i<this._paymentAccessCallbacks.length;i++){
                    var callback=this._paymentAccessCallbacks[i];
                    if(callback!=null){
                        callback(bolValue,beforeValue);
                    }
                }
            }
     
        }
        
    }

    setDataUser(dataUser) {



        
        var old = this.oldUser ? PolymerUtils.cloneObject(this.oldUser) : null;
        this.dataUser = dataUser;
        this.oldUser = PolymerUtils.cloneObject(dataUser);
        this.setOnce = !0;
        PolymerUtils.iterateArray(this.dataUserCallbacks, function(callback) {
            callback(dataUser)
        });
        //       console.log("Data user",dataUser,old);
        /*if (dataUser && !old || dataUser && old && (dataUser.uid != old.uid || dataUser.profile && old.profile && dataUser.profile._key != old.profile._key || !PolymerUtils.objectEquals(dataUser.accessList, old.accessList))) {
            // console.warn("Reloading data");
            DataHelper.loadFirebaseController(dataUser)
        }*/

          if ((dataUser && !old) || ((dataUser && old) && ((dataUser.uid != old.uid) || dataUser.profile && old.profile && dataUser.profile._key != old.profile._key || !PolymerUtils.objectEquals(dataUser.accessList, old.accessList)))) {
            // console.warn("Reloading data");
            DataHelper.loadFirebaseController(dataUser)
        } 
    }
    getDataUser() {
        return this.dataUser
    }
    getActualUser() {
        return this.getUserRef()
    }
    getUserRef() {
        var dataUser = this.getDataUser();
        if (!dataUser) {
            return null
        }
        var user = {};
        if (dataUser.uid) {
            user.uid = dataUser.uid
        }
        if (dataUser.displayName) {
            user.displayName = dataUser.displayName
        }
        user.emailVerified = !0 == dataUser.emailVerified;
        if (dataUser.email) {
            user.email = dataUser.email
        }
        if (dataUser.fingerprintSaved) {
            user.fingerprintSaved = dataUser.fingerprintSaved
        }
        if (user.uid) {
            return user
        }
        return null
    }
    addDataUserCallback(callback) {
        if (callback) {
            var context = this;
            this.dataUserCallbacks.push(callback);
            if ("undefined" != typeof context.getDataUser() && context.setOnce)
                callback(context.getDataUser())
        }
    }
    getAuthObject() {
        return {
            saveDataUser: function(firebaseUser, extraData) {
                var user = {
                    displayName: firebaseUser.displayName,
                    photoUrl: firebaseUser.photoURL,
                    email: firebaseUser.email,
                    uid: firebaseUser.uid
                };

                if (firebaseUser.phoneNumber) {
                    user.phoneNumber = firebaseUser.phoneNumber
                }
                user = PolymerUtils.fixDataForFirebase(user, !0);
                var userRef = sharedFirebase.collection("usuarios").doc(firebaseUser.uid);
                userRef.set(user, {
                    merge: !0
                }).then(function() {
                    sharedFirebase.collection("usuarios").doc(firebaseUser.uid).get().then(function(doc) {
                        var alreadySaved = doc.data();
                        // if(alreadySaved && (!alreadySaved.clientToken || alreadySaved.clientToken=="undefined")){
                        //     PolymerUtils.registerClienteSrPago({
                        //         name: firebaseUser.displayName,
                        //         email: firebaseUser.email
                        //     }, function(client) {
                        //         console.warn("CLIENT DATA SRPAGO", client);
                        //         if (client && client.result && client.success) {
                        //             /*sharedFirebase.collection("users").doc(firebaseUser.uid).update({clientToken:client.result.id}).then(function(){
                        //                 console.log("Client token SR PAGO updated successfully", client.result.id)
                                   
                        //             });*/
                        //             userRef.update({
                        //                 clientToken: client.result.id
                        //             }).then(function() {
                        //                 console.log("Client token SR PAGO updated successfully", client.result.id)
                        //             });
                        //         }
                        //     }, function(err) {
                        //         console.error("Error guardando clientToken SRPAGO...", err)
                        //     })
                        // }
                        if (!alreadySaved.profile) {
                            var prof = null;
                            
                            var updateBlock = {
                                profile: prof
                            };
                            if(extraData){
                                var keysExtra=Object.keys(extraData);
                                for(var i=0;i<keysExtra.length;i++){
                                    updateBlock[keysExtra[i]]=extraData[keysExtra[i]];
                                }
                            }


                            if (!updateBlock.profile) {
                                updateBlock.profile = {
                                    id: "cliente-web",
                                    name: "cliente-web"
                                }
                            }
                            /*
                        if(tipoUsuario=="")
                        if(isProveedor){
                            prof={"id":"1","name":"Proveedor"};
                        }
                        else prof={"id":"2","name":"Usuario"};*/
                            userRef.update(updateBlock).then(function() {
                                console.log("Profile updated successfully", prof)
                            })
                        }
                    });
                    //  console.log("User successfully saved!");
                }).catch(function(error) {
                    console.error("Error writing user: ", error)
                })
            },
            _willSignout: !1,
            delayedSignOutCallbacks: [],
            addDelayedSignOutCallback: function(callback) {
                if (callback) {
                    this.delayedSignOutCallbacks.push(callback)
                }
            },
            _signalSignOut: function(willOut) {
                this._willSignout = willOut;
                PolymerUtils.iterateArray(this.delayedSignOutCallbacks, function(callback, index) {
                    if (callback) {
                        callback(willOut)
                    }
                })
            },
            delayedSignOut: function(ms) {
                this._signalSignOut(!0);
                var context = this;
                setTimeout(function() {
                    firebase.auth().signOut();
                    context._signalSignOut(!1)
                }, ms)
            },
            _errorData: {
                "auth/email-already-exists": {
                    code: "auth/email-already-exists",
                    source: "email",
                    toastMessage: "El email ingresado ya est\xE1 en uso por una cuenta existente",
                    toastDuration: 9e3,
                    shortMessage: "Email ya registrado"
                },
                "auth/account-exists-with-different-credential": {
                    code: "auth/account-exists-with-different-credential",
                    source: "email",
                    toastMessage: "Ya existe el email ingresado con otro tipo de login (Email, Facebook, Google, etc.)",
                    toastDuration: 9e3,
                    shortMessage: "Email ya registrado con otra cuenta"
                },
                "auth/user-not-found": {
                    code: "auth/user-not-found",
                    source: "email",
                    toastMessage: "No existe ning\xFAn usuario con el email ingresado",
                    toastDuration: 9e3,
                    shortMessage: "El usuario no existe"
                },
                "auth/wrong-password": {
                    code: "auth/wrong-password",
                    source: "password",
                    toastMessage: "La contrase\xF1a ingresada es incorrecta",
                    toastDuration: 9e3,
                    shortMessage: "Contrase\xF1a incorrecta"
                },
                "auth/invalid-email": {
                    code: "auth/invalid-email",
                    source: "email",
                    toastMessage: "El usuario ingresado no tiene un formato v\xE1lido",
                    toastDuration: 9e3,
                    shortMessage: "Email inv\xE1lido"
                },
                "auth/email-already-in-use": {
                    code: "auth/email-already-in-use",
                    source: "email",
                    toastMessage: "El email ya est\xE1 en uso por otra cuenta",
                    toastDuration: 9e3,
                    shortMessage: "Email ua usado"
                },
                "auth/too-many-requests": {
                    code: "auth/too-many-requests",
                    source: null,
                    toastMessage: "Has intentado iniciar sesi\xF3n muchas veces. Reint\xE9ntalo m\xE1s tarde",
                    toastDuration: 9e3
                }
            },
            showErrorToast: function(error) {
                if (error.errorInfo)
                    error = error.errorInfo;
                if (error) {
                    if (this._errorData[error.code]) {
                        var errorDetail = this._errorData[error.code]
                          , tostada = CorntechLanguage.login[errorDetail.code] ? CorntechLanguage.login[errorDetail.code].toast : errorDetail.code;
                        PolymerUtils.Toast.show(tostada, errorDetail.toastDuration);
                        if (errorDetail.source) {
                            var inputMessage = CorntechLanguage.login[errorDetail.code] ? CorntechLanguage.login[errorDetail.code].input : errorDetail.code;
                            return {
                                source: errorDetail.source,
                                shortMessage: inputMessage
                            }
                        }//                    return {"source":errorDetail.source,"shortMessage":errorDetail.shortMessage};
                        else
                            return null
                    } else {
                        PolymerUtils.Toast.show("Error sin capturar: " + error.code + ". Detalle: " + error.message, 15e3)
                    }
                    return null
                }
            }
        }
    }
    /*Inserta un objeto a Firebase, para ser guardado con un ID autogenerado, o a determinado
ID, en caso de ser especificado

    t: contexto del elemento de Polymer desde el que se llama la función

    e: objeto que debe contener los siguientes campos

 * - collection: la colección de Cloud Firestore a la que se agregará el objeto.
 * - includeTimestamp: booleano para definir si se incluirá la estampa de tiempo o no.
 * - includeUser: booleano para definir si se incluirá el usuario actualmente loggeado.
 * - success: función callback llamada en el caso de que la inserción se complete con éxito
 * - error: función callback llamada en el caso de que la inserción falle.
 * - object: el objeto que se agregará a la colección
 * - id: el id del documento en el que se guardará el objeto. Si no se incluye, se llama a la función
 *      'add' de firestore, que le dará un ID autogenerado
 */
    updateMode(t, e, merge) {
        if ("online" == SetupData.mode) {
            this.update(t, e, merge)
        } else {
            this.updateServer(t, e, merge)
        }
    }
    update(t, e, merge) {
        var documento = e.doc
          , includeTimestamp = !0 == e.includeTimestamp
          , includeUser = !0 == e.includeUser
          , done = e.success
          , fail = e.error
          , insert = e.object;
        if (insert) {
            for (var llaves = Object.keys(insert), i = 0, ll; i < llaves.length; i++) {
                ll = llaves[i];
                if (ll.startsWith("___")) {
                    delete insert[ll]
                }
            }
        }
        if (includeTimestamp) {
            insert._timestamp = this.getFirestoreTimestamp()
        }
        if (includeUser) {
            insert._user = this.getUserRef()
        }
        var db = sharedFirebase;
        if (documento) {
            var arrrr = documento.split("/")
              , arrrrFinal = arrrr[arrrr.length - 1];
            arrrr.splice(arrrr.length - 1, 1);
            if (!1 == merge) {
                db.collection(arrrr.join("/")).doc(arrrrFinal).update(Object.assign({}, insert)).then(function() {
                    if (done)
                        done()
                }).catch(function(error) {
                    if (fail)
                        fail(error)
                })
            } else {
                db.collection(arrrr.join("/")).doc(arrrrFinal).set(Object.assign({}, insert), {
                    merge: !0
                }).then(function() {
                    if (done)
                        done()
                }).catch(function(error) {
                    if (fail)
                        fail(error)
                })
            }
        }
    }
    updateServer(t, e, merge) {
        var documento = e.doc
          , includeTimestamp = !0 == e.includeTimestamp
          , includeUser = !0 == e.includeUser
          , done = e.success
          , fail = e.error
          , insert = e.object;
        if (insert) {
            for (var llaves = Object.keys(insert), i = 0, ll; i < llaves.length; i++) {
                ll = llaves[i];
                if (ll.startsWith("___")) {
                    delete insert[ll]
                }
            }
        }
        if (includeTimestamp) {
            insert._timestamp = this.getFirestoreTimestamp()
        }
        if (includeUser) {
            insert._user = this.getUserRef()
        }
        var db = sharedFirebase;
        if (documento) {
            var arrrr = documento.split("/")
              , arrrrFinal = arrrr[arrrr.length - 1];
            arrrr.splice(arrrr.length - 1, 1);
            if (!1 == merge) {
                try {
                    db.collection(arrrr.join("/")).doc(arrrrFinal).update(Object.assign({}, insert));
                    if (done)
                        done()
                } catch (error) {
                    if (fail)
                        fail(error)
                }
            } else {
                try {
                    db.collection(arrrr.join("/")).doc(arrrrFinal).set(Object.assign({}, insert), {
                        merge: !0
                    });
                    if (done)
                        done()
                } catch (error) {
                    if (fail)
                        fail(error)
                }
            }
        }
    }
    insertMode(t, e) {
        if ("online" == SetupData.mode) {
            this.insert(t, e)
        } else {
            this.insertServer(t, e)
        }
    }
    insertServer(t, e) {
        var collection = e.collection
          , includeTimestamp = !0 == e.includeTimestamp
          , includeUser = !0 == e.includeUser
          , done = e.success
          , fail = e.error
          , insert = e.object
          , objectId = e.id;
        if (insert) {
            for (var llaves = Object.keys(insert), i = 0, ll; i < llaves.length; i++) {
                ll = llaves[i];
                if (ll.startsWith("___")) {
                    delete insert[ll]
                }
            }
        }
        if (includeTimestamp) {
            insert._timestamp = this.getFirestoreTimestamp()
        }
        if (includeUser) {
            insert._user = this.getUserRef()
        }
        var db = sharedFirebase
          , insertedId = objectId;
        if (objectId) {
            try {
                db.collection(collection).doc(insertedId).set(Object.assign({}, insert));
                if (done)
                    done(objectId)
            } catch (error) {
                if (fail)
                    fail(error)
            }
        } else {
            try {
                var newInsertRef = db.collection(collection).doc()
                  , newInsertId = newInsertRef.id;
                insertedId = newInsertId;
                db.collection(collection).doc(newInsertId).set(Object.assign({}, insert));
                if (done)
                    done(newInsertId)
            } catch (error) {
                if (fail)
                    fail(error)
            }
        }
        return insertedId
    }
    insert(t, e) {
        var collection = e.collection
          , includeTimestamp = !0 == e.includeTimestamp
          , includeUser = !0 == e.includeUser
          , done = e.success
          , fail = e.error
          , insert = e.object
          , objectId = e.id;
        if (insert) {
            for (var llaves = Object.keys(insert), i = 0, ll; i < llaves.length; i++) {
                ll = llaves[i];
                if (ll.startsWith("___")) {
                    delete insert[ll]
                }
            }
        }
        if (includeTimestamp) {
            insert._timestamp = this.getFirestoreTimestamp()
        }
        if (includeUser) {
            insert._user = this.getUserRef()
        }
        var db = sharedFirebase;
        if (objectId) {
            db.collection(collection).doc(objectId).set(Object.assign({}, insert)).then(function() {
                if (done)
                    done(objectId)
            }).catch(function(error) {
                if (fail)
                    fail(error)
            })
        } else {
            db.collection(collection).add(Object.assign({}, insert)).then(function(ref) {
                if (done)
                    done(ref.id)
            }).catch(function(error) {
                if (fail)
                    fail(error)
            })
        }
    }
    insertManyWithAutoIncrement(t, many, e) {
        console.log("Inserting many " + many + " with Auto Increment");
        var collection = e.collection
          , done = e.success
          , fail = e.error
          , insert = e.object
          , counterModifier = e.counterModifier
          , autoIncrementOnlyFields = !0 == e.onlyFields
          , includeTimestamp = e.includeTimestamp
          , includeUser = e.includeUser;
        if (includeTimestamp) {
            insert._timestamp = this.getFirestoreTimestamp()
        }
        if (includeUser) {
            insert._user = this.getUserRef()
        }
        var db = sharedFirebase
          , start = 1
          , counterRef = sharedFirebase.collection("counters").doc(collection);
        if (counterModifier) {
            counterRef = sharedFirebase.collection("counters").doc(collection + "-" + counterModifier)
        }
        return firebase.firestore().runTransaction(function(transaction) {
            return transaction.get(counterRef).then(function(counterDoc) {
                if (!counterDoc.exists) {
                    transaction.set(counterRef, {
                        count: many
                    });
                    start = 1;
                    //insert[DataHelper.standardItemKey]="1";
                } else {
                    var newPopulation = counterDoc.data().count + many;
                    transaction.update(counterRef, {
                        count: newPopulation
                    });
                    start = newPopulation - many + 1;
                    // insert[DataHelper.standardItemKey]=""+newPopulation;
                }
                return start
            })
        }).then(function(inicio) {
            console.log("Success updating population! Start:", inicio);
            // var key=insert[DataHelper.standardItemKey];
            //var auxInsert=insert;
            //  delete insert[DataHelper.standardItemKey];
            for (var i = 0, indice; i < many; i++) {
                indice = i + inicio;
                console.log("Indice", indice);
                for (var insertClone = PolymerUtils.cloneObject(insert), llaves = Object.keys(insertClone), j = 0, hijo; j < llaves.length; j++) {
                    hijo = insertClone[llaves[j]];
                    if ("string" == typeof hijo) {
                        if (-1 != hijo.indexOf("::" + DataHelper.standardItemKey + "::")) {
                            if (hijo == "::" + DataHelper.standardItemKey + "::") {
                                insertClone[llaves[j]] = indice
                            } else {
                                hijo = hijo.replace("::" + DataHelper.standardItemKey + "::", indice + "");
                                //  console.log("Hijo",hijo);
                                insertClone[llaves[j]] = hijo
                            }
                        }
                    }
                }
                if (!autoIncrementOnlyFields) {
                    db.collection(collection).doc(indice + "").set(Object.assign({}, insertClone)).then(function() {
                        if (done)
                            done(indice + "")
                    }).catch(function(error) {
                        console.error("Error", error);
                        if (fail)
                            fail(error)
                    })
                } else {
                    db.collection(collection).add(Object.assign({}, insertClone)).then(function(ref) {
                        if (done)
                            done(ref.id)
                    }).catch(function(error) {
                        console.error("Error", error);
                        if (fail)
                            fail(error)
                    })
                }
            }
            //La transacción ocurrió exitosamente.
        }).catch(function(error) {
            console.error("Error", error);
            if (fail)
                fail(error)
        })
    }
    insertManyWithModeAutoIncrement(t, many, e) {
        if ("online" == SetupData.mode) {
            this.insertManyWithAutoIncrement(t, many, e)
        } else {
            this.insertManyWithServerAutoIncrement(t, many, e)
        }
    }
    insertManyWithServerAutoIncrement(t, many, e) {
        for (var i = 0; i < many; i++) {
            DataHelper.insertWithServerAutoIncrement(t, e)
        }
    }
    /*Inserta un objeto a Firebase, usando un valor autoincrementado como ID 
mediante el uso de transacciones. Recibe dos parámetros:

    t: contexto del elemento de Polymer desde el que se llama la función

    e: objeto que debe contener los siguientes campos

 * - collection: la colección de Cloud Firestore a la que se agregará el objeto.
 * - includeTimestamp: booleano para definir si se incluirá la estampa de tiempo o no.
 * - includeUser: booleano para definir si se incluirá el usuario actualmente loggeado.
 * - success: función callback llamada en el caso de que la inserción se complete con éxito
 * - error: función callback llamada en el caso de que la inserción falle.
 * - object: el objeto que se agregará a la colección
 * 
 */
    insertWithModeAutoIncrement(t, e) {
        if ("online" == SetupData.mode) {
            this.insertWithAutoIncrement(t, e)
        } else {
            this.insertWithServerAutoIncrement(t, e)
        }
    }
    insertWithServerAutoIncrement(t, e) {
        var collection = e.collection
          , done = e.success
          , fail = e.error
          , insert = e.object
          , counterModifier = e.counterModifier
          , includeTimestamp = e.includeTimestamp
          , includeUser = e.includeUser;
        if (insert) {
            for (var llaves = Object.keys(insert), i = 0, ll; i < llaves.length; i++) {
                ll = llaves[i];
                if (ll.startsWith("___")) {
                    delete insert[ll]
                }
            }
        }
        if (includeTimestamp) {
            insert._timestamp = this.getFirestoreTimestamp()
        }
        if (includeUser) {
            insert._user = this.getUserRef()
        }
        var db = sharedFirebase
          , counterRef = sharedFirebase.collection("counters").doc(collection);
        if (counterModifier) {
            counterRef = sharedFirebase.collection("counters").doc(collection + "-" + counterModifier)
        }
        //MODIFICADO PARA PROBAR LOS CAMBIOS OFFLINE.
        insert._needsAutoIncrement = !0;
        try {
            var newInsertRef = db.collection(collection).doc()
              , newInsertId = newInsertRef.id;
            if (counterModifier) {
                insert._counterModifier = counterModifier
            }
            //La transacción ocurrió exitosamente.
            console.warn("New insert id", newInsertRef, newInsertId);
            newInsertRef.set(Object.assign({}, insert));
            /*.then(function(scc){
           
        if(done)
        done(scc.id);
        
    }).catch(function(error) {
        
        if(fail)                            
        fail(error);
    });*/
            if (done) {
                done(newInsertId)
            }
        } catch (err) {
            if (fail) {
                fail(err)
            }
        }
        return newInsertId
    }
    insertWithAutoIncrement(t, e) {
        var collection = e.collection
          , done = e.success
          , fail = e.error
          , insert = e.object
          , formatterIdFunction=e.formatterIdFunction
          , counterModifier = e.counterModifier
          , includeTimestamp = e.includeTimestamp
          , includeUser = e.includeUser;
        if (insert) {
            for (var llaves = Object.keys(insert), i = 0, ll; i < llaves.length; i++) {
                ll = llaves[i];
                if (ll.startsWith("___")) {
                    delete insert[ll]
                }
            }
        }
        if (includeTimestamp) {
            insert._timestamp = this.getFirestoreTimestamp()
        }
        if (includeUser) {
            insert._user = this.getUserRef()
        }
        var db = sharedFirebase
          , counterRef = sharedFirebase.collection("counters").doc(collection);
        if (counterModifier) {
            counterRef = sharedFirebase.collection("counters").doc(collection + "-" + counterModifier)
        }
        return firebase.firestore().runTransaction(function(transaction) {
            return transaction.get(counterRef).then(function(counterDoc) {
                if (!counterDoc.exists) {
                    transaction.set(counterRef, {
                        count: 1
                    });
                    
                    if(formatterIdFunction){
                        insert[DataHelper.standardItemKey] = t[formatterIdFunction]("1");
              
                    }
                    else{
                        if (counterModifier) {
                        
                            insert[DataHelper.standardItemKey] = "1-" + counterModifier
                        } else {
                            insert[DataHelper.standardItemKey] = "1"
                        }
                    }

                } else {
                    var newPopulation = counterDoc.data().count + 1;
                    transaction.update(counterRef, {
                        count: newPopulation
                    });
                    if(formatterIdFunction){
                        insert[DataHelper.standardItemKey] = t[formatterIdFunction](newPopulation+"");
              
                    }
                    else{
                        if (counterModifier) {
                            insert[DataHelper.standardItemKey] = "" + newPopulation + "-" + counterModifier
                        } else {
                            insert[DataHelper.standardItemKey] = "" + newPopulation
                        }
                    }
                    
                }
            })
        }).then(function() {
            if (insert[DataHelper.standardItemKey]) {
                var key = insert[DataHelper.standardItemKey];
                //var auxInsert=insert;
                delete insert[DataHelper.standardItemKey];
                //La transacción ocurrió exitosamente.
                db.collection(collection).doc(key).set(Object.assign({}, insert)).then(function() {
                    if (done)
                        done(key)
                }).catch(function(error) {
                    if (fail)
                        fail(error)
                })
            } else {}
        }).catch(function(error) {
            if (fail)
                fail(error)
        })
    }
    queryExactCollection(t, e) {
        var arr = e.array
          , arrName = e.arrayName
          , collection = e.collection
          , orderBy = e.orderBy
          , order = e.order
          , done = e.done
          , where = e.where
          , includeDeleted = !0 == e.includeDeleted
          , specialRef = e.specialRef
          , db = sharedFirebase
          , collectionReference = db.collection(collection);
        if (!specialRef) {
            if (orderBy) {
                if (order) {
                    if (where) {
                        if ("!=" == where[1]) {
                            collectionReference = db.collection(collection).where(where[0], "<", where[2]).where(where[0], ">", where[2]).orderBy(orderBy, order)
                        } else
                            collectionReference = db.collection(collection).where(where[0], where[1], where[2]).orderBy(orderBy, order)
                    } else
                        collectionReference = db.collection(collection).orderBy(orderBy, order)
                } else {
                    if (where) {
                        if ("!=" == where[1]) {
                            collectionReference = db.collection(collection).where(where[0], "<", where[2]).where(where[0], ">", where[2]).orderBy(orderBy)
                        } else
                            collectionReference = db.collection(collection).where(where[0], where[1], where[2]).orderBy(orderBy)
                    } else
                        collectionReference = db.collection(collection).orderBy(orderBy)
                }
            }
        } else {
            collectionReference = specialRef
        }
        var snapshotReference = collectionReference.onSnapshot(function(querySnapshot) {
            // t.splice(arrName,0,arr.length);
            querySnapshot.forEach(function(doc) {
                var nuevo = doc.data();
                nuevo[DataHelper.standardItemKey] = doc.id;
                //                    console.log(nuevo);
                for (var add = !0, i = 0, o; i < arr.length; i++) {
                    o = arr[i];
                    if (!o) {
                        continue
                    }
                    if (nuevo[DataHelper.standardItemKey] == o[DataHelper.standardItemKey]) {
                        add = !1;
                        if (!nuevo._deleted || includeDeleted)
                            t.splice(arrName, i, 1, nuevo);
                        else
                            t.splice(arrName, i, 1)
                    }
                }
                if (add) {
                    if (!nuevo._deleted || includeDeleted) {
                        console.log("Adding a value", nuevo);
                        t.push(arrName, nuevo)
                    }
                }
                if (done)
                    done()
            })
        });
        return snapshotReference
    }
    /* 
    Esta función consulta y mantiene sincronizada (unidireccionalmente, de firebase -> cliente),
    la lista de documentos dentro de la colección indicada.

    Recibe dos parámetros:

    t: el contexto del elemento de Polymer (this) desde el que es llamada la función.
    
    e: objeto que debe contener los siguientes elementos
        -array: el arreglo de javascript que almacenará los datos conseguidos de Firebase
        -arrayName: el nombre de la propiedad de firebase que contiene al definido en 'array'
        -collection: el nombre de la colección de firebase que se consultará
        -orderBy: (opcional) el nombre deol campo por el que se desea ordenar la consulta.
        -order: "asc" o "desc" para recuperar los datos de forma ascendente o descendente
        -done: callback llamado cuando todos los datos dentro de la colección han sido recuperados
        -where: arreglo de javascript que debe contener en 0 el lado izquierdo del comparativo (el nombre del campo),
                en 1, el operador del comparativo y en 2, el valor contra el que se compara. 
    */
    findIndexArrayWithKey(array, value, key) {
        if (!array) {
            return -1
        }
        for (var i = 0, hijo; i < array.length; i++) {
            hijo = array[i];
            if (hijo[key] == value) {
                //   console.log("Key",i);
                //   console.log(hijo,value);
                return i
            }
        }
        return -1
    }
    queryCollection(t, e) {
        if (this._times) {
            this._times = this._times + 1
        } else {
            this._times = 1
        }
        var contextoHelper = this
          , arr = e.array
          , arrName = e.arrayName
          , collection = e.collection
          , orderBy = e.orderBy
          , order = e.order
          , done = e.callback
          , where = e.where
          , errorCallback = e.error
          , includeDeleted = !0 == e.includeDeleted
          , specialRef = e.specialRef
          , db = sharedFirebase
          , filter = e.filter
          , collectionReference = null;

          var exactDoc=e.doc;

//  if(specialRef){
//     console.error("QUERYING COLLECTION SPECIAL "+this._times,specialRef.Vm.path.segments,t);
    
//  }else{
//     console.error("QUERYING COLLECTION "+e.collection+", "+this._times,t);
    
//  }
        if (collection)
            collectionReference = db.collection(collection);
        if (!specialRef) {
            if (orderBy) {
                if (order) {
                    if (where) {
                        if ("!=" == where[1]) {
                            collectionReference = db.collection(collection).where(where[0], "<", where[2]).where(where[0], ">", where[2]).orderBy(orderBy, order)
                        } else
                            collectionReference = db.collection(collection).where(where[0], where[1], where[2]).orderBy(orderBy, order)
                    } else
                        collectionReference = db.collection(collection).orderBy(orderBy, order)
                } else {
                    if (where) {
                        if ("!=" == where[1]) {
                            collectionReference = db.collection(collection).where(where[0], "<", where[2]).where(where[0], ">", where[2]).orderBy(orderBy)
                        } else
                            collectionReference = db.collection(collection).where(where[0], where[1], where[2]).orderBy(orderBy)
                    } else
                        collectionReference = db.collection(collection).orderBy(orderBy)
                }
            }
        } else {
            collectionReference = specialRef
        }
        var arre = [];
        if (arrName) {
            if (t.set)
                t.set(arrName, arre);
            else
                t.splice(arrName, 0, arr.length)
        }
        var counter=0;
        var snapshotReference = collectionReference.onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                //    var dataPrint=change.doc.data();
                //console.error(change.type,"COLLECTION",(collection ? collection : collectionReference),"DOC",(dataPrint.name ? dataPrint.name : (dataPrint.description ? dataPrint.description : change.doc.id)) );
                if ("added" === change.type) {
                    var nuevo = change.doc.data();
             //         console.log("Added MOOOOO DATA "+collection+". "+counter,change.doc.data());
                      counter++;
                    nuevo._key = change.doc.id;
                    if(exactDoc){
                        if(change.doc.id!=exactDoc){
                            return;
                        }
                    }
                    nuevo.id = change.doc.id;
                    nuevo[DataHelper.standardItemKey] = change.doc.id;
                    if (!nuevo._deleted || includeDeleted) {
                        if (filter) {
                            if (filter(nuevo)) {
                                if (arrName)
                                    t.push(arrName, nuevo);
                                else
                                    arre.push(nuevo)
                            }
                        } else {
                            if (arrName)
                                t.push(arrName, nuevo);
                            else
                                arre.push(nuevo)
                        }
                    }
                }
                if ("modified" === change.type) {
                    var i = DataHelper.findIndexArrayWithKey(t[arrName], change.doc.id, DataHelper.standardItemKey)
                      , nuevo = change.doc.data();
                    nuevo._key = change.doc.id;
                    if(exactDoc){
                        if(change.doc.id!=exactDoc){
                            return;
                        }
                    }
                    nuevo.id = change.doc.id;
                    nuevo[DataHelper.standardItemKey] = change.doc.id;
                    //   console.log("Collection "+collection+" was modified",i,nuevo);
                    if (!nuevo._deleted || includeDeleted) {
                        if (null != i && -1 < i) {
                            if (filter) {
                                if (filter(nuevo)) {
                                    if (arrName)
                                        t.splice(arrName, i, 1, nuevo);
                                    else
                                        arre.splice(i, 1, nuevo)
                                } else {
                                    if (arrName)
                                        t.splice(arrName, i, 1);
                                    else
                                        arre.splice(i, 1)
                                }
                            } else {
                                if (arrName)
                                    t.splice(arrName, i, 1, nuevo);
                                else
                                    arre.splice(i, 1, nuevo)
                            }
                            //         console.log("Splicing existing data",nuevo);
                        }
                    } else {
                        //   console.log("Deleting because of flag data");
                        if (null != i && -1 < i) {
                            if (arrName)
                                t.splice(arrName, i, 1);
                            else
                                arre.splice(i, 1)
                        }
                    }
                }
                if ("removed" === change.type) {
                    var i = DataHelper.findIndexArrayWithKey(t[arrName], change.doc.id, DataHelper.standardItemKey);
                    //console.log("Deleting data completely");
                    if (null != i && -1 < i) {
                        if (arrName)
                            t.splice(arrName, i, 1);
                        else
                            arre.splice(i, 1)
                    }
                }
            });
            if (done) {
                if (arrName) {
                    done(t[arrName])
                } else {
                    done(arre)
                }
            }
        }, function(error) {
            console.error("Error querying collection: ", error);
            if (errorCallback) {
                errorCallback(error)
            }
        });
        /*var snapshotReference=collectionReference.onSnapshot(function(querySnapshot) {
                //t.splice(arrName,0,arr.length);
                querySnapshot.forEach(function(doc) {
                    var nuevo=doc.data();
                    
                    nuevo[DataHelper.standardItemKey]=doc.id;
//                    console.log(nuevo);
                    var add=true;
                    for(var i=0;i<arr.length;i++){
                        var o=arr[i];
                        if(!o){
                            continue;
                        }
                        if(nuevo[DataHelper.standardItemKey]==o[DataHelper.standardItemKey]){
                            
                            add=false;
                            if(!nuevo._deleted || includeDeleted){
                                t.splice(arrName,i,1,nuevo);
                                console.log("Splicing existing data",nuevo);
                            }
                            else{
                                console.log("Deleting data");
                                t.splice(arrName,i,1);
                            }
                            
                        }
                    }
                    if(add){
                        if(!nuevo._deleted || includeDeleted){
        
                            t.push(arrName,nuevo);
        
                        }
                        
                    }



                                if(done)
                                done();
                    
                    
                });
                for(var i=arr.length-1;i>=0;i--){
                    var antiguo=arr[i];
                    var borrar=true;
                    querySnapshot.forEach(function(doc) {

                        if(antiguo[DataHelper.standardItemKey]==doc.id){
                            borrar=false; 
                        }

                    });
                    if(borrar)
                    t.splice(arrName,i,1);  
                }
            });*/
        return snapshotReference
    }
    queryCollectionOnce(t, e) {
        var contextoHelper = this
          , arr = e.array
          , arrName = e.arrayName
          , collection = e.collection
          , orderBy = e.orderBy
          , order = e.order
          , done = e.callback
          , where = e.where
          , errorCallback = e.error
          , includeDeleted = !0 == e.includeDeleted
          , specialRef = e.specialRef
          , db = sharedFirebase
          , filter = e.filter
          , collectionReference = null;

        //  console.error("QUERYING COLLECTION ONCE",collection);
        if (collection)
            collectionReference = db.collection(collection);
        if (!specialRef) {
            if (orderBy) {
                if (order) {
                    if (where) {
                        if ("!=" == where[1]) {
                            collectionReference = db.collection(collection).where(where[0], "<", where[2]).where(where[0], ">", where[2]).orderBy(orderBy, order)
                        } else
                            collectionReference = db.collection(collection).where(where[0], where[1], where[2]).orderBy(orderBy, order)
                    } else
                        collectionReference = db.collection(collection).orderBy(orderBy, order)
                } else {
                    if (where) {
                        if ("!=" == where[1]) {
                            collectionReference = db.collection(collection).where(where[0], "<", where[2]).where(where[0], ">", where[2]).orderBy(orderBy)
                        } else
                            collectionReference = db.collection(collection).where(where[0], where[1], where[2]).orderBy(orderBy)
                    } else
                        collectionReference = db.collection(collection).orderBy(orderBy)
                }
            }
        } else {
            collectionReference = specialRef
        }
        var arre = [];
        if (arrName) {
            if (t.set)
                t.set(arrName, arre);
            else
                t.splice(arrName, 0, arr.length)
        }
        var snapshotReference = collectionReference.get().then(function(snapshot) {
            snapshot.forEach(function(documento) {
                var nuevo = documento.data();
                nuevo[DataHelper.standardItemKey] = documento.id;
                if (!nuevo._deleted || includeDeleted) {
                    if (filter) {
                        if (filter(nuevo)) {
                            if (arrName)
                                t.push(arrName, nuevo);
                            else
                                arre.push(nuevo)
                        }
                    } else {
                        if (arrName)
                            t.push(arrName, nuevo);
                        else
                            arre.push(nuevo)
                    }
                }
            });
            if (done) {
                if (arrName) {
                    done(t[arrName])
                } else {
                    done(arre)
                }
            }
        }).catch(function(error) {
            console.error("Error querying collection: ", error);
            if (errorCallback) {
                errorCallback(error)
            }
        });
        /*var snapshotReference=collectionReference.onSnapshot(function(querySnapshot) {
                //t.splice(arrName,0,arr.length);
                querySnapshot.forEach(function(doc) {
                    var nuevo=doc.data();
                    
                    nuevo[DataHelper.standardItemKey]=doc.id;
//                    console.log(nuevo);
                    var add=true;
                    for(var i=0;i<arr.length;i++){
                        var o=arr[i];
                        if(!o){
                            continue;
                        }
                        if(nuevo[DataHelper.standardItemKey]==o[DataHelper.standardItemKey]){
                            
                            add=false;
                            if(!nuevo._deleted || includeDeleted){
                                t.splice(arrName,i,1,nuevo);
                                console.log("Splicing existing data",nuevo);
                            }
                            else{
                                console.log("Deleting data");
                                t.splice(arrName,i,1);
                            }
                            
                        }
                    }
                    if(add){
                        if(!nuevo._deleted || includeDeleted){
        
                            t.push(arrName,nuevo);
        
                        }
                        
                    }



                                if(done)
                                done();
                    
                    
                });
                for(var i=arr.length-1;i>=0;i--){
                    var antiguo=arr[i];
                    var borrar=true;
                    querySnapshot.forEach(function(doc) {

                        if(antiguo[DataHelper.standardItemKey]==doc.id){
                            borrar=false; 
                        }

                    });
                    if(borrar)
                    t.splice(arrName,i,1);  
                }
            });*/
        return snapshotReference
    }
    /**
       * queryDocument recibe dos variables:
       * 
       * - context: el contexto de Polymer del documento.
       * - e: puede contener los siguientes parámetros:
       *    collection: la colección de la que se va a consultar el documento.
       *    doc: el ID del documento.
       *    observer: el callback que se llamará cada vez que el objeto cambie.
       * 
       */
    queryDocument(context, e) {
        if (this._timesD) {
            this._timesD = this._timesD + 1
        } else {
            this._timesD = 1
        }
        //        console.error("QUERYING DOCUMENT "+this._timesD);
        var collection = e.collection
          , docId = e.doc;
        if (collection) {
            docId = collection + "/" + docId
        }
        var objectCallback = e.observer;
        if (!docId) {
            return null
        }
        var shaFirebase = sharedFirebase;
        if (e.upperKey) {
            shaFirebase = firebase.firestore()
        }
        var arro = docId.split("/");
        arro.splice(0, 1);
        var col = docId.split("/")[0]
          , snapshotReference = shaFirebase.collection(col).doc(arro.join("/")).onSnapshot(function(doc) {
            var nuevo = doc.data();
            if (nuevo) {
                nuevo._key = doc.id;
                nuevo.id = doc.id;
                nuevo[DataHelper.standardItemKey] = doc.id
            }
            if (objectCallback) {
                objectCallback(nuevo)
            }
        });
        return snapshotReference
    }



    
    killQuery(snapshotReference) {
        snapshotReference();
        console.log("Killed query")
    }
    pseudoDeleteDocument(context, e) {
        var collection = e.collection
          , docId = e.doc
          , success = e.success
          , error = e.error
          , user = DataHelper.getUserRef();
        if (!user) {
            PolymerUtils.Toast.show("Un usuario sin sesi\xF3n no puede eliminar");
            return
        }
        //        console.error("BO BEEP",sharedFirebase,collection,docId,success,error);
        try {
            sharedFirebase.collection(collection).doc(docId).update({
                _deleted: !0,
                _deleteData: {
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: DataHelper.getUserRef()
                }
            }).then(function() {
                console.warn("EXITO!", collection, docId);
                if (success) {
                    success()
                }
            }).catch(function(errorObject) {
                console.error("ERRORRRRR!", collection, docId);
                if (error) {
                    error(errorObject)
                }
            })
        } catch (err) {
            console.error("ERRORRRR CALLING BO BEEP!", err)
        }
    }
    pseudoDeleteDocumentMode(context, e) {
        if ("online" == SetupData.mode) {
            this.pseudoDeleteDocument(context, e)
        } else {
            this.pseudoDeleteDocumentServer(context, e)
        }
    }
    pseudoDeleteDocumentServer(context, e) {
        var collection = e.collection
          , docId = e.doc
          , success = e.success
          , error = e.error;
        //        console.error("BO BEEP",sharedFirebase,collection,docId,success,error);
        try {
            sharedFirebase.collection(collection).doc(docId).update({
                _deleted: !0,
                _deleteData: {
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: DataHelper.getUserRef()
                }
            });
            //.then(function() {
            console.warn("EXITO!", collection, docId);
            if (success) {
                success()
            }
            /*            }).catch(function(errorObject) {
                console.error("ERRORRRRR!",collection,docId);
                if(error){
                    error(errorObject);
                }
            });*/
        } catch (err) {
            if (error) {
                error(err)
            }
            console.error("ERRORRRR CALLING BO BEEP!", err)
        }
    }
    deleteDocumentMode(context, e) {
        if ("online" == SetupData.mode) {
            this.deleteDocument(context, e)
        } else {
            this.deleteDocumentServer(context, e)
        }
    }
    deleteDocumentServer(context, e) {
        var collection = e.collection
          , docId = e.doc
          , success = e.success
          , error = e.error;
        try {
            sharedFirebase.collection(collection).doc(docId).delete();
            if (success) {
                success()
            }
        } catch (errorObject) {
            if (error) {
                error(errorObject)
            }
        }
    }
    deleteDocument(context, e) {
        var collection = e.collection
          , docId = e.doc
          , success = e.success
          , error = e.error;
        sharedFirebase.collection(collection).doc(docId).delete().then(function() {
            if (success) {
                success()
            }
        }).catch(function(errorObject) {
            if (error) {
                error(errorObject)
            }
        })
    }
    getFirestoreTimestamp() {
        return firebase.firestore.FieldValue.serverTimestamp()
    }
}
function getActualUser() {
    return DataHelper.getUserRef()
}
function updateCapital(mov, cuenta,callback) {
    var llave;
    console.error("UPDATING CAPITAL", mov, cuenta);
    if ("object" == typeof cuenta) {
        llave = cuenta[DataHelper.standardItemKey];
        if (!llave) {
            llave = cuenta._key
        }
    } else {
        llave = cuenta
    }
    var counterRef = sharedFirebase.collection("bancos").doc(llave);
    return firebase.firestore().runTransaction(function(transaction) {
        return transaction.get(counterRef).then(function(counterDoc) {
            if (!counterDoc.exists) {
                console.error("NO CAPITAL", mov);
                mov.capitalBefore = 0;
                if ("salida" == mov.tipo) {
                    transaction.set(counterRef, {
                        capital: -mov.cantidad
                    });
                    mov.capitalAfter = -mov.cantidad
                } else if ("entrada" == mov.tipo) {
                    transaction.set(counterRef, {
                        capital: mov.cantidad
                    });
                    mov.capitalAfter = mov.cantidad
                }
                mov.complete = !0
            } else {
                var capi = counterDoc.data().capital;
                console.error("EXISTING CAPITAL", capi);
                if (!capi) {
                    capi = 0
                }
                mov.capitalBefore = capi;
                if ("salida" == mov.tipo) {
                    var newPopulation = capi - mov.cantidad;
                    mov.capitalAfter = newPopulation;
                    transaction.update(counterRef, {
                        capital: newPopulation
                    })
                } else if ("entrada" == mov.tipo) {
                    var newPopulation = capi + mov.cantidad;
                    mov.capitalAfter = newPopulation;
                    transaction.update(counterRef, {
                        capital: newPopulation
                    })
                }
                mov.complete = !0
            }
        })
    }).then(function() {
        if (mov.complete) {
            mov._user = DataHelper.getUserRef();
            console.log("Transaction successfully committed!");
            PolymerUtils.removeUndefinedFields(mov);
            sharedFirebase.collection("movimientos").add(Object.assign({}, mov)).then(function() {
                console.log("Save mov succeded: ", mov);
                PolymerUtils.Toast.show("\xA1Movimiento realizado con \xE9xito!");
                if (mov.propinas) {
                    sumaContadorPropinas(llave, mov.propinas, mov.tipo)
                }
                if(callback){
                    callback({success:true,movimiento:mov});
                }
                //                            done();
            }).catch(function(error) {
                console.log("Save mov failed: ", error);
                //                          fail();
            })
        } else {
            console.log("Non completed!")
        }
    }).catch(function(error) {
        if(callback){
            callback({error:error});
        }
        console.log("Transaction failed: ", error);
        //if(fail)
        //fail();
    })
}
function sumaContadorPropinas(idBanco, monto, tipoMovimiento) {
    var sfDocRef = sharedFirebase.collection("bancos").doc(idBanco);
    // Uncomment to initialize the doc.
    // sfDocRef.set({ population: 0 });
    return firebase.firestore().runTransaction(function(transaction) {
        return transaction.get(sfDocRef).then(function(sfDoc) {
            if (!sfDoc.exists) {
                throw "Document does not exist!"
            } else {
                var propinaAnterior = sfDoc.data().propinas;
                if (!propinaAnterior) {
                    propinaAnterior = 0
                }
                if ("entrada" == tipoMovimiento) {
                    var nuevaPropina = propinaAnterior + monto
                } else {
                    var nuevaPropina = propinaAnterior - monto;
                    if (0 >= nuevaPropina) {
                        nuevaPropina = 0
                    }
                }
                transaction.update(sfDocRef, {
                    propinas: nuevaPropina
                })
            }
        })
    }).then(function() {
        console.log("se actualizo la cantidad de propinas")
    }).catch(function(error) {
        console.log("Transaction failed propinas: ", error)
    })
}
function truenogetFolioId(id) {
    if (!id) {
        return null
    }
    var idd = id;
    while (4 > idd.length) {
        idd = "0" + idd
    }
    return "S-" + idd
}
var ORIGEN_VENTA = "venta"
  , ORIGEN_COMPRA = "compra"
  , ORIGEN_PRODUCCION = "produc"
  , ORIGEN_ENVIO = "envio"
  , APP_MERMA_ALMACEN = {
    id: "999",
    name: "Almac\xE9n de Merma",
    tipo: "merma"
};
function abonarGlobal(cuenta, abonoCantidad, dialog, actualOrder, collection, tipo, confirmado) {
    console.log("Cuenta start", cuenta);
    if (!abonoCantidad || 0 == +abonoCantidad.replace(",", "")) {
        PolymerUtils.Toast.show("No puedes abonar un monto de $ 0.00");
        return
    }
    dialog.close();
    var cantidad = +abonoCantidad.replace(",", "")
      , abono = {
        cantidad: cantidad,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: DataHelper.getActualUser()
    };
    if (confirmado) {
        abono.confirmed = {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: DataHelper.getActualUser()
        }
    }
    var movimiento = {
        cantidad: cantidad,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: DataHelper.getActualUser()
    };
    if ("object" == typeof cuenta) {
        movimiento.cuentaId = cuenta[DataHelper.standardItemKey];
        movimiento.cuentaName = cuenta.name
    } else {
        movimiento.cuentaId = cuenta
    }
    movimiento.idOrigen = actualOrder[DataHelper.standardItemKey];
    movimiento.origen = tipo;
    if (tipo == ORIGEN_VENTA) {
        movimiento.name = "Contrato " + truenogetFolioId(actualOrder[DataHelper.standardItemKey]) + " - " + actualOrder.cliente.nombre + " " + actualOrder.cliente.apellidos;
        movimiento.tipo = "entrada"
    } else if (tipo == ORIGEN_COMPRA) {
        movimiento.name = "Compra " + actualOrder[DataHelper.standardItemKey] + " - " + actualOrder.proveedor.name;
        movimiento.tipo = "salida"
    } else if (tipo == ORIGEN_PRODUCCION) {
        movimiento.name = "Producci\xF3n " + actualOrder[DataHelper.standardItemKey] + " - " + actualOrder.proveedor.name;
        movimiento.tipo = "salida"
    } else if (tipo == ORIGEN_ENVIO) {
        movimiento.name = "Env\xEDo de transferencia " + actualOrder[DataHelper.standardItemKey];
        movimiento.tipo = "salida"
    } else {
        movimiento.name = "Movimiento desconocido";
        movimiento.tipo = "entrada"
    }
    var abs = actualOrder.abonos;
    if (!abs) {
        abs = {}
    }
    abs[new Date().getTime()] = abono;
    for (var su = 0, k = Object.keys(abs), i = 0; i < k.length; i++) {
        su = su + abs[k[i]].cantidad;
        console.log("Cantidad", abs[k[i]].cantidad)
    }
    console.log(su, actualOrder.importeTotal);
    var status = null;
    if (tipo == ORIGEN_ENVIO) {
        if (su >= actualOrder.costoEnvio) {
            console.log("Wil pay!");
            status = "paid"
        }
    } else {
        if (su >= actualOrder.importeTotal) {
            console.log("Wil pay!");
            status = "paid"
        }
    }
    var upd = {
        abonos: abs
    };
    if (status) {
        upd.status = status;
        var steps = cloneObject(actualOrder.statusSteps);
        if (!steps) {
            steps = {}
        }
        steps[status] = {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: DataHelper.getActualUser()
        };
        upd.statusSteps = steps
    }
    //abs.push(abono);   
    sharedFirebase.collection(collection).doc(actualOrder[DataHelper.standardItemKey]).update(upd).then(function() {
        //t.set("actualOrder.status","finished");
        console.log("Cuenta", cuenta);
        updateCapital(movimiento, cuenta);
        //t.set("actualOrder.statusSteps",steps);
        PolymerUtils.Toast.show("\xA1Abono realizado con \xE9xito!");
        console.log("Added abono!")
    }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error)
    })
}
function capitalGlobal(cuenta, 
    monto, 
    tipo, 
    origen, 
    observaciones, 
    comision, 
    propinas,
    extraData,
    callback) {
    if (!cuenta) {
        PolymerUtils.Toast.show("No seleccionaste una cuenta");
        return
    }
    //dialog.close();
    var cantidad = monto
      , movimiento = {
        cantidad: cantidad,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    if (comision) {
        movimiento.comision = comision
    }
    if (propinas) {
        movimiento.propinas = propinas
    }
    //        "user":getActualUser()};
    if (origen) {
        movimiento.origen = origen[DataHelper.standardItemKey];
        movimiento.name = origen.name
    }
    movimiento.cuentaId = cuenta[DataHelper.standardItemKey];
    movimiento.cuentaName = cuenta.name;
    if ("salida" == tipo) {
        movimiento.tipo = "salida"
    } else if ("entrada" == tipo) {
        movimiento.tipo = "entrada";
        if (!movimiento.name)
            movimiento.name = "Ingreso de capital"
    } else {
        movimiento.name = "Movimiento desconocido";
        movimiento.tipo = "entrada"
    }
    movimiento.description = observaciones;
    
    if(extraData){
        movimiento.extraData=extraData;

    }

    updateCapital(movimiento, cuenta,callback)
}
Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1
      , dd = this.getDate();
    // getMonth() is zero-based
    return [this.getFullYear(), "-", (9 < mm ? "" : "0") + mm, "-", (9 < dd ? "" : "0") + dd].join("")
}
;
