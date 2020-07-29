const express = require('express');
const router = express.Router();
const Products = require('../model/product.model')
//const formidable = require('formidable');

// productId: integer;      
// nameProd: string;
// priceProd: double;     
// imageProd; blob;        
// previewProd: integer;
// subdepartment; string;
// codgProd: integer; 

router.post('/', (req, res) =>{
  // const form = formidable({ multiples: true });
  // form.parse(req, (error, fields, files) => {
  //   console.log(json(fields));
  //   res.json({ fields, files });
  // });
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
            subdepartment: req.body.subdepartment,
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
      return res.status(500).send('error não procurou na tabela')
    })  
 })

router.get('/', (req, res)=> {  
  Products.findOne({where: { //procura na tabela produto
    codgProd: req.query.codgProd, //codg de barras
  }}).then((product) =>{   
    if(product.codgProd === parseInt(req.query.codgProd)){
      return res.send({
        nameProd: product.nameProd,
        stockProd: product.stockProd,
        priceProd: product.priceProd,
        imageProd: product.imageProd,
        previewProd: product.previewProd,
        subdepartement: product.subdepartement,
        codgProd: product.codgProd})
    }else{
      return res.status(400).send('produto não existe')
    }              
  }).catch((error) =>{
    return res.status(500).send(error)
  })
})

router.put('/', (req, res) =>{
    Products.findOne({where: { //procura na tabela produto
      codgProd: req.body.codgProd, //codg de barras
    }}).then((product) =>{
      if(product){
        product.update({
          nameProd: req.body.nameProd,
          stockProd: req.body.stockProd,
          priceProd: req.body.priceProd,
          imageProd: req.body.imageProd,
          previewProd: req.body.previewProd,
          subdepartment: req.body.subdepartment,
          codgProd: req.body.codgProd
      }).then(()=>{
        return res.status(200).send('Produto alterado com sucesso')
      }).catch((error) =>{
        return res.status(500).send(error)
      })
      }else{         
        return res.status(400).send('codg do produto não existe')      
      }
    }).catch((error) =>{
      return res.status(500).send(error)
    })  
 })

router.delete('/', (req, res)=> {
  Products.destroy({where: {
    codgProd: req.body.codgProd, //codg de barras
  }}).then(()=>{
    return res.status(200).send('Produto deletado com sucesso')
  }).catch((error) =>{
    return res.status(500).send(error)
  })
})

module.exports = router;