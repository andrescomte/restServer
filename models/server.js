const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //conectar a base de datos
        this.conectarDB();


        //nuestros middlewares
        this.middlawares();
        //rutas de mi aplicacion
        this.router();

    }

    async conectarDB(){
        await dbConnection();

    }

    middlawares(){

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use( express.static('public'));
        
        
    }

    router(){

        this.app.use(this.usuariosPath,require('../routes/users'))

        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en ',this.port)
        })

    }
}
module.exports = Server;