import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import ReactLoading from 'react-loading';

import './styles.css';

import api from '../../../services/api';
import Header from '../../../components/Header';

const Login = () => {
    const [ formData, setFormData ] = useState({ emailUser: String, passwordUser: String });
    const [ loginStatus, setLoginStatus ] = useState('');
    const [ loadingButton, setLoadingButton ] = useState('Entrar');


    const history = useHistory();
    const cookies = new Cookies;

    async function handleSubmit(event){
        event.preventDefault();

        console.log(formData);

        isButtonLoading(true);

        await api.post('users/authenticate', formData).then(response => {
            setLoginStatus(' ');
            cookies.set('userName', response.data.user, { path: '/' });

            isButtonLoading(false);

            history.push('/');
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
        <div id="page-Login">
            <Header />
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

export default Login;