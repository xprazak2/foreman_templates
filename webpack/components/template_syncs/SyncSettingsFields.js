import React from 'react';

import { TextField } form 'foremanReact/components/common/forms/TextField';

const SyncSettingsFields = ({ importSettings, exportSettings, importType }) => {
  const mapSettings = (settingsAry) =>
    (
      <div>
        {settingsAry.map((item, index) => <TextField name={item.name} label={item.description}>{item.value}</TextField>)}
      </div>
    )

  if (importType === "import") {
    return mapSettings(importSettings);
  }

  if (importType === "export") {
    return mapSettings(exportSettings);
  }

  return(<div>No Settings found!</div>);
}