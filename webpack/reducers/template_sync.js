import { combineReducers } from 'redux';

import {
  IMPORT_SETTINGS_REQUEST,
  IMPORT_SETTINGS_SUCCESS,
  IMPORT_SETTINGS_FAILURE,
  EXPORT_SETTINGS_REQUEST,
  EXPORT_SETTINGS_SUCCESS,
  EXPORT_SETTINGS_FAILURE
} from '../consts';

import Immutable from 'seamless-immutable';

const initialState = Immutable({});

const importTemplates = (state = initialState, action) => {
  const { payload } = action;

  switch(action.type) {
    case IMPORT_SETTINGS_REQUEST:
      return state.set('loading_settings', true);
    case IMPORT_SETTINGS_SUCCESS:
      return state.set('import_settings', payload.results);
    case IMPORT_SETTINGS_FAILURE:
      return state.set('error', payload.error);
    default:
      return state;
  }
}

const exportTemplates = (state = initialState, action) => {
  const { payload } = action;

  switch(action.type) {
    case EXPORT_SETTINGS_REQUEST:
      return state.set('loading_settings', true);
    case EXPORT_SETTINGS_SUCCESS:
      return state.set('export_settings', payload.results);
    case EXPORT_SETTINGS_FAILURE:
      return state.set('error', payload.error);
    default:
      return state;
  }
}

export default combineReducers({ importTemplates, exportTemplates });
