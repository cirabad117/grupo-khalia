/**
 * ADVERTENCIA
 * 
 * LAS FUNCIONES YA ESTAN COMPARTIDAS EN LOS DOS PROYECTOS, TODO DEBE ESTAR EN EL MISMO SERVIDOR
 * CADA VEZ QUE AGREGUES O MODIFIQUES UNA FUNCION CAMBIALA EN EL OTRO ARCHIVO DE FUNCTIONS
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

function deleteDatabaseUser(user,id){
    var userData={"enabled":false,"_deleted":true};
    return admin.firestore().collection('_clientes').doc(id).collection("usuarios").doc(user.uid).update(userData);
}

function createDatabaseUser(user,data,id){//permisos
    
    // var userData={
    //     "displayName":user.displayName,
    //     "enabled":true,
    //     "email":user.email,
    //     "uid":user.uid,
    //     "_timestamp":admin.firestore.FieldValue.serverTimestamp(),
    //     "accessList":permisos
    // };
    
    var userData=data;
    userData["_timestamp"]=admin.firestore.FieldValue.serverTimestamp();
    delete userData["password"];
    delete userData["negocioKey"];
    delete userData["emailVerified"];
    delete userData["disabled"];
     
    // if(user.photoURL){
    //     userData.photoURL=user.photoURL;
    // }
 
    var uid=user.uid;
     
    
    return admin.firestore().collection('_clientes').doc(id).collection("usuarios").doc(uid).set(data);
}

function updateDatabaseUser(user){
    var userData={
        "displayName":user.displayName,
        "enabled":true,
        "email":user.email,
        "nombre":user.nombre,
        "password":user.password,
        "uid":user.uid,
        "_timestamp":admin.firestore.FieldValue.serverTimestamp(),
        "accessList":user.accessList
    };
    
    var id=user.negocioKey;
    if(user.photoURL){
        userData.photoURL=user.photoURL;
    }

    return admin.firestore().collection('_clientes').doc(id).collection("usuarios").doc(user.uid).update(userData);
}

exports.insertNewUser = functions.https.onCall((data, context) => {
    // const email = data.email;
    // const name = data.name;
    // const passwd = data.passwd;
    // var photo = data.photo;
    // const id=data.negocioKey;
    // const permisos=data.accessList
     
    // var json={
    //     email: email,
         
    //     password: passwd,
    //     displayName: name,
         
    // };
    var id=data.negocioKey;
    var json=data;
    
    return admin.auth().createUser(json).then(function(userRecord){
        return createDatabaseUser(userRecord,json,id).then((snapshot) => {
            console.log("Successfully created new user:", userRecord.uid);
            return {"result":"Successfully created new user:"+userRecord.uid,"user":userRecord};
        });
    }).catch(function(error) {
        console.log("Error creating new user:", error);
        return {"result":"Error creating new user: ","error":error};
    });
});


exports.updateUser = functions.https.onCall((data, context) => {
    const uid=data.uid;
    const email=data.email;
    const name=data.displayName;
    
    var update={
        email: email,
        displayName: name,
        disabled: false
    };
    
    if(data.password){
        update.password=data.password;
    }
    
    return admin.auth().updateUser(uid,update).then(function(userRecord){
        return updateDatabaseUser(data).then((snapshot) => {
            console.log("Successfully updated user:", userRecord.uid);
            return {"result":"Successfully updated user:"+userRecord.uid,"user":userRecord};
        });
    }).catch(function(error) {
        console.log("Error updating user:", error);
        return {"result":"Error updating user: ","error":error};
    });
});

exports.deleteUser = functions.https.onCall((data, context) => {
    const uid=data.id;
    const id=data.negocioKey;
    return admin.auth().updateUser(uid,{
        disabled: true
    }).then(function(userRecord){
        return deleteDatabaseUser(userRecord,id).then((snapshot) => {
            console.log("Successfully deleted user:", userRecord.uid);
            return {"result":"Successfully deleted user:"+userRecord.uid,"user":userRecord};
        });
    }).catch(function(error) {
        console.log("Error deleting user:", error);
        return {"result":"Error deleting user: ","error":error};
    });
});


exports.actualizaPassword=functions.https.onCall((data,context)=>{
    const uid=data.uid;
    const email=data.email;
    const name=data.displayName;
    var update={
        email: email,
        displayName: name,
        disabled: false
    };
     
    if(data.password){
        update.password=data.password;
    }
    
     
    return admin.auth().updateUser(uid,update).then(function(userRecord){
        return userRecord;
    }).catch(function(error) {
        return {"result":"Error updating user: ","error":error};
    });
});
 
 
//////////////////////////////////////////////////////////////////////////////////////////////
/** aqui van las funciones para la aplicaicon interna */

function guardaUsuario(user,permisos,ps){
    var userData={
        "displayName":user.displayName,
        "enabled":true,
        "email":user.email,
        "uid":user.uid,
        "_timestamp":admin.firestore.FieldValue.serverTimestamp(),
        "accessList":permisos,
        "password":ps
    };
     
    if(user.photoURL){
        userData.photoURL=user.photoURL;
    }
    
    return admin.firestore().collection('usuarios').doc(user.uid).set(userData);
}//guardaUsuario

function updateDatabaseKhalia(user,permisos){
    var userData={
        "displayName":user.displayName,
        "enabled":true,
        "email":user.email,
        "uid":user.uid,
        "_timestamp":admin.firestore.FieldValue.serverTimestamp(),
        "accessList":permisos
    };
    
    
    return admin.firestore().collection('usuarios').doc(user.uid).update(userData);
}//updateDatabaseKhalia

function deleteDatabaseKhalia(user){
    var userData={"enabled":false,"_deleted":true};
    return admin.firestore().collection('usuarios').doc(user.uid).update(userData);
}


exports.agregaUsuarioKhalia = functions.https.onCall((data, context) => {
    const email = data.email;
    const name = data.name;
    const passwd = data.password;
    const permisos=data.accessList;

    var json={
        email: email,
        emailVerified: false,
        password: passwd,
        displayName: name,
        disabled: false
    };
    
    return admin.auth().createUser(json).then(function(userRecord){
        return guardaUsuario(userRecord,permisos,passwd).then((snapshot) => {
            console.log("Successfully created new user:", userRecord.uid);
            return {"result":"Successfully created new user:"+userRecord.uid,"user":userRecord};
        });
    }).catch(function(error) {
        console.log("Error creating new user:", error);
        return {"result":"Error creating new user: ","error":error};
    });
});

exports.actualizaUsuarioKhalia = functions.https.onCall((data, context) => {
    const email = data.email;
    const name = data.displayName;
    var photo=data.photoURL;
    const uid=data.uid;
    
    const lista=data.accessList;

    var update={
        email: email,
        displayName: name,
        disabled: false
    };
     
    if(data.password){
        update.password=data.password;
    }
    if(photo){
        update.photoURL=photo;
    }
    
    return admin.auth().updateUser(uid,update).then(function(userRecord){
        return updateDatabaseKhalia(userRecord,lista).then((snapshot) => {
            console.log("Successfully updated user:", userRecord.uid);
            return {"result":"Successfully updated user:"+userRecord.uid,"user":userRecord};
        });
    }).catch(function(error) {
        console.log("Error updating user:", error);
        return {"result":"Error updating user: ","error":error};
    });
});

exports.borraUsuarioKhalia = functions.https.onCall((data, context) => {
    const uid=data.uid;
    return admin.auth().updateUser(uid,{
        disabled: true
    }).then(function(userRecord){
        return deleteDatabaseKhalia(userRecord).then((snapshot) => {
            console.log("Successfully deleted user:", userRecord.uid);
            return {"result":"Successfully deleted user:"+userRecord.uid,"user":userRecord};
        });
    }).catch(function(error) {
        console.log("Error deleting user:", error);
        return {"result":"Error deleting user: ","error":error};
    });
});
