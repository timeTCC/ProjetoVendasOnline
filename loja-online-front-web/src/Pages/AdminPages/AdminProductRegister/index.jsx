import React, { useState, useEffect } from 'react';

import AdminHeader from '../../../components/AdminHeader';
import Dropzone from '../../../components/Dropzone';

import './styles.css';
import { FiBellOff } from 'react-icons/fi';

const AdminProductRegister = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [formData, setFormData] = useState({
        "nameProd": String,
        "stockProd": Int16Array,
        "priceProd": Float32Array,
        "imageProd": String,
        "previewProd": 0,
        "subdepartment": String,
        "codgProd": Int16Array
    });

    function handleSubmit(event){
        event.preventDefault();

        console.log(formData);
    }

    function handleInputChange(event){
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value});
    }

    useEffect(()=>{
        setFormData({ ...formData, "imageProd": selectedFile});
    },[selectedFile]);

    return(
        <div id="page-admin-producs-register">
                <AdminHeader page="Produtos" />

            <div className="page-content">
                <div id="create-product">

                    <form onSubmit={handleSubmit}>
                        <input type="text" name="codgProd" placeholder="Código do produto" onChange={handleInputChange} />
                        <textarea name="codgProd" placeholder="Código do produto"></textarea>
                        <input type="text" name="nameProd" placeholder="Nome do produto" onChange={handleInputChange} />

                        <div className='input-set'>
                            <input type="text" name="priceProd" placeholder="Preço do produto" onChange={handleInputChange} />
                            <input type="text" name="stockProd" placeholder="Qtd em estoque" onChange={handleInputChange} />
                        </div>

                        <select name="namesubdepartment" onChange={handleInputChange}>
                            <option value="geladeiras">Selecione um departamento ...</option>
                            <option value="geladeiras">Geladeiras</option>
                        </select>

                        <button type="submit">Enviar</button>

                    </form>

                    <Dropzone onFileUploaded={setSelectedFile}/>

                </div>
            </div>

        </div>
    )
}

export default AdminProductRegister;
