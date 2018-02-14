import React from 'react';
import { connect } from 'react-redux';
import * as TemplateSyncActions from '../../actions/template_sync';
import TemplateSyncForm from './TemplateSyncForm';

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
      const { data: { importUrl, exportUrl }, importSettings, exportSettings } = this.props;

      return (<div>
                <div>I am Template Sync New component!</div>
                <div><TemplateSyncForm importSettings={importSettings} exportSettings={exportSettings} importUrl={importUrl} exportUrl={exportUrl} ></TemplateSyncForm></div>
              </div>);
    }
}

const mapStateToProps = ({ foreman_templates: { importSettings, exportSettings } }, ownProps) => {
    // console.log('mapping state to props');
    // console.log(state);
    // console.log(ownProps);
    return {
        importSettings: importSettings || {},
        exportSettings: exportSettings || {}
    };
};

export default connect(mapStateToProps, TemplateSyncActions)(NewTemplateSync);
