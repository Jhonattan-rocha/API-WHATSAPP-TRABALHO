import Sequelize, { Model } from "sequelize";

class Pedido extends Model{
    static init(sequelize){
        super.init({
          NUMERO: {
            type: Sequelize.STRING(12),
            allowNull: false,
            unique: true,
            primaryKey: true,
          },
          CODCLI: {
            type: Sequelize.STRING(8),
            allowNull: false,
            references: {
                key: 'CODCLI',
                model: 'ENTIDADE_001'
            }
          },
          CODREP: {
            type: Sequelize.STRING(8),
            allowNull: false,
            references: {
                key: 'CODREP',
                model: 'REPRESEN_001'
            }
          },
          NOTA: {
            type: Sequelize.STRING(12),
            allowNull: false,
          },
          ENTREGA: {
            type: Sequelize.DATE,
            allowNull: true,
          }
        }, {sequelize, tableName: 'PEDIDO_001', timestamps: false});

        return this;
    };

    static associate(models){
        this.belongsTo(models.Representante, {
            foreignKey: 'CODREP',
        });
        this.belongsTo(models.Entidade, {
            foreignKey: 'CODCLI',
        });
    }
};


export default Pedido;