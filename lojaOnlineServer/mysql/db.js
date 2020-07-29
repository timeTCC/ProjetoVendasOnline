const Sequelize = require('sequelize');

module.exports = new Sequelize('lojaOnline', 'root', 'XM8maxter', {
    host: "localhost",
    dialect: 'mysql',
    dialectOptions: {
        supportBigNumbers: true
    }
})