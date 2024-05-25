import Sequelize, { Model } from "sequelize";

class Status extends Model{
    static init(sequelize){
        super.init({
          ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
          },
          DATA: {
            type: Sequelize.DATE,
            allowNull: false
          },
          PEDIDO: {
            type: Sequelize.STRING(12),
            allowNull: false,
            references: {
                key: 'NUMERO',
                model: 'PEDIDO_001'
            }
          },
          STATUS_NOVO: {
            type: Sequelize.STRING(5),
            allowNull: false,
          },
          STATUS_ANT: {
            type: Sequelize.STRING(5),
            allowNull: false,
          }
        }, {sequelize, tableName: 'STATUSPED', timestamps: false});

        return this;
    };

    static associate(models){
      this.belongsTo(models.Pedido, {
        foreignKey: 'PEDIDO',
      })
    }
};


export default Status;