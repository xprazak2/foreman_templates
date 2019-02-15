import React from 'react';
import { connect } from 'react-redux';

import * as TemplateSyncActions from './NewTemplateSyncActions';
import NewTemplateSync from './NewTemplateSync';
import { newSyncState, mapImportSettings, mapExportSettings } from './NewTemplateSyncSelectors';

const mapStateToProps = state => ({
  ...newSyncState(state),
  importSettings: mapImportSettings(state),
  exportSettings: mapExportSettings(state)
});

export default connect(mapStateToProps, TemplateSyncActions)(NewTemplateSync);
