import React from 'react';
import { FiSearch, FiUser, FiChevronDown } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';

import DropdownMenu from '../DropdownMenu';

import './styles.css';

const Header = () => {

    const history = useHistory();

    function handleSearch(event) {
        event.preventDefault();

        console.log('pesquisa');
    }

    return(
        <header className='opener'>
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
                        <div className="vertical-container">
                            <div className='user-menu'>
                                <div className="icon">
                                    <FiUser size={24}/>
                                </div>
                                <div className="text">
                                    Usuário
                                </div> 
                                <div>
                                    <FiChevronDown size={24}/>
                                </div>
                            </div>
                            <div className="horizontal-container login-opts">
                                <Link className='link' to='/login'>Login</Link>
                                <Link className='link' to='/registrar-se'>Registrar-se</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header;