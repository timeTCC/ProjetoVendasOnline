const crypto = require("crypto");

const DADOS_CRIPTOGRAFAR = {
  algoritmo : "aes256",
  segredo : "OEXcKw_d3aOrMucGxwHCHw",
  tipo : "hex"
};


function criptografar(data) {   
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo); 
    cipher.update(data);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

function descriptografar(data) {
    const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    decipher.update(data, DADOS_CRIPTOGRAFAR.tipo);
    return decipher.final();
};

module.exports = {
    criptografar,
    descriptografar  
}