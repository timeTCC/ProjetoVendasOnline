import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { useParams } from "react-router";

import Loading from '../../../components/Loading';
import Product from './Product';

import { loadProducts } from '../../../utils/productsFunctions';

const Products = (props) => {
	const [ products, setProducts ] = useState();
	let { categoryName } = useParams();

	useEffect(()=>{
		loadProducts(categoryName).then(res => {
			setProducts(res);
		});
	}, [])

	useEffect(()=>{
		console.log(products);
	}, [products]);

	function renderProducts(products){ 
		if(products !== undefined){
			return products.map(product => {
				return(
					<Product key={product.productId} product={product} />
				)
			})
		} else {
			return '';
		}
		
	}

	return (
		<div id="page-products">
			<Header />
			<div className="content">
				<div>Esta é a pagina de produtos categoria = {categoryName}</div>
				<Loading id='products-loading' color="#FF9F10" size={42} />
				{renderProducts(products)}
			</div>
		</div>
	)
}

export default Products;