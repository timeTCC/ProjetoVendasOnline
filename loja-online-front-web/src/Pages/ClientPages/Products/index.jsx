import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../components/Loading';
import Product from './Product';
import SortProducts from '../../../components/SortProducts';
import { loadProducts } from '../../../utils/productsFunctions';
import { setCategoryPage, setLoading } from '../../../services/actions';
import './styles.css';

const Products = (props) => {
	const [ products, setProducts ] = useState();
	const [ rederedProducts, setRenderedProducts ] = useState();
	const category = useSelector(state => state.categoryPage);
	const isLoading = useSelector(state => state.loading);

	const dispatch = useDispatch();

	useEffect(()=>{
      dispatch(setCategoryPage(category));
		dispatch(setLoading(true));

		loadProducts(category).then(res => {
            setProducts(res);
		});
	}, []);

	useEffect(()=>{
		setProducts(null);
		dispatch(setLoading(true));

		loadProducts(category).then(res => {
			setProducts(res);
			dispatch(setLoading(true));
		});
	}, [category]);

	useEffect(()=>{
		if(products){
			// Atualiza o stado de carregamento
			dispatch(setLoading(false));
		}

		renderProducts(products);

	}, [products]);

	// Recarrega os produtos do BD
	function reloadProducts(){
		setProducts(null);
		dispatch(setLoading(true));

		loadProducts(category).then(res => {
			setProducts(res);
			dispatch(setLoading(true));
		});
	}

	// Transforma os objetos do array de produtos em elementos do DOM e os coloca no state 'renderedProducts'
	function renderProducts(products){ 
		if(products !== null && products !== undefined){
			if(products.length === 0){
				setRenderedProducts(
					<>
						<p className='info'>Oops, parece que não há produtos listados nessa categoria...</p>
					</>
				)
            } else {      
               setRenderedProducts (
						<>
							{products.map(product => {
								return(
									<Product key={product.productId} product={product} editable={true} reload={reloadProducts} />
								)
							})}
						</>
					)
            }

		} else {
			setRenderedProducts('');
		}

		
	}

	return (
		<div id="page-products">
			<Header />
			<div className="page-content">
				<h2 className="category-title">{category ? category : 'Produtos sem categoria'}</h2>
				<hr />
				<SortProducts render={renderProducts} products={products} default='mostPopular'/>
				<Loading isLoading={isLoading} id='products-loading' color="#FF9F10" size={42} />
				<div id="products">
					{rederedProducts}
				</div>
			</div>
		</div>
	)
}

export default Products;