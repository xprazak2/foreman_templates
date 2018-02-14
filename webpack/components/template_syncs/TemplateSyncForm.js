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
  showImportForm() {
    console.log('showing import form')
  }

  showExportForm() {
    console.log('show export form')
  }

  radioButtons() {
    return [
      { label: 'Import', checked: false, value: "import", onChange: () => console.log('Import on change') },
      { label: 'Export', checked: false, value: "export", onChange: () => console.log('Emport on change') }
    ]
  }

  render() {
    console.log('Form props: ', this.props);
    const { submitting, error, handleSubmit } = this.props;
    return(
      <div>
        <div>Hello! I am a form</div>
        <Form onSubmit={handleSubmit(submit)} disabled={submitting} submitting={submitting} error={error}>
          <RadioButtonGroup name="syncType" controlLabel="Action type" radios={this.radioButtons()}></RadioButtonGroup>
        </Form>
      </div>
    );
  }
}

const mp = (args) => {
  console.log('logging args')
  console.log(args)
  return { fake: true }
}

const form = reduxForm({ form: 'newTemplateSync' })(TemplateSyncForm);
export default connect(null, FormActions)(form);
