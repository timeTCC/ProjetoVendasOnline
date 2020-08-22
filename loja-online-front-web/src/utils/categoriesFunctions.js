import api from '../services/api';

export async function getCategoryName(catId){
   //console.log(catId);

   return await api.get('/category/categoryList').then(res => {
      const categories = res.data;
      var catName;

      if(categories && categories.length > 0){
         categories.forEach(category => {
            if(category.categoryId === catId){
               //console.log(category.subdepartment);
               catName = category.subdepartment;
            }
         });

         return catName;
      }

   }).catch(err=>{
      console.log('Erro ao buscar nome da categoria pelo id');
      console.log(err);
   })   
}