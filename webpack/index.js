import componentRegistry from 'foremanReact/components/componentRegistry';
import injectReducer from 'foremanReact/redux/reducers/registerReducer';
import ForemanTemplates from './containers/ForemanTemplates';
import templateSyncReducer from './reducers';

componentRegistry.register({ name: 'ForemanTemplates', type: ForemanTemplates, store: false});

injectReducer('foreman_templates', templateSyncReducer);
