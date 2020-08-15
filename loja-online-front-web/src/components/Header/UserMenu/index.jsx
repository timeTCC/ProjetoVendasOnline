import React, { useState, useEffect } from 'react';
import { FiUser, FiChevronDown, FiChevronUp, FiHeart, FiShoppingBag, FiLogOut, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { login, logout } from '../../../services/actions';
import { decriptLocalStorage } from '../../../utils/cryptFunctions';
import { userTokenAuthentication } from '../../../utils/userFunctions';
import api from '../../../services/api';

import './styles.css';

const UserMenu = () => {
	const [isLoged, setIsLoged] = useState(false);
	const [isExtend, setIsExtend] = useState(false);
	const [chevron, setChevron] = useState(<FiChevronDown size={24} />);
	const userToken = useSelector(state => state.user);
	const [userName, setUserName] = useState();
	
	const dispatch = useDispatch();

	function handleMenuExtend() {
		(isExtend) ? setIsExtend(false) : setIsExtend(true);
	}

	function handleLogOut() {
		localStorage.removeItem('@loja-online/userToken');
		//setUserToken(undefined);
		dispatch(logout());
		setIsLoged(false);
	}

	useEffect(() => {
		const encryptedUserToken = localStorage.getItem('@loja-online/userToken');

		if (encryptedUserToken) {
			decriptLocalStorage('@loja-online/userToken').then(res => {
				const user = res;

				userTokenAuthentication(user).then(res => {
					if(res){
						dispatch(login(user));
					} else {
						dispatch(logout());
					}
				});
			});
		} else {
			console.log('usuario não logado');
		}
		
	}, []);

	
	useEffect(() => {
		if(userToken !== null){
			setIsLoged(true);
		} else {
			setIsLoged(false);
		}
	}, [userToken]);

	useEffect(() => {
		if(isLoged){
			let userName = userToken.user;
			userName = userName.split(" ");
			userName = userName[0];

			setUserName(userName);
		}
	}, [isLoged]);

	useEffect(() => {
		if (isExtend) {
			setChevron(<FiChevronUp size={24} />)
		} else {
			setChevron(<FiChevronDown size={24} />)
		}
	}, [isExtend]);


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