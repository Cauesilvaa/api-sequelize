const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuario = require('../model/Usuario');

// Startando o Sequelize passando o banco 'dbConfig' q eu to criando
const connection = new Sequelize(dbConfig)

Usuario.init(connection);

module.exports = connection;