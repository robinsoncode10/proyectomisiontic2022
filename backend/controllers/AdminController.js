'use strict'
var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_admin = async function(req,res){
    /*Creamos variable que recibe toda la data del modelo Cliente. 
    Los datos que enviemos desde el formulario estaran en el req.body.*/
    var data = req.body;
    //Creamos un Array para buscar si el correo ya existe
    var admin_arr = [];

    //Buscamos en el modelo admin con el metodo find el email que esta dentro de la variable data y lo guardamos en admin_arr
    admin_arr = await Admin.find({email:data.email});

    //validamos con un condicional Si no hay ninguno admin registrado es decir, ningun email, entonces procedemos al registro =>
    if(admin_arr.length == 0){

    //Validamos si se esta enviando una contraseña para usar bcrypt

    if(data.password){
    //utilizamos el metodo hash con 3 parametros, el primero la contraseña que extraemos del data, luego colocamos una función tipo async
        bcrypt.hash(data.password,null,null, async function(err,hash){
            if(hash){
    //Le damos un nuevo valor al password = hash
                data.password = hash;
    /*Registramos los datos en la variable reg, inicializamos el modelo cliente que hemos llamado arriba y enviamos toda la data al modelo
    En simples palabras, este es el registro del usuario.*/
                var reg = await Admin.create(data);
                //procedemos a enviar un status.
                res.status(200).send({data: reg});
            }else{
                res.status(200).send({message: 'Hay un error con la contraseña', data:undefined});
            }
        });
    }else{
        res.status(200).send({message: 'No hay una contraseña', data:undefined}); 
    }
    


    }else{
    //Si en cliente_Arr ya existe un item entonces se enviará el siguiente mensaje
    res.status(200).send({message: 'Este usuario ya existe', data:undefined});
    }
}

//Creamos la funcion para el modulo del admin
const login_admin = async function(req,res){
    //Obtenemos la información y almacenamos en variable data
    var data = req.body;

    //verificamos si un usuario existe en una base de datos con un array
    var admin_arr = [];

    //Utilizamos el array con el metodo find va a buscar en admin el email para comprobar si existe el correo
    admin_arr = await Admin.find({email:data.email});
    //validamos el array con un condicional, con el metodo lenght verificamos si existe por medio de la longitud
    if(admin_arr.length == 0){
        res.status(200).send({message:'No se encontro el usuario administrador', data: undefined});
        //no hay usuario
    }else{
        let user = admin_arr[0];
        //Con Bcrypt y su metodo compare comparamos las contraseñas encriptadas y comprobamos con un condicional si las contraseñas coinciden.
        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });


            }else{
                res.status(200).send({message:'La contraseña no coincide', data: undefined});
            }
        });

        
        //si hay usuario
    }
    
}

module.exports= {
    registro_admin,
    login_admin
}