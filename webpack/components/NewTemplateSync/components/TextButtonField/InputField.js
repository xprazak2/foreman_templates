import React from 'react';
import { FormControl } from 'patternfly-react';

const InputField = ({ input, disabled }) => (
  <FormControl {...input} type="text" disabled={disabled} />
);

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default InputField;
