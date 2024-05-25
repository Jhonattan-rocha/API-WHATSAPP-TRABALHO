import multer from 'multer';
import multerConfig from '../config/multerConfig';
import fs from 'fs';
import Arquivo from '../models/Arquivo';
import path from 'path';
import * as stream from "stream";
import { promisify } from 'util';

const upload = multer(multerConfig).single('file');

class ArquivosController{
    async store(req, res){
        return upload(req, res, async (err) => {
            if(err){
                return res.status(401).json({
                    error: [`Erro: ${err}`],
                    result: null,
                });
            }
 
            try{
                const {originalname, filename, mimetype} = req.file;

                const arquivo = await Arquivo.create({
                    filename: filename,
                    originalname: originalname,
                    mime_type: mimetype,
                });

                return res.status(200).json({result: arquivo});
            }catch(err){
                return res.status(404).json({  
                    error: [`Arquivo não encontrado, erro: ${err}`],
                    result: null,
                });
            }
        });
    }

    async show(req, res, next) {
      try {

          const { originalname, filename } = req.body;
  
          const arquivo = await Arquivo.findOne({
              where: {
                  filename: filename,
                  originalname: originalname
              }
          });
  
          if (!arquivo) {
              return res.status(404).json({
                error: [`Arquivo não encontrado, erro: ${err}`],
                result: null,
              });
          }
  
          const file = fs.createReadStream(path.resolve(`static`, `files`, `${arquivo.filename}`));
  
          res.setHeader('Content-Disposition', `attachment; filename="${arquivo.originalname}"`);
          
          const finished = promisify(stream.finished);
          
          file.pipe(res);
  
          await finished(file);

          } catch (err) {
              return res.status(500).json({
                  error: [`Ocorreu um erro no servidor, erro: ${err}`],
                  result: null,
              });
          }
      }
  

    async index(req, res){
        try{
            const rules = {...req.filter}
            const arquvios = await Arquivo.findAll(rules);
            return res.status(200).json({result: arquvios});
        }catch(err){
            return res.status(400).json({
                result: null,
                error: "Erro ao buscar os arquivos"
            });
        };
    };

    async update(req, res){
        try{
    
          const id = req.params.id;
          
          if (!id){
            return res.status(404).json({
              result: null,
              error: "ID não encontrado ou inválido"
            })
          };
    
          const arquivo = await Arquivo.findByPk(id);
    
          if (!arquivo){
            return res.status(404).json({
              result: null,
              error: "Arquivo não registrado"
            });
          };
    
          const result = await arquivo.update(req.body);
    
          return res.status(200).json({result: result});
        }catch(err){
          return res.status(400).json({
            result: null,
            error: "Erro ao buscar os arquivos"
          });
        };
      };
    
    async delete(req, res){
        try{
    
          const id = req.params.id;
          if (!id){
            return res.status(404).json({
              result: null,
              error: "ID não encontrado ou inválido"
            });
          };
          const arquivo = await Arquivo.findByPk(id);
    
          if (!arquivo){
            return res.status(404).json({
              result: null,
              error: "Cargo não registrado"
            });
          };
    
          await arquivo.destroy();

          fs.unlink(path.resolve(`static`, `files`, `${arquivo.filename}`), (err)=> {
            console.log(err)
          })
    
          return res.status(200).json({result: arquivo});
        }catch(err){
          return res.status(400).json({
            result: null,
            error: "Erro ao buscar o arquivo"
          });
        };
      };
}

export default new ArquivosController();