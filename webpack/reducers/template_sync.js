import { combineReducers } from 'redux';

import {
  SYNC_SETTINGS_REQUEST,
  SYNC_SETTINGS_SUCCESS,
  SYNC_SETTINGS_FAILURE,
} from '../consts';

import Immutable from 'seamless-immutable';

const initialState = Immutable({});

const syncTemplates = (state = initialState, action) => {
  const { payload } = action;

  const stopLoading = (state) =>
    state.set('loadingSettings', false);

  switch(action.type) {
    case SYNC_SETTINGS_REQUEST:
      return state.set('loadingSettings', true);
    case SYNC_SETTINGS_SUCCESS:
      console.log(payload.results)
      return stopLoading(state.set('importSettings', Immutable(payload.results.import)).set('exportSettings', Immutable(payload.results.export)));
    case SYNC_SETTINGS_FAILURE:
      return stopLoading(state.set('error', payload.error));
    default:
      return state;
  }
}

export default syncTemplates;
