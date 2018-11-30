import React from 'react';
import { ListView } from 'patternfly-react';
import Pagination from 'foremanReact/components/Pagination/PaginationWrapper';

import ConnectedSearch from './ConnectedSearch';
import SyncedTemplate from './SyncedTemplate';
import { templatesPage } from './TemplateSyncResultSelectors';

import './overrides.scss';

class SyncResultList extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    const templateReorder = (templates) => {
      return Object.values(templates).reduce((memo, item) => memo.concat(item), [])
    }

    const { filterString, pagination, pageChange } = this.props;

    const filterPredicate = (filterString) => (template) => {
      return filterString ? template.name.match(filterString) : true;
    }

    const reorderedTemplates = templateReorder(this.props.templates)

    return (
      <div>
        <ListView>
          <Pagination
            viewType="list"
            itemCount={reorderedTemplates.length}
            pagination={pagination}
            onChange={pageChange}
            dropdownButtonId='template-sync-result-dropdown'
          />
          { templatesPage(reorderedTemplates, pagination)
              .filter(filterPredicate(filterString))
              .map((template) => <SyncedTemplate template={template} key={template.id}/>) }
        </ListView>
      </div>
    )
  }
}

export default SyncResultList;
