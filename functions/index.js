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

function createDatabaseUser(user,id,permisos){
    var userData={
        "displayName":user.displayName,
        "enabled":true,
        "email":user.email,
        "uid":user.uid,
        "_timestamp":admin.firestore.FieldValue.serverTimestamp(),
        "accessList":permisos
    };
    
    if(user.photoURL){
        userData.photoURL=user.photoURL;
	}
    
    // if(extraData && (typeof extraData === "object")){
    //     var extraKeys=Object.keys(extraData);
    //     for(var i=0;i<extraKeys.length;i++){
    //         var key=extraKeys[i];
    //         if(key!=="displayName" && key!=="enabled" && key!=="email" && key!=="uid" && key!=="_timestamp"){
    //             if(typeof extraData[key] !== "undefined"){
    //                 userData[key]=extraData[key];
    //             }
    //         }else{
    //             console.log("Invalid key name",key);
	// 		}
	// 	}
	// }
    return admin.firestore().collection('_clientes').doc(id).collection("usuarios").doc(user.uid).set(userData);
}

function updateDatabaseUser(user,id,permisos){
    var userData={
        "displayName":user.displayName,
        "enabled":true,
        "email":user.email,
        "uid":user.uid,
        "_timestamp":admin.firestore.FieldValue.serverTimestamp(),
        "accessList":permisos
    };
    
    if(user.photoURL){
        userData.photoURL=user.photoURL;
    }
    
    // if(extraData && (typeof extraData === "object")){
    //     var extraKeys=Object.keys(extraData);
    //     for(var i=0;i<extraKeys.length;i++){
    //         var key=extraKeys[i];
    //         if(key!=="displayName" && key!=="enabled" && key!=="email" && key!=="uid" && key!=="_timestamp"){
    //             if(typeof extraData[key] !== "undefined"){
    //                 userData[key]=extraData[key];
    //             }
    //         }else{
    //             console.log("Invalid key name",key);
    //         }
    //     }
    // }
    return admin.firestore().collection('_clientes').doc(id).collection("usuarios").doc(user.uid).update(userData);
}

exports.insertNewUser = functions.https.onCall((data, context) => {
    const email = data.email;
    const name = data.name;
    const passwd = data.passwd;
    var photo = data.photo;
    const id=data.negocioKey;
    const permisos=data.accessList
    
    var json={
        email: email,
        emailVerified: false,
        password: passwd,
        displayName: name,
        disabled: false
    };
    if(photo){
        json.photoURL=photo;
    }
    
    return admin.auth().createUser(json).then(function(userRecord){
        return createDatabaseUser(userRecord,id,permisos).then((snapshot) => {
            console.log("Successfully created new user:", userRecord.uid);
            return {"result":"Successfully created new user:"+userRecord.uid,"user":userRecord};
        });
    }).catch(function(error) {
        console.log("Error creating new user:", error);
        return {"result":"Error creating new user: ","error":error};
    });
});


exports.updateUser = functions.https.onCall((data, context) => {
    const email = data.user.email;
    const name = data.user.displayName;
    var photo=data.user.photoURL;
    const uid=data.user.uid;

    const id=data.user.negocioKey;
    const lista=data.user.accessList;
    
    var update={
        email: email,
        displayName: name,
        disabled: false
    };
    
    if(data.user.password){
        update.password=data.user.password;
    }
    if(photo){
        update.photoURL=photo;
    }
    
    return admin.auth().updateUser(uid,update).then(function(userRecord){
        return updateDatabaseUser(userRecord,id,lista).then((snapshot) => {
            console.log("Successfully updated user:", userRecord.uid);
            return {"result":"Successfully updated user:"+userRecord.uid,"user":userRecord};
        });
    }).catch(function(error) {
        console.log("Error updating user:", error);
        return {"result":"Error updating user: ","error":error};
    });
});

exports.deleteUser = functions.https.onCall((data, context) => {
    const uid=data.uid;
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


//////////////////////////////////////////////////////////////////////////////////////////////
/** aqui van las funciones para la aplicaicon interna */

function guardaUsuario(user,permisos){
    var userData={
        "displayName":user.displayName,
        "enabled":true,
        "email":user.email,
        "uid":user.uid,
        "_timestamp":admin.firestore.FieldValue.serverTimestamp(),
        "accessList":permisos
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
    const passwd = data.passwd;
    const permisos=data.accessList
    
    var json={
        email: email,
        emailVerified: false,
        password: passwd,
        displayName: name,
        disabled: false
    };
    
    return admin.auth().createUser(json).then(function(userRecord){
        return guardaUsuario(userRecord,permisos).then((snapshot) => {
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
