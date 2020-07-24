import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import ReactLoading from 'react-loading';
import { Cookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import Header from '../../components/Header';

const RegisterUser = () => {
    const [ formStatus, setformStatus ] = useState('');
    const [ disableButton, setDisableButton ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState('Cadastre-se!');

    const cookies = new Cookies();
    const history = useHistory();

    const [ formData, setFormData ] = useState({
        'name': String,
        'CPF': String,
        'cellPhone': String,
        'email': String,
        'confirmEmail': String,
        'password': String,
        'confirmPassword': String
    });

    async function handleSubmit(event){
        event.preventDefault();

        isButtonLoading(true);

        const parsedFormData = {
            'user': formData.name,
            'cpf': formData.CPF,
            'phone': formData.cellPhone,
            'email': formData.email,
            'password': formData.password,
            'profile': 'client',
        }

        console.log(parsedFormData)

        await api.post('/users/create', parsedFormData).then((response)=>{
            isButtonLoading(false);

            setformStatus(' ');
            cookies.set('userName', parsedFormData.user, { path: '/' });

            history.push('/');
        }).catch((error)=>{
            switch (error.response.status) {
                case 400:
                    setformStatus("Oops, já temos um cadastro com esse e-mail.");
                    break;
                case 404:
                    setformStatus("Oops, já temos um cadastro com esse CPF.");
                    break;
                case 500:
                    setformStatus("Oops, erro ao efetuar o cadastro.");
                    break;
            }

            isButtonLoading(false)

            console.log("Erro ao efetuar o login: " + error);
        });
    }

    function handleInputChange(event){
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    function isButtonLoading(loading){
        if(loading){
            setLoadingButton(
                <div className='loading'>
                    <ReactLoading type='spin' height={'20%'} width={'20%'} />
                </div>
            );
        } else {
            setLoadingButton('Cadastre-se!');
        }
    }

    useEffect(() => {
        if(formData.email != formData.confirmEmail){
            setformStatus('Emails Diferem!');
            setDisableButton(true);
        } else {
            if(formData.password != formData.confirmPassword){
                setformStatus('Senhas Diferem!');
                setDisableButton(true);
            } else {
                setformStatus('');
                setDisableButton(false);
            }
        }
        
    }, [formData]);

    return (
        <div id="page-register-user">
            <Header />
            <div className="content">

                <form id="register-form" onSubmit={handleSubmit}>
                    <h2 className='title'>Login</h2>
                    <input 
                        type="text" 
                        name="name" 
                        id="name-input" 
                        className='register-text-input' 
                        placeholder="Nome e sobrenome" 
                        required
                        onChange={handleInputChange}
                    />

                    <div className="input-group">
                        <InputMask 
                            type="text" 
                            name="CPF" 
                            id="CPF-input" 
                            className='register-text-input' 
                            placeholder="CPF"
                            mask="999.999.999-99"
                            required
                            onChange={handleInputChange} 
                        />
                        <InputMask 
                            type="text" 
                            name="cellPhone" 
                            id="cellPhone-input" 
                            className='register-text-input' 
                            placeholder="Celular"
                            mask="(99)99999-9999"
                            required
                            onChange={handleInputChange} 
                        />
                    </div>

                    <input 
                        type="email" 
                        name="email" 
                        id="email-input" 
                        className='register-text-input' 
                        placeholder="E-mail"
                        required
                        onChange={handleInputChange} 
                    />
                    <input 
                        type="confirmEmail" 
                        name="confirmEmail" 
                        id="confirmEmail-input" 
                        className='register-text-input' 
                        placeholder="Confirmar e-mail"
                        required
                        onChange={handleInputChange} 
                    />

                    <div className="input-group password-group">
                        <input 
                            type="password" 
                            name="password" 
                            id="password-input" 
                            className='register-text-input' 
                            placeholder="Senha"
                            required
                            onChange={handleInputChange} 
                        />
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            id="confirm-password-input" 
                            className='register-text-input' 
                            placeholder="Confirme senha"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <p className='password-status'>{formStatus}</p>

                    <button className='register-submit-button' type="submit">{loadingButton}</button>

                </form>     

            </div>
        </div>
    )
}

export default RegisterUser;