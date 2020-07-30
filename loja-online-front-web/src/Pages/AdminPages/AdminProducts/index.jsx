import React from 'react';
import { FiPlus } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';

import AdminHeader from '../../../components/AdminHeader';

import './styles.css';

const AdminProdutos = () => {
    const history = useHistory();

    function handleCreateClick(){
        history.push('/admin/registrar-produtos');
    }

    return (
        <div id="page-admin-products">
            <AdminHeader page="Produtos" />

            <div className="page-content">
                <div className='add-product-card' onClick={handleCreateClick}>

                    <FiPlus className='icon' />
                </div>
            </div>
        </div>
    )
}

export default AdminProdutos;