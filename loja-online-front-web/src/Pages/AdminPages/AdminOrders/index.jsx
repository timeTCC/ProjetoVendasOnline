import React from 'react';

import AdminHeader from '../../../components/AdminHeader';

import './styles.css';

const AdminOrders = () => {
    return(
        <div id="page-admin-orders">
                <AdminHeader page="Pedidos" />
            <div className="page-content">
                <h1>Essa é a página de administração de Pedidos</h1>
            </div>
        </div>
    )
}

export default AdminOrders;