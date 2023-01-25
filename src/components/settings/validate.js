import { isValidCron } from 'cron-validator';
import jobConfigData from '../../data/jobConfigData.json';
import { isHttpsUri, isWebUri } from 'valid-url';

const validate = (values) => {
  const errors = {};

  if (!values.backendURL && values.connectorEnabled) {
    errors.backendURL = { missing: true };
  }
  if (!values.miraklOperatorKey && values.connectorEnabled) {
    errors.miraklOperatorKey = { missing: true };
  }
  if (!values.miraklUrl && values.connectorEnabled) {
    errors.miraklUrl = { missing: true };
  }
  jobConfigData.syncTypes.forEach((data) => {
    if (values[data.modeId] === 'job' && !values[data.modeId + 'Schedule']) {
      errors[data.modeId + 'Schedule'] = { missing: true };
    }
    if (
      values[data.modeId] === 'job' &&
      values[data.modeId + 'Schedule'] &&
      !isValidCron(values[data.modeId + 'Schedule'])
    ) {
      errors[data.modeId + 'Schedule'] = { syntaxError: true };
    }
  });
  if (values.backendURL && !isHttpsUri(values.backendURL)) {
    errors.backendURL = { notvalid: true };
  }
  if (values.miraklUrl && !isWebUri(values.miraklUrl)) {
    errors.miraklUrl = { notvalid: true };
  }

  return errors;
};
export default validate;
