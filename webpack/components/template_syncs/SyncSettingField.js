import React from 'react';

import TextField from 'foremanReact/components/common/forms/TextField';
import TextButtonField from '../layout/TextButtonField';
// import Button from 'foremanReact/components/common/forms/Button';
import { FieldLevelHelp } from 'patternfly-react';

const SyncSettingField = ({ setting, resetField, disabled}) => {
  // const button = (<Button className="btn btn-default">Click me!</Button>);
  // console.log(button);

  const label = (setting) => (<span>
      { `${setting.full_name} ` } <FieldLevelHelp content={setting.description}/>
    </span>)

  const fieldSelector = (setting) => {
    if (setting.settings_type === 'boolean') {
      return "checkbox";
    }

    if (setting.selection.length !== 0) {
      return "select";
    }

    return "text";
  }

  const handleReset = (setting_name, setting_value) => {
    resetField(setting_name, setting_value)
  }

  return (
      <TextButtonField name={setting.name}
                       label={label(setting)}
                       blank={{}}
                       item={setting}
                       buttonAttrs={ { buttonText: "Use Default",
                                       buttonAction: () => handleReset(setting.name, setting.value) } }
                       fieldSelector={fieldSelector}
                       disabled={disabled}
                       >{setting.value}</TextButtonField>
  )
};

export default SyncSettingField;
