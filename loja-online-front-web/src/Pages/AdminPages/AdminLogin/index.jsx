import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ReactLoading from 'react-loading';

import api from '../../../services/api';
import GenericHeader from '../../../components/GenericHeader';

// React Redux, função atualiza um estado disponivel em toda aplicação
import { useDispatch } from 'react-redux';
import { login } from '../../../services/actions'

import './styles.css';

const AdminLogin = () => {
    const [ formData, setFormData ] = useState({ emailUser: String, passwordUser: String });
    const [ loginStatus, setLoginStatus ] = useState(' ');
    const [ loadingButton, setLoadingButton ] = useState('Entrar');
    const [ cookies, setCookie, removeCookie ] = useCookies(['userAdminName']);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        if(cookies.userAdminName !== undefined){
            history.push('/admin/home');
        }    
    }, [])

    async function handleSubmit(event){
        event.preventDefault();
        isButtonLoading(true);

        await api.post('users/authenticate', formData).then(response => {
            if(response.data.profile === "admin"){
                const user = response.data;

                console.log(user);

                setLoginStatus(' ');
                isButtonLoading(false);

                dispatch(login(user));

                setCookie('userAdminName', response.data.user, { path: '/' })
                history.push('/admin/home');
            } else {
                setLoginStatus('Usuário não tem permissões de administrador');
                isButtonLoading(false);
            }
            
        }).catch(error => {
            switch (error.response.status) {
                case 400:
                    setLoginStatus("Oops, senha incorreta.");
                    break;
                case 404:
                    setLoginStatus("Oops, usuário ainda não cadastrado.");
                    break;
                case 500:
                    setLoginStatus("Oops, erro ao efetuar o login.");
                    break;

            }

            isButtonLoading(false);

            console.log("Erro ao efetuar o login: " + error);
        });

    }

    function isButtonLoading(loading){
        if(loading){
            setLoadingButton(
                <div className='loading'>
                    <ReactLoading type='spin' height={'20%'} width={'20%'} />
                </div>
            );
        } else {
            setLoadingButton('Entrar');
        }
    }

    function handleInputChange(event){
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value});
    }

    return (
        <div id="page-admin-Login">
            <GenericHeader page='Login' />
            <div className="page-content">

                <form id="login-form" onSubmit={handleSubmit}>
                    <h2 className='title'>Login</h2>
                    <input 
                        type="text" 
                        name="emailUser" 
                        id="email-input" 
                        className='login-text-input' 
                        placeholder="E-mail" 
                        required
                        onChange={handleInputChange}
                    />
                    <input 
                        type="password" 
                        name="passwordUser" 
                        id="password-input" 
                        className='login-text-input' 
                        placeholder="senha"
                        required
                        onChange={handleInputChange} 
                    />
                    <span className="login-status">{loginStatus}</span>
                    <button className='login-submit-button' type="submit">{loadingButton}</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin;