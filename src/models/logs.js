const {Model, DataTypes} = require('sequelize');

class Log extends Model {
    static init(sequelize) {
        super.init({
            a: DataTypes.INTEGER,
            b: DataTypes.INTEGER
        }, {
            sequelize
        })
    }
}

module.exports = Log;