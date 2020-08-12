import api from '../services/api';
import { decrypt } from './cryptFunctions';

export async function userTokenAuthentication(userToken){
   return await decrypt(userToken.passaword).then(async (res) => {
      const decriptedPassword = res.toString();

      const data = {
         emailUser: userToken.email,
         passwordUser: decriptedPassword
      }

   
      return await api.post('users/authenticate', data).then(response => {
         console.log("Usuário autenticado");
         return true;

      }).catch(error => {
         switch (error.response.status) {
            case 400:
               console.log("Oops, senha incorreta.");
               break;
            case 404:
               console.log("Oops, usuário ainda não cadastrado.");
               break;
            case 500:
               console.log("Oops, erro ao efetuar o login.");
               break;
         }

         console.log(data);
         
         return false;
      });
   });
}