import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'ramda/src/isEmpty';

import EmptySyncResult from './EmptySyncResult';
import FinishedSyncResult from './FinishedSyncResult';

class TemplateSyncResult extends React.Component {
  constructor(props) {
    console.log('sync result props')
    console.log(props)
    super(props)
  }

  render() {
    const { syncResult, history } = this.props;
    console.log('props in result render');
    console.log(this.props);

    const redirectBack = () => history.push({ pathname: '/template_syncs'})
    return (
      <div>
        { isEmpty(syncResult) ?
            <EmptySyncResult primaryAction={redirectBack}/> :
            <FinishedSyncResult templates={syncResult.templates} type={syncResult.result} redirectBack={redirectBack}/>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ foreman_templates: { syncResult } }, ownProps) => ({ syncResult });

export default connect(mapStateToProps)(TemplateSyncResult);
