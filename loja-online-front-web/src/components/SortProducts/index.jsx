import React, { useEffect } from 'react';
import { 
   sortByCheapest, 
   sortByPopular, 
   sortByUnpopular, 
   sortByExpensive,
   sortByAtoZ,
   sortByZtoA
} from './functions';

import './styles.css';

const SortProducts = (props) => {

   useEffect(() => {
      if(props.products !== null && props.products !== undefined){
         handleKeyChange(props.default);
      }
   }, [props.products]);

   function handleKeyChange(sortBy){
      // console.log(event.target.value);
      switch (sortBy) {
         case 'mostPopular':
            props.render(sortByPopular(props.products));
            break;

         case 'lessPopular':
            props.render(sortByUnpopular(props.products));
            break;           

         case 'cheapest':
            props.render(sortByCheapest(props.products));
            break;

         case 'aToZ':
            props.render(sortByAtoZ(props.products));   
            break;

         case 'zToA':
            props.render(sortByZtoA(props.products));
            break;

         case 'expensive':
            props.render(sortByExpensive(props.products));   
            break;

         default:
            break;
      }


      // props.returnProducts();
   }

   return(
      <div id="sort-products">
         <p >Listar por: </p>
         <select name="key" id="select-key" value={props.default} onChange={event => {handleKeyChange(event.target.value)}}>
            <option value="aToZ">De A-Z</option>
            <option value="zToA">De Z-A</option>
            <option value="mostPopular">Mais Populares</option>
            <option value="lessPopular">Menos Populares</option>
            <option value="cheapest">Mais Baratos</option>
            <option value="expensive">Mais Caros</option>
         </select>
      </div>
   )
}

export default SortProducts;