import React, { useEffect, useState } from 'react';

const Product = (props) => {
   const [ imageBase64, setImageBase64 ] = useState('');
   const product = props.product;

   function toBase64(data) {
      
   }
  
   useEffect(()=>{
      // let bufferOriginal = Buffer.from(product.imageProd.data);
      // setImageBase64(bufferOriginal.toString('utf8'));
   }, [])
   

   return(
      <div key={product.productId}>
         <img src={product.imageProd}/>
      </div>
   )
}

export default Product;