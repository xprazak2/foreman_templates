import React from 'react';
import { ListView } from 'patternfly-react';
import Pagination from 'foremanReact/components/Pagination/PaginationWrapper';

import ConnectedSearch from './ConnectedSearch';
import SyncedTemplate from './SyncedTemplate';
import { templatesPage } from '../TemplateSyncResultSelectors';

const SyncResultList = props => {
  const { filterString, pagination, pageChange, templates } = props;

  const filterPredicate = (filterString) => (template) => {
    return filterString ? template.name.toLowerCase().match(filterString.toLowerCase()) : true;
  }

  return (
    <ListView>
      <Pagination
        viewType='list'
        itemCount={templates.length}
        pagination={pagination}
        onChange={pageChange}
        dropdownButtonId='template-sync-result-dropdown'
      />
      { templatesPage(templates, pagination)
          .filter(filterPredicate(filterString))
          .map((template) => <SyncedTemplate
                              template={template}
                              key={template.name} />) }
    </ListView>
  )
};

export default SyncResultList;
