import React from 'react';
import { ListView } from 'patternfly-react';
import classNames from 'classnames';
import { pick, mergeWith, isEmpty } from 'lodash';

class SyncedTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  toggleExpand() {
    this.setState('expanded', !this.state.expanded)
  };

  render() {
    const { template } = this.props;


    const additionalInfo = (template) => {
      const infoAttrs = ['errors', 'locked', 'snippet', 'class', 'kind'];

      return infoAttrs.map((key) => {

        if (key === 'errors') {
          return errorsInfoItem(template, key)
        }

        if (!template[key]) {
          return emptyInfoItem(template, key);
        }

        switch(key) {
          case 'locked':
            return iconInfoItem(template, key, 'glyphicon glyphicon-lock');
          case 'snippet':
            return iconInfoItem(template, key, 'glyphicon glyphicon-scissors');
          case 'class':
            return stringInfoItem(template, key, true);
          case 'kind':
            return stringInfoItem(template, key);
        }
      });
    };

    const infoItemId = (template, key) => `${template.id}-${key}`;

    const errorsInfoItem = (template, key) => {
      if (isEmpty(template.errors)) {
        return iconInfoItem(template, key, 'pficon pficon-ok');
      }
      return iconInfoItem(template, key, 'pficon pficon-error-circle-o');
    }

    const stringInfoItem = (template, key, translate = false) => {
      const string = translate ? __(template[key]) : template[key];
      const child = (<strong> { string } </strong>);
      return infoItem(infoItemId(template, key), child)
    }

    const iconInfoItem = (template, key, cssClassNames) => {
      const child = (<span className={cssClassNames} />);
      return infoItem(infoItemId(template, key), child);
    }

    const iconInfoExpandableItem = (template, key, cssClassNames, expanded, toggleExpand) => {

      const child = (
        <ListView.Expand
          expanded={item.expanded && prop === item.expandType}
          toggleExpanded={() => {
            this.toggleExpand(item, prop);
          }}
        >
          <span className={cssClassNames} />
          <strong>{item.properties[prop]}</strong> {prop}
        </ListView.Expand>
      )
      return InfoItem(infoItemId(template, key), child);
    }

    const emptyInfoItem = (itemId) => (
      infoItem(itemId, '')
    )

    const infoItem = (itemId, child) => {
      return (
        <ListView.InfoItem key={itemId} className='additional-info-wide'>
          { child }
        </ListView.InfoItem>
      );
    }

    let errorProps = {};
    let gridRow = '';

    if (!isEmpty(template.errors)) {
      errorProps = { compoundExpand: true, compoundExpanded: template.errors, onCloseCompoundExpand: () => {}};
      gridRow = (
        <Grid.Row>
          <Grid.Col sm={11}>{template.errors}</Grid.Col>
        </Grid.Row>
      )
    }

    return (
        <ListView.Item
          id={template.id}
          className={`listViewItem--listItemVariants`}
          heading={template.name}
          actions={''}
          additionalInfo={additionalInfo(template)}
          stacked
          { ...errorProps }
        >
          { gridRow }
      </ListView.Item>
    );
  }
}

export default SyncedTemplate;
