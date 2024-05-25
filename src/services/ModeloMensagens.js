import Mensagem from "../models/Mensagem";
import { Op } from "sequelize";

async function formatarString(string, ...args) {
    return string.replace(/{}/g, () => args.shift());
}

export const cliente_status = async (status_id, ...args) => {
    const mensagem = await Mensagem.findOne({
        where: {
            status: {
                [Op.eq]: status_id
            },
            client_status: {
                [Op.eq]: true
            }
        }
    });

    let dados = JSON.parse(JSON.stringify(mensagem));

    if(dados){
        let val = await formatarString(String(dados['conteudo']), ...args);
        return val;
    }

    return false;
}

export const vendedor_status = async (status_id, ...args) => {
    const mensagem = await Mensagem.findOne({
        where: {
            status: {
                [Op.eq]: status_id
            },
            client_status: {
                [Op.eq]: false
            }
        }
    });

    let dados = JSON.parse(JSON.stringify(mensagem));

    if(dados){
        let val = await formatarString(String(dados['conteudo']), ...args);
        return val;
    }
    
    return false;
}