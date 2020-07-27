import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Admin = () => {
    const [cookies, setCookie] = useCookies(['userAdminName']);
    const history = useHistory();

    useEffect(()=>{
        if(cookies.userAdminName !== undefined){
            history.push('/admin/home');
        } else {
            history.push('/admin/login');
        }     
    }, [])

    return(
        <div></div>
    )
}

export default Admin;