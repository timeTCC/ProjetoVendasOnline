const express = require('express');
const router = express.Router();
const Category = require('../model/category.model');
const categoryService = require('../service/category.service');
const Products = require('../model/product.model');

// subdepartment; Filho
// department; PAI


router.post('/', (req, res) => {
    const categoryName = req.body.department; //subdepartment; Filho
    const fatherName = req.body.isSubOf; //department; PAI
    if(!categoryName){ //verifico se o parametro veio vazio
        return res.status(404).send('Categoria vazia --- parametro vazio')
    }else{
        Category.findOne({where: { //procura na tabela categoryTable
            subdepartment: categoryName, //categoria filho enviado pelo front
        }}).then((subdepartment) =>{
            if(!subdepartment){ //verifico se a cat filho ja existe na tabela para nao cadastrar duplicado       
                Category.findOne({where: {//procuro na tabela 
                    subdepartment: fatherName, 
                }}).then((department) => {
                    if(department || !fatherName){ //verifico se existe o pai, se é um pai vazio 
                        Category.create({// é criado na tabela
                            subdepartment: categoryName,
                            department: fatherName              
                        }).then(()=>{
                            return res.status(201).send('Categoria criado com sucesso')
                        }).catch((error) =>{
                            return res.status(500).send(error)
                        })
                    }else{
                        return res.status(404).send('Categoria pai inexistente --- parametro vazio')                        
                    }
                })                
            }else{  
                console.log('Categoria ja existe')  
                return res.status(400).send('Categoria ja existe')      
            }
        }).catch((error) =>{
            return res.status(500).send('error não procurou na tabela')
        })
    }      
})

router.get('/', (req, res)=> {  
    Category.findAll().then((list) => {
        const categoryList = [];
        categoryService.populateFistLevel(list, categoryList);
        categoryList.forEach((category) => {
            categoryService.findChildrenForFather(list, category);
        });
        res.send(categoryList);            
    })    
})

router.get('/specificCategory', (req, res)=> {  
    const categoryNameSubDepartment = req.query.department; //subdepartment; Filho   
    Category.findAll().then((list) => {
        const categoryList = [];
        categoryList.push({
            categoryName: categoryNameSubDepartment,
            subCategories: []
        })
        categoryList.forEach((category) => {
            categoryService.findChildrenForFather(list, category);
        });
        res.send(categoryList);            
    })    
})

router.get('/categoryList', (req, res)=> { 
    Category.findAll().then((categoryList) => {            
        res.send(categoryList);            
    })    
})

router.delete('/', (req, res)=> {
    const categoryNameSubDepartment = req.query.department;
    Category.findOne({where: {
        subdepartment: categoryNameSubDepartment,
    }}).then((subdepartment) =>{
        if(!subdepartment){
            console.log('Categoria não existente')  
            return res.status(400).send('Categoria não existente --- não pode ser excluido')    
        }else{
            Category.findAll({where: {
                department: categoryNameSubDepartment, 
            }}).then((childrenList) => {
                if(childrenList.length === 0){
                    Products.update({categoryId: null}, {where: {
                        categoryId: subdepartment.categoryId,
                    }}).then(() => {
                        Category.destroy({where: {
                            subdepartment: categoryNameSubDepartment, //codg de barras
                        }}).then(()=>{
                            return res.status(200).send('Categoria deletado com sucesso')    
                        }).catch((error) =>{
                            return res.status(500).send(error)
                        })
                    })                                        
                }else{
                    console.log('Categoria tem uma subcategoria')
                    return res.status(400).send('Categoria não pode ser excluida é pai')
                }                
            })            
            // if(categoryNameSubDepartment === department){
            //     console.log('Categoria é pai')  
            //     return res.status(400).send('Categoria não pode ser excluida é pai')
            // }else{
            //     Products.destroy({where: {
            //         subdepartment: categoryNameSubDepartment, //codg de barras
            //       }}).then(()=>{
            //         return res.status(200).send('Produto deletado com sucesso')
            //       }).catch((error) =>{
            //         return res.status(500).send(error)
            //       })
            // }   
        }
    })    
})


module.exports = router;