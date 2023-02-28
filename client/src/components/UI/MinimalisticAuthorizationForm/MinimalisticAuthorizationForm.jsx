import React from 'react';
import Cookies from 'js-cookie';
import MinimalisticSubmitButton from '../MinimalisticSubmitButton/MinimalisticSubmitButton';
import MinimalisticTextInput from '../MinimalisticTextInput/MinimalisticTextInput';
import './MinimalisticAuthorizationForm.scss';

function MinimalisticAuthorizationForm(props) {
  const handleLoginChange = (event) => {
    props.onLoginChange(event.target.value);
  };

  const handlePasswordChange = (event) => {
    props.onPasswordChange(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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

    if (responce.token) {
      console.log(responce.message);
      Cookies.set('token', responce.token, { expires: 1 });
    } else {
      console.log(`Ошибка авторизации: ${responce.message}`);
    }
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
      />
      <MinimalisticTextInput
        type="password"
        placeholder="Пароль"
        value={props.password}
        onChange={handlePasswordChange}
      />
      <MinimalisticSubmitButton value="Авторизоваться" />
    </form>
  );
}

export default MinimalisticAuthorizationForm;
