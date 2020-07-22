const Sequelize = require('sequelize');
const db = require('../mysql/db')
 
const Users = db.define('users', {
    userId: {
        type: db.Sequelize.INTEGER, primaryKey: true
    },
    nameUser: {
        type: db.Sequelize.STRING
    },
    cpfUser: {
        type: db.Sequelize.INTEGER
    },
    phoneUser: {
        type: db.Sequelize.INTEGER
    },
    emailUser: {
        type: db.Sequelize.STRING
    },
    passwordUser: {
        type: db.Sequelize.STRING
    },
    profileUser: {
        type: db.Sequelize.STRING
    }
}, {
    timestamps: false
})

//exporto o modulo 
module.exports = Users;