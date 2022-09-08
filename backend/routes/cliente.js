'use strict'

//Llamamos el framework express
var express = require('express');
//Declaramos una variable que inicializa el controlador de cliente en esta ruta
var clienteController = require('../controllers/ClienteController');

//Creamos la ruta que gestione el metodo del registro del cliente que esta dentro del controlador cliente,
//esta ruta va a mandar información por lo tanto es un metodo POST
//Creamos una variable llamada api que inicializa express y su metodo router
var api = express.Router();

//en la ruta le colocamos el mismo nombre del modulo
api.post('/registro_cliente',clienteController.registro_cliente);
//creamos la petición de tipo post
api.post('/login_cliente',clienteController.login_cliente);

//exportamos variable api
module.exports = api;