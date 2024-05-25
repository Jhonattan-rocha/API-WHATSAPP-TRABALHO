import Sequelize, { Model } from "sequelize";

class Usuario extends Model{
    static init(sequelize){
        super.init({
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
          },
          nome: {
            type: Sequelize.STRING(80),
            allowNull: false
          },
          email: {
            type: Sequelize.STRING(30),
            allowNull: false
          },
          password: {
            type: Sequelize.STRING(30),
            allowNull: false
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }, {sequelize, tableName: 'user', timestamps: true});

        return this;
    };

    static associate(models){
      
    }
};


export default Usuario;