const {Model, DataTypes} = require('sequelize');

class Log extends Model {
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING
        }, {
            sequelize
        })
    }
}

module.exports = Log;