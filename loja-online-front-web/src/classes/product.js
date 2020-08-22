class Product{
   constructor(product){
      this.nameProd = product.nameProd;
      this.stockProd = product.stockProd;
      this.priceProd = product.priceProd;
      this.imageProd = product.imageProd;
      this.previewProd = product.previewProd;
      this.codgProd = product.codgProd;
      this.descriptionProd = product.descriptionProd;
   }

   get(key){
      try {
         switch (key) {
            case 'nameProd':
               return this.nameProd;
               break;   
            case 'stockProd':
               return this.stockProd;
               break;
            case 'priceProd':
               return this.priceProd;
               break;    
            case 'imageProd':
               return this.imageProd;
               break;  
            case 'previewProd':
               return this.previewProd;
               break;   
            case 'codgProd':
               return this.codgProd;
               break;   
            case 'descriptionProd':
               return this.descriptionProd;
               break;
            default:
               return '';
         }
      } catch (error) {
         return '';
      }
      
   }
   
   set(product){
      this.nameProd = product.nameProd;
      this.stockProd = product.stockProd;
      this.priceProd = product.priceProd;
      this.imageProd = product.imageProd;
      this.previewProd = product.previewProd;
      this.codgProd = product.codgProd;
      this.descriptionProd = product.descriptionProd;
   }
}

export default Product;