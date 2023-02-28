import { useState } from 'react';

import React from 'react';
import MinimalisticAuthorizationForm from '../UI/MinimalisticAuthorizationForm/MinimalisticAuthorizationForm';
import TextButton from '../UI/TextButton/TextButton';

import './Authorization.scss';

function Authorization(props) {
  const extendToRegistrationForm = () => {
    setLogin('');
    setPassword('');
    changeLoginInputClasses('');
    changePasswordInputClasses('');
    showInputNotification(null);

    setTimeout(() => {
      setRegistrationFormState(true);
      changeUsernameInputClasses('');
      changePasswordCheckInputClasses('');
      setSubmitButtonName('Зарегистрироваться');

      getRegistrationButton('hidden');
    }, 500);
  };
  const checkPassword = () => {};

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheckValue] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistrationForm, setRegistrationFormState] = useState(false);
  const [registrationButton, getRegistrationButton] = useState('');

  const [usernameInputClasses, changeUsernameInputClasses] = useState('hidden');
  const [loginInputClasses, changeLoginInputClasses] = useState('');
  const [passwordInputClasses, changePasswordInputClasses] = useState('');
  const [passwordCheckInputClasses, changePasswordCheckInputClasses] =
    useState('hidden');

  const [inputNotifications, showInputNotification] = useState(null);

  const [submitButtonName, setSubmitButtonName] = useState('Авторизоваться');

  return (
    <div className="authorization">
      <MinimalisticAuthorizationForm
        submitButtonName={submitButtonName}
        isRegistrationForm={isRegistrationForm}
        login={login}
        password={password}
        passwordCheck={passwordCheck}
        username={username}
        setLogin={setLogin}
        setPassword={setPassword}
        setPasswordCheckValue={setPasswordCheckValue}
        setUsername={setUsername}
        usernameInputClasses={usernameInputClasses}
        loginInputClasses={loginInputClasses}
        passwordInputClasses={passwordInputClasses}
        passwordCheckInputClasses={passwordCheckInputClasses}
        changeUsernameInputClasses={changeUsernameInputClasses}
        changeLoginInputClasses={changeLoginInputClasses}
        changePasswordInputClasses={changePasswordInputClasses}
        changePasswordCheckInputClasses={changePasswordCheckInputClasses}
        inputNotifications={inputNotifications}
        showInputNotification={showInputNotification}
      />
      <TextButton
        text="Зарегистрироваться в приложении"
        onClick={extendToRegistrationForm}
        className={registrationButton}
      />
    </div>
  );
}

export default Authorization;
