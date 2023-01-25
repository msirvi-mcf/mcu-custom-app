import PropTypes from 'prop-types';
import './settings.css';
import UrlConfiguration from './collapsibles/url-configuration';
import JobConfiguration from './collapsibles/job-configuration';
import CommerceToolsConfigutation from './collapsibles/commerce-tools-configutation';
import Spacings from '@commercetools-uikit/spacings';
import { useIntl } from 'react-intl';
import { BackIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import Label from '@commercetools-uikit/label';
import ToggleInput from '@commercetools-uikit/toggle-input';
import Constraints from '@commercetools-uikit/constraints';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Link as RouterLink } from 'react-router-dom';
import messages from './messages';
import FlatButton from '@commercetools-uikit/flat-button';
import { useFormik } from 'formik';
import PrimaryButton from '@commercetools-uikit/primary-button';
import validate from './validate';
import { useSettings, useSettingsToDashboard, useGetSettingsCTP, useGetSettingsData } from '../../hooks/use-settings';
import {
  useShowNotification,
  // useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';

import jobConfigData from '../../data/jobConfigData.json';

const Settings = (props) => {
  const { syncTypes } = jobConfigData;

  const intl = useIntl();
  const {baseurl,error,loading} = useGetSettingsCTP();
  const GetSettingsData = useGetSettingsData();
  const SaveSettings = useSettings();
  const SaveSettingsToDashboard = useSettingsToDashboard();
  const showNotification = useShowNotification();
  
    // if(baseurl){
    //   GetSettingsData.execute(baseurl).then(result => {
    //      console.log(result?.data);
    //   }).catch((err)=> {
    //     console.log(err);
    //   });
      
    // }

  let initialValues = {
    connectorEnabled: false,
    backendURL: '',
    miraklOperatorKey: '',
    miraklUrl: '',
    ctConfigFile: null,
  };

  syncTypes.forEach((type) => {
    initialValues[type.id] = false;
  });

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (formikValues, formikHelpers) => {
      console.log(formikValues);
      try {
        if (formikValues.connectorEnabled && formikValues.backendURL) {
          console.log("backedn-----"+formikValues.backendURL);
          await SaveSettings.execute({ url: formikValues.backendURL });
        }
        await SaveSettingsToDashboard.execute(formikValues);
        showNotification({
          kind: 'success',
          domain: DOMAINS.PAGE,
          text: intl.formatMessage(messages.settingsUpdated, {}),
        });
      } catch (err) {
        console.error(err);
        showNotification({
          kind: 'error',
          domain: DOMAINS.PAGE,
          text: JSON.stringify(err.body.error),
        });
      }
    },
  });

  return (
    <Spacings.Stack scale="m">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>

      {/* <Constraints.Horizontal max={13}>
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.demoHint} />
        </ContentNotification>
      </Constraints.Horizontal> */}

      <form onSubmit={formik.handleSubmit}>
        <Spacings.Stack scale="xl">
          <Spacings.Inline alignItems="center">
            <Label htmlFor="connectorEnabled" isBold>
              Enable Markeplace Connector:
            </Label>
            <ToggleInput
              id="connectorEnabled"
              name="connectorEnabled"
              onChange={formik.handleChange}
              isChecked={formik.values.connectorEnabled}
              value="connectorEnabled"
              size="small"
            />
          </Spacings.Inline>

          {formik.values.connectorEnabled && (
            <Spacings.Stack scale="m">
              <UrlConfiguration formik={formik} />
              <JobConfiguration formik={formik} />
              <CommerceToolsConfigutation formik={formik} />
            </Spacings.Stack>
          )}

          <PrimaryButton
            type="submit"
            style={{ width: 'fit-content' }}
            label="Save"
            onClick={formik.handleSubmit}
            isDisabled={formik.isSubmitting}
          />
        </Spacings.Stack>
      </form>
    </Spacings.Stack>
  );
};
Settings.displayName = 'Settings';
Settings.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Settings;
