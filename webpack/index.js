import componentRegistry from 'foremanReact/components/componentRegistry';
import injectReducer from 'foremanReact/redux/reducers/registerReducer';
import ForemanTemplates from './containers/ForemanTemplates';
import templateSyncReducer from './reducer';

componentRegistry.register({ name: 'ForemanTemplates', type: ForemanTemplates });

injectReducer('foreman_templates', templateSyncReducer);
