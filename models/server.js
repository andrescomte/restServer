const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:'/api/auth',
            buscar: '/api/buscar',
            usuarios:'/api/users',
            categorias: '/api/categorias',
            productos: '/api/productos'
        }

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

        this.app.use(this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.usuarios,require('../routes/users'))
        this.app.use(this.paths.categorias,require('../routes/categorias'))
        this.app.use(this.paths.productos,require('../routes/productos'))
        this.app.use(this.paths.buscar,require('../routes/buscar'))


        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en ',this.port)
        })

    }
}
module.exports = Server;