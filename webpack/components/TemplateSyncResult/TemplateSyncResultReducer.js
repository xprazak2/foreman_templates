import Immutable from 'seamless-immutable';
import { combineReducers } from 'redux';

import connectedSearch from './ConnectedSearch/ConnectedSearchReducer';

import { TEMPLATESYNC_FORM_SUBMITTED,
         SYNC_RESULT_PAGINATION_CHANGE } from '../../consts';

const initialState = Immutable({
  resultAction: '',
  templates: [],

  pagination: {
    page: 1,
    perPage: 20
  }
})

const syncResult = (state = initialState, action) => {
  const { payload } = action;
  console.log(payload);
  switch(action.type) {
    case TEMPLATESYNC_FORM_SUBMITTED:
      return state.merge({
        'resultAction': payload.data.result_action,
        'templates': payload.data.templates,
        'repo': payload.data.repo,
        'branch': payload.data.branch,
        'gitUser': payload.data.git_user,
        'error': payload.data.error,
        'warning': payload.data.warning
      })
    case SYNC_RESULT_PAGINATION_CHANGE:
      return state.set('pagination', payload.pagination);
    default:
      return state;
  }
}

export default combineReducers({ resultList: syncResult, connectedSearch });
