import React from 'react';
import { memoize } from 'lodash';
import PropTypes from 'prop-types';

import SyncSettingField from './SyncSettingField';

const repoFormat = memoize(formatAry => value => {
  const valid = formatAry
    .map(item => value.startsWith(item))
    .reduce((memo, item) => item || memo, false);

  if (value && valid) {
    return undefined;
  }
  return `Invalid repo format, must start with one of: ${formatAry.join(', ')}`;
});

const SyncSettingsFields = ({
  importSettings,
  exportSettings,
  syncType,
  resetField,
  disabled,
  validationData,
}) => {
  const addValidationToSetting = (setting, validationData) => (
    setting.name === 'repo' ?
      setting.merge({
        required: true,
        validate: [repoFormat(validationData.repo)],
      }) :
      setting
  );

  const settingsAry = 'import' ? importSettings : exportSettings;

  return (
    <React.Fragment>
      { settingsAry.map(setting => addValidationToSetting(setting, validationData)).map((setting) => (
        <SyncSettingField
          setting={setting}
          key={setting.name}
          disabled={disabled}
          resetField={resetField}
        />
      ))}
    </React.Fragment>
  )
};

SyncSettingsFields.propTypes = {
  importSettings: PropTypes.array.isRequired,
  exportSettings: PropTypes.array.isRequired,
  syncType: PropTypes.string.isRequired,
  resetField: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  validationData: PropTypes.object,
};

SyncSettingsFields.defaultProps = {
  disabled: false,
};

export default SyncSettingsFields;
