var HELPER_OMNIPOTENT_KEY = null;

class DataHelperClass {
    constructor(activationKey) {
        HELPER_OMNIPOTENT_KEY = activationKey;
        var context = this;
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                context.setFirebaseUser(user);
            }else{
                context.setFirebaseUser(null);
            }
        });

        this.dataUserCallbacks = [];
        this.firebaseUser = null;
        this.dataUser = null;
        this._lastDataUserQuery = null;
        this.standardItemKey = "id";
        this.setOnce = !1;
      
        this.Storage = this.getStorageObject();
        this.auth = this.getAuthObject();
    }

    setStandardKey(key) {
        this.standardItemKey = key;
    }
    
    getStorageObject() {
        var context = this;
        return {
            _actualFirebaseUpload: function(options, file) {
                var path = options.path;
                var name = options.name;
                var uploadDone = options.success;
                var errorFunction = options.error;
                var onPaused = options.onPaused;
                var onResumed = options.onResumed;
                var progressCallback = options.onProgress;
                var storageRef = firebase.storage().ref();
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
                        break;
                        case firebase.storage.TaskState.RUNNING:
                            if (onResumed) {
                                onResumed(progress)
                            }
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
            
            uploadFile: function(options) {
                var type = options.fileTypes;
                PolymerUtils.showFileInput(type, function(file) {
                    DataHelper.Storage._actualFirebaseUpload(options, file)
                });
            },
            
        }
    }

    setFirebaseUser(user) {
        var old = this.firebaseUser;
        if (this._lastDataUserQuery) {
            this._lastDataUserQuery();
        }
        this.firebaseUser = user;
        if (user && !old || user && old && user.uid != old.uid) {
            var context = this;
            this._lastDataUserQuery = sharedFirebase.collection("usuarios").doc(user.uid).onSnapshot(function(doc) {
                if (doc.data()) {
                    var data = doc.data();
                    data.emailVerified = !0 == user.emailVerified;
                    console.warn("USER DATA",data,old);
                        context.setDataUser(data);
                } else {
                    context.setDataUser(context._generateDataUser())
                }
            });
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
       
    }

    setDataUser(dataUser) {
        var old = this.oldUser ? PolymerUtils.cloneObject(this.oldUser) : null;
        this.dataUser = dataUser;
        this.oldUser = PolymerUtils.cloneObject(dataUser);
        this.setOnce = !0;
        PolymerUtils.iterateArray(this.dataUserCallbacks, function(callback) {
            callback(dataUser);
        });
        if ((dataUser && !old) || ((dataUser && old) && ((dataUser.uid != old.uid) || dataUser.profile && old.profile && dataUser.profile._key != old.profile._key || !PolymerUtils.objectEquals(dataUser.accessList, old.accessList)))) {
            DataHelper.loadFirebaseController(dataUser);
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
        if (dataUser.nombre) {
            user.nombre = dataUser.nombre
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
            saveDataUser: function(firebaseUser) {

               
               
                var user = PolymerUtils.fixDataForFirebase(firebaseUser);

                console.log("se guarda primer usuario",user);
                var userRef = sharedFirebase.collection("usuarios").doc(firebaseUser.uid);
                userRef.set(user, {
                    merge: !0
                }).then(function() {
                    console.log("Profile created successfully");
                 
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
                },
                "auth/invalid-password": {
                    code: "auth/invalid-password",
                    source: null,
                    toastMessage: "La contraseña debe tener al menos 6 caracteres",
                    toastDuration: 9e3
                }
            },
            showErrorToast: function(error) {

                var errorObj={
                    "auth/user-not-found":{
                        input:"El usuario no existe",
                        toast:"No existe ningún usuario con el email ingresado"
                    },
                    "auth/wrong-password":{
                        
                        input:"Contraseña incorrecta",
                        toast:"La contraseña es incorrecta"
                    },
                    "auth/email-already-in-use":{
                        input:"Email ya usado",
                        toast:"El email definido ya está en uso por otra cuenta"
            
                    }
                }



                if (error.errorInfo)
                    error = error.errorInfo;
                if (error) {
                    if (this._errorData[error.code]) {
                        var errorDetail = this._errorData[error.code]
                          , tostada = errorObj[errorDetail.code] ? errorObj[errorDetail.code].toast : errorDetail.code;
                        PolymerUtils.Toast.show(tostada, errorDetail.toastDuration);
                        if (errorDetail.source) {
                            var inputMessage = errorObj[errorDetail.code] ? errorObj[errorDetail.code].input : errorDetail.code;
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
        
        return snapshotReference
    }
 
    queryDocument(context, e) {
        if (this._timesD) {
            this._timesD = this._timesD + 1
        } else {
            this._timesD = 1
        }
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

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1
      , dd = this.getDate();
    // getMonth() is zero-based
    return [this.getFullYear(), "-", (9 < mm ? "" : "0") + mm, "-", (9 < dd ? "" : "0") + dd].join("")
};
