import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

let internalMixinAuth = function(superClass) {
	return class extends superClass {
		constructor() {
			super();
			var context=this;
			DataHelper.addDataUserCallback(function(loggedUser){
				if(loggedUser){
					context.set("_loggedUser",loggedUser);
				}else{
					context.set("_loggedUser",null);

					
					
				}
				context.set("_loadedUser",true);
			});
		}
		_loggedUserHasPath(path,o1,o2){
			var user=this._loggedUser;
			if(o1 && o2){
				if(o1!=o2){
					return false;
				}
			}
			return (user && user.accessList && user.accessList[path]);
		}
		
		static get properties() {
			return {
				_loggedUser:{type:Object,notify:true,value: null},
				_loadedUser:{type:Boolean,notify:true,value: false}
			};
		}
		
		signOut(){
			firebase.auth().signOut().then(function() {
				window.location.reload();

			}).catch(function(error) {

			});
		}
		
		signupPassword(data,successCallback,extraData){
			var dialog=PolymerUtils.Dialog.createAndShow({
				type: "modal",
				saveSpinner:{
					message: "Registrando Usuario",
					saving: true
				},
				style:"width: 400px; height: 300px;",
				smallStyle: "width: 95% !important;"
			});
			
			firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
			.then(function(result){
				var user = result.user;
				user.updateProfile({
					displayName: data.displayName
				}).then(function() {
					var redUser={
						displayName: data.displayName,
						email:user.email,
						uid:user.uid,phoneNumber: data.phoneNumber
					};
					DataHelper.auth.saveDataUser(redUser,extraData);
					dialog.close();
					if(successCallback){
						successCallback();
					}
				}).catch(function(error) {
					console.error("Error updating profile",error,data);
				});
			}).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				dialog.close();
				DataHelper.auth.showErrorToast(error);
			});
		}
		
		loginPassword(data,successCallback,errorCallback){
			
			var dialog=PolymerUtils.Dialog.createAndShow({
				type: "modal",
				saveSpinner:{
					message: "Iniciando Sesión",
					saving: true
				},
				style:"width: 400px; height: 300px;",
				smallStyle: "width: 95% !important;"
			});
			
			firebase.auth().signInWithEmailAndPassword(data.email, data.password)
			.then(function(result){
				var user = result.user;
				dialog.close();
				DataHelper.auth.saveDataUser(user);
				if(successCallback){
					successCallback();
				}
			}).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				var returnError=DataHelper.auth.showErrorToast(error);
				dialog.close();
				if(errorCallback){
					errorCallback(returnError);
				}
			});
		}



		creaNuevoUsuario(objUser,callbacks) {
			var t=this;
			console.log("Inserting user", objUser.name);
			var agregaUsuarioKhalia = firebase.functions().httpsCallable('agregaUsuarioKhalia');
			agregaUsuarioKhalia(objUser).then(function (result) {
				if (callbacks && callbacks.finished) {
					callbacks.finished();
				}
				if (result.data.user) {
					if (callbacks && callbacks.success) {
						callbacks.success();
					}
					PolymerUtils.Toast.show("¡Usuario registrado con éxito!");
				} else {
					if (callbacks && callbacks.fail) {
						callbacks.fail();
					}
					DataHelper.auth.showErrorToast(result.data.error);
				}
				console.log(result.data.result);
			});
			
		}

		editaUsuario(user, callbacks) {
		
			var actualizaUsuarioKhalia = firebase.functions().httpsCallable('actualizaUsuarioKhalia');
            if(!user.password){
                delete user["password"];
            }

            actualizaUsuarioKhalia(user).then(function(result) {
                if(callbacks && callbacks.finished){
                    callbacks.finished();
                }
                if(result.data.user){
                    if(callbacks && callbacks.success){
                        callbacks.success();
                    }   
                    PolymerUtils.Toast.show("¡Usuario actualizado con éxito!");
                }
                else{
                    if(callbacks && callbacks.fail){
                        callbacks.fail();
                    }
                    //firebaseHelper.auth.showErrorToast(result.data.error);
					DataHelper.auth.showErrorToast(result.data.error);
                }
                console.log(result.data.result);
            });
		}

		borraUsuario(user, callbacks) {
			var borraUsuarioKhalia = firebase.functions().httpsCallable('borraUsuarioKhalia');
            borraUsuarioKhalia({uid: user.uid,negocioKey:user.negocioKey}).then(function(result) {
                if(callbacks && callbacks.finished){
                    callbacks.finished();
                }
                if(result.data.user){
                    if(callbacks && callbacks.success){
                        callbacks.success();
                    }   
                    PolymerUtils.Toast.show("Usuario elminado de la plataforma");
                }
                else{
                    if(callbacks && callbacks.fail){
                        callbacks.fail();
                    }
                    DataHelper.auth.showErrorToast(result.data.error);
                }
                console.log(result.data.result);
            });
		}
	}
}
export const AuthMixin = dedupingMixin(internalMixinAuth);