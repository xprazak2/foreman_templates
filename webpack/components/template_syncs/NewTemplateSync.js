import React from 'react';
import { connect } from 'react-redux';
import * as TemplateSyncActions from '../../actions/template_sync';

class NewTemplateSync extends React.Component {
    constructor(props) {
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
    // console.log(state);
    // console.log(ownProps);
    return {};
};

export default connect(mapStateToProps, TemplateSyncActions)(NewTemplateSync);
// export default TemplateSyncActions;
