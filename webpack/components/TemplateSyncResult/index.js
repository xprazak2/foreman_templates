import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TemplateSyncResult from './TemplateSyncResult';
import * as TemplateSyncResultActions from './TemplateSyncResultActions';

import { selectResultList } from './TemplateSyncResultSelectors';
import { selectSearchFilterString } from './components/ConnectedSearch/ConnectedSearchSelectors';

const mapStateToProps = state => {
  return ({
    resultList: selectResultList(state),
    filterString: selectSearchFilterString(state)
  });
}

export default connect(mapStateToProps, TemplateSyncResultActions)(TemplateSyncResult);
