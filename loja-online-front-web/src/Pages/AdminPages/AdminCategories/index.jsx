import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { store } from 'react-notifications-component';
import Axios from 'axios';
import { FiTrash, FiPlus } from 'react-icons/fi';

import AdminHeader from '../../../components/AdminHeader';
import Loading from '../../../components/Loading';
import api from '../../../services/api';

import './styles.css';

const AdminCategories = () => {
    const [ categories, setCategories ] = useState([]);
    const [ categoriesDOM, setCategoriesDOM ] = useState();
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

    

    async function handleCategoryCreate(event, category){
        const formData = {
            'department': event.currentTarget.querySelector('input').value,
            'isSubOf': category
        }

        event.preventDefault();
        document.getElementById('add-root-category-input').value = "";

        await api.post('http://localhost:3333/category/', formData)
            .then(res=>{
                loadCategories();
                store.addNotification({
                    ...notificationConfig,
                    title: '#'+ category +' form input',
                    message: "Categoria adicionada com sucesso!",
                    type: "info"
                });
            })
            .catch(error=>{
                switch (error.response.status) {
                    case 400:
                        store.addNotification({
                            ...notificationConfig,
                            title: "Erro",
                            message: "Ops, não é possível adionar categorias com nomes iguais",
                            type: "warning",
                        });
                        break;
                
                    default:
                        break;
                }
            })

        //loadCategories();
        console.log(formData);
       
    }

    // Deleta categoria
    async function deleteCategory(category){

        console.log(category);

        await api.delete("/category/?department="+category+"")
        .then(res=>{
            loadCategories();
            store.addNotification({
                ...notificationConfig,
                message: "Categoria '" + category + "' excluida com sucesso!",
                type: "info"
            });
        })
        .catch(error=>{
            switch (error.response.status) {
                case 400:
                    store.addNotification({
                        ...notificationConfig,
                        message: "Oops. '" + category + "' tem subcategorias, as exclua primeiro.",
                        type: "warning"
                    });
                    break;
                default:
                    store.addNotification({
                        ...notificationConfig,
                        message: "Oops, um erro ocorreu.",
                        type: "warning"
                    });
                    break;
            }
        });
    }

    // Carrega categorias do servidor via API
    async function loadCategories(){
        await api.get('http://localhost:3333/category/')
            .then((response)=>{
                setCategories(response.data);
                document.getElementById('categories-loading').innerHTML = "";
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
                        <div className="delete-button" onClick={() => deleteCategory(category.categoryName)}>
                            <FiTrash size="12px"/>
                        </div>
                    </div>
                        
                    {(category.subCategories != []) ? renderSubCategories(category.subCategories) : null}
                    
                    <div id={category.categoryName} className="add-category">
                        <form id={category.categoryName + '-form'} onSubmit={(event) => handleCategoryCreate(event, category.categoryName)}>
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
                        <div className="delete-button" onClick={() => deleteCategory(category.categoryName)}>
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
        setCategoriesDOM(<Loading size={40} color="#FF9F10" />);
        loadCategories();
    }, []);

    // Quando 'categories' é definido chama a função que renderiza as categorias em um DOM e o coloca em 'categoriesDOM'
    useEffect(()=>{
        console.log(categories);
        setCategoriesDOM(renderCategories());
    }, [categories]);

    useEffect(()=>{
        console.log("CategoriesDOM: " + categoriesDOM);
    }, [categoriesDOM]);


    return(
        <div id="page-admin-categories">
                <AdminHeader page="Categorias" />
            <div className="page-content">
                <h1>Categorias</h1>
                <hr />
                <div id="categories">
                    <div id="categories-loading">
                        <Loading size={40} color='#FF9F10' />
                    </div>   
                    {categoriesDOM} 
                </div>

                <div className="category-container">
                    <div className="root-category-title">
                        <div className='text'>
                            Adicionar <FiPlus size="12px"/>
                        </div>
                    </div>
                    <div className="add-root-category">
                        <form onSubmit={(event) => handleCategoryCreate(event, "")}>
                            <input id='add-root-category-input' type="text" name="catName"/>
                            <button type="submit"><FiPlus /></button>
                        </form>
                    </div>  
                </div>

            </div>
        </div>
    )
}

export default AdminCategories;