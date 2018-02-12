import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Form from 'foremanReact/components/common/forms/Form';
import * as FormActions from 'foremanReact/redux/actions/common/forms';

class TemplateSyncForm extends React.Component {
  render() {
    console.log('Form props: ', this.props);
    return(
      <div>Hello! I am a form</div>
    );
  }
}

export default TemplateSyncForm;
