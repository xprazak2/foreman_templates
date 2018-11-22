import React from 'react';
import { ListView } from 'patternfly-react';
import classNames from 'classnames';
import { pick, mergeWith } from 'lodash';

const additionalInfo = (template) => {


  const attrs = pick(template, ['locked', 'kind', 'snippet']);


  return Object.keys(attrs).map((key) => {

    if (!attrs[key]) {
      return emptyInfoItem();
    }



    switch(key) {
      case 'locked':
        return iconInfoItem('glyphicon glyphicon-lock')
      case 'kind':
        return stringInfoItem(attrs, key)
      case 'snippet':
        return iconInfoItem('glyphicon glyphicon-scissors')
    }
  });
};


const stringInfoItem = (attrs, key) => (
  <ListView.InfoItem key={key}>
    <strong> {attrs[key]} </strong>
  </ListView.InfoItem>
);

const iconInfoItem = (cssClassNames) => (
  <ListView.InfoItem>
    <span className={cssClassNames} />
  </ListView.InfoItem>
)

const emptyInfoItem = () => (
  <ListView.InfoItem>
    <span>&nbsp;</span>
  </ListView.InfoItem>
)




const SyncedTemplate = (props) => {
  const { template } = props;
  return (
    <ListView.Item
      id={template.id}
      className={`listViewItem--listItemVariants`}
      heading={template.name}
      actions={''}
      additionalInfo={additionalInfo(template)}
      stacked
    />
  );
}

export default SyncedTemplate;
