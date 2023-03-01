import React, { useState } from 'react';
import './MinimalisticTextInput.scss';

function MinimalisticTextInput(props) {
  const [lastWordCheck, setLastWordCheck] = useState('');

  const handleChanges = (event) => {
    if (props.labelClasses === 'hidden') {
      props.changeLabelClasses('');
    }

    if (event.target.value === lastWordCheck) {
      props.changeLabelClasses('hidden');
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
      <label htmlFor="" className={`text-input__label ${props.labelClasses}`}>
        {props.placeholder}
      </label>
    </div>
  );
}

export default MinimalisticTextInput;
