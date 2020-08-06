import React from 'react';
import ReactNotification from 'react-notifications-component';
import Routes from './routes';

import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <div className="app-container">
      <ReactNotification />
      <Routes />
    </div>  
  );
}

export default App;
