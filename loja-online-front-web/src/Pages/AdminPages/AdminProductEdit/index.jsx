// Modulos
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { setEditingProduct, setEditingProductCatName, unsetEditingProduct } from '../../../services/actions';
// Componentes
import AdminHeader from '../../../components/AdminHeader';
import Dropzone from '../../../components/Dropzone';
import Loading from '../../../components/Loading';
// Functions
import api from '../../../services/api';
import { loadProductByCodg } from '../../../utils/productsFunctions';
import { getCategoryName } from '../../../utils/categoriesFunctions';
// Classes
import Product from '../../../classes/product';
// Styles
import './styles.css';

const AdminProductEdit = (props) => {
    const [ loadingButton, setLoadingButton ] = useState('Salvar');
    const [ isImageSelected, setIsImageSelected] = useState(true);
    const [ categories, setCategories ] = useState([]);
    const [ productCat, setProductCat ] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const editingProduct = useSelector(state => state.editingProduct);
    const [formData, setFormData] = useState({
        "nameProd": String,
        "descriptionProd": String,
        "stockProd": Int16Array,
        "priceProd": Float32Array,
        "imageProd": String,
        "previewProd": 0,
        "categoryId": Int16Array,
        "codgProd": Int16Array
    });

    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(()=>{
        // Verifica se há um produto trazido pela variavel e o carrega
        if(props.match.params.codgProd){
            // Carrega o Produto
            loadProductByCodg(props.match.params.codgProd).then(res => {
                dispatch(setEditingProduct(res));

                // Carrega o nome da categoria pelo id indicado no objeto do produto
                getCategoryName(res.categoryId).then(response => {
                    setProductCat(response);
                    dispatch(setEditingProductCatName(response)); // O produto é posto em um estado global                 
                });

                // Indica se há um arquivo selecionado e qual é
                setSelectedFile(res.imageProd);
            });
        }    

        // Carrega as categorias disponiveis para a seleção
        loadCategories().then(res => setCategories(res));
    },[]);

    // Quando é selecionada uma imagem ela é posta ou substitui
    // a existente no objeto de dados do formulário
    useEffect(()=>{
        setFormData({ ...formData, "imageProd": selectedFile});
        setIsImageSelected(true);
    },[selectedFile]);

    // Mostra no console mudanças feitas no objeto de dados do formulário
    useEffect(()=>{
        //console.log(formData);
    }, [formData]);

    // Verifica se o estado global de edição do objeto não é nulo
    // e as trasfere para o objeto local de dados do formulário
    useEffect(()=>{
        if(editingProduct){
            setFormData(editingProduct);
        }
    }, [editingProduct])
 
    // Função que fas as vias de enviar o objeto de dados do formulario para o servidor
    // atualizando assim o produto
    async function handleSubmit(event){
        event.preventDefault();

        console.log(formData);

        isButtonLoading(true);

        if(formData.imageProd === undefined || formData.imageProd === ''){
            setLoadingButton("É obrigatória a seleção de uma imagem!");

            var timer = setTimeout(() => {
                setLoadingButton("Salvar");
            }, 1000);

            return () => clearTimeout(timer);
        }

        await api.put('product', formData).then((response)=>{
            isButtonLoading(false);

            document.getElementById("register-product-form").reset();
            setIsImageSelected(false);
            setLoadingButton("Alterações salvas!");

            setFormData({ ...formData, imageProd: '' })
            setSelectedFile('');

            history.push('/admin/produtos');
            
            var timer = setTimeout(() => {
                setLoadingButton("Salvar");
            }, 1000);

            return () => clearTimeout(timer);

        }).catch((error)=>{
            isButtonLoading(false);

            switch (error.response.status) {
                case 400:
                    setLoadingButton("Produto de mesmo código já cadastrado");

                    var timer = setTimeout(() => {
                        setLoadingButton("Salvar");
                    }, 1000);

                    return () => clearTimeout(timer);

                case 500:
                    setLoadingButton("Ouve um erro, verifique não prencheu nada errado.");

                    var timer = setTimeout(() => {
                        setLoadingButton("Salvar");
                    }, 1000);

                    return () => clearTimeout(timer);
            }
            console.log(error.response);
        })

        console.log(formData);
    }

    // Carrega as categorias disponivel para a seleçao no banco de dados
    async function loadCategories(){
        return await api.get('/category/categoryList')
        .then(res=>{
            return res.data;
        })
        .catch(error=>{
            return 'Erro ao carregar categorias';
        })
    }

    // Coloca as mudanças dos input na variavel de dados do formulário
    function handleInputChange(event){
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value});
    }

    function isButtonLoading(loading){
        if(loading){
            setLoadingButton(
                <div className='loading'>
                    <Loading color='white' size={30} id='create-product-loading' isLoading={true}/>
                </div>
            );
        } else {
            setLoadingButton('Entrar');
        }
    }

    return(
        <div id="page-admin-producs-register">
            
            <AdminHeader page="Produtos" />

            <div className="page-content">
                <div id="create-product">

                    <form id="register-product-form" onSubmit={handleSubmit}>
                        <input
                            disabled={true}
                            required 
                            type="text" 
                            name="codgProd" 
                            placeholder="Código do produto" 
                            value={formData.codgProd}
                            onChange={handleInputChange} 
                        />
                        <input 
                            required 
                            type="text" 
                            name="nameProd" 
                            placeholder="Nome do produto" 
                            value={formData.nameProd}
                            onChange={handleInputChange} 
                        />
                        <textarea
                            required 
                            name="descriptionProd" 
                            placeholder="Descrição do produto" 
                            value={formData.descriptionProd}
                            onChange={handleInputChange}>
                        </textarea>

                        <div className='input-set'>
                            <input 
                                required
                                type="text" 
                                pattern="\d*"
                                name="priceProd" 
                                placeholder="Preço do produto" 
                                value={formData.priceProd}
                                onChange={handleInputChange} 
                            />
                            <input 
                                type="text" 
                                pattern="\d*"
                                name="stockProd" 
                                placeholder="Qtd em estoque" 
                                value={formData.stockProd}
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>

                        <select 
                            required 
                            name="categoryId"
                            value={formData.categoryId} 
                            onChange={handleInputChange}>
                            <option value="">{(productCat) ? productCat : 'Selecione uma categoria...'}</option>
                            {  
                                (categories) ? categories.map(category=>{
                                    return(
                                        <option key={category.categoryId} value={category.categoryId}>{category.subdepartment}</option>
                                    )
                                }) : ''
                                
                            }
                        </select>

                        <button required type="submit">{loadingButton}</button>

                    </form>
                    
                    <Dropzone onFileUploaded={setSelectedFile} isImageSelected={isImageSelected}  />

                </div>
            </div>

        </div>
    )
}

export default AdminProductEdit;
