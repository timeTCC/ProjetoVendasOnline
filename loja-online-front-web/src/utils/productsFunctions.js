import api from '../services/api';

// Carrega produtos por categoria
export async function loadProducts(categoryName){
   return await api.get('/category/categoryList')
   .then(async res => {
      const category = res.data.find( category => category.subdepartment === categoryName );

      //Se a categorias for null, procurando por produtos sem categoria
      if(category === undefined){
         return await api.get('/product/findByCategory?categoryId=null')
         .then(res => {
            return res.data;
         }).catch(err => {
            console.log(err);
            return err;
         })

      //Se a busca pelo id da categoria retornar algo
      } else {
         console.log(category);

         return await api.get('/product/findByCategory?categoryId=' + category.categoryId)
         .then(res => {
            return res.data;
         }).catch(err => {
            console.log(err);
            return err;
         })
      }
      
   }).catch(err => {
      console.log(err);
      return err;

   })
}

// Carrega produto pelo seu código
export async function loadProductByCodg(codgProd){
   return await api.get('http://localhost:3333/product/findByCodg?codgProd=' + codgProd).then(res => {
      return res.data;
   }).catch(err => {
      console.log(err);
      return err;
   })
}
