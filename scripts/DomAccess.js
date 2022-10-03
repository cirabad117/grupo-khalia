var StaticDomAccess={
    hasPath: function(path){
        var user=DataHelper.getDataUser();
        

        return (user && user.accessList && user.accessList[path]);
    },
    
    MAIN_TREE:{
        "_main":true,

        "admin":{
            "name":"Ventas",
            "children":{

                "seguimiento":{
                    "name":"Seguimiento y comunicación a prospectos/clientes",
                    "children":{
                        "agregaContacto":{
                            "name":"Agregar contacto"
                        },
                        "anulaContacto":{
                            "name":"Anular contacto"
                        },
                        "eliminaContacto":{
                            "name":"Eliminar contacto"
                        },
                        "editaContacto":{
                            "name":"Editar contacto"
                        },
                        "actualizaSeg":{
                            "name":"Actualizar seguimiento"
                        }
                    }
                },
             
                "prospectos":{
                    "name":"Prospectos",
                    "children":{
                        "crear":{
                            "name":"Agregar prospecto"
                        },
                        "editar":{
                            "name":"Editar prospecto"
                        },
                        "eliminar":{
                            "name":"Eliminar prospecto"
                        }
                       
                    }
                },
                "clientes":{
                    "name":"Clientes",
                    "children":{
                        "crear":{
                            "name":"Agregar cliente"
                        },
                        "editar":{
                            "name":"Editar cliente"
                        },
                        "eliminar":{
                            "name":"Eliminar cliente"
                        }
                    }
                },
                "productos":{
                    "name":"Control de productos",
                    "children":{
                        "crear":{
                            "name":"Agregar producto"
                        },
                        "editar":{
                            "name":"Editar producto"
                        },
                        "eliminar":{
                            "name":"Eliminar producto"
                        }
                       
                    }
                },
                "cotizaciones":{
                    "name":"Cotizaciones",
                    "children":{
                        "crear":{
                            "name":"Agregar cotizacion"
                        },
                        "autorizar":{
                            "name":"Aceptar cotización"
                        },
                        "declinar":{
                            "name":"Declinar cotización"
                        },
                        "eliminar":{
                            "name":"Eliminar cotización"
                        }
                       
                    }
                },
                "app-clientes":{
                    "name":"aplicacion para clientes",
                    "description":"aplicacion ofrecida a clientes de grupo khalia"
                }
               
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
        
       
    
    
        
    }
};