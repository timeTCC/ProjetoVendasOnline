const db = require('../mysql/db')
 
const Category = db.define('categoryTable', {
    categoryId: {
        type: db.Sequelize.INTEGER, primaryKey: true,
        autoIncrement: true
    },
    subdepartment: {
        type: db.Sequelize.STRING
    },
    department: {
        type: db.Sequelize.STRING
    }    
}, {
    timestamps: false,
    freezeTableName: true
})

//exporto o modulo 
module.exports = Category;