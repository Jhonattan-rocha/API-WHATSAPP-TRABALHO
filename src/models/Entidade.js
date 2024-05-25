import Sequelize, { Model } from "sequelize";

class Entidade extends Model{
    static init(sequelize){
        super.init({
          CODCLI: {
            type: Sequelize.STRING(8),
            allowNull: false,
            unique: true,
            primaryKey: true,
          },
          NOME: {
            type: Sequelize.STRING(80),
            allowNull: false
          },
          TELEFONE: {
            type: Sequelize.STRING(30),
            allowNull: false
          },
          DDD_FONE: {
            type: Sequelize.STRING(3),
            allowNull: false
          },
          END_ENT: {
            type: Sequelize.STRING(60),
            allowNull: true
          },
          NUM_ENT: {
            type: Sequelize.STRING(10),
            allowNull: true
          }
        }, {sequelize, tableName: 'ENTIDADE_001', timestamps: false});

        return this;
    };

    static associate(models){
      
    }
};


export default Entidade;