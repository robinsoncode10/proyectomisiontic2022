'use strict'

//variable para mongoose 
var mongoose = require('mongoose');
//Inicializar el schema de mongoose
var schema = mongoose.Schema;

//Creamos una variable para que albergue todo el esquema de nuestro cliente
var AdminSchema = schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    rol: {type: String, required: true}
});

//Exportamos nuestro modelo de cliente, 'cliente' es el nombre del esquema, junto con el esquema


module.exports = mongoose.model('admin', AdminSchema);
