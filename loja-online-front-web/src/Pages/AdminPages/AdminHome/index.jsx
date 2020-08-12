import React from 'react';
import { useSelector } from 'react-redux';

import AdminHeader from '../../../components/AdminHeader';

import './styles.css';

const AdminHome = () => {
    const user = useSelector(state => state.user);

    return(
        <div id="page-admin-home">
                <AdminHeader page="Home" />
            <div className="page-content">
                <h1>Essa é a página de administração de Home {(user != null) ? user.user : ''} </h1>
            </div>
        </div>
    )
}

export default AdminHome;