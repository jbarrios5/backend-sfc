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
            bolsaPunto:'/api/v1/bolsa',
            parametroPunto:'/api/v1/parametro',
            compra:'/api/v1/compra',
            canje:'/api/v1/canje',
            premio:'/api/v1/premio',
            user: '/api/v1/user',
            login: '/api/v1/login'
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
        this.app.use( this.paths.punto, require('../routes/puntos'));
        this.app.use( this.paths.parametroPunto, require('../routes/parametros'));
        this.app.use( this.paths.compra, require('../routes/compras'));
        this.app.use( this.paths.canje, require('../routes/canjes'));
        this.app.use( this.paths.premio, require('../routes/premios'));
        this.app.use( this.paths.user, require('../routes/user'));
        this.app.use( this.paths.login, require('../routes/auth'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
