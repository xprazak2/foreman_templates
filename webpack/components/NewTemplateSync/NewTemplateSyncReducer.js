import Immutable from 'seamless-immutable';

import {
  SYNC_SETTINGS_REQUEST,
  SYNC_SETTINGS_SUCCESS,
  SYNC_SETTINGS_FAILURE,
} from '../../consts';

const initialState = Immutable({
  loadingSettings: false,
  importSettings: [],
  exportSettings: [],
  error: ''
});

const syncSettings = (state = initialState, action) => {
  const { payload } = action;
  console.log(payload)
  switch(action.type) {
    case SYNC_SETTINGS_REQUEST:
      return state.set('loadingSettings', true);
    case SYNC_SETTINGS_SUCCESS:
      return state.set('loadingSettings', false)
                  .set('importSettings', payload.results.import)
                  .set('exportSettings', payload.results.export);
    case SYNC_SETTINGS_FAILURE:
      return state.set({ error: payload.error}).set({ loadingSettings: false });
    default:
      return state;
  }
}

export default syncSettings;
