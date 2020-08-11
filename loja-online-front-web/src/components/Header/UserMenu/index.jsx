import React, { useState, useEffect } from 'react';
import { FiUser, FiChevronDown, FiChevronUp, FiHeart, FiShoppingBag, FiLogOut, FiArrowRight } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import './styles.css';

const UserMenu = () => {
	const [isLoged, setIsLoged] = useState(false);
	const [userName, setUserName] = useState('');
	const [isExtend, setIsExtend] = useState(false);
	const [chevron, setChevron] = useState(<FiChevronDown size={24} />);

	const cookies = new Cookies;

	useEffect(() => {
		// Salvando dados do usuario usando cookies
		// if(cookies.get('userName')){
		//     let name = cookies.get('userName');
		//     let firstName = name.split(" ");

		//     firstName = firstName[0];

		//     setUserName(firstName);
		//     setIsLoged(true);
		// } else {
		//     setIsLoged(false);
		// }

		///const userToken = JSON.parse(localStorage.getItem('@loja-online/userToken'));

		// if (userToken) {
			
		// 	let name = userToken.user;
		// 	let firstName = name.split(" ");
		// 	firstName = firstName[0];

		// 		setUserName(firstName);

		// 	console.log(userToken);

		// 	setIsLoged(true);
		// } else {
		// 	setIsLoged(false);
		// }

	}, []);

	useEffect(() => {
		if (isExtend) {
			setChevron(<FiChevronUp size={24} />)
		} else {
			setChevron(<FiChevronDown size={24} />)
		}
	}, [isExtend]);

	function handleMenuExtend() {
		(isExtend) ? setIsExtend(false) : setIsExtend(true);
	}

	function handleLogOut() {
		localStorage.removeItem('@loja-online/userToken');
		setUserName('');
		setIsLoged(false);
	}

	if (!isLoged) {
		return (
			<div id="user-menu">
				<div className="login-opts">
					<div className='menu-button'>
						<Link className='link' to='/login'>Login</Link>
					</div>
					<div className='menu-button'>
						<Link className='link' to='/registrar-se'>Registrar-se</Link>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div id="user-menu">
				<div className='menu-button' onClick={handleMenuExtend}>
					<div className="icon">
						<FiUser size={24} />
					</div>
					<div className="text">
						{userName}
					</div>
					<div className='chevron-icon'>
						{chevron}
					</div>
				</div>

				<div className="menu" style={{ visibility: (isExtend) ? 'visible' : 'hidden' }}>
					<div className='menu-opt-button'>
						<Link className='link' to='/user/'>Minha página</Link>
						<div className='icon'><FiArrowRight /></div>
					</div>
					<div className='menu-opt-button' onClick={handleLogOut}>
						<div className="text"> sair </div>
						<div className="icon"><FiLogOut /></div>
					</div>
				</div>

				<div className="login-opts">
					<div className='menu-button'>
						<FiHeart />
					</div>
					<div className='menu-button'>
						<FiShoppingBag />
					</div>
				</div>

			</div>
		)
	}
}

export default UserMenu;