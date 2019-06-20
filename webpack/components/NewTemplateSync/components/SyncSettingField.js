import React from 'react';
import {
  FieldLevelHelp,
  OverlayTrigger,
  Tooltip,
  Icon,
} from 'patternfly-react';
import PropTypes from 'prop-types';

import TextButtonField from './TextButtonField';
import ButtonTooltip from './ButtonTooltip';

const SyncSettingField = ({ setting, resetField, disabled, syncType }) => {
  const label = settingObj => `${settingObj.fullName} `;

  const fieldSelector = settingObj => {
    if (settingObj.settingsType === 'boolean') {
      return 'checkbox';
    }

    if (settingObj.selection.length !== 0) {
      return 'select';
    }

    return 'text';
  };

  return (
    <TextButtonField
      name={`${syncType}.${setting.name}`}
      label={label(setting)}
      blank={{}}
      item={setting}
      buttonText={<ButtonTooltip tooltipId={setting.name} />}
      buttonAction={resetField(`${syncType}.${setting.name}`, setting.value)}
      fieldSelector={fieldSelector}
      disabled={disabled}
      fieldRequired={setting.required}
      tooltipHelp={<FieldLevelHelp content={setting.description} />}
    >
      {setting.value}
    </TextButtonField>
  );
};

SyncSettingField.propTypes = {
  setting: PropTypes.object.isRequired,
  resetField: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SyncSettingField;
