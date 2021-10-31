const {Model, DataTypes} = require('sequelize');

class Usuarios extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            senha: DataTypes.STRING,
            cpf: DataTypes.STRING,
            token: DataTypes.STRING
        }, {
            sequelize
        })
    }
}

module.exports = Usuarios;