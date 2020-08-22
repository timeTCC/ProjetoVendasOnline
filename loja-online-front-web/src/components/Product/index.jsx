import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router';
import api from '../../services/api';
import { store } from 'react-notifications-component';

import './styles.css';

const Product = (props) => {
   const product = props.product;
   const history = useHistory();

   const notificationConfig = {
      message: "Configurable",
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
          duration: 3000
      }
  }

   async function handleProductDelete(codgProd){
      const data = {
         codgProd: codgProd
      }

      await api.delete("/product/", { 
         headers: {
            'Content-Type': 'application/json',
         },
         data: data
      })
        .then(res=>{
            store.addNotification({
                ...notificationConfig,
                message: product.nameProd + " excluido.",
                type: "info"
            });

            props.reload();
        })
        .catch(error=>{
            console.log(error);
        });
   }

   function handleProductEdit(codgProd){
      history.push('/admin/editar-produtos/'+ codgProd);
   }

   if(props.editable){
      return(
         <div className='product-card'>
            <div className="product-codg">
               Codigo: <br />
               {product.codgProd}  
            </div>

            <div className="product-image">
               <img src={product.imageProd}/>  
            </div>
   
            <div className="product-info">
               <p className="product-name">{product.nameProd}</p>
               <p className="product-price">R$ {product.priceProd}</p>
            </div>

            <div className="product-settings">
               <div className='config-button' onClick={() => handleProductEdit(product.codgProd)}>
                  <div className="button-icon">
                     <FiEdit />
                  </div>
                  <div className="button-text">
                     Editar
                  </div>
               </div>
               <div className='config-button' onClick={() => handleProductDelete(product.codgProd)}>
                  <div className="button-icon">
                     <FiTrash />         
                  </div>
                  <div className="button-text">
                     Excluir
                  </div>
               </div>
            </div>
         </div>
      )
   } else {
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

   
}

export default Product;