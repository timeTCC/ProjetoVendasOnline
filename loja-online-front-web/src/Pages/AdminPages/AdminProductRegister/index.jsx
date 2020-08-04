import React, { useState, useEffect } from 'react';

import AdminHeader from '../../../components/AdminHeader';
import Dropzone from '../../../components/Dropzone';
import ReactLoading from 'react-loading';

import api from '../../../services/api';

import './styles.css';

const AdminProductRegister = () => {
    const [ loadingButton, setLoadingButton ] = useState('Cadastrar');
    const [ isImageSelected, setIsImageSelected] = useState(true);

    const [selectedFile, setSelectedFile] = useState();
    const [formData, setFormData] = useState({
        "nameProd": String,
        "descriptionProd": String,
        "stockProd": Int16Array,
        "priceProd": Float32Array,
        "imageProd": String,
        "previewProd": 0,
        "subdepartment": String,
        "codgProd": Int16Array
    });

    async function handleSubmit(event){
        event.preventDefault();

        console.log(formData);

        isButtonLoading(true);

        if(formData.imageProd === undefined || formData.imageProd === ''){
            setLoadingButton("É obrigatória a seleção de uma imagem!");

            var timer = setTimeout(() => {
                setLoadingButton("Cadastrar");
            }, 1000);

            return () => clearTimeout(timer);
        }

        await api.post('product', formData).then((response)=>{
            isButtonLoading(false);

            document.getElementById("register-product-form").reset();
            setIsImageSelected(false);
            setLoadingButton("Produto cadastrado!");

            setFormData({ ...formData, imageProd: '' })
            setSelectedFile('');
            
            var timer = setTimeout(() => {
                setLoadingButton("Cadastrar");
            }, 1000);

            return () => clearTimeout(timer);

        }).catch((error)=>{
            isButtonLoading(false);

            switch (error.response.status) {
                case 400:
                    setLoadingButton("Produto de mesmo código já cadastrado");

                    var timer = setTimeout(() => {
                        setLoadingButton("Cadastrar");
                    }, 1000);

                    return () => clearTimeout(timer);

                case 500:
                    setLoadingButton("Ouve um erro");

                    var timer = setTimeout(() => {
                        setLoadingButton("Cadastrar");
                    }, 1000);

                    return () => clearTimeout(timer);
            }
            console.log(error.response);
        })

        console.log(formData);
    }

    function handleInputChange(event){
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value});
    }

    useEffect(()=>{
        setFormData({ ...formData, "imageProd": selectedFile});
        setIsImageSelected(true);
    },[selectedFile]);

    function isButtonLoading(loading){
        if(loading){
            setLoadingButton(
                <div className='loading'>
                    <ReactLoading type='spin' height={'20%'} width={'20%'} />
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
                        <input required type="text" name="codgProd" placeholder="Código do produto" onChange={handleInputChange} />
                        <input required type="text" name="nameProd" placeholder="Nome do produto" onChange={handleInputChange} />
                        <textarea required name="descriptionProd" placeholder="Descrição do produto" onChange={handleInputChange}></textarea>

                        <div required className='input-set'>
                            <input type="text" name="priceProd" placeholder="Preço do produto" onChange={handleInputChange} />
                            <input type="text" name="stockProd" placeholder="Qtd em estoque" onChange={handleInputChange} />
                        </div>

                        <select required name="subdepartment" onChange={handleInputChange}>
                            <option value="">Selecione um departamento ...</option>
                            <option value="geladeiras">Geladeiras</option>
                        </select>

                        <button required type="submit">{loadingButton}</button>

                    </form>

                    <Dropzone onFileUploaded={setSelectedFile} isImageSelected={isImageSelected}/>

                </div>
            </div>

        </div>
    )
}

export default AdminProductRegister;
