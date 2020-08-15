import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../components/Loading';
import Product from './Product';
import { loadProducts } from '../../../utils/productsFunctions';
import { setCategoryPage, setLoading } from '../../../services/actions';
import './styles.css';

const Products = (props) => {
	const [ products, setProducts ] = useState();
	const category = useSelector(state => state.categoryPage);
	const isLoading = useSelector(state => state.loading);

	const dispatch = useDispatch();
	let { categoryName } = useParams();

	useEffect(()=>{
		dispatch(setCategoryPage(category));
		dispatch(setLoading(true));
		console.log('loading true');

		loadProducts(categoryName).then(res => {
			setProducts(res);
			
			console.log('loading false');
		});
	}, []);

	useEffect(()=>{
		if(category){
			loadProducts(category).then(res => {
				setProducts(res);
			});
		}
	}, [category]);

	useEffect(()=>{
		if(products){
			dispatch(setLoading(false));
		}
	}, [products]);

	

	function renderProducts(products){ 
		if(products !== undefined){
			if(products.length === 0){
				return(
					<p className='info'>Oops, parece que não há produtos listados nessa categoria...</p>
				)
			}

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
			<div className="page-content">
				<h2 className="category-title">{categoryName}</h2>
				<hr />
				<Loading isLoading={isLoading} id='products-loading' color="#FF9F10" size={42} />

				<div id="products">
					{renderProducts(products)}
				</div>
			</div>
		</div>
	)
}

export default Products;