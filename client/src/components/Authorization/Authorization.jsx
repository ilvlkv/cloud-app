import { useState } from 'react';

import React from 'react';
import MinimalisticAuthorizationForm from '../UI/MinimalisticAuthorizationForm/MinimalisticAuthorizationForm';
import TextButton from '../UI/TextButton/TextButton';

import './Authorization.scss';

function Authorization(props) {
  const getRegistrationForm = () => {
    if (isRegistrationForm === false) {
      extendToRegistrationForm();
    } else {
      cutToAuthorizationForm();
    }
  };
  const cutToAuthorizationForm = async () => {
    await resetStates();

    setTimeout(() => {
      setRegistrationFormState(false);
      changeUsernameInputClasses('hidden');
      changePasswordCheckInputClasses('hidden');
      setSubmitButtonName('Авторизоваться');

      setTextButtonValue('Зарегистрироваться в приложении');
    }, 500);
  };
  const extendToRegistrationForm = async () => {
    await resetStates();

    setTimeout(() => {
      setRegistrationFormState(true);
      changeUsernameInputClasses('');
      changePasswordCheckInputClasses('');
      setSubmitButtonName('Зарегистрироваться');
      setTextButtonValue('Вернуться назад');
    }, 500);
  };
  const resetStates = async () => {
    setLogin('');
    setPassword('');
    changeLoginInputClasses('');
    changePasswordInputClasses('');
    showInputNotification(null);
  };

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheckValue] = useState('');
  const [username, setUsername] = useState('');
  const [usernameInputClasses, changeUsernameInputClasses] = useState('hidden');
  const [loginInputClasses, changeLoginInputClasses] = useState('');
  const [passwordInputClasses, changePasswordInputClasses] = useState('');
  const [passwordCheckInputClasses, changePasswordCheckInputClasses] =
    useState('hidden');

  const [isRegistrationForm, setRegistrationFormState] = useState(false);
  const [inputNotifications, showInputNotification] = useState(null);

  const [textButtonName, setTextButtonValue] = useState(
    'Зарегистрироваться в приложении'
  );
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
      <TextButton text={textButtonName} onClick={getRegistrationForm} />
    </div>
  );
}

export default Authorization;
