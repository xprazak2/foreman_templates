import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Form from 'foremanReact/components/common/forms/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SyncSettingsFields from '../SyncSettingFields';
import SyncTypeRadios from '../SyncTypeRadios';
// import { formName } from './NewTemplateSyncFormConstants';

const redirectToResult = history => () =>
  history.push({ pathname: '/template_syncs/result' });

const repoFormat = formatAry => value => {
  if (value === undefined) {
    return true;
  }

  const valid = formatAry
    .map(item => (value).startsWith(item))
    .reduce((memo, item) => item || memo, false);

  return value && valid;
};

const syncFormSchema = (syncType, settingsObj, validationData) => {
  const schema = (settingsObj[syncType].asMutable() || []).reduce((memo, setting) => {
    if (setting.name === 'repo') {
      return {
        ...memo,
        repo: Yup.string().test(
          'repo-format',
          `Invalid repo format, must start with one of: ${validationData.repo.join(', ')}`,
          repoFormat(validationData.repo))
        .required("can't be blank")
      }
    }
    return memo
  }, {});

  return Yup.object().shape({
    [syncType]: Yup.object().shape(schema)
  });
}

const isInitialValid = ({ validationSchema, initialValues }) =>
  validationSchema ? true : validationSchema.isValidSync(initialValues);

class NewTemplateSyncForm extends React.Component {
  allowedSyncType = (userPermissions, radioAttrs) =>
    this.props.userPermissions[radioAttrs.permission];

  constructor(props) {
    super(props);

    this.radioButtons = [
      { label: 'Import', value: 'import', permission: 'import' },
      { label: 'Export', value: 'export', permission: 'export' },
    ];

    this.state = {
      syncType: this.radioButtons.find(radioAttrs =>
        this.allowedSyncType(props.userPermissions, radioAttrs)
      ).value,
    };
  }

  updateSyncType = event => {
    this.setState({ syncType: event.target.value });
  };

  permitRadioButtons = buttons =>
    buttons.filter(buttonAttrs =>
      this.allowedSyncType(this.props.userPermissions, buttonAttrs)
    );

  initRadioButtons = syncType =>
    this.permitRadioButtons(this.radioButtons).map(buttonAttrs => ({
      get checked() {
        return this.value === syncType;
      },
      onChange: this.updateSyncType,
      ...buttonAttrs,
    }));

  render() {
    const {
      submitting,
      error,
      submitForm,
      importSettings,
      exportSettings,
      history,
      validationData,
      valid,
      importUrl,
      exportUrl,
      initialValues,
    } = this.props;

    const resetToDefault = (fieldName, fieldValue) => resetFn => {
      return resetFn(fieldName, fieldValue);
    };

    return (
      <Formik
        onSubmit={(values, actions) => {
          const url = this.state.syncType === 'import' ? importUrl : exportUrl;
          return submitForm({
            url,
            values: values[this.state.syncType],
            message: `Templates were ${this.state.syncType}ed.`,
            item: 'TemplateSync',
          })
          .then(args => {
            history.replace({ pathname: '/template_syncs/result' });
          }).catch(exception => {
            actions.setSubmitting(false);
            actions.setErrors(Object.keys(exception.errors).reduce((memo, key) => {
              const errorMessages = exception.errors[key]
              memo[key] = errorMessages ? errorMessages.join(', ') : errorMessages;
              return memo;
            }, {}));
          });
        }}
        initialValues={initialValues}
        validationSchema={syncFormSchema(this.state.syncType, { import: importSettings, export: exportSettings }, validationData)}
        isInitialValid={isInitialValid}
        >

        {(formProps) => (
          <React.Fragment>
          <Form
            onSubmit={formProps.handleSubmit}
            disabled={formProps.isSubmitting || (!formProps.isValid && !error)}
            submitting={formProps.isSubmitting}
            error={error}
            onCancel={redirectToResult(history)}
            errorTitle={
              error && error.severity === 'danger' ? __('Error! ') : __('Warning! ')
            }
          >
            <SyncTypeRadios
              name="syncType"
              controlLabel="Action type"
              radios={this.initRadioButtons(this.state.syncType)}
              disabled={formProps.isSubmitting}
            />
            <SyncSettingsFields
              importSettings={importSettings}
              exportSettings={exportSettings}
              syncType={this.state.syncType}
              resetField={resetToDefault}
              disabled={submitting}
             />
          </Form>
                       <div style={{ margin: '1rem 0' }}>
              <h3 style={{ fontFamily: 'monospace' }} />
            <pre
              style={{
                background: '#f6f8fa',
                fontSize: '1rem',
                padding: '.5rem',
              }}
            >
              {JSON.stringify(formProps, null, 2)}
            </pre>
            </div>
            </React.Fragment>

        )}
      </Formik>
    );
  }
}

NewTemplateSyncForm.propTypes = {
  importSettings: PropTypes.array,
  exportSettings: PropTypes.array,
  userPermissions: PropTypes.object.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
  history: PropTypes.object,
  validationData: PropTypes.object,
  valid: PropTypes.bool.isRequired,
};

NewTemplateSyncForm.defaultProps = {
  importSettings: [],
  exportSettings: [],
  validationData: {},
  error: undefined,
  dispatch: () => {},
  submitting: false,
  history: {},
};

export default NewTemplateSyncForm;
