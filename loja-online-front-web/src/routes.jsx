import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import RegisterUser from './Pages/RegisterUser'

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path='/' exact/>
            <Route component={Login} path='/login' />
            <Route component={RegisterUser} path='/registrar-se' />
        </BrowserRouter>
    )
}

export default Routes