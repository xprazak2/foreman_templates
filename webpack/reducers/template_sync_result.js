import { TEMPLATESYNC_FORM_SUBMITTED } from '../consts';

const syncResult = (state = {}, action) => {
  const { payload } = action;
  switch(action.type) {
    case TEMPLATESYNC_FORM_SUBMITTED:
      return { ...state, result: payload.data.results, templates: payload.data.templates };
    default:
      return state;
  }
}

export default syncResult;
