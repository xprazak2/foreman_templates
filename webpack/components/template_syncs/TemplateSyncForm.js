import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Form from 'foremanReact/components/common/forms/Form';
import RadioButtonGroup from 'foremanReact/components/common/forms/RadioButtonGroup';
import * as FormActions from 'foremanReact/redux/actions/common/forms';

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

  getInitialState() {
    return {
      importType: ''
    };
  }

  showImportForm() {
    console.log('showing import form')
  }

  showExportForm() {
    console.log('show export form')
  }

  radioButtons() {
    const changeImportType = (event) => {
      console.log(`Changing import type to ${event.target.value}`);
      this.setState({ importType: event.target.value });
      console.log(this.state);
    }

    return [
      { label: 'Import', checked: false, value: "import", onChange: changeImportType },
      { label: 'Export', checked: false, value: "export", onChange: changeImportType }
    ]
  }

  render() {
    console.log('Form props: ', this.props);
    const { submitting, error, handleSubmit, importSettings, exportSettings } = this.props;
    return(
      <div>
        <Form onSubmit={handleSubmit(submit)} disabled={submitting} submitting={submitting} error={error}>
          <RadioButtonGroup name="syncType" controlLabel="Action type" radios={this.radioButtons()}></RadioButtonGroup>
          <SyncSettingFields importType={this.state.importType} importSettings={importSettings} exportSettings={exportSettings}></SyncSettingFields>
        </Form>
      </div>
    );
  }
}

const form = reduxForm({ form: 'newTemplateSync' })(TemplateSyncForm);
export default connect(null, FormActions)(form);
