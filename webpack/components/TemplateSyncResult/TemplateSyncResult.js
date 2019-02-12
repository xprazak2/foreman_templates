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
        gitUser,
        pagination,
      },
      history,
      filterString,
      syncedTemplatesPageChange
    } = this.props;

    const redirectBack = () => history.push({ pathname: '/template_syncs'});

    const createExportStatus = (error, warning, resultAction) => {
      if (resultAction !== 'export') {
        return;
      }

      if (error) {
        return ({ type: 'danger', msg: error });
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
                                exportStatus={createExportStatus(error, warning, resultAction)}
                                repo={repo}
                                branch={branch}
                                gitUser={gitUser}
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
