import React from 'react';

import { Button } from 'patternfly-react';
import SyncResultList from './SyncResultList';
import TitleActions from '../layout/TitleActions';
import Title from '../layout/Title';
import Search from './Search';
import ConnectedSearch from './ConnectedSearch';


const processTemplates = (templates, type) => {
  if (!type || type === 'import') {
    console.log(templates);
    return templates;
  }

  if (templates && type === 'export') {
    console.log(templates);
    return templates
  }
}

const FinishedSyncResult = (props) => {
  const {
    templates,
    type,
    redirectBack,
    filterString,
    pagination,
    pageChange
  } = props;

  const processedTemplates = processTemplates(templates, type);

  return (
    <div>
      <Title titleText={`You tried to ${type} the following templates`} />
      <div className="row title-row">
        <ConnectedSearch className='col-md-6'/>
        <TitleActions>
          <Button onClick={redirectBack}>{ __('Back') }</Button>
        </TitleActions>
      </div>
      <SyncResultList templates={templates}
                      filterString={filterString}
                      pagination={pagination}
                      pageChange={pageChange}/>
    </div>
  )
}

export default FinishedSyncResult;
