import React from 'react';
import { connect } from 'react-redux';

import * as TemplateSyncActions from './NewTemplateSyncActions';
import NewTemplateSync from './NewTemplateSync';

const mapStateToProps = ({ foreman_templates: { syncSettings } }, ownProps) => {
  return syncSettings
};

export default connect(mapStateToProps, TemplateSyncActions)(NewTemplateSync);
