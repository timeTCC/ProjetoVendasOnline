import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import RegisterUser from './Pages/RegisterUser';
import Testes from './Pages/Testes';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path='/' exact/>
            <Route component={Login} path='/login' />
            <Route component={RegisterUser} path='/registrar-se' />
            <Route component={Testes} path='/testes' />
        </BrowserRouter>
    )
}

export default Routes