const Sequelize = require('sequelize');
const db = require('../mysql/db')
 
const Users = db.define('productTable', {
    productId: {
        type: db.Sequelize.INTEGER, primaryKey: true
    },
    nameProd: {
        type: db.Sequelize.STRING
    },
    priceProd: {
        type: db.Sequelize.FLOAT
    },
    imageProd: {
        type: db.Sequelize.LONGBLOB
    },
    previewProd: {
        type: db.Sequelize.INTEGER
    },
    subdepartment: {
        type: db.Sequelize.STRING
    }  
}, {
    timestamps: false,
    freezeTableName: true
})

//exporto o modulo 
module.exports = Users;