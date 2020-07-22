import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import Header from '../../components/Header';

const Login = () => {
    const [ formData, setFormData ] = useState({ email: String, password: String });

    const history = useHistory();

    function handleSubmit(event){
        event.preventDefault();

        history.push('/');
    }

    function handleInputChange(event){
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value});
    }

    useEffect(()=>{
        console.log(formData);
    }, [formData])

    return (
        <div id="page-Login">
            <Header />
            <div className="page-content">

                <form id="login-form" onSubmit={handleSubmit}>
                    <h2 className='title'>Login</h2>
                    <input 
                        type="text" 
                        name="email" 
                        id="email-input" 
                        className='login-text-input' 
                        placeholder="E-mail" 
                        onChange={handleInputChange}
                    />
                    <input 
                        type="password" 
                        name="password" 
                        id="password-input" 
                        className='login-text-input' 
                        placeholder="senha"
                        onChange={handleInputChange} 
                    />
                    <button className='login-submit-button' type="submit">Entrar</button>
                </form>     

            </div>
        </div>
    )
}

export default Login;