import Sequelize, { Model } from "sequelize";

class Representante extends Model{
    static init(sequelize){
        super.init({
          CODREP: {
            type: Sequelize.STRING(8),
            allowNull: false,
            unique: true,
            primaryKey: true,
          },
          NOME: {
            type: Sequelize.STRING(100),
            allowNull: false
          },
          TELEFONE: {
            type: Sequelize.STRING(18),
            allowNull: false
          }
        }, {sequelize, tableName: 'REPRESEN_001', timestamps: false});

        return this;
    };

    static associate(models){
      
    }
};


export default Representante;