import React from 'react';
// import { reduce, concat } from 'lodash';

import reduce from 'ramda/src/reduce';
import concat from 'ramda/src/concat';

import Table from '../layout/Table';


const SyncResultList = ({ templates, columns }) =>  {
  const rows = reduce(concat, [], Object.values(templates));

  return (
    <Table rows={rows} columns={columns} rowKey={'name'}/>
  )
}

export default SyncResultList;
