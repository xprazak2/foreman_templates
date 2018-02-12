import componentRegistry from 'foremanReact/components/componentRegistry';
import injectReducer from 'foremanReact/redux/reducers/registerReducer';
import NewTemplateSync from './components/template_syncs/NewTemplateSync';
import templateSyncReducer from './reducers';

componentRegistry.register({ name: 'NewTemplateSync', type: NewTemplateSync });

injectReducer('foreman_templates', templateSyncReducer);
