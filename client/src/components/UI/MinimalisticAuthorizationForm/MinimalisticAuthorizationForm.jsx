import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import MinimalisticSubmitButton from '../MinimalisticSubmitButton/MinimalisticSubmitButton';
import MinimalisticTextInput from '../MinimalisticTextInput/MinimalisticTextInput';
import TextNotification from '../TextNotification/TextNotification';
import './MinimalisticAuthorizationForm.scss';

function MinimalisticAuthorizationForm(props) {
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (props.isRegistrationForm === false) {
      !props.login || !props.password
        ? submit_handlers.error.init(props)
        : submit_handlers.success.login(props);
    } else {
      !props.username ||
      !props.login ||
      !props.password ||
      !props.passwordCheck ||
      props.password !== props.passwordCheck
        ? submit_handlers.error.init(props)
        : submit_handlers.success.register(props);
    }
  };

  const submit_handlers = {
    error: {
      init: (props) => {
        !props.username && props.isRegistrationForm === true
          ? submit_handlers.error.input_err(
              props.usernameInputClasses,
              props.changeUsernameInputClasses,
              'Пожалуйста представьтесь - это важно :)'
            )
          : !props.login
          ? submit_handlers.error.input_err(
              props.loginInputClasses,
              props.changeLoginInputClasses,
              'Вы не ввели логин'
            )
          : !props.password
          ? submit_handlers.error.input_err(
              props.passwordInputClasses,
              props.changePasswordInputClasses,
              'Вы не ввели пароль'
            )
          : props.password !== props.passwordCheck
          ? submit_handlers.error.input_err(
              props.passwordCheckInputClasses,
              props.changePasswordCheckInputClasses,
              'Пароли не совпадают'
            )
          : false;
      },
      clear_errors: async () => {
        props.changeLoginInputClasses('');
        props.changePasswordInputClasses('');

        if (props.isRegistrationForm === true) {
          props.changeUsernameInputClasses('');
          props.changePasswordCheckInputClasses('');
        }

        props.showInputNotification(null);
      },
      input_err: async (input_state, state_handler, error_text) => {
        if (input_state) {
          state_handler('');
          setTimeout(() => {
            state_handler('text-input_error');
          }, 0);
        } else {
          submit_handlers.error.clear_errors();

          state_handler('text-input_error');

          props.showInputNotification(
            <TextNotification type="error" text={`${error_text}`} />
          );
        }
      },
      fetch_err: async (text) => {
        submit_handlers.error.clear_errors();

        props.showInputNotification(
          <TextNotification type="error" text={`${text}`} />
        );
      },
    },
    success: {
      login: async (props) => {
        submit_handlers.error.clear_errors();

        try {
          const request = await fetch(`http://localhost:3000/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              login: props.login,
              password: props.password,
            }),
          });

          const responce = await request.json();

          if (responce.status === 200) {
            submit_handlers.error.clear_errors();

            props.showInputNotification(
              <TextNotification type="success" text={`${responce.message}`} />
            );

            Cookies.set('user_data', JSON.stringify(responce.user), {
              expires: 1,
            });

            setTimeout(() => {
              location.reload();
            }, 3000);
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
      register: async (props) => {
        submit_handlers.error.clear_errors();

        try {
          const request = await fetch(
            `http://localhost:3000/auth/registration`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
              },
              body: JSON.stringify({
                login: props.login,
                password: props.password,
                username: props.username,
              }),
            }
          );

          const responce = await request.json();

          console.log(responce);

          if (responce.status === 200) {
            submit_handlers.error.clear_errors();

            props.showInputNotification(
              <TextNotification type="success" text={`${responce.message}`} />
            );
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
        placeholder="Ваше имя"
        value={props.username}
        onChange={props.setUsername}
        className={props.usernameInputClasses}
        labelClasses={props.usernameLabelClasses}
        changeLabelClasses={props.changeUsernameLabelClasses}
      />

      <MinimalisticTextInput
        type="text"
        placeholder="Логин"
        value={props.login}
        onChange={props.setLogin}
        className={props.loginInputClasses}
        labelClasses={props.loginLabelClasses}
        changeLabelClasses={props.changeLoginLabelClasses}
      />

      <MinimalisticTextInput
        type="password"
        placeholder="Пароль"
        value={props.password}
        onChange={props.setPassword}
        className={props.passwordInputClasses}
        labelClasses={props.passwordLabelClasses}
        changeLabelClasses={props.changePasswordLabelClasses}
      />

      <MinimalisticTextInput
        type="password"
        placeholder="Повторите пароль"
        value={props.passwordCheck}
        onChange={props.setPasswordCheckValue}
        className={props.passwordCheckInputClasses}
        labelClasses={props.passwordCheckLabelClasses}
        changeLabelClasses={props.changePasswordCheckLabelClasses}
      />
      {props.inputNotifications}
      <MinimalisticSubmitButton value={props.submitButtonName} />
    </form>
  );
}

export default MinimalisticAuthorizationForm;
