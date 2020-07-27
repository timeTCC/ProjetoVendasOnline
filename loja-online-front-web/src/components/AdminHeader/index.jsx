import React, { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import { useCookies  } from 'react-cookie';

import Menu from './Menu';


import './styles.css';

const Header = (props) => {
    const [ userName, setUserName ] = useState('Usuário');
    const [ isLogded, setIsLogged ] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['userAdminName']);
 
    const history = useHistory();

    function handleSearch(event) {
        event.preventDefault();

        console.log('pesquisa');
    }

    useEffect(()=>{
        if(cookies.userAdminName !== undefined){
            console.log('logado');
            setUserName(cookies.userAdminName);
            setIsLogged(true);
        } else {
            console.log(cookies.userAdminName);
            setIsLogged(false);
            history.push('/admin/login');
        }     
    }, [isLogded]);

    function handleLogOut(){
        removeCookie('userAdminName', {path: '/'});
        history.push('/admin/login');
    }

    if(isLogded){
        return(
            <header className='opener'>
                <div className="wrapper">
                    <div className="content">
                        <Menu page={props.page}/>
    
                        <div className="horizontal-container opts">
                            <form id='search-form' onSubmit={handleSearch}>
                                <input type="text" placeholder='Pesquise...'/>
                                <button type='submit'>
                                    <FiSearch color="#313131" size={20}/>
                                </button>
                            </form>
                            
                            <div className='link' onClick={handleLogOut}>
                                <div className='link-text'>
                                    Sair
                                </div>
                                <div className='link-icon'>
                                    <FiArrowRight />
                                </div>
                            </div>
    
                        </div>
    
                    </div>
                </div>
            </header>
        )
    } else {
        return(
            <header className='opener'>
                <div className="wrapper">
                    <div className="content">
                        <h1 className='title'>Loja Online</h1>
                    </div>
                </div>
            </header>
        )
    }

    
}

export default Header;