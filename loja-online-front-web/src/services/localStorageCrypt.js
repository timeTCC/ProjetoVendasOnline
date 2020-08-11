import api from './api';

export async function encryptLocalStorage(key, value){

   
   var newStr = value.replace(/{/g, "=>");
   var newStr = newStr.replace(/}/g, "<=");

   var data = {
      "data": newStr
   }

   console.log(value);
   console.log(data.data);

   await api.post('/criptografia/encriptografar', data)
      .then(res => {
         const token = res.data;
         localStorage.setItem(key, token);
      })
      .catch(error => {
         console.log(error);
      })
}