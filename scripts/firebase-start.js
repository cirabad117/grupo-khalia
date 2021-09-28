
var dataFirebase=null;
var configServidor={
    entorno:"beta",
};


if(configServidor.entorno.indexOf("beta")!=-1){
    // este es mi servidor personal, aqui va todo lo de pruebas
    dataFirebase = {
        apiKey: "AIzaSyBLs9HU9m8ea85FcYK-Q-C6Md-ZZWtmIQ8",
        authDomain: "khalia-instalaciones.firebaseapp.com",
        projectId: "khalia-instalaciones",
        storageBucket: "khalia-instalaciones.appspot.com",
        messagingSenderId: "937511253470",
        appId: "1:937511253470:web:f0cfb6f5ee326e4dfd994f"
    };

}else if(configServidor.entorno.indexOf("produccion")!=-1){
    // esto es el servidor de produccion de KHALIA, aqui debo mandar la version oficial
    dataFirebase= {
        apiKey: "AIzaSyBOy3Xj_yZQGDQmvxjUG9kr8r1nNh8csNw",
        authDomain: "grupo-khalia-f8870.firebaseapp.com",
        projectId: "grupo-khalia-f8870",
        storageBucket: "grupo-khalia-f8870.appspot.com",
        messagingSenderId: "1086006403659",
        appId: "1:1086006403659:web:0797bd1b99687a062963ce",
        measurementId: "G-C0EB7G15DK"
      };

}

// Initialize Firebase
firebase.initializeApp(dataFirebase);


