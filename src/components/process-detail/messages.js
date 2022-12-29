import { defineMessages } from 'react-intl';

export default defineMessages({
  backToProcessList: {
    id: 'ProcessDetails.backToProcessList',
    defaultMessage: 'Back to process list',
  },
  duplicateKey: {
    id: 'ProcessDetails.duplicateKey',
    defaultMessage: 'A process with this key already exists.',
  },
  processDetailsErrorMessage: {
    id: 'ProcessDetails.errorMessage',
    defaultMessage:
      'We were unable to fetch the process details. Please check your connection, the provided process ID and try again.',
  },
});
