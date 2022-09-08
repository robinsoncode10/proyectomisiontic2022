'use strict'

//Inicializamos con variables.
var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

//metodos api
const registro_cliente = async function(req,res){
    /*Creamos variable que recibe toda la data del modelo Cliente. 
    Los datos que enviemos desde el formulario estaran en el req.body.*/
    var data = req.body;
    //Creamos un Array para buscar si el correo ya existe
    var cliente_arr = [];

    //Buscamos en el modelo cliente con el metodo find el email que esta dentro de la variable data y lo guardamos en cliente_arr
    cliente_arr = await Cliente.find({email:data.email});

    //validamos con un condicional
    if(cliente_arr.length == 0){

    //Si no hay ninguno cliente registrado es decir, ningun email, entonces procedemos al registro =>



    //Validamos si se esta enviando una contraseña para usar bcrypt

    if(data.password){
    //utilizamos el metodo hash con 3 parametros, el primero la contraseña que extraemos del data, luego colocamos una función tipo async
        bcrypt.hash(data.password,null,null, async function(err,hash){
            if(hash){
    //Le damos un nuevo valor al password = hash
                data.password = hash;
    /*Registramos los datos en la variable reg, inicializamos el modelo cliente que hemos llamado arriba y enviamos toda la data al modelo
    En simples palabras, este es el registro del usuario.*/
                var reg = await Cliente.create(data);
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

//Creamos la funcion para el modulo del cliente
const login_cliente = async function(req,res){
    //Obtenemos la información y almacenamos en variable data
    var data = req.body;

    //verificamos si un usuario existe en una base de datos con un array
    var cliente_arr = [];

    //Utilizamos el array con el metodo find va a buscar en cliente el email para comprobar si existe el correo
    cliente_arr = await Cliente.find({email:data.email});
    //validamos el array con un condicional, con el metodo lenght verificamos si existe por medio de la longitud
    if(cliente_arr.length == 0){
        res.status(200).send({message:'No se encontro el usuario', data: undefined});
        //no hay usuario
    }else{

        let user = cliente_arr[0];
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


//Exportamos uno a uno las funciones que contiene este controlador
module.exports = {
    registro_cliente,
    login_cliente
}