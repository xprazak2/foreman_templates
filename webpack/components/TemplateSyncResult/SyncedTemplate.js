import React from 'react';
import { ListView, Grid, Icon } from 'patternfly-react';
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
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { template } = this.props;

    const additionalInfo = (template) => {
      const infoAttrs = ['locked', 'snippet', 'class', 'kind'];

      return infoAttrs.map((key) => {
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

    const infoItemId = (template, key) => {
      const id = `${template.id}-${key}`;
      return id;
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

    const emptyInfoItem = (template, key) => (
      infoItem(infoItemId(template, key), '')
    )

    const infoItem = (itemId, child) => {
      return (
        <ListView.InfoItem key={itemId} className='additional-info-wide'>
          { child }
        </ListView.InfoItem>
      );
    }

    const itemLeftContentIcon = template => {
      const iconName =  isEmpty(template.errors) ? 'ok' : 'error-circle-o';
      return (<Icon name={iconName} size="sm" type={'pf'} />);
    }

    const templateErrors = (template) => {
      if (template.errors) {
        const res = Object.keys(template.errors).map((key) => {
          return (<li>{`${key} ${template.errors[key]}`}</li>)
        });
        return (<ul>{ res }</ul>);
      }
      return (<span>There were no errors.</span>);
    }

    return (
        <ListView.Item
          key={template.id}
          heading={template.name}
          additionalInfo={additionalInfo(template)}
          className={'listViewItem--listItemVariants'}
          leftContent={itemLeftContentIcon(template)}
          hideCloseIcon
          stacked
        >
          { templateErrors(template) }
      </ListView.Item>
    );
  }
}

export default SyncedTemplate;
