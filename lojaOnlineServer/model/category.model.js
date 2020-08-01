const db = require('../mysql/db')
 
const Category = db.define('categoryTable', {
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
module.exports = Category;