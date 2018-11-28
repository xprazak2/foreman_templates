import React from 'react';
import { ListView } from 'patternfly-react';
import Pagination from 'foremanReact/components/Pagination/PaginationWrapper';

import ConnectedSearch from './ConnectedSearch';
import SyncedTemplate from './SyncedTemplate';
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

    const { filterString } = this.props;

    const filterPredicate = (filterString) => (template) => {
      return filterString ? template.name.match(filterString) : true;
    }

    return (
      <div>
        <ListView>
          <Pagination
            viewType="list"
            itemCount={0}
            pagination={{}}
            onChange={() => {}}
            dropdownButtonId='template-sync-result-dropdown'
          />
          { templateReorder(this.props.templates).filter(filterPredicate(filterString)).map((template) => <SyncedTemplate template={template} key={template.id}/>)}
        </ListView>
      </div>
    )
  }
}

export default SyncResultList;
