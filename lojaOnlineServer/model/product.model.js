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
    categoryId: {
        type: db.Sequelize.INTEGER, foreingkey: true,
        constraints: false
    },
    codgProd: {
        type: db.Sequelize.BIGINT
    },
    descriptionProd: {
        type: db.Sequelize.STRING
    }  
}, {
    timestamps: false,
    freezeTableName: true
})

//exporto o modulo 
module.exports = Products;