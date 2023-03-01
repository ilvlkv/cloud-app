import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Authorization from './Authorization/Authorization';
import Logo from './UI/Logo/Logo';
import HelloMessage from './UI/HelloMessage/HelloMessage';

import './App.scss';

const authorization_check = Cookies.get('user_data');

function App(props) {
  const [isAuthorized, setAuthorized] = useState(false);
  const [helloMessage, showHelloMessage] = useState([<HelloMessage />]);

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
        {helloMessage}
      </div>
    );
  }
}

export default App;
