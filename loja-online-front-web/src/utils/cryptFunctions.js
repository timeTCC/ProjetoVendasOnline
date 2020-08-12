import api from '../services/api';

export async function encryptLocalStorage(key, value){
   var toEncrypt = value.replace(/"/g, "'");

   const data = {
      data: toEncrypt
   }

   console.log(data.data);

   await api.post('/criptografia/encriptografar', data)
      .then(res => {
         const token = res.data;
         console.log(token);
         localStorage.setItem(key, token);
      })
      .catch(error => {
         console.log(error);
      })
}

export async function decriptLocalStorage(key){
   const toDecrypt = localStorage.getItem(key);

   const data = {
      data: toDecrypt
   }

   const token = await api.post('/criptografia/descriptografar', data);

   return JSON.parse(token.data.replace(/'/g, '"'));
}

export async function decrypt(toDecrypt){
   const data = {
      data: toDecrypt
   }

   const decryptdetData = await api.post('/criptografia/descriptografar', data);

   return decryptdetData.data;
}