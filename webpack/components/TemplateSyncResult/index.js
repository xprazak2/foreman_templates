import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TemplateSyncResult from './TemplateSyncResult';
import * as TemplateSyncResultActions from './TemplateSyncResultActions';

const mapStateToProps = ({ foreman_templates: { syncResult } }) => {
  return ({ resultList: syncResult.resultList, filterString: syncResult.connectedSearch.filterString });
}

export default connect(mapStateToProps, TemplateSyncResultActions)(TemplateSyncResult);
