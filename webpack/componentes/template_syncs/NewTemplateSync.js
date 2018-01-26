import React from 'react';
import { connect } from 'react-redux';
import * as TemplateSyncActions from '../actions/template_syncs'

class NewTemplateSync extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
    }

    componentDidMount() {
        console.log('component did mount: ', this.props);
        const { data: { importSettingsUrl, exportSettingsUrl, url }, getImportSettings, getExportSettings } = this.props;
    }

    render() {
        return <div>I am Template Sync New component!</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      importSettings: state.templateSync.importSettings || {},
      exportSettings: state.templateSync.exportSettings || {}
    };
};

export default connect(mapStateToProps, TemplateSyncActions)(NewTemplateSync);
// export default TemplateSyncActions;
