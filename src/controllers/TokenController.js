import Usuario from '../models/Usuario';
import jwt from "jsonwebtoken";

require('dotenv').config();

class TokenController {
  async store(req, res, next) {
    try{
        const { email='', password='' } = req.body;
        // const md5 = require('md5')
    
        if (!email || !password){   
            return res.status(400).json({
                result: null,
                error: "Email ou senha vazios"
            });
        }
    
        const user = await Usuario.findOne({where: {
            email: email
        }});
    
        if(user.getDataValue("password") === password){
            const { id } = user;
            const ex = "7d"
            const token = jwt.sign({id, email}, process.env.TOKENSECRET, {
                expiresIn: ex,
            });
            return res.status(200).json({token: token, user: { nome: user.nome, id: user.id, email: user.email}});
        }  
        return res.status(404).json({
            result: null,
            error: "Usuário não encontrado, senha inválida"
        });
    }catch(err){
        return res.status(404).json({
            result: null,
            error: "Usuário não encontrado, senha inválida"
        });
    }
    // Bearer
  };

async verifyToken(req, res){
    try{
        const verify = jwt.verify(req.body.token, process.env.TOKENSECRET);
        if(verify){
            return res.status(200).json({
                result: "Token valido"
            });
        };
    }catch(err){
        console.log(err)
        return res.status(400).json({
            result: null,
            error: "Token inválido"
        });
    }
  }
};

export default new TokenController();