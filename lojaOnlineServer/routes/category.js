const express = require('express');
const router = express.Router();
const Category = require('../model/category.model');
const categoryService = require('../service/category.service');

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



module.exports = router;