import React from 'react';
import './TextButton.scss';

function TextButton(props) {
  return (
    <button className="text-button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default TextButton;
