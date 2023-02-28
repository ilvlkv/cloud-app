import React, { useState, useEffect } from 'react';
import './TextNotification.scss';

function TextNotification(props) {
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    if (notificationType) return;
    const type = props.type;

    switch (type) {
      case 'error':
        setNotificationType('text-error');
        break;
      case 'success':
        setNotificationType('text-success');
        break;
    }
  }, [notificationType]);

  return (
    <p className={`text-notification ${notificationType}`}>{props.text}</p>
  );
}

export default TextNotification;
