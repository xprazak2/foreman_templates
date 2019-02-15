import { createSelector } from 'reselect';

export const newSyncState = state => state.foreman_templates.syncSettings

export const selectImportSettings = state => newSyncState(state).importSettings;
export const selectExportSettings = state => newSyncState(state).exportSettings;

const mapSettings = (settings) => {
  return (settings && settings.map(setting => ({ ...setting, name: setting.name.split('template_sync_').pop() }))) || [];
}

export const mapImportSettings = createSelector(
  selectImportSettings,
  mapSettings
);

export const mapExportSettings = createSelector(selectExportSettings, mapSettings);
