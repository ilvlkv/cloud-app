import React from 'react';
import './MinimalisticTextInput.scss';

function MinimalisticTextInput(props) {
  const handleChanges = (event) => {
    return props.onChange(event.target.value);
  };

  return (
    <input
      type={props.type}
      className={`text-input_minimalistic ${props.className}`}
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChanges}
    />
  );
}

export default MinimalisticTextInput;
