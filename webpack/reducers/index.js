import { combineReducers } from 'redux';

import syncSettings from './template_sync';
import syncResult from './template_sync_result';

export default combineReducers({ syncSettings, syncResult });
