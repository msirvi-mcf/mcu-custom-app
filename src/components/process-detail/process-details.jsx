import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
// import {
//   PageNotFound,
//   FormModalPage,
// } from '@commercetools-frontend/application-components';
// import { ContentNotification } from '@commercetools-uikit/notifications';
// import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
// import LoadingSpinner from '@commercetools-uikit/loading-spinner';
// import { useCallback } from 'react';
// import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
// import { formatLocalizedString } from '@commercetools-frontend/l10n';
// import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
// import { useIsAuthorized } from '@commercetools-frontend/permissions';
// import {
//   useShowNotification,
//   useShowApiErrorNotification,
// } from '@commercetools-frontend/actions-global';
// import { PERMISSIONS } from '../../constants';
// import {
//   useProcessDetails
// } from '../../hooks/use-process-details';
// import { docToFormValues, formValuesToDoc } from './conversions';
// import ChannelsDetailsForm from './channel-details-form';
// import { transformErrors } from './transform-errors';
// import messages from './messages';
// import { ApplicationPageTitle } from '@commercetools-frontend/application-shell';

const ProcessDetails = (props) => {
  // const intl = useIntl();
  // const params = useParams();
  // const { data, loading, error } = useProcessDetails(params.id);
  // const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
  //   dataLocale: context.dataLocale ?? '',
  //   projectLanguages: context.project?.languages ?? [],
  // }));
  // const canManage = useIsAuthorized({
  //   demandedPermissions: [PERMISSIONS.Manage],
  // });
  // const showNotification = useShowNotification();
  // const showApiErrorNotification = useShowApiErrorNotification();
  // const channelDetailsUpdater = useChannelDetailsUpdater();
  // const handleSubmit = useCallback(
  //   async (formikValues, formikHelpers) => {
  //     const data = formValuesToDoc(formikValues);
  //     try {
  //       await channelDetailsUpdater.execute({
  //         originalDraft: channel,
  //         nextDraft: data,
  //       });
  //       showNotification({
  //         kind: 'success',
  //         domain: DOMAINS.SIDE,
  //         text: intl.formatMessage(messages.channelUpdated, {
  //           channelName: formatLocalizedString(formikValues, {
  //             key: 'name',
  //             locale: dataLocale,
  //             fallbackOrder: projectLanguages,
  //           }),
  //         }),
  //       });
  //     } catch (graphQLErrors) {
  //       const transformedErrors = transformErrors(graphQLErrors);
  //       if (transformedErrors.unmappedErrors.length > 0) {
  //         showApiErrorNotification({
  //           errors: transformedErrors.unmappedErrors,
  //         });
  //       }

  //       formikHelpers.setErrors(transformedErrors.formErrors);
  //     }
  //   },
  //   [
  //     channel,
  //     channelDetailsUpdater,
  //     dataLocale,
  //     intl,
  //     projectLanguages,
  //     showApiErrorNotification,
  //     showNotification,
  //   ]
  // );

  // if (loading) return (
  //   <div>Loading...</div>
  // )

  return (
    <div>
      {/* {data.incident.entity} */}
    </div>
  );
};
ProcessDetails.displayName = 'ProcessDetails';
// ProcessDetails.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };


export default ProcessDetails;
