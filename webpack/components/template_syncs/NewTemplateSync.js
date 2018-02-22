import React from 'react';
import { connect } from 'react-redux';
import * as TemplateSyncActions from '../../actions/template_sync';
import TemplateSyncForm from './TemplateSyncForm';

import { Spinner } from 'patternfly-react';


class NewTemplateSync extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      // console.log('component did mount: ', this.props);
      const { data: { syncSettingsUrl }, getSyncSettings } = this.props;
      getSyncSettings(syncSettingsUrl);
    }

    render() {
      const { data: { importUrl, exportUrl }, importSettings, exportSettings, loadingSettings } = this.props;
      return (<div>
                <Spinner loading={loadingSettings}>
                  <TemplateSyncForm importSettings={importSettings} exportSettings={exportSettings} importUrl={importUrl} exportUrl={exportUrl} ></TemplateSyncForm>
                </Spinner>
              </div>);
    }
}

const mapStateToProps = ({ foreman_templates: { syncSettings } }, ownProps) => {
  return syncSettings
};

export default connect(mapStateToProps, TemplateSyncActions)(NewTemplateSync);
