'use strict'

//Llamamos el framework express
var express = require('express');
//Declaramos una variable que inicializa el controlador de admin en esta ruta
var adminController = require('../controllers/AdminController');

//Creamos la ruta que gestione el metodo del registro del admin que esta dentro del controlador admin,
//esta ruta va a mandar información por lo tanto es un metodo POST
//Creamos una variable llamada api que inicializa express y su metodo router
var api = express.Router();

//en la ruta le colocamos el mismo nombre del modulo
api.post('/registro_admin',adminController.registro_admin);
api.post('/login_admin',adminController.login_admin);

//exportamos variable api
module.exports = api;