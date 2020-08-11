const crypto = require("crypto");

const algorithm = 'des-ecb';
const password = 'some password';
// use a hex key here
const key = Buffer.from("d0e276d0144890d3", "hex");

function criptografar(data) {   
    const cipher = crypto.createCipheriv(algorithm, key, null);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');    
    return encrypted;
};

function descriptografar(data) {
    const decipher = crypto.createDecipheriv(algorithm, key, null);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');    
    return decrypted;
};




// const DADOS_CRIPTOGRAFAR = {
//   algoritmo : "aes256",  
//   codificacao : "utf8",
//   segredo : "OEXcKw_d3aOrMucGxwHCHw",
//   tipo : "hex"
// };


// function criptografar(data) {   
//     const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo); 
//     cipher.update(data);
//     return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
// };

// function descriptografar(data) {
//     const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
//     decipher.update(data, DADOS_CRIPTOGRAFAR.tipo, 'binary');
//     return decipher.final('binary');
// };

module.exports = {
    criptografar,
    descriptografar  
}