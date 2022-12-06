const Sequelize = require('sequelize');
const database = require('../config/db');

const Log = require('../models/logs');

const connection = new Sequelize(database);

Log.init(connection);

module.exports = connection;