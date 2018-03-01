import React from 'react';

import TextField from 'foremanReact/components/common/forms/TextField';
import TextButtonField from 'foremanReact/components/common/forms/TextButtonField';
// import Button from 'foremanReact/components/common/forms/Button';

const SyncSettingField = ({ setting }) => {
  // const button = (<Button className="btn btn-default">Click me!</Button>);
  // console.log(button);

  // console.log(fieldType(setting));
  return (
      // <TextField name={setting.name}
      //            label={`${setting.full_name} `}>{setting.value}</TextField>
      <TextButtonField name={setting.name}
                       label={`${setting.full_name} `}
                       blank={{}}
                       item={setting}
                       >{setting.value}</TextButtonField>
  )
};

export default SyncSettingField;
