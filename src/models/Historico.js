import Sequelize, { Model } from "sequelize";

export default class Historico extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            conteudo: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            telefone: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            nome_cliente: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            pedido: {
                type: Sequelize.STRING(12),
                allowNull: true,
            },
            status: {
                type: Sequelize.STRING(5),
                allowNull: true,
            },
            send: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        }, {
            sequelize, 
            tableName: 'historic'
        })
    };

    static associate(models){

    }
}