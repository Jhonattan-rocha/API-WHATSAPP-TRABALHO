import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario';

export default async (req, res, next) =>{
    require('dotenv').config();

    const { authorization } = req.headers;
    if (!authorization){
        return res.status(401).json({
            errors: ['Login required']
        })
    }

    const [texto, token] = authorization.split(" ")

    try{
        const dados = jwt.verify(token, process.env.TOKENSECRET)
        const { id, email } = dados
        const user = await Usuario.findOne({
            where: {
                id,
                email
            }
        });

        const promises = Promise.all([user])

        promises.then(response => {    
            if (!response[0]){
                return res.status(401).json({
                    errors: ['Usuário inválido']
                })
            }
            
            req.id = id;
            req.email = email;
            req.token = token;
            return next();
        })
        .catch(erro => {
            console.log(erro)
            return res.status(400).json({
                errors: ['Usuário inválido']
            })
        }); 

    }catch(err){
        console.log(err)
        return res.status(401).json({
            errors: ['Token expired']
        });
    }
}