const db = require('../mysql/db')
 
const Products = db.define('productTable', {
    productId: {
        type: db.Sequelize.INTEGER, primaryKey: true,
        autoIncrement: true
    },
    nameProd: {
        type: db.Sequelize.STRING
    },
    stockProd:{
        type: db.Sequelize.INTEGER
    },
    priceProd: {
        type: db.Sequelize.FLOAT
    },
    imageProd: {
        type: db.Sequelize.BLOB('long')
    },
    previewProd: {
        type: db.Sequelize.BIGINT
    },
    subdepartment: {
        type: db.Sequelize.STRING, foreingkey: true
    },
    codgProd: {
        type: db.Sequelize.BIGINT
    }  
}, {
    timestamps: false,
    freezeTableName: true
})

//exporto o modulo 
module.exports = Products;