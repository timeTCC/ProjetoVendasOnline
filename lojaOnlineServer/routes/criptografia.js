const express = require('express');
const router = express.Router();
const CriptografiaService = require('../service/criptografia.service');

router.post('/encriptografar', (req, res) =>{      
    return res.status(200).send(CriptografiaService.criptografar(req.body.data));
})

router.post('/descriptografar', (req, res) =>{  
    return res.status(200).send(CriptografiaService.descriptografar(req.body.data));
})

module.exports = router;