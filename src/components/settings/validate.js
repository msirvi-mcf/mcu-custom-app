import LocalizedTextInput from '@commercetools-uikit/localized-text-input';

const validate = (values) => {
  const errors = {};

  if (
    LocalizedTextInput.isEmpty(values.backendURL) &&
    values.connectorEnabled
  ) {
    errors.backendURL = { missing: true };
  }

  return errors;
};
export default validate;
