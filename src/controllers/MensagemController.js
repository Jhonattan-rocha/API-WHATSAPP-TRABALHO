import Mensagem from "../models/Mensagem";

class MensagemController {
  async store(req, res) {
    try{
      const mensagem = await Mensagem.create(req.body)
      return res.status(200).json({result: mensagem})
    }catch(err){
      console.log(err);
      return res.status(400).json({
          result: null,
          error: "Erro ao criar a mensagem"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.filter}
      const mensagem = await Mensagem.findAll(rules);
      return res.status(200).json({result: mensagem});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar as mensagens"
    });
    };
  };

  async show(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "Mensagem não encontrada ou não existe"
      });
      };
      const mensagem = await Mensagem.findByPk(id, req.fields);

      return res.status(200).json({result: mensagem});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar a mensagem"
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

      const mensagem = await Mensagem.findByPk(id, req.fields);

      if (!mensagem){
        return res.status(404).json({
          result: null,
          error: "mensagem não encontrada"
        })
      };

      const result = await mensagem.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao atualizar a mensagem"
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
      const mensagem = await Mensagem.findByPk(id, req.fields);

      if (!mensagem){
        return res.status(404).json({
          result: null,
          error: "Mensagem não encontrada"
        });
      };

      await mensagem.destroy();

      return res.status(200).json({result: mensagem});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar a mensagem"
      });
    };
  };
};

export default new MensagemController();