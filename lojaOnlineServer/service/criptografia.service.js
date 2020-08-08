const crypto = require("crypto");

const DADOS_CRIPTOGRAFAR = {
  algoritmo : "aes256",
  segredo : "OEXcKw_d3aOrMucGxwHCHw",
  tipo : "hex"
};


function criptografar(password) {   
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo); 
    cipher.update(password);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

function descriptografar(password) {
    const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    decipher.update(password, DADOS_CRIPTOGRAFAR.tipo);
    return decipher.final();
};

module.exports = {
    criptografar,
    descriptografar  
}