import { useState } from 'react';

import React from 'react';
import MinimalisticAuthorizationForm from '../UI/MinimalisticAuthorizationForm/MinimalisticAuthorizationForm';
import TextButton from '../UI/TextButton/TextButton';

import './Authorization.scss';

function Authorization(props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="authorization">
      <MinimalisticAuthorizationForm
        login={login}
        onLoginChange={setLogin}
        password={password}
        onPasswordChange={setPassword}
      />
      <TextButton text="Зарегистрироваться в приложении" />
    </div>
  );
}

export default Authorization;
