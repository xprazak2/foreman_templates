import React from 'react';

import { Radio } from 'patternfly-react';
import CommonForm from 'foremanReact/components/common/forms/CommonForm';

class SyncTypeRadios extends React.Component {
  render() {
    const {
      controlLabel,
      radios,
      name,
      className = '',
      inputClassName = 'col-md-6',
      disabled = false
    } = this.props;

    return (
      <CommonForm
        label={controlLabel}
        className={className}
        inputClassName={inputClassName}
      >
        {radios.map((item, index) => (
          <Radio
            inline={true}
            title={item.label}
            checked={item.checked}
            disabled={disabled}
            value={item.value}
            onChange={item.onChange}
          >
            {item.label}
          </Radio>
        ))}
      </CommonForm>
    )
  }
}

export default SyncTypeRadios;
