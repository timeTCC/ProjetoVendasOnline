import React from 'react';

import AdminHeader from '../../../components/AdminHeader';

import './styles.css';

const AdminCategories = () => {
    return(
        <div id="page-admin-categories">
                <AdminHeader page="Categorias" />
            <div className="page-content">
                <h1>Essa é a página de administração das Categorias</h1>
            </div>
        </div>
    )
}

export default AdminCategories;