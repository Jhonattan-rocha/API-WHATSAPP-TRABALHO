import Sequelize, { Model } from "sequelize";

class Arquivo extends Model{
    static init(sequelize){
        super.init({
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          originalname: {
            type: Sequelize.STRING(200),
            allowNull: false
          },
          filename: {
            type: Sequelize.STRING(200),
            allowNull: false
          },
          mime_type: {
            type: Sequelize.STRING,
            allowNull: true
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }, {sequelize, tableName: 'files'});

        return this;
    };

    static associate(models){
      
    }
};


export default Arquivo;