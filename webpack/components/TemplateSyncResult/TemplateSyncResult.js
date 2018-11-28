import React from 'react';
// import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import EmptySyncResult from './EmptySyncResult';
import FinishedSyncResult from './FinishedSyncResult';

class TemplateSyncResult extends React.Component {

  render() {
    const { resultList, history, filterString } = this.props;

    const redirectBack = () => history.push({ pathname: '/template_syncs'});

    return (
      <div>
        { isEmpty(resultList.templates) ?
            <EmptySyncResult primaryAction={redirectBack}/> :
            <FinishedSyncResult templates={resultList.templates} type={resultList.resultAction} redirectBack={redirectBack} filterString={filterString}/>
        }
      </div>
    )
  }
}

export default TemplateSyncResult;
