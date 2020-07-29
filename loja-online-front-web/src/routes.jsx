import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

// imports paginas de clientes
import Home from './Pages/ClientPages/Home';
import Login from './Pages/ClientPages/Login';
import RegisterUser from './Pages/ClientPages/RegisterUser';
import Testes from './Pages/ClientPages/Testes';

// imports paginas de administrador
import Admin from './Pages/AdminPages/Admin';
import AdminLogin from './Pages/AdminPages/AdminLogin';
import AdminHome from './Pages/AdminPages/AdminHome';
import AdminProducts from './Pages/AdminPages/AdminProducts';
import AdminOrders from './Pages/AdminPages/AdminOrders';
import AdminCategories from './Pages/AdminPages/AdminCategories';
import AdminProductRegister from './Pages/AdminPages/AdminProductRegister';

const Routes = () => {
    return(
        <BrowserRouter>
            {/* Rotas paginas clientes */}
            <Route component={Home} path='/' exact/>
            <Route component={Login} path='/login' />
            <Route component={RegisterUser} path='/registrar-se' />
            <Route component={Testes} path='/testes' />

            {/* Rotas paginas de administrador */}
            {/* <Route component={Admin} path='/admin' /> */}
            <Route component={AdminLogin} path='/admin/login' />
            <Route component={AdminHome} path='/admin/home' />
            <Route component={AdminProducts} path='/admin/produtos' />
            <Route component={AdminOrders} path='/admin/pedidos' />
            <Route component={AdminCategories} path='/admin/categorias' />
            <Route component={AdminProductRegister} path='/admin/registrar-produtos' />
        </BrowserRouter>
    )
}

export default Routes