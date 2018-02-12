import React from 'react';
import { connect } from 'react-redux';
import * as TemplateSyncActions from '../../actions/template_sync';
import TemplateSyncForm from './TemplateSyncForm';

class NewTemplateSync extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('component did mount: ', this.props);
        const { data: { importUrl, exportUrl, syncSettingsUrl }, getSyncSettings } = this.props;
        getSyncSettings(syncSettingsUrl);
    }

    render() {

      const { data: { importUrl, exportUrl } } = this.props;

      return (<div>
                <div>I am Template Sync New component!</div>
                <div><TemplateSyncForm syncSettings={syncSettings} importUrl={importUrl} exportUrl={exportUrl} ></TemplateSyncForm></div>
              </div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    // console.log(ownProps);
    return {
        syncSettings: state.syncSettings || []
    };
};

export default connect(mapStateToProps, TemplateSyncActions)(NewTemplateSync);
