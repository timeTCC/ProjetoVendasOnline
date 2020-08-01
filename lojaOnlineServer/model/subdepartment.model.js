const Sequelize = require('sequelize');
const db = require('../mysql/db')
 
const Subdepartment = db.define('subdepartmentTable', {
    subdepartment: {
        type: db.Sequelize.STRING, primaryKey: true
    },
    department: {
        type: db.Sequelize.STRING
    }    
}, {
    timestamps: false,
    freezeTableName: true
})

//exporto o modulo 
module.exports = Subdepartment;