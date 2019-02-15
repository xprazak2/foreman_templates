import { createSelector } from 'reselect';

export const newSyncState = state => {
  console.log('This is state')
  console.log(state)
  return state.foreman_templates.syncSettings
}

export const selectImportSettings = state => newSyncState(state).importSettings;
export const selectExportSettings = state => newSyncState(state).exportSettings;
export const selectLoadingSettings = state => newSyncState(state).loadingSettings;
export const selectError = state => newSyncState(state).error;

const mapSettings = (settings) => {
  return (settings && settings.map(setting => ({ ...setting, name: setting.name.split('template_sync_').pop() }))) || [];
}

export const mapImportSettings = createSelector(selectImportSettings, mapSettings);
export const mapExportSettings = createSelector(selectExportSettings, mapSettings);
