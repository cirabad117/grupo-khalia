var StaticDomAccess={
    hasPath: function(path){
        var user=DataHelper.getDataUser();
        

        return (user && user.accessList && user.accessList[path]);
    },
    
    MAIN_TREE:{
        "_main":true,

        "admin":{
            "name":"Administración y ventas",
            "children":{
                "prospectos":{
                    "name":"Prospectos",
                },
                "clientes":{
                    "name":"Clientes",
                },
                "productos":{
                    "name":"Control de productos",
                },
                "cotizaciones":{
                    "name":"Cotizaciones",
                },
               
            }
        },

        "areas":{
            "name":"Estatus por áreas",
            "children":{
                "sasi":{
                    "name":"SASIOPA"
                },
                "sgm":{
                    "name":"sistemas de gestion de medición"
                },
                "emisiones":{
                    "name":"Emisione a la atmosfera"
                },
                "seguridad":{
                    "name":"Seguridad"
                },
                "sistemas":{
                    "name":"Sistemas"
                }
            }
        },

        "usuarios":{
            "name":"Usuarios",
            "description":"Puede entrar a la lista de usuarios",
            "children":{
                "agregar":{
                    "name":"Agregar Usuario",
                    "description":"Puede dar de alta un nuevo usuario"
                    

                },
                "eliminar":{
                    "name":"Eliminar Usuario",
                    "description":"Podrá eliminar usuarios ya registrados",
                    

                },
                "editar":{
                    "name":"Editar Usuario",
                    "description":"Podrá ediar usuarios ya dados de alta",
                    

                },
                "agregar-perfil":{
                    "name":"Administrar Perfiles",
                    "description":"Puede administrar los perfiles de usuario"
                }

            }
        },
        "app-clientes":{
            "name":"aplicacion para clientes",
            "description":"aplicacion ofrecida a clientes de grupo khalia"
        }
       
    
    
        
    }
};