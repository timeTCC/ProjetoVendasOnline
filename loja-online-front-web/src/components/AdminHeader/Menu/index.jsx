import React, {useState, useEffect} from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

const Menu = (props) => {
    const menuItens = [{
        page: 'Home',
        link: 'home'
    },
    {
        page: 'Produtos',
        link: 'produtos'
    },
    {
        page: 'Categorias',
        link: 'categorias'
    },
    {
        page: 'Pedidos',
        link: 'pedidos'
    }
]
    
    

    return(
        <div id='admin-menu'>
            <div className='admin-menu-title'>
                <h1 className='title'>Loja Online</h1>
            </div>

            <div className='admin-menu-opts'>

                {menuItens.map((menuIten) => {
                    if(menuIten.page === props.page){
                        return(
                            <Link key={menuIten.page} className='admin-menu-opt' to={menuIten.link}>
                                <div className='text'>
                                    {menuIten.page}
                                </div>
                                <div className='icon'>
                                    <FiArrowRight />
                                </div>
                            </Link>
                        )
                    } else {
                        return(
                            <Link key={menuIten.page} className='admin-menu-opt' to={menuIten.link}>
                                <div className='text'>
                                    {menuIten.page}
                                </div>
                                <div className='icon'>
                                    
                                </div>
                            </Link>
                        )
                    }  
                })}

            </div>
        </div>
    )
};

export default Menu;

