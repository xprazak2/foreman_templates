import React from 'react';

import TextField from 'foremanReact/components/common/forms/TextField';
import Button from 'foremanReact/components/common/forms/Button';

const SyncSettingField = ({ setting }) => {
  const button = (<Button className="btn btn-default">Click me!</Button>);
  // console.log(button);
  return (
      <TextField name={setting.name}
                 label={`${setting.full_name} `}
                 tooltipText={setting.description}
                 iconType="info"
                 button={button}>{setting.value}</TextField>
  )
};

export default SyncSettingField;
