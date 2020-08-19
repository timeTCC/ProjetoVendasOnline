import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { FiPlus } from 'react-icons/fi';
import Loading from '../../../components/Loading';
import Product from '../../../components/Product';
import CategoriesMenu from '../../../components/CategoriesMenu';
import { loadProducts } from '../../../utils/productsFunctions';
import { setCategoryPage, setLoading } from '../../../services/actions';
import SortProducts from '../../../components/SortProducts';
import './styles.css';
import AdminHeader from '../../../components/AdminHeader';
import './styles.css';
import { Link } from 'react-router-dom';

const AdminProdutos = () => {
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
						<Link to='/admin/registrar-produtos'>
							<div className="add-product-card">
								<div className="icon">
									<FiPlus />	
								</div>
							</div>
						</Link>

						<p className='info'>Oops, parece que não há produtos listados nessa categoria...</p>
					</>
				)
            } else {      
               setRenderedProducts (
						<>
							<Link to='/admin/registrar-produtos'>
								<div className="add-product-card">
									<div className="icon">
										<FiPlus />	
									</div>
								</div>
							</Link>

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
		<div id="page-admin-products">
			<AdminHeader page='products' />
			<div className="page-content">
            <CategoriesMenu showUncategorized={true} linkTo={false} />
				<h2 className="category-title">{category ? category : 'Produtos sem categoria'}</h2>
				<hr />
				<SortProducts render={renderProducts} products={products} default='mostPopular'/>
				<Loading isLoading={isLoading} id='products-loading' color="#FF9F10" size={42} />
				<div id="admin-products">
					{rederedProducts}
				</div>
			</div>
		</div>
	)
}

export default AdminProdutos;