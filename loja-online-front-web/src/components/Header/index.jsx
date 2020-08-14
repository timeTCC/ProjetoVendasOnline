import React, { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiChevronDown } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import DropdownMenu from './DropdownMenu';
import UserMenu from './UserMenu';

import './styles.css';

const Header = () => {
    const [ userName, setUserName ] = useState('Usuário');

    const history = useHistory();
    const cookies = new Cookies;

    function handleSearch(event) {
        event.preventDefault();
    }

    useEffect(()=>{
        if(cookies.get('userName') !== undefined){
            setUserName(cookies.get('userName'));
        }     
    }, [userName]);

    return(
        <header id='client-header' className='opener'>
            <div className="wrapper">
                <div className="content">

                    <div className="vertical-container">
                        <Link className='title-link' to='/'>
                            <h1 className='title'>Loja Online</h1>
                        </Link>
                        
                        <DropdownMenu />

                    </div>

                    <div className="horizontal-container opts">
                        <form id='search-form' onSubmit={handleSearch}>
                            <input type="text" placeholder='Pesquise...'/>
                            <button type='submit'>
                                <FiSearch color="#313131" size={20}/>
                            </button>
                        </form>
                        
                        <UserMenu />

                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header;