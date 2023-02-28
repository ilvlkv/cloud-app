import React, { useState } from 'react';
import Cookies from 'js-cookie';
import MinimalisticSubmitButton from '../MinimalisticSubmitButton/MinimalisticSubmitButton';
import MinimalisticTextInput from '../MinimalisticTextInput/MinimalisticTextInput';
import TextNotification from '../TextNotification/TextNotification';
import './MinimalisticAuthorizationForm.scss';

function MinimalisticAuthorizationForm(props) {
  const [loginInputClasses, changeLoginInputClasses] = useState('');
  const [passwordInputClasses, changePasswordInputClasses] = useState('');
  const [inputNotifications, showInputNotification] = useState(null);
  const [submitButtonName, setSubmitButtonName] = useState('Авторизоваться');

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
      : submit_handlers.success.login(props);
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
        showInputNotification(null);
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
          showInputNotification(
            <TextNotification type="error" text="Вы не ввели логин" />
          );
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
          showInputNotification(
            <TextNotification type="error" text="Вы не ввели пароль" />
          );
        }
      },
      fetch_err: async function showFetchError(text) {
        submit_handlers.error.clear_errors();

        showInputNotification(
          <TextNotification type="error" text={`${text}`} />
        );
      },
    },
    success: {
      login: async function getAuthorization(props) {
        submit_handlers.error.clear_errors();

        const this_username = props.login;
        const this_password = props.password;

        try {
          const request = await fetch(`http://localhost:3000/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              username: this_username,
              password: this_password,
            }),
          });

          const responce = await request.json();

          if (responce.status === 200) {
            submit_handlers.error.clear_errors();

            showInputNotification(
              <TextNotification type="success" text={`${responce.message}`} />
            );

            Cookies.set('token', responce.user.token, { expires: 1 });
          } else {
            submit_handlers.error.fetch_err(responce.message);
          }
        } catch (error) {
          submit_handlers.error.clear_errors();

          let error_text = error;

          if (error_text == 'TypeError: Failed to fetch') {
            error_text = 'Ошибка сети: запрос не отправлен';
          } else {
            error_text = 'Неизвестная ошибка';
          }

          submit_handlers.error.fetch_err(error_text);
        }
      },
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
      {inputNotifications}
      <MinimalisticSubmitButton value={submitButtonName} />
    </form>
  );
}

export default MinimalisticAuthorizationForm;
