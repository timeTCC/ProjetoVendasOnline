import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Admin = () => {
    const history = useHistory();

    useEffect(()=>{
        history.push('/admin/login');
    }, []);

    return(
        <div></div>
    )
}

export default Admin;