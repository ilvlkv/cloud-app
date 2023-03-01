import React, { useState } from 'react';
import './MinimalisticTextInput.scss';

function MinimalisticTextInput(props) {
  const [label, showLabel] = useState('hidden');
  const [lastWordCheck, setLastWordCheck] = useState('');

  const handleChanges = (event) => {
    if (label === 'hidden') {
      showLabel('');
    }

    if (event.target.value === lastWordCheck) {
      showLabel('hidden');
    }

    return props.onChange(event.target.value);
  };

  return (
    <div className="input__box">
      <input
        type={props.type}
        className={`text-input_minimalistic ${props.className}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChanges}
      />
      <label htmlFor="" className={`text-input__label ${label}`}>
        {props.placeholder}
      </label>
    </div>
  );
}

export default MinimalisticTextInput;
