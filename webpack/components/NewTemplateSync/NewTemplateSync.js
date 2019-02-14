import React from 'react';
import { LoadingState } from 'patternfly-react';

import TemplateSyncForm from './NewTemplateSyncForm';

class NewTemplateSync extends React.Component {
    componentDidMount() {
      const { apiUrls: { syncSettingsUrl }, getSyncSettings } = this.props;
      getSyncSettings(syncSettingsUrl);
    }

    render() {
      const { apiUrls: { importUrl, exportUrl }, importSettings, exportSettings, loadingSettings, history, validationData } = this.props;

      return (<div>
                <LoadingState loading={loadingSettings}>
                  <TemplateSyncForm importSettings={importSettings}
                                    exportSettings={exportSettings}
                                    validationData={validationData}
                                    importUrl={importUrl}
                                    exportUrl={exportUrl}
                                    history={history} />
                </LoadingState>
              </div>);
    }
}

export default NewTemplateSync;
