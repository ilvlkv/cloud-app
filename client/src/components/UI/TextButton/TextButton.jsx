import React from 'react';
import './TextButton.scss';

function TextButton(props) {
  return (
    <button
      className={`text-button ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default TextButton;
