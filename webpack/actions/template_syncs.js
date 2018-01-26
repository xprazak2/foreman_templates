import {
  IMPORT_SETTINGS_REQUEST,
  IMPORT_SETTINGS_SUCCESS,
  IMPORT_SETTINGS_FAILURE,
  EXPORT_SETTINGS_REQUEST,
  EXPORT_SETTINGS_SUCCESS,
  EXPORT_SETTINGS_FAILURE
} from '../consts';

import { ajaxRequestAction } from 'foremanReact/redux/actions/common';

const getSettings = (requestAction, successAction, failureAction) => url => dispatch =>
  ajaxRequestAction({
    dispatch,
    requestAction,
    successAction,
    failureAction,
    url,
    item: {}
  });

export const getImportSettings = getSettings(IMPORT_SETTINGS_REQUEST, IMPORT_SETTINGS_SUCCESS, IMPORT_SETTINGS_FAILURE);
export const getExportSettings = getSettings(EXPORT_SETTINGS_REQUEST, EXPORT_SETTINGS_SUCCESS, EXPORT_SETTINGS_FAILURE);