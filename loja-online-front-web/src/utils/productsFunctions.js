import api from '../services/api';

export async function loadProducts(categoryName){
   return await api.get('/category/categoryList').then(async res => {
      const category = res.data.find( category => category.subdepartment === categoryName );
      console.log(category);

      return await api.get('/product/findByCategory?categoryId=' + category.categoryId).then(res => {

         return res.data;
         }).catch(err => {
            console.log(err);
            return err;
         })
      
   }).catch(err => {
      console.log(err);
      return err;
   })
}
