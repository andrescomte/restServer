const express = require('express');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //nuestros middlewares
        this.middlawares();
        //rutas de mi aplicacion
        this.router();

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

        this.app.use(this.usuariosPath,require('../routes/user'))

        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en ',this.port)
        })

    }
}
module.exports = Server;