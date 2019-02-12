import React from 'react';
// import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import EmptySyncResult from './EmptySyncResult';
import FinishedSyncResult from './FinishedSyncResult';

class TemplateSyncResult extends React.Component {

  render() {
    const {
      resultList: {
        templates,
        resultAction,
        warning,
        error,
        repo,
        branch,
        git_user,
        pagination,
      },
      history,
      filterString,
      syncedTemplatesPageChange
    } = this.props;

    const redirectBack = () => history.push({ pathname: '/template_syncs'});

    const createGlobalStatus = (error, warning) => {
      if (error) {
        return ({ type: 'error', msg: error });
      }

      if (warning) {
        return ({ type: 'warning', msg: warning });
      }
    }

    return (
      <div>
        { isEmpty(templates) ?
            <EmptySyncResult primaryAction={redirectBack}/> :
            <FinishedSyncResult templates={templates}
                                type={resultAction}
                                globalStatus={createGlobalStatus(error, warning)}
                                repo={repo}
                                branch={branch}
                                gitUser={git_user}
                                redirectBack={redirectBack}
                                filterString={filterString}
                                pagination={pagination}
                                pageChange={syncedTemplatesPageChange}/>
        }
      </div>
    )
  }
}

export default TemplateSyncResult;
