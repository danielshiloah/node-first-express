const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('new_schema', 'root', 'ds170283', {
    dialect: 'mysql', 
    host: 'localhost'
});



module.exports = sequelize;
