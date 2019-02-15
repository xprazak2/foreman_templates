import React from 'react';
import { reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';

import Form from 'foremanReact/components/common/forms/Form';
import RadioButtonGroup from 'foremanReact/components/common/forms/RadioButtonGroup';
import * as FormActions from 'foremanReact/redux/actions/common/forms';
import TextField from 'foremanReact/components/common/forms/TextField';

import SyncSettingsFields from './SyncSettingFields';
import Title from '../../layout/Title';

const formName = 'newTemplateSync';

const submit = (values, dispatch, props) => {
  const { submitForm, syncType, importUrl, exportUrl, history } = props;
  const url = syncType === 'import' ? importUrl : exportUrl;
  return submitForm({ url, values, message: `Templates were ${syncType}ed.`, item: 'TemplateSync' }).then(
    (args) => {
      history.replace({ pathname: '/template_syncs/result' })
    }
  )
}

const redirectToResult = (history) => () => history.push({ pathname: '/template_syncs/result' })

const radioButtons = (syncType) => (
  [
    { label: 'Import', checked: ("import" === syncType), value: "import" },
    { label: 'Export', checked: ("export" === syncType), value: "export" }
  ]
);

const TemplateSyncForm = ({
  submitting,
  error,
  handleSubmit,
  importSettings,
  exportSettings,
  syncType,
  dispatch,
  history,
  validationData,
  valid
}) => {

  const resetToDefault = ((dispatch, change, formName) => (fieldName, value) => {
    dispatch(change(formName, fieldName, value));
  })(dispatch, change, formName);

  return (
    <div>
      <Title titleText="Import or Export Templates" />
      <Form onSubmit={handleSubmit(submit)} disabled={submitting || !valid} submitting={submitting} error={error} onCancel={redirectToResult(history)}>
        <RadioButtonGroup name="syncType" controlLabel="Action type" radios={radioButtons(syncType)} disabled={submitting}></RadioButtonGroup>
        <SyncSettingsFields importSettings={importSettings}
                            exportSettings={exportSettings}
                            syncType={syncType}
                            resetField={resetToDefault}
                            disabled={submitting}
                            validationData={validationData}>
        </SyncSettingsFields>
      </Form>
    </div>
  );
}

const prepareInitialValues = (importSettings, exportSettings) =>
  importSettings.concat(exportSettings)
                .reduce((memo, item) => Object.assign(memo, { [item.name]: item.value }), {});

const mapStateToProps = (state, ownProps) => {
  const initSyncType = { syncType: "import" };
  const syncType = formValueSelector(formName)(state, 'syncType');

  const initialValues = prepareInitialValues(ownProps.importSettings, ownProps.exportSettings);

  if (syncType) {
    return ({ initialValues: { ...initialValues, syncType }, syncType });
  } else {
    return ({ initialValues: { ...initialValues, ...initSyncType }, ...initSyncType });
  }
}

const form = reduxForm({ form: formName })(TemplateSyncForm);
export default connect(mapStateToProps, FormActions)(form);
