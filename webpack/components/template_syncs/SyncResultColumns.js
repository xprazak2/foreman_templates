import React from 'react';
import { Icon, OverlayTrigger, Button, Popover, Table as PfTable } from 'patternfly-react';
import { isEmpty, curry, reduce, concat } from 'lodash';

const headerFormat = value => <PfTable.Heading>{value}</PfTable.Heading>;
const cellFormat = value => <PfTable.Cell>{value}</PfTable.Cell>;

const faIconFormat = curry((iconName, value) => <PfTable.Cell align="center">{ value ? <Icon type='fa' name={iconName}/> : ""}</PfTable.Cell>);
const lockedFormat = faIconFormat('lock');
const snippetFormat = faIconFormat('check');

const statusFormat = value => (
   <PfTable.Cell align="center">
    { value && !isEmpty(value) ? <Icon type='fa' name='error-circle-o'/> : <Icon type='fa' name='check'/> }
  </PfTable.Cell>
)

const errorsFormat = errors => (
  <PfTable.Cell align="center">
    { errors && !isEmpty(errors) ? <ErrorDetails errors={errors}/> : __("None!") }
  </PfTable.Cell>
  )

const ErrorDetails = ({ errors }) => {
  const trigger = 'click';
  const errorString = reduce(errors, (memo, value, key) => (
    memo + `${key} ${value}, `
  ), "");
  const overlay = <Popover id="popover">{errorString}</Popover>
  const rootClose = close === 'true'

  return (
    <OverlayTrigger
      overlay={overlay}
      placement="top"
      trigger={trigger.split(' ')}
      rootClose
    >
    <Button bsStyle="link">Error details</Button>
    </OverlayTrigger>
  )
}

const statusColumnHeader = (name) => (
  {
    header: {
      label: name,
      formatters: [headerFormat]
    },
    cell: {
      formatters: [statusFormat]
    },
    property: 'errors'
  }
)

const baseColumns = [
  {
    header: {
      label: 'Name',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'name'
  },
  {
    header: {
      label: 'Kind',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'kind'
  },
  {
    header: {
      label: 'Snippet',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [snippetFormat]
    },
    property: 'snippet'
  },
  {
    header: {
      label: 'Locked',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [lockedFormat]
    },
    property: 'locked'
  }
];

const errorsColumn =
  {
    header: {
      label: 'Errors',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [errorsFormat]
    },
    property: 'errors'
  }

export const createColumnsFor = (type) => {
  const label = type === 'import' ? __('Imported?') : __('Exported?')
  return reduce([baseColumns, [statusColumnHeader(label)], [errorsColumn]], concat, [])
}
