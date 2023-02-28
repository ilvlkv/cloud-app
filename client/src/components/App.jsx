import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Authorization from './Authorization/Authorization';
import Logo from './UI/Logo/Logo';

import './App.scss';

const authorization_check = Cookies.get('token');

function App(props) {
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (isAuthorized) return;

    if (authorization_check) {
      setAuthorized({ isAuthorized: true });
    }
  }, [isAuthorized]);

  if (isAuthorized === false) {
    return (
      <div className="App">
        <Logo />
        <Authorization />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Logo />
        <h1>Interface</h1>
      </div>
    );
  }
}

export default App;
