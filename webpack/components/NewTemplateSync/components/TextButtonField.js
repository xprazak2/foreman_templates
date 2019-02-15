import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormControl, InputGroup, Button, Checkbox } from 'patternfly-react';

import TextField from 'foremanReact/components/common/forms/TextField';
import CommonForm from 'foremanReact/components/common/forms/CommonForm';

const renderField = ({
  input,
  label,
  className,
  inputClassName,
  fieldRequired,
  disabled,
  blank,
  item,
  fieldSelector,
  meta: { error, touched },
  buttonAttrs: { buttonText = "Action", buttonAction },
}) => (
  <CommonForm
    label={label}
    className={className}
    inputClassName={inputClassName}
    required={fieldRequired}
    error={error}
    touched={touched}
  >
    <InputGroup>
      { fieldType(item, fieldSelector, input, disabled, blank) }
      <InputGroup.Button>
        <Button onClick={buttonAction} disabled={disabled}>{ buttonText }</Button>
      </InputGroup.Button>
    </InputGroup>
  </CommonForm>
)

const TextButtonField = ({
  item,
  label,
  name,
  className = '',
  inputClassName = 'col-md-6',
  blank = { label: "Choose one...", value: "" },
  buttonAttrs,
  fieldSelector,
  validate,
  disabled = false,
  fieldRequired = false
}) => {

  return (
    <Field name={name}
           label={label}
           type={fieldSelector(item)}
           fieldSelector={fieldSelector}
           component={renderField}
           buttonAttrs={buttonAttrs}
           blank={blank}
           item={item}
           disabled={disabled}
           validate={item.validate}
           fieldRequired={fieldRequired}>
    </Field>
  );
}

const fieldType = (item, fieldSelector, input, disabled, blank) => {
  if (!fieldSelector) {
    return inputField;
  }

  switch (fieldSelector(item)) {
    case "text":
      return inputField(input, disabled);
    case "select":
      return selectField(input, blank, item, disabled);
    case "checkbox":
      return checkboxField(input, item, disabled);
    default:
      throw new Error(`Unknown field type for ${item}`);
  }
}

const inputField = (input, disabled) =>
  <FormControl { ...input } type="text" disabled={disabled}></FormControl>

const selectField = (input, blank, item, disabled) =>
  <FormControl { ...input } componentClass="select" disabled={disabled}>
    { addBlankOption(blank) }
    { item.selection.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>) }
  </FormControl>

const checkboxField = (input, item, disabled) => {
  return <Checkbox { ...input } disabled={disabled}></Checkbox>
}

const addBlankOption = (blank) => {
  if (Object.keys(blank).length === 0) {
    return;
  } else {
    return <option key={opt.value} value={blank.value}>{blank.label}</option>;
  }
}

export default TextButtonField;
