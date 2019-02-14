import React from 'react';
import { required } from 'redux-form-validators';
import { memoize } from 'lodash';
import SyncSettingField from './SyncSettingField';


const repoFormat = memoize(formatAry => value => {
  const valid = formatAry.map((item) => value.startsWith(item))
                         .reduce((memo, item) => (item || memo), false)

  if (value && valid) {
    return undefined;
  } else {
    return `Invalid repo format, must start with one of: ${formatAry.join(', ')}`;
  }
});

const SyncSettingsFields = ({ importSettings, exportSettings, syncType, resetField, disabled, validationData }) => {
  const mapSettings = (settingsAry) =>
    (
      <div>
        { addValidations(settingsAry).map((setting, index) =>
          (<SyncSettingField setting={setting}
                             key={setting.name}
                             disabled={disabled}
                             resetField={resetField}>
          </SyncSettingField>))
        }
      </div>
    )

  const addValidations = (validationData => settingsAry => {
    return settingsAry.map((setting) => {
      switch(setting.name) {
        case 'repo':
          return setting.set('required', true)
                        .set('validate', [repoFormat(validationData['repo'])]);
        default:
          return setting;
      }
    })
  })(validationData);

  if (syncType === "import") {
    return mapSettings(importSettings);
  }

  if (syncType === "export") {
    return mapSettings(exportSettings);
  }

  // TODO: Error msg
  return(<div>No Settings found! This should never ever happen.</div>);
}

export default SyncSettingsFields;
