'use strict'

//En este helper generamos un token

//La libreria jwt simple la usamos para decodificar tokens
var jwt = require('jwt-simple');
var moment = require('moment');

//contraseña para encriptar datos
var secret = 'liam';

//exportamos la funcion

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payload,secret);
}