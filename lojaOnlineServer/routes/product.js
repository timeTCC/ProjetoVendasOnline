const express = require('express');
const router = express.Router();
const Products = require('../model/product.model')

// productId: integer;      
// nameProd: string;
// priceProd: double;     
// imageProd; blob;        
// previewProd: integer;
// subdepartment; string;
// codgProd: integer; 

router.post('/', (req, res) =>{
    Products.findOne({where: { //procura na tabela produto
      codgProd: req.body.codgProd, //codg de barras
    }}).then((product) =>{
      if(!product){// se na tabela não ouver nenhum produto como o mesmo codg de barras entao ele cria um novo
        Products.create({// é criado na tabela
            nameProd: req.body.nameProd,
            stockProd: req.body.stockProd,
            priceProd: req.body.priceProd,
            imageProd: req.body.imageProd,
            previewProd: req.body.previewProd,
            subdepartement: req.body.subdepartement,
            codgProd: req.body.codgProd
        }).then(()=>{
          return res.status(201).send('Produto criado com sucesso')
        }).catch((error) =>{
          return res.status(500).send(error)
        })
      }else{  
        console.log('codg do produto já existe')  
        return res.status(400).send('codg do produto já existe')      
      }
    }).catch((error) =>{
      return res.status(500).send(error)
    })  
 })

router.get('/', (req, res)=> {
  Products.findOne({where: { //procura na tabela produto
    codgProd: req.body.codgProd, //codg de barras
  }}).then((product) =>{
    if(product.codgProd === req.body.codgProd){
      return res.send({nameProd: req.body.nameProd,
        stockProd: req.body.stockProd,
        priceProd: req.body.priceProd,
        imageProd: req.body.imageProd,
        previewProd: req.body.previewProd,
        subdepartement: req.body.subdepartement,
        codgProd: req.body.codgProd})
    }else{
      return res.status(400).send('produto não existe')
    }              
  }).catch((error) =>{
    return res.status(500).send(error)
  })
})

router.delete('/', (req, res)=> {

  
})

module.exports = router;