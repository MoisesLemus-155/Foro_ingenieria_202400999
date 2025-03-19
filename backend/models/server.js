const express = require('express')
const cors = require('cors')
const { dbConection } = require('../database/connector')   
const session = require('express-session')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        // this.personasPath = '/api/persons'
        this.loginPath = '/api/login'
        this.usuarioPath = '/api/usuario'
        this.app.get('/', (req, res) => {
            res.send("PAGINA DE INICIO")
        })

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        
        this.app.use(cors());

        this.app.use(session({
            secret: 'clave-secreta', // Cambia esto en producción
            resave: false,
            saveUninitialized: true
        }));
        

        this.app.use(express.json());

    }

    routes(){
        //ACA VAN LAS RUTAS 
        // this.app.use("/api/persons", require('../routes/persons'))
        this.app.use("/api/login", require('../routes/login'))
        this.app.use("/api/usuario", require('../routes/usuario'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }
}

module.exports = Server;