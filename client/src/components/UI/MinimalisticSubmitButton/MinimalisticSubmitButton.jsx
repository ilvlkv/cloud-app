import './MinimalisticSubmitButton.scss';

import React from 'react';

function MinimalisticSubmitButton(props) {
  return (
    <input
      type="submit"
      className="submit-button_minimalistic"
      value={props.value}
    />
  );
}

export default MinimalisticSubmitButton;
