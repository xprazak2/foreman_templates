import React from 'react';
import { ListView, Grid, Icon, OverlayTrigger, Tooltip } from 'patternfly-react';
import classNames from 'classnames';
import { pick, mergeWith, isEmpty } from 'lodash';

const StringInfoItem = ({ template, attr, tooltipText, translate = false }) => {
    const string = translate ? __(template[attr]) : template[attr];
    const child = (<strong> { string } </strong>);
    return (<InfoItem itemId={itemIteratorId(template, attr)} child={child} tooltipText={tooltipText}/>);//infoItem(itemIteratorId(template, attr), child)
  }

const IconInfoItem = ({ template, attr, cssClassNames, tooltipText }) => {
      const child = (<span className={cssClassNames} />);
      return (<InfoItem itemId={itemIteratorId(template, attr)} child={child} tooltipText={tooltipText}/>);//infoItem(itemIteratorId(template, attr), child);
    }

const EmptyInfoItem = (template, attr) => (
      <InfoItem itemId={itemIteratorId(template, attr)} />
    )

const InfoItem = ({ itemId, child, tooltipText }) => {
      const overlay = (
        <OverlayTrigger overlay={tooltipText ? (<Tooltip id={itemId}>{ tooltipText }</Tooltip>) : ''}
                          placement="top"
                          trigger={['hover', 'focus']}
                          rootClose={false}
                          >
            <span>{ child }</span>
          </OverlayTrigger>
        )
      return (
        <ListView.InfoItem key={itemId} className='additional-info-wide'>
        { tooltipText ? overlay : (<span>{ child }</span>)}
        </ListView.InfoItem>
      );
    }

 const itemIteratorId = (template, attr) => {
      const id = `${template.name}-${attr}`;
      return id;
    }

class SyncedTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { template } = this.props;

    const additionalInfo = (template) => {
      const infoAttrs = ['locked', 'snippet', 'class', 'kind'];

      return infoAttrs.map((attr) => {
        const key = itemIteratorId(template, attr)

        if (!template[attr]) {
          return (<EmptyInfoItem template={template} attr={attr} key={key}/>);
        }

        switch(attr) {
          case 'locked':
            return (<IconInfoItem template={template} attr={attr} cssClassNames={'glyphicon glyphicon-lock'} tooltipText='Locked' key={key} />)//;iconInfoItem(template, attr, 'glyphicon glyphicon-lock');
          case 'snippet':
            return (<IconInfoItem template={template} attr={attr} cssClassNames={'glyphicon glyphicon-scissors'} tooltipText={'Snippet'} key={key} />);//iconInfoItem(template, attr, 'glyphicon glyphicon-scissors');
          case 'class':
            return (<StringInfoItem template={template} attr={attr} translate={true} key={key} />);//stringInfoItem({template, attr, true});
          case 'kind':
            return (<StringInfoItem template={template} attr={attr} key={key} />);//stringInfoItem(template, attr);
        }
      });
    };

    const itemLeftContentIcon = template => {
      const iconName =  isEmpty(template.errors) ? 'ok' : 'error-circle-o';
      return (<Icon name={iconName} size="sm" type={'pf'} />);
    }

    const templateErrors = (template) => {
      if (template.errors) {
        const res = Object.keys(template.errors).map((key) => {
          return (<li key={itemIteratorId(template, key)}>{`${key} ${template.errors[key]}`}</li>)
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
