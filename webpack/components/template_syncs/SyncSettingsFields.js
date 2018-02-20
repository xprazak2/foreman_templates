import React from 'react';

import TextField from 'foremanReact/components/common/forms/TextField';

const SyncSettingsFields = ({ importSettings, exportSettings, syncType }) => {
  const mapSettings = (settingsAry) =>
    (
      <div>
        {settingsAry.map((item, index) => <TextField name={item.name} label={item.description}>{item.value}</TextField>)}
      </div>
    )

  if (syncType === "import") {
    return mapSettings(importSettings);
  }

  if (syncType === "export") {
    return mapSettings(exportSettings);
  }

  return(<div>No Settings found!</div>);
}

export default SyncSettingsFields;
