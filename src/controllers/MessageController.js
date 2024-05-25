import Historico from "../models/Historico";
import Status from "../models/Status";
import Pedido from "../models/Pedido";
import Entidade from "../models/Entidade";
import Representante from "../models/Representante";
import appConfig from '../config/appConfig';
import { cliente_status, vendedor_status } from '../services/ModeloMensagens';

import fs from 'fs';
import { Op } from "sequelize";
import { client } from '../services/whatsapp-client';
import axios from "axios";
import mime_types from 'mime-types';
import path from 'path';
import { MessageMedia } from "whatsapp-web.js";

class MessageController{
    async sendMessageText(req, res){
        try{
            const val = await Historico.findOne({
                where: {
                    telefone: req.body.telefone,
                    status: req.body.status,
                    send: true
                }
            });

            let val_json = JSON.parse(JSON.stringify(val));

            if(val_json){
                return res.status(400).json({
                    result: null,
                    error: `Erro ao mandar a mensagem: Mensagem já enviada`
                });
            }

            const { telefone, conteudo } = req.body;
            let telefone_formatado = String(telefone).replace(/\D/g, "");
            let telefone_id = await client.getNumberId(telefone_formatado);

            await client.sendMessage(telefone_id._serialized, conteudo);
            req.body.send = true;
            const historic = await Historico.create(req.body);
            return res.status(200).json({
                result: "mensagem enviada com sucesso",
                error: null
            });
        }catch(err){
            console.log(err);
            req.body.send = false;
            const historic = await Historico.create(req.body);
            return res.status(400).json({
                result: null,
                error: `Erro ao mandar a mensagem: ${err}`
            });
        }
    }

    async sendMessageMedia(req, res){
        try{
            const val = await Historico.findOne({
                where: {
                    telefone: req.body.telefone,
                    status: req.body.status,
                    send: true
                }
            });

            let val_json = JSON.parse(JSON.stringify(val));

            if(val_json){
                return res.status(400).json({
                    result: null,
                    error: `Erro ao mandar a mensagem: Mensagem já enviada`
                });
            }

            const { telefone, conteudo, filename } = req.body;
            let telefone_formatado = String(telefone).replace(/\D/g, "");
            let telefone_id = await client.getNumberId(telefone_formatado);
            let mime_type = mime_types.lookup(filename);
            let file_path = path.resolve(__dirname, '..', '..', 'static', 'files', filename);
            const file = fs.readFileSync(file_path);
            const media = new MessageMedia(mime_type, file.toString('base64'), filename);

            await client.sendMessage(telefone_id._serialized, media, {caption: conteudo});
            req.body.send = true;
            const historic = await Historico.create(req.body);

            return res.status(200).json({
                result: "mensagem enviada com sucesso",
                error: null
            });
        }catch(err){
            console.log(err);
            req.body.send = false;
            const historic = await Historico.create(req.body);
            return res.status(400).json({
                result: null,
                error: `Erro ao mandar a mensagem: ${err}`
            });
        }
    }

    async monitoring(req, res){
        try{
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            today.setSeconds(today.getSeconds() + 1);
            const query_result = await Status.findAll({
                where: {
                    DATA: {
                        [Op.gt]: today
                    }
                },
                include: [
                    {
                        model: Pedido,
                        where: {
                            CODREP: {
                                [Op.eq]: "00033"
                            }
                        },
                        include: [
                            {model: Entidade},
                            {model: Representante}
                        ]
                    }
                ]
            })

            const status_list = JSON.parse(JSON.stringify(query_result));

            for(let status of status_list){
                if(status["STATUS_NOVO"] !== status["STATUS_ANT"]){
                    const files_in_store = fs.readdirSync(path.resolve(__dirname, '..', '..', 'static', 'files'));
                    let cliente = {};
                    let message = "";
                    let telefone = "";
                    let pedido = "";
                    
                    if(await cliente_status(status["STATUS_NOVO"])){
                        continue;
                        cliente = status["Pedido"]["Entidade"];
                        message = await cliente_status(status["STATUS_NOVO"], cliente["NOME"], status["Pedido"]["NUMERO"], cliente["END_ENT"], cliente["NUM_ENT"], "São Paulo", "SP", status["Pedido"]["ENTREGA"]);
                        telefone = "55" + String(cliente["DDD_FONE"]+cliente["TELEFONE"]);
                        telefone = telefone.replace(/\D/g);
                        pedido = status["Pedido"]["NUMERO"];
                    }else if(await vendedor_status(status["STATUS_NOVO"])){
                        let cliente_query = await Entidade.findByPk(status["Pedido"]["Representante"]["CODREP"]);
                        cliente = JSON.parse(JSON.stringify(cliente_query));                        
                        message = await vendedor_status(status["STATUS_NOVO"], cliente["NOME"], status["Pedido"]["NUMERO"], status["Pedido"]["Entidade"]["NOME"], status["STATUS_NOVO"]);
                        pedido = status["Pedido"]["NUMERO"];
                        telefone = "55" + String(cliente["DDD_FONE"]+cliente["TELEFONE"]);
                        telefone = telefone.replace(/\D/g);
                    }

                    const file = files_in_store.filter(file => {
                        return file.includes(`${cliente["CODCLI"]}_${status["Pedido"]["NUMERO"]}`);
                    });

                    axios.defaults.headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${req.token}`
                    };

                    if(file.length > 0 && Object.keys(cliente).length > 0){
                        setTimeout(() => {
                            axios.post(`${appConfig.PROTOCOL}://${appConfig.IP}:${appConfig.PORT}/media/`, {
                                conteudo: message,
                                telefone: telefone,
                                nome_cliente: cliente["NOME"],
                                status: status["STATUS_NOVO"],
                                filename: file.shift(),
                                pedido: pedido
                            }).catch(err => console.log(err));
                        }, 1000)
                    }else if(Object.keys(cliente).length > 0){
                        setTimeout(() => {
                            axios.post(`${appConfig.PROTOCOL}://${appConfig.IP}:${appConfig.PORT}/message/`, {
                                conteudo: message,
                                telefone: telefone,
                                nome_cliente: cliente["NOME"],
                                status: status["STATUS_NOVO"],
                                pedido: pedido
                            }).catch(err => console.log(err));
                        }, 1000)
                    }
                }
            }

            return res.status(200).json({
                result: "monitoramento ocorreu sem problemas",
                error: null
            });
        }catch(err){
            console.log(err);
            return res.status(400).json({
                result: null,
                error: `Erro mandar as mensagens, erro: ${err}`
            });
        }
    }

}


export default new MessageController();
