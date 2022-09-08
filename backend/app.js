'use strict'

//App.js inicializa nuestro backend

//Esta variable hace uso de nuestro paquete instalado express //instalado
var express = require('express');
//variable que inicializa nuestro framework de express llamada app.
var app = express();


//Esta variable hace uso de nuestro paquete instalado bodyparser
var bodyparser = require('body-parser');
//Con esta variable hacemos una conexión a la base de datos //instalado
var mongoose = require('mongoose');
//Variable para el puerto de ejecución de nuestro backend, con process.env.port utilizamos el puerto por defecto en caso de no estar disponible utilizamos el 4201.
var port = process.env.PORT || 4201;

//obtenemos el cliente de la ruta <- Aqui va a estar inicializado nuestras rutas
var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');

// Hacemos uso de la variable mongoose con su metodo connect, recibe una ruta de conexión con el puerto por defecto de la base de datos de mongodb continuando
// con el nombre de la base de datos luego creamos una funcion error (err) y respuesta (res) con un condicional, si tenemos un error o si tenemos una conexión exitosa nos mostrará
// por medio de la consola.
mongoose.connect('mongodb://127.0.0.1:27017/proyectomisiontic2022',{useUnifiedTopology: true, useNewUrlParser: true}, (err, res)=>{
    if (err){
        console.log(err);
    }else{
//Utilizamos la variable app que llama al framework de express con su metodo de listen para poner el escucha en nuestro servidor con dos parametros, el puerto de ejecución
//que es la variable port luego de una función que envia un mensaje a la consola.
        app.listen(port, function(){
            console.log ('Servidor corriendo en el puerto ' + port);
        });
    }
});

//parsiamos y configuramos la data con bodyparser
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit:"50mb", extended:true}));



app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',cliente_route);
app.use('/api',admin_route);


//Con module exports exportamos nuestro modulo de app, app es nuestro inicializador de nuestro paquete de express que vendria a ser nuestro framework.
module.exports = app;