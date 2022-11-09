const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = 4000; //el puerto 3000 es para el frontend

        this.paths = {
            client:'/api/v1/client',
            punto:'/api/v1/punto',
            regla:'/api/v1/regla',
            bolsaPunto:'/api/v1/bolsa'
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );


    }

    routes() {
        
        
        this.app.use( this.paths.client, require('../routes/clients'));
        this.app.use( this.paths.regla, require('../routes/reglas'));
        this.app.use( this.paths.bolsaPunto, require('../routes/bolsaPuntos'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
