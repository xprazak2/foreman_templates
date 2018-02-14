import React from 'react';

import { TextField } form 'foremanReact/components/common/forms/TextField';

const SyncSettingsFields = ({ importSettings, exportSettings, importType }) => {
  const mapSettings = (settingsAry) =>
    ( <div>
        {settingsAry.map((item, index) => <TextField>)}
      </div>)
    }
  importType === "import" ?
}