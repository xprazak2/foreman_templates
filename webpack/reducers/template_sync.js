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

  const stopLoading = () =>
    state.set('loadingSettings', false);

  switch(action.type) {
    case SYNC_SETTINGS_REQUEST:
      return state.set('loadingSettings', true);
    case SYNC_SETTINGS_SUCCESS:
      stopLoading();
      return state.set('syncSettings', payload.results);
    case SYNC_SETTINGS_FAILURE:
      stopLoading();
      return state.set('error', payload.error);
    default:
      return state;
  }
}

export default syncTemplates;
