import React, { useState, useEffect } from 'react';

import AdminHeader from '../../../components/AdminHeader';
import Dropzone from '../../../components/Dropzone';

import './styles.css';

const AdminProductRegister = () => {
    const [selectedFile, setSelectedFile] = useState();

    useEffect(()=>{
        console.log(selectedFile);
    },[selectedFile]);

    return(
        <div id="page-admin-producs-register">
                <AdminHeader page="Produtos" />
            <div className="page-content">
                <div id="create-product">
                    <form>
                        <input type="text" name="codgProd" placeholder="Código do produto" />
                        <textarea name="codgProd" placeholder="Código do produto"></textarea>
                        <input type="text" name="nameProd" placeholder="Nome do produto" />   
                        <div className='input-set'>
                            <input type="text" name="priceProd" placeholder="Preço do produto" />
                            <input type="text" name="stockProd" placeholder="Qtd em estoque" />
                        </div>
                    </form>
                    <Dropzone onFileUploaded={setSelectedFile}/>
                </div>
            </div>
        </div>
    )
}

export default AdminProductRegister;