import React from 'react';

// import TextField from 'foremanReact/components/common/forms/TextField';
import SyncSettingField from './SyncSettingField';

const SyncSettingsFields = ({ importSettings, exportSettings, syncType }) => {
  const mapSettings = (settingsAry) =>
    (
      <div>
        { settingsAry.map((setting, index) => <SyncSettingField setting={setting} key={setting.name}></SyncSettingField>) }
      </div>
    )

  if (syncType === "import") {
    return mapSettings(importSettings);
  }

  if (syncType === "export") {
    return mapSettings(exportSettings);
  }

  return(<div>No Settings found! This should never ever happen.</div>);
}

export default SyncSettingsFields;
