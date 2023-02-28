import React from 'react';
import './MinimalisticTextInput.scss';

function MinimalisticTextInput(props) {
  const handleChanges = () => {
    props.onChange(event);
  };

  return (
    <input
      type={props.type}
      className="text-input_minimalistic"
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChanges}
    />
  );
}

export default MinimalisticTextInput;
