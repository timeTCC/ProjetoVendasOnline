import React, { useEffect, useState } from 'react';

import './styles.css';

const Product = (props) => {
   const product = props.product;
  
   useEffect(()=>{
      
   }, [])

   return(
      <div className='product-card'>
         <div className="product-image">
            <img src={product.imageProd}/>   
         </div>

         <div className="product-info">
            <p className="product-name">{product.nameProd}</p>
            <p className="product-price">R$ {product.priceProd}</p>
         </div>
      </div>
   )
}

export default Product;