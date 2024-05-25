import Sequelize, { Model } from "sequelize";

export default class Mensagem extends Model {
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
            status: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            client_status: {
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
            tableName: 'mensagens'
        })
    };

    static associate(models){

    }
}