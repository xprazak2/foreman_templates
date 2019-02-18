import React from 'react';
import { isEmpty } from 'lodash';

import EmptySyncResult from './components/EmptySyncResult';
import FinishedSyncResult from './components/FinishedSyncResult';

import './TemplateSyncResult.scss';

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

    return (
      <div>
        { isEmpty(templates) ?
            <EmptySyncResult primaryAction={redirectBack}/> :
            <FinishedSyncResult templates={templates}
                                type={resultAction}
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
