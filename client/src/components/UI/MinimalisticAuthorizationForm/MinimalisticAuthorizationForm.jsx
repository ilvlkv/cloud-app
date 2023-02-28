import React, { useState } from 'react';
import Cookies from 'js-cookie';
import MinimalisticSubmitButton from '../MinimalisticSubmitButton/MinimalisticSubmitButton';
import MinimalisticTextInput from '../MinimalisticTextInput/MinimalisticTextInput';
import TextError from '../TextError/TextError';
import './MinimalisticAuthorizationForm.scss';

function MinimalisticAuthorizationForm(props) {
  const [loginInputClasses, changeLoginInputClasses] = useState('');
  const [passwordInputClasses, changePasswordInputClasses] = useState('');
  const [inputErrors, showInputError] = useState(null);

  const handleLoginChange = (event) => {
    props.onLoginChange(event.target.value);
  };

  const handlePasswordChange = (event) => {
    props.onPasswordChange(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    !props.login || !props.password
      ? submit_handlers.error.init(props)
      : submit_handlers.success(props);
  };

  const submit_handlers = {
    error: {
      init: async function initError(props) {
        if (!props.login) {
          submit_handlers.error.login_err();
        } else {
          submit_handlers.error.password_err();
        }
      },
      clear_errors: function clearErrors() {
        changeLoginInputClasses('');
        changePasswordInputClasses('');
        showInputError(null);
      },
      login_err: async function showLoginError() {
        if (loginInputClasses) {
          changeLoginInputClasses('');
          setTimeout(() => {
            changeLoginInputClasses('text-input_error');
          }, 0);
        } else {
          submit_handlers.error.clear_errors();

          changeLoginInputClasses('text-input_error');
          showInputError(<TextError text="Вы не ввели логин" />);
        }
      },
      password_err: async function showPasswordError() {
        if (passwordInputClasses) {
          changePasswordInputClasses('');
          setTimeout(() => {
            changePasswordInputClasses('text-input_error');
          }, 0);
        } else {
          submit_handlers.error.clear_errors();

          changePasswordInputClasses('text-input_error');
          showInputError(<TextError text="Вы не ввели пароль" />);
        }
      },
    },
    success: async function getAuthorization(props) {
      submit_handlers.error.clear_errors();

      const request = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          username: props.login,
          password: props.password,
        }),
      });

      const responce = await request.json();

      console.log(responce);

      if (responce.user.token) {
        console.log(responce.message);
        Cookies.set('token', responce.user.token, { expires: 1 });
      } else {
        console.log(`Ошибка авторизации: ${responce.message}`);
      }
    },
  };

  return (
    <form
      action=""
      className="authorization-form_minimalistic"
      onSubmit={handleFormSubmit}
    >
      <MinimalisticTextInput
        type="text"
        placeholder="Логин"
        value={props.login}
        onChange={handleLoginChange}
        className={loginInputClasses}
      />
      <MinimalisticTextInput
        type="password"
        placeholder="Пароль"
        value={props.password}
        onChange={handlePasswordChange}
        className={passwordInputClasses}
      />
      {inputErrors}
      <MinimalisticSubmitButton value="Авторизоваться" />
    </form>
  );
}

export default MinimalisticAuthorizationForm;
