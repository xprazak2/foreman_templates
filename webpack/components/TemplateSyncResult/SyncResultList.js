import React from 'react';
import { ListView } from 'patternfly-react';
import Pagination from 'foremanReact/components/Pagination/PaginationWrapper';

import ConnectedSearch from './ConnectedSearch';
import SyncedTemplate from './SyncedTemplate';
import { templatesPage } from './TemplateSyncResultSelectors';

import './TemplateSyncResult.scss';

class SyncResultList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { filterString, pagination, pageChange, templates, expandable, exportStatus } = this.props;

    const filterPredicate = (filterString) => (template) => {
      return filterString ? template.name.match(filterString) : true;
    }

    return (
      <div>
        <ListView>
          <Pagination
            viewType="list"
            itemCount={templates.length}
            pagination={pagination}
            onChange={pageChange}
            dropdownButtonId='template-sync-result-dropdown'
          />
          { templatesPage(templates, pagination)
              .filter(filterPredicate(filterString))
              .map((template) => <SyncedTemplate
                                  template={template}
                                  key={template.name}
                                  exportStatus={exportStatus}
                                  expandable={expandable}/>) }
        </ListView>
      </div>
    )
  }
}

export default SyncResultList;
