// Constantes
// const express = require('express');
// const usuarioRoutes = require('./controllers/Usuario');

// // iniciar las variables
// const app = express();

// // set el puerto
// app.set('port', process.env.PORT || 8080)

// //Middlewares
// app.use(express.json());

// //Rutas
// app.use('/usuarios', usuarioRoutes);


// //Inicializar el servidor
// app.listen(app.get('port'), () =>{
//     console.log('El servidor esta corriendo en el puerto: ' + app.get('port'));
// })


// ---------------------------------------------
// importaciones principales
require('dotenv').config();

const Server = require('./models/server')

//Instancia del servidor de arranque
const servidorIniciado = new Server();

//Llamar al metodo listen para levantar el servidor
servidorIniciado.listen();

