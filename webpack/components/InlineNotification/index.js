import React from 'react';
import classNames from 'class-names';

const iconMap = {
  danger: 'error-circle-o',
  warning: 'warning-triangle-o',
  success: 'ok'
};

const InlineNotification = (props) => {
  return (
    <div className={classNames('alert', `alert-${props.alertType}`)}>
      <span className={`pficon pficon-${iconMap[props.alertType]}`}></span>
      { props.content }
    </div>
  )
}

export default InlineNotification;
