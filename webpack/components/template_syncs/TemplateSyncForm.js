import React from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import Form from 'foremanReact/components/common/forms/Form';
import RadioButtonGroup from 'foremanReact/components/common/forms/RadioButtonGroup';
import * as FormActions from 'foremanReact/redux/actions/common/forms';

import SyncSettingsFields from './SyncSettingsFields';

const formName = 'newTemplateSync';

const submit = (whatever, dispatch, props) => {
  const { submitForm } = props;
  console.log('submitting form, props:');
  console.log(props);
  console.log('form values')
  console.log(whatever);
}

class TemplateSyncForm extends React.Component {

  constructor(props) {
    super(props);
  }

  showImportForm() {
    console.log('showing import form')
  }

  showExportForm() {
    console.log('show export form')
  }

  radioButtons(syncType) {
    const changeSyncType = (event) => {
      console.log(`Changing sync type to ${event.target.value}`);
      this.setState({ syncType: event.target.value });
    }

    const checked = (value, syncType) => value === syncType;

    return [
      { label: 'Import', checked: checked("import", syncType), value: "import", onChange: changeSyncType },
      { label: 'Export', checked: checked("export", syncType), value: "export", onChange: changeSyncType }
    ]
  }

  render() {
    const { submitting, error, handleSubmit, importSettings, exportSettings, syncType } = this.props;
    return(
      <div>
        <Form onSubmit={handleSubmit(submit)} disabled={submitting} submitting={submitting} error={error}>
          <RadioButtonGroup name="syncType" controlLabel="Action type" radios={this.radioButtons(syncType)}></RadioButtonGroup>
          <SyncSettingsFields importSettings={importSettings} exportSettings={exportSettings} syncType={syncType}></SyncSettingsFields>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const syncType = formValueSelector(formName)(state, 'syncType');
  if ((!ownProps.importSettings && !ownProps.exportSettings && !syncType) || (ownProps.importSettings && ownProps.exportSettings && syncType)) {
    return ({ syncType });
  } else {
    return ({ syncType: "import" });
  }
}

const form = reduxForm({ form: formName })(TemplateSyncForm);
export default connect(mapStateToProps, FormActions)(form);
