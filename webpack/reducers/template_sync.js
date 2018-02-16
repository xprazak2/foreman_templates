import { combineReducers } from 'redux';

import {
  SYNC_SETTINGS_REQUEST,
  SYNC_SETTINGS_SUCCESS,
  SYNC_SETTINGS_FAILURE,
} from '../consts';

const syncTemplates = (state = {}, action) => {
  const { payload } = action;

  switch(action.type) {
    case SYNC_SETTINGS_REQUEST:
      return { ...state, ...{ loadingSettings: true } };
    case SYNC_SETTINGS_SUCCESS:
      console.log(payload)
      return { ...state, ...{ loadingSettings: false, importSettings: payload.results.import, exportSettings: payload.results.export } };
    case SYNC_SETTINGS_FAILURE:
      return { ...state, ...{ error: payload.error, loadingSettings: false } };
    default:
      return state;
  }
}

export default syncTemplates;
