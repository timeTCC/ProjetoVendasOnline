const Sequelize = require('sequelize');
const db = require('../mysql/db')
 
const Users = db.define('userstable', {
    userId: {
        type: db.Sequelize.INTEGER, primaryKey: true
    },
    nameUser: {
        type: db.Sequelize.STRING
    },
    cpfUser: {
        type: db.Sequelize.STRING
    },
    phoneUser: {
        type: db.Sequelize.STRING
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
    timestamps: false,
    freezeTableName: true
})

//exporto o modulo 
module.exports = Users;