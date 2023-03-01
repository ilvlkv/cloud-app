import React from 'react';
import './HelloMessage.scss';

function HelloMessage(props) {
  return (
    <div className="hello-message__block">
      <h1>Добро пожаловать, {props.personName}!</h1>
    </div>
  );
}

export default HelloMessage;
