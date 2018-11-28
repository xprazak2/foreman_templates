import React from 'react';
import { Spinner } from 'patternfly-react';

import TemplateSyncForm from './NewTemplateSyncForm';

class NewTemplateSync extends React.Component {
    componentDidMount() {
      const { apiUrls: { syncSettingsUrl }, getSyncSettings } = this.props;
      getSyncSettings(syncSettingsUrl);
    }

    render() {
      const { apiUrls: { importUrl, exportUrl }, importSettings, exportSettings, loadingSettings, history, validationData } = this.props;
      // TODO: replace spinner with LoadingState
      return (<div>
                <Spinner loading={loadingSettings}>
                  <TemplateSyncForm importSettings={importSettings}
                                    exportSettings={exportSettings}
                                    validationData={validationData}
                                    importUrl={importUrl}
                                    exportUrl={exportUrl}
                                    history={history} />
                </Spinner>
              </div>);
    }
}

export default NewTemplateSync;
