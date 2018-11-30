import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TemplateSyncResult from './TemplateSyncResult';
import * as TemplateSyncResultActions from './TemplateSyncResultActions';

const mapStateToProps = ({ foreman_templates: { syncResult } }, ownProps) =>
  ({ resultList: syncResult.resultList, filterString: syncResult.connectedSearch.filterString });

const mapDispatchToProps = (dispatch) =>
  ({ syncedTemplatesPageChange: bindActionCreators(TemplateSyncResultActions.syncedTemplatesPageChange, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(TemplateSyncResult);
