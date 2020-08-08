const express = require('express');
const router = express.Router();
const Users = require('../model/users.model');
const CriptografiaService = require('../service/criptografia.service');

//aqui recebo as informações do front e respondo com sucesso ou erro
router.post('/authenticate', (req, res) =>{  //validação do usuario no BD
  Users.findOne({where: { //procuro uma linha ONDE usuario recebido pelo front seja igual o usuario do BD
    emailUser: req.body.emailUser,     
  }}).then((user) =>{   
    if(!user){
      return res.status(404).send('user not found') //caso não encontre o usuario volta erro 400 "usuario nao encontrado"
    }
    if(user.passwordUser === CriptografiaService.criptografar(req.body.passwordUser)){ //verificação da senha
      return res.send({user: user.nameUser, cpf: user.cpfUser, phone: user.phoneUser, email: user.emailUser, profile: user.profileUser }) //caso encontre o usuario eu retorno o usuario para o front
    }else{
      return res.status(400).send('invalid password') //senha invalida erro 400
    }
  }).catch((error) =>{
    return res.status(500).send(error) //caso de um erro de conexao com banco ou erro pq pifou msm eu retorno um erro 500 
  })
})

router.post('/create', (req, res) =>{//endereço register
  Users.findOne({where: { //procura na tabela users
    emailUser: req.body.emailUser, //onde userName é igual o parametro passado pelo front
  }}).then((user) =>{
    if(!user){// se na tabela não ouver nenhum usuario com o nome que esta sendo inserido entao ele cria um novo usuario
      Users.create({// é criado na tabela
        nameUser: req.body.nameUser, 
        cpfUser: req.body.cpfUser,
        phoneUser: req.body.phoneUser,
        emailUser: req.body.emailUser, 
        passwordUser: CriptografiaService.criptografar(req.body.passwordUser),
        profileUser: req.body.profileUser       
      }).then(()=>{
        return res.status(201).send('usuário criado com sucesso')
      }).catch((error) =>{
        return res.status(500).send(error)
      })
    }else{  
      console.log('usuário já existe')  
      return res.status(400).send('usuário já existe')      
    }
  }).catch((error) =>{
    return res.status(500).send(error)
  })  
})

module.exports = router;