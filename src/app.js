import "./database";
import "./services/whatsapp-client";
import "./services/server-socket";

import arquivosRoutes from './routes/arquivosRoute';
import historicRoutes from './routes/historicRoutes';
import messageRoutes from './routes/messageRoute';
import tokenRoutes from './routes/tokenRoutes';
import mensagemRoutes from './routes/mensagensRoute';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

require('dotenv').config();

const whitelist = [ // urls permitidas de se fazer requisições para essa api
    'http://localhost:3000/Login',
    "http://localhost:3000/"
];

const corsops = {
    origin: function (origin, callback){
        if (whitelist.indexOf(origin) === -1 || !origin){
            callback(null, true);
        } else{
            callback(new Error('Not allowed by CORS'));
        }
    }
};
  
class App{
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(helmet());
        this.app.use(cors(corsops));
        this.app.use(express.urlencoded({extended: true, limit: '50mb'}));
        this.app.use(express.json()); // ativar o POST da api
        this.app.use(express.static(path.resolve(__dirname, "..", "static")))
    }

    routes(){
        // registrar rotas
        this.app.use(arquivosRoutes);
        this.app.use(historicRoutes);
        this.app.use(messageRoutes);
        this.app.use(tokenRoutes);
        this.app.use(mensagemRoutes);
    }
}


export default new App().app;