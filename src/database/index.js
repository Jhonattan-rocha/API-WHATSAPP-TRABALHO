import Arquivo from "../models/Arquivo";
import Historico from "../models/Historico";
import Usuario from '../models/Usuario';
import database_local from "../config/database_local";
import database_exclusiva from "../config/database_exclusiva";
import Entidade from "../models/Entidade";
import Pedido from "../models/Pedido";
import Representante from "../models/Representante";
import Status from "../models/Status";
import Mensagem from "../models/Mensagem";

import { Sequelize } from "sequelize";

const connection = new Sequelize(database_local);

const models = [Arquivo, Historico, Usuario, Mensagem]

models.forEach(model=>{model.init(connection)});
models.forEach(model=>{model.associate && model.associate(connection.models)});

connection.sync();

const connection_exclusiva = new Sequelize(...database_exclusiva);

connection_exclusiva.authenticate()
.then((response) => {
})
.catch(err => console.log(err));

const remote_models = [Entidade, Pedido, Status, Representante]

remote_models.forEach(model=>{model.init(connection_exclusiva)});
remote_models.forEach(model=>{model.associate && model.associate(connection_exclusiva.models)});
