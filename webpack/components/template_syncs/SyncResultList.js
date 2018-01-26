import React from 'react';
import { reduce, concat } from 'lodash';

import Table from '../layout/Table';


const SyncResultList = ({ templates, columns }) =>  {
  const rows = reduce(templates, (memo, value, key) => {
    console.log(value)
    return concat(memo, value);
  }, []);

  return (
    <Table rows={rows} columns={columns} />
  )
}

export default SyncResultList;
