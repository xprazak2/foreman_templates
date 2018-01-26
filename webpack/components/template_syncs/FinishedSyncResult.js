import React from 'react';

import { Button } from 'patternfly-react';
import { createColumnsFor } from './SyncResultColumns';
import SyncResultList from './SyncResultList';
import TitleActions from '../layout/TitleActions';


const FinishedSyncResult = ({ templates, type, redirectBack }) => {
  return (
    <div>
      <h2>You tried to { type } the following templates</h2>
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
