export function sortByCheapest(products){
   //console.log(products);

   return products.sort((a, b) => {
      var keyA = a.priceProd;
      var keyB = b.priceProd;

      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;

      return 0;
   })
}

export function sortByExpensive(products){
   return products.sort((a, b) => {
      var keyA = a.priceProd;
      var keyB = b.priceProd;

      if(keyA > keyB) return -1;
      if(keyA < keyB) return 1;
      
      return 0;
   })
}

export function sortByPopular(products){
   return products.sort((a, b) => {
      var keyA = a.previewProd;
      var keyB = b.previewProd;

      if(keyA > keyB) return -1;
      if(keyA < keyB) return 1;

      return 0;
   })
}

export function sortByUnpopular(products){
   return products.sort((a, b) => {
      var keyA = a.previewProd;
      var  keyB = b.previewProd;

      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;

      return 0;
   })
}

export function sortByAtoZ(products){
   return products.sort((a, b) => {
      var keyA = a.nameProd;
      var keyB = b.nameProd;

     if(keyA < keyB) return -1;
     if(keyA > keyB) return 1;
      
     return 0;
   })
}

export function sortByZtoA(products){
   return products.sort((a, b) => {
      var keyA = a.nameProd;
      var  keyB = b.nameProd;

     if(keyA > keyB) return -1;
     if(keyA < keyB) return 1;
      
     return 0;
   })
}
