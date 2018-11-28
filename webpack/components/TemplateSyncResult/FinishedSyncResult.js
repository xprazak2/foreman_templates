import React from 'react';

import { Button } from 'patternfly-react';
import SyncResultList from './SyncResultList';
import TitleActions from '../layout/TitleActions';
import Title from '../layout/Title';
import Search from './Search';
import ConnectedSearch from './ConnectedSearch';

const FinishedSyncResult = (props) => {
  const {
    templates,
    type,
    redirectBack,
    filterString
  } = props;
  return (
    <div>
      <Title titleText={`You tried to ${type} the following templates`} />
      <div className="row title-row">
        <ConnectedSearch className='col-md-6'/>
        <TitleActions>
          <Button onClick={redirectBack}>{ __('Back') }</Button>
        </TitleActions>
      </div>
      <SyncResultList templates={templates} filterString={filterString} />
    </div>
  )
}

export default FinishedSyncResult;
