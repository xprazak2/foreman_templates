import Immutable from 'seamless-immutable';

import { TEMPLATESYNC_FORM_SUBMITTED } from '../../consts';

const initialState = Immutable({
  resultAction: '',
  templates: []
})

const syncResult = (state = initialState, action) => {
  const { payload } = action;
  switch(action.type) {
    case TEMPLATESYNC_FORM_SUBMITTED:
      return state.set('resultAction', payload.data.result_action).set('templates', payload.data.templates);
    default:
      return state;
  }
}

export default syncResult;
