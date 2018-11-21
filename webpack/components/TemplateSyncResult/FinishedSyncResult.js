import React from 'react';

import { Button } from 'patternfly-react';
import { createColumnsFor } from './SyncResultColumns';
import SyncResultList from './SyncResultList';
import TitleActions from '../layout/TitleActions';
import Title from '../layout/Title';

const FinishedSyncResult = (props) => {
  const {
    templates,
    type,
    redirectBack
  } = props;
  console.log(props);
  return (
    <div>
      <Title titleText={`You tried to ${type} the following templates`} />
      <div className="row">
        <TitleActions>
          <Button onClick={redirectBack}>{ __('Back') }</Button>
        </TitleActions>
      </div>
      <SyncResultList templates={templates} columns={createColumnsFor(type)} />
    </div>
  )
}

export default FinishedSyncResult;
