import React from 'react';
// import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import EmptySyncResult from './EmptySyncResult';
import FinishedSyncResult from './FinishedSyncResult';

class TemplateSyncResult extends React.Component {

  render() {
    const { syncResult, history } = this.props;

    const redirectBack = () => history.push({ pathname: '/template_syncs'});

    return (
      <div>
        { isEmpty(syncResult.templates) ?
            <EmptySyncResult primaryAction={redirectBack}/> :
            <FinishedSyncResult templates={syncResult.templates} type={syncResult.result} redirectBack={redirectBack}/>
        }
      </div>
    )
  }
}

export default TemplateSyncResult;
