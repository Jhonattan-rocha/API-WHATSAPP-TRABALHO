import Historico from "../models/Historico";

class HistoricoController {
  async store(req, res) {
    try{
      const historic = await Historico.create(req.body)
      return res.status(200).json({result: historic})
    }catch(err){
      console.log(err);
      return res.status(400).json({
          result: null,
          error: "Erro ao criar um item no historico"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.filter}
      const historic = await Historico.findAll(rules);
      return res.status(200).json({result: historic});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o historico"
    });
    };
  };

  async show(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "Historico não encontrado ou não existe"
      });
      };
      const historic = await Historico.findByPk(id, req.fields);

      return res.status(200).json({result: historic});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o historico"
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

      const historic = await Historico.findByPk(id, req.fields);

      if (!historic){
        return res.status(404).json({
          result: null,
          error: "historico não encontrado"
        })
      };

      const result = await historic.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao atualizar o historico"
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
      const historic = await Historico.findByPk(id, req.fields);

      if (!historic){
        return res.status(404).json({
          result: null,
          error: "Historico não encontrado"
        });
      };

      await historic.destroy();

      return res.status(200).json({result: historic});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o historico"
      });
    };
  };
};

export default new HistoricoController();