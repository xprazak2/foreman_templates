import React from 'react';
import { memoize } from 'lodash';
import PropTypes from 'prop-types';

import SyncSettingField from './SyncSettingField';

const SyncSettingsFields = ({
  importSettings,
  exportSettings,
  syncType,
  resetField,
  disabled
}) => {
  const addRequiredToSetting = (setting) => (
    setting.name === 'repo' ?
      setting.merge({
        required: true
      }) :
      setting
  );

  const settingsAry = syncType === 'import' ? importSettings : exportSettings;

  return (
    <React.Fragment>
      { settingsAry.map(addRequiredToSetting).map((setting) => (
        <SyncSettingField
          setting={setting}
          syncType={syncType}
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
