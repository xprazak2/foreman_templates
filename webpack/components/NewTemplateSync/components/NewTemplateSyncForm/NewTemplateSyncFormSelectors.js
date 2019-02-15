import { createSelector } from 'reselect';

import { mapImportSettings, mapExportSettings } from '../../NewTemplateSyncSelectors';

export const selectInitialFormValues = createSelector(
  mapImportSettings,
  mapExportSettings,
  (importSettings, exportSettings) =>
    importSettings.concat(exportSettings)
                  .reduce((memo, item) => Object.assign(memo, { [item.name]: item.value }), {})
);
