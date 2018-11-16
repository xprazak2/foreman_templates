import React from 'react';
import { connect } from 'react-redux';

import * as TemplateSyncActions from './NewTemplateSyncActions';
import TemplateSyncForm from './NewTemplateSyncForm';

import { Spinner } from 'patternfly-react';


class NewTemplateSync extends React.Component {
    constructor(props) {
      console.log(props)
      super(props);
    }

    componentDidMount() {
      const { apiUrls: { syncSettingsUrl }, getSyncSettings } = this.props;
      getSyncSettings(syncSettingsUrl);
    }

    render() {
      const { apiUrls: { importUrl, exportUrl }, importSettings, exportSettings, loadingSettings, history, validationData } = this.props;
      return (<div>
                <Spinner loading={loadingSettings}>
                  <TemplateSyncForm importSettings={importSettings}
                                    exportSettings={exportSettings}
                                    validationData={validationData}
                                    importUrl={importUrl}
                                    exportUrl={exportUrl}
                                    history={history} ></TemplateSyncForm>
                </Spinner>
              </div>);
    }
}

const mapStateToProps = ({ foreman_templates: { syncSettings } }, ownProps) => {
  return syncSettings
};

export default connect(mapStateToProps, TemplateSyncActions)(NewTemplateSync);
