const Sequelize = require('sequelize');
const db = require('../mysql/db')
 
const Users = db.define('productTable', {
    
}, {
    timestamps: false,
    freezeTableName: true
})

//exporto o modulo 
module.exports = Users;