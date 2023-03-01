import React from 'react';
import './HelloMessage.scss';
import Cookies from 'js-cookie';

const getTokenData = async () => {
  const raw = Cookies.get('user_data');
  if (raw) {
    const data = await JSON.parse(raw);
    return data;
  }
};
const default_name = 'User';
const token_data = await getTokenData();

function HelloMessage() {
  return (
    <div className="hello-message__block">
      <h1>Добро пожаловать, {token_data.name || default_name}!</h1>
    </div>
  );
}

export default HelloMessage;
