import React from 'react';
import { required } from 'redux-form-validators';
import startsWith from 'ramda/src/startsWith';
import flip from 'ramda/src/flip';
import any from 'ramda/src/any';
import memoizeWith from 'ramda/src/memoizeWith';
import identity from 'ramda/src/identity';

import SyncSettingField from './SyncSettingField';

const repoFormat = memoizeWith(identity, formatAry => value => {
  if (value && any(flip(startsWith)(value), formatAry)) {
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
        case 'template_sync_repo':
          setting['required'] = true;
          setting['validate'] = [repoFormat(validationData['template_sync_repo'])]
          return setting;
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
