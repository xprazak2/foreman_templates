import React from 'react';

import { Button } from 'patternfly-react';
import SyncResultList from './SyncResultList';
import TitleActions from '../layout/TitleActions';
import Title from '../layout/Title';
import Search from './Search';
import ConnectedSearch from './ConnectedSearch';
import InlineNotification from '../InlineNotification';

const ShowInlineNotification = props =>
  props.exportStatus ?
    (<InlineNotification alertType={props.exportStatus.type} content={props.exportStatus.msg} />) :
    '';

const FinishedSyncResult = (props) => {
  const {
    templates,
    type,
    redirectBack,
    repo,
    branch,
    gitUser,
    filterString,
    pagination,
    pageChange,
    exportStatus
  } = props;

  const composeSubtitle = (repo, branch, gitUser) => {
    const branchString = branch && ` and branch ${branch}` || '';
    const userString = gitUser && ` as user ${gitUser}` || '';
    return `using repo ${repo}${branchString}${userString}`;
  }

  return (
    <div>
      <Title titleText={`You tried to ${type} the following templates`} headingSize='1' />
      <Title titleText={composeSubtitle(repo, branch, gitUser)} headingSize='4' />
      <ShowInlineNotification exportStatus={exportStatus}/>
      <div className="row title-row">
        <ConnectedSearch className='col-md-6'/>
        <TitleActions>
          <Button onClick={redirectBack}>{ __('Back') }</Button>
        </TitleActions>
      </div>
      <SyncResultList expandable={type === 'import'}
                      exportStatus={exportStatus}
                      templates={templates}
                      filterString={filterString}
                      pagination={pagination}
                      pageChange={pageChange}/>
    </div>
  )
}

export default FinishedSyncResult;
