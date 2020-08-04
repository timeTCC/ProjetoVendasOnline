import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import Axios from 'axios';
import { FiTrash, FiPlus } from 'react-icons/fi';

import AdminHeader from '../../../components/AdminHeader';
import Loading from '../../../components/Loading';

import './styles.css';

const AdminCategories = () => {
    const [ categories, setCategories ] = useState([]);
    const [ categoriesDOM, setCategoriesDOM ] = useState(<Loading size={40} color="#FF9F10" />);

    const api = Axios;


    function handleCategoryCreate(event, category){
        const formData = {
            'catName': event.currentTarget.querySelector('input').value,
            'isSubOf': category
        }
        event.preventDefault();

        console.log(formData);
       
    }

    // Carrega categorias do servidor via API
    async function loadCategories(){
        setCategoriesDOM(<Loading size={40} color="#FF9F10" />);  
        await api.get('https://jsonbox.io/box_8590a2b9c900cbc98925')
            .then((response)=>{
                setCategories(response.data);
                console.log("Carregou categorias");
            }).catch((error)=>{
                console.log("Erro no carregamento das categorias " + error);
            });
    }

    // Renderiza as subcategorias
    function renderSubCategories(category){
        return category.map((category)=>{
            return (
                <div id={category.categoryName} key={category.categoryName} className="sub-category">

                    <div className="sub-category-title">
                        <div className="text">
                            {category.categoryName}
                        </div>
                        <div className="delete-button">
                            <FiTrash size="12px"/>
                        </div>
                    </div>
                        
                    {(category.subCategories != []) ? renderSubCategories(category.subCategories) : null}
                    
                    <div id={category.categoryName} className="add-category">
                        <form onSubmit={(event) => handleCategoryCreate(event, category.categoryName)}>
                            <input type="text" name="catName"/>
                            <button type="submit">
                                <FiPlus />
                            </button>
                        </form>
                    </div>  

                </div>

            )
        })
    }

    // Renderiza categorias
    function renderCategories(){
        return categories.map((category)=>{
            return (
                <div key={category.categoryName} className="category-container">
                    <div className="root-category-title">
                        <div className='text'>
                            {category.categoryName}
                        </div>
                        <div className="delete-button">
                            <FiTrash size="12px"/>
                        </div>
                    </div>
                    
                    {(category.subCategories != []) ? renderSubCategories(category.subCategories) : null}

                    <div id={category.categoryName} className="add-category">
                        <form onSubmit={(event) => handleCategoryCreate(event, category.categoryName)}>
                            <input type="text" name="catName"/>
                            <button type="submit">
                                <FiPlus />
                            </button>
                        </form>
                    </div>  

                </div>
            )
        })
    }

    // Carrega categorias da API e as coloca em 'categories'
    useEffect(()=>{
        loadCategories();
    }, []);

    // Quando 'categories' é definido chama a função que renderiza as categorias em um DOM e o coloca em 'categoriesDOM'
    useEffect(()=>{
        setCategoriesDOM(renderCategories());
    }, [categories]);

    useEffect(()=>{

    },[categoriesDOM])

    return(
        <div id="page-admin-categories">
                <AdminHeader page="Categorias" />
            <div className="page-content">
                <h1>Categorias</h1>
                <hr />
                <div id="categories">  
                    {categoriesDOM} 
                </div>

                <div className="category-container">
                    <div className="root-category-title">
                        <div className='text'>
                            Adicionar <FiPlus size="12px"/>
                        </div>
                    </div>
                    <div className="add-root-category">
                        <form onSubmit={(event) => handleCategoryCreate(event, 'none')}>
                            <input type="text" name="catName"/>
                            <button type="submit"><FiPlus /></button>
                        </form>
                    </div>  
                </div>

            </div>
        </div>
    )
}

export default AdminCategories;