import React from 'react';
import { connect } from 'react-redux';

import TemplateSyncResult from './TemplateSyncResult';

const mapStateToProps = ({ foreman_templates: { syncResult } }, ownProps) =>
  ({ resultList: syncResult.resultList, filterString: syncResult.connectedSearch.filterString });

export default connect(mapStateToProps)(TemplateSyncResult);
