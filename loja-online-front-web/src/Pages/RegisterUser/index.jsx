import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

import Header from '../../components/Header';

import './styles.css';

const RegisterUser = () => {
    const [ passwordStatus, setPasswordStatus ] = useState('');
    const [ disableButton, setDisableButton ] = useState(false);

    const [ formData, setFormData ] = useState({
        'name': String,
        'CPF': String,
        'cellPhone': String,
        'email': String,
        'password': String,
        'confirmPassword': String
    });

    function handleSubmit(event){
        event.preventDefault();

        const parsedFormData = {
            'name': formData.name,
            'CPF': formData.CPF,
            'cellPhone': formData.cellPhone,
            'email': formData.email,
            'password': formData.password,
        }

        console.log(parsedFormData);
    }

    function handleInputChange(event){
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    useEffect(() => {
        if(formData.password != formData.confirmPassword){
            setPasswordStatus('Senhas Diferem!');
            setDisableButton(true);
        } else {
            setPasswordStatus('');
            setDisableButton(false);
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
                            mask="(99)9999-9999"
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
                    <p className='password-status'>{passwordStatus}</p>

                    <button className='register-submit-button' type="submit">Cadastrar-se!</button>

                </form>     

            </div>
        </div>
    )
}

export default RegisterUser;