import React from 'react';

import textField from 'foremanReact/components/common/forms/TextField';
import Button from 'foremanReact/components/common/forms/Button';

const SyncSettingField = (setting) => {

  return (
    <div>
      <TextField name={setting.name}
                 label={`${setting.full_name} `}
                 tooltipText={setting.description}
                 iconType="info">{setting.value}</TextField>
      <Button className="button-default">Click me!</Button>
    </div>
  )
}