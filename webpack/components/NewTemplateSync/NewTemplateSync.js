import React from 'react';
import { LoadingState } from 'patternfly-react';

import TemplateSyncForm from './components/NewTemplateSyncForm';

class NewTemplateSync extends React.Component {
  componentDidMount() {
    const { apiUrls: { syncSettingsUrl }, getSyncSettings } = this.props;
    getSyncSettings(syncSettingsUrl);
  }

  render() {
    const { apiUrls: { importUrl, exportUrl }, importSettings, exportSettings, loadingSettings, history, validationData } = this.props;

    return (
      <LoadingState loading={loadingSettings}>
        <TemplateSyncForm importSettings={importSettings}
                          exportSettings={exportSettings}
                          validationData={validationData}
                          importUrl={importUrl}
                          exportUrl={exportUrl}
                          history={history} />
      </LoadingState>
    );
  }
}

export default NewTemplateSync;
