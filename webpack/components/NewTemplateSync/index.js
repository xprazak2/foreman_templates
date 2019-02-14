import React from 'react';
import { connect } from 'react-redux';

import * as TemplateSyncActions from './NewTemplateSyncActions';
import NewTemplateSync from './NewTemplateSync';

const mapSettings = (settings) => {
  return (settings && settings.map(setting => ({ ...setting, name: setting.name.split('template_sync_').pop() }))) || [];
}


const mapStateToProps = ({ foreman_templates: { syncSettings } }, ownProps) => {
  const res =  ({
    ...syncSettings,
    importSettings: mapSettings(syncSettings.importSettings),
    exportSettings: mapSettings(syncSettings.exportSettings)
  });
  return res;
};

export default connect(mapStateToProps, TemplateSyncActions)(NewTemplateSync);
