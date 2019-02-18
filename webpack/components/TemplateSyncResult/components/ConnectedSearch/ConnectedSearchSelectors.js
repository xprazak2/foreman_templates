import { selectSyncResult } from '../TemplateSyncResultSelectors';

export const selectSearch = state => selectSyncResult(state).connectedSearch;

export const selectSearchFilterString = state => selectSearch(state).filterString;
