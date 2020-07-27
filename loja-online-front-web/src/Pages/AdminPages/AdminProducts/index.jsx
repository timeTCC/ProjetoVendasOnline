import React from 'react';

import AdminHeader from '../../../components/AdminHeader';

const AdminProdutos = () => {
    return (
        <div id="page-admin-products">
                <AdminHeader page="Produtos" />
            <div className="page-content">
                <h1>Essa é a página de administração de produtos</h1>
            </div>
        </div>
    )
}

export default AdminProdutos;