import React from 'react';
import { ListView } from 'patternfly-react';
import Pagination from 'foremanReact/components/Pagination/PaginationWrapper';

import SyncedTemplate from './SyncedTemplate';

class SyncResultList extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    const templateReorder = (templates) => {
      return Object.values(templates).reduce((memo, item) => memo.concat(item), [])
    }

    return (
      <ListView>
        <Pagination
          viewType="list"
          itemCount={0}
          pagination={{}}
          onChange={() => {}}
          dropdownButtonId='template-sync-result-dropdown'
        />
        { templateReorder(this.props.templates).map((template) => <SyncedTemplate template={template} key={template.id}/>)}
      </ListView>
    )
  }
}

export default SyncResultList;
