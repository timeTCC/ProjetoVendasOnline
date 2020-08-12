import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';

import api from '../../../services/api';
import Header from '../../../components/Header';
import { login } from '../../../services/actions';

import './styles.css';

const Login = () => {
	const [formData, setFormData] = useState({ emailUser: String, passwordUser: String });
	const [loginStatus, setLoginStatus] = useState('');
	const [loadingButton, setLoadingButton] = useState('Entrar');

	const history = useHistory();
	const dispatch = useDispatch();

	async function encryptLocalStorage(key, value){
		var toEncrypt = value.replace(/"/g, "'");
	
		const data = {
			data: toEncrypt
		}
	
		console.log(data.data);
	
		await api.post('/criptografia/encriptografar', data)
			.then(res => {
				const token = res.data;
				console.log(token);
				localStorage.setItem(key, token);
			})
			.catch(error => {
				console.log(error);
			})
	}

	async function handleSubmit(event) {
		event.preventDefault();

		console.log(formData);

		isButtonLoading(true);

		await api.post('users/authenticate', formData).then(response => {
			const userToken = JSON.stringify(response.data)

			encryptLocalStorage('@loja-online/userToken', userToken);
			dispatch(login(response.data));
			
			setLoginStatus(' ');
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

	function isButtonLoading(loading) {
		if (loading) {
			setLoadingButton(
				<div className='loading'>
					<ReactLoading type='spin' height={'20%'} width={'20%'} />
				</div>
			);
		} else {
			setLoadingButton('Entrar');
		}
	}

	function handleInputChange(event) {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
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