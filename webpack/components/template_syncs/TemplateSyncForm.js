import React from 'react';
import { reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { concat, curry, reduce } from 'lodash';

import Form from 'foremanReact/components/common/forms/Form';
import RadioButtonGroup from 'foremanReact/components/common/forms/RadioButtonGroup';
import * as FormActions from 'foremanReact/redux/actions/common/forms';
import TextField from 'foremanReact/components/common/forms/TextField';

import SyncSettingsFields from './SyncSettingsFields';

const formName = 'newTemplateSync';

const redirect = curry((args) => {
  console.log('Redirect Args')
  console.log(args)
  history.push({ pathname: '/template_syncs/result' })
})

const submit = (values, dispatch, props) => {
  const { submitForm, syncType, importUrl, exportUrl, history } = props;
  console.log('submitting form, props:');
  console.log(props);
  const url = syncType === 'import' ? importUrl : exportUrl;
  return submitForm({ url, values, message: `Templates were ${syncType}ed.`, item: 'TemplateSync' }).then(
    (args) => {
      console.log('redirect args')
      console.log(args)
      history.replace({ pathname: '/template_syncs/result' })
    }
  )
}

const redirectToResult = (history) => () => history.push({ pathname: '/template_syncs/result' })

class TemplateSyncForm extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)
  }

  radioButtons(syncType) {
    const changeSyncType = (event) => {
      console.log(`Changing sync type to ${event.target.value}`);
      // this.setState({ syncType: event.target.value });
    }

    const checked = (value, syncType) => value === syncType;

    return [
      { label: 'Import', checked: checked("import", syncType), value: "import" },
      { label: 'Export', checked: checked("export", syncType), value: "export" }
    ]
  }

  render() {
    const { submitting, error, handleSubmit, importSettings, exportSettings, syncType, dispatch, history } = this.props;
    console.log('Form Props')
    console.log(this.props);

    const resetToDefault = curry((dispatch, change, formName, fieldName, value) => {
      dispatch(change(formName, fieldName, value));
    })(dispatch, change, formName);

    return(
      <div>
        <Form onSubmit={handleSubmit(submit)} disabled={submitting} submitting={submitting} error={error} onCancel={redirectToResult(history)}>
          <RadioButtonGroup name="syncType" controlLabel="Action type" radios={this.radioButtons(syncType)} disabled={submitting}></RadioButtonGroup>
          <SyncSettingsFields importSettings={importSettings} exportSettings={exportSettings} syncType={syncType} resetField={resetToDefault} disabled={submitting}></SyncSettingsFields>
        </Form>
      </div>
    );
  }
}

const prepareInitialValues = (importSettings, exportSettings) =>
  (!importSettings || !exportSettings)
    ? ({})
    : reduce(concat(importSettings, exportSettings),
             (memo, item) => Object.assign(memo, { [item.name]: item.value }),
             {});

const mapStateToProps = (state, ownProps) => {
  const initSyncType = { syncType: "import" };
  const syncType = formValueSelector(formName)(state, 'syncType');
  const initialValues = prepareInitialValues(ownProps.importSettings, ownProps.exportSettings);
  // const initialValues = Object.assign(prepareInitialValues(ownProps.importSettings, ownProps.exportSettings), initSyncType);

  if ((!ownProps.importSettings && !ownProps.exportSettings && !syncType) || (ownProps.importSettings && ownProps.exportSettings && syncType)) {
    return Object.assign({ syncType }, { initialValues });
  } else {
    return Object.assign(initSyncType, { initialValues });
  }

  // if ((ownProps.importSettings && ownProps.exportSettings && !syncType)) {
  //   return Object.assign(initSyncType, { initialValues });
  // } else {
  //   return Object.assign({ syncType }, { initialValues });
  // }
}
  
const form = reduxForm({ form: formName })(TemplateSyncForm);
export default connect(mapStateToProps, FormActions)(form);
