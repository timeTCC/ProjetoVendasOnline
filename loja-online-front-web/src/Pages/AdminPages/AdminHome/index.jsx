import React from 'react';

import AdminHeader from '../../../components/AdminHeader';

import './styles.css';

const AdminHome = () => {
    return(
        <div id="page-admin-home">
                <AdminHeader page="Home" />
            <div className="page-content">
                <h1>Essa é a página de administração de Home</h1>
            </div>
        </div>
    )
}

export default AdminHome;