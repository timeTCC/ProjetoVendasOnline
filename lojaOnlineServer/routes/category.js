const express = require('express');
const router = express.Router();
const Category = require('../model/category.model');

// subdepartment; Filho
// department; PAI

router.post('/', (req, res) => {
    if(!req.body.subdepartment){ //verifico se o parametro veio vazio
        return res.status(404).send('Categoria vazia --- parametro vazio')
    }else{
        Category.findOne({where: { //procura na tabela categoryTable
            subdepartment: req.body.subdepartment, //categoria filho enviado pelo front
        }}).then((subdepartment) =>{
            if(!subdepartment){ //verifico se a cat filho ja existe na tabela para nao cadastrar duplicado       
                Category.findOne({where: {//procuro na tabela 
                    subdepartment: req.body.department, 
                }}).then((department) => {
                    if(department || !req.body.department){ //verifico se existe o pai, se é um pai vazio 
                        Category.create({// é criado na tabela
                            subdepartment: req.body.subdepartment,
                            department: req.body.department              
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



module.exports = router;