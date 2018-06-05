import React from 'react';

import reduce from 'ramda/src/reduce';
import concat from 'ramda/src/concat';
import { orderBy } from 'lodash';


import * as sort from 'sortabular';
import * as resolve from 'table-resolver';
import { compose } from 'recompose';

import Table from '../layout/Table';
import { createColumnsFor } from './SyncResultColumns';
import { Table as PfTable } from 'patternfly-react';


// const SyncResultList = ({ templates, columns }) =>  {
//   const rows = reduce(concat, [], Object.values(templates));

//   return (
//     <Table rows={rows} columns={columns} rowKey={'name'}/>
//   )
// }

const defaultSortingOrder = {
  FIRST: 'asc',
  asc: 'desc',
  desc: 'asc'
};



class SyncResultList extends React.Component {
  constructor(props) {
    super(props)

    const getSortingColumns = () => this.state.sortingColumns || {};

    const sortableTransform = sort.sort({
      getSortingColumns,
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumn({
            sortingColumns: getSortingColumns(),
            sortingOrder: defaultSortingOrder,
            selectedColumn
          })
        })
      },
      strategy: sort.strategies.byProperty
    });

    const sortingFormatter = sort.header({
      sortableTransform,
      getSortingColumns,
      strategy: sort.strategies.byProperty
    });

    this.state = {
      sortingColumns: {
        name: {
          direction: 'asc',
          position: 0
        }
      },
      columns: createColumnsFor(props.type)(sortableTransform, sortingFormatter),
      rows: reduce(concat, [], Object.values(props.templates))
    }
  }



  render() {
    // const { templates, columns } = this.props;

    // const rows = reduce(concat, [], Object.values(templates));
    const {rows, sortingColumns, columns } = this.state;

    const sortedRows = compose(
      sort.sorter({
        columns,
        sortingColumns,
        sort: orderBy,
        strategy: sort.strategies.byProperty
      })
    )(rows);

    return (
      <PfTable.PfProvider striped bordered hover columns={columns}>
        <PfTable.Header headerRows={resolve.headerRows({ columns })}/>
        <PfTable.Body rows={sortedRows} rowKey={'name'} />
      </PfTable.PfProvider>
    )
  }
}

export default SyncResultList;
