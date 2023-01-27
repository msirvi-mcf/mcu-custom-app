import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import Tooltip from '@commercetools-uikit/tooltip';
import ToggleInput from '@commercetools-uikit/toggle-input';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { Link as RouterLink } from 'react-router-dom';
import messages from './messages';
import FlatButton from '@commercetools-uikit/flat-button';
import { useFormik } from 'formik';
import PrimaryButton from '@commercetools-uikit/primary-button';
import validate from './validate';
import {
  useSettings,
  useSettingsToDashboard,
  useGetSettingsCTP,
  useGetSettingsData,
} from '../../hooks/use-settings';
import { removeNotification } from '@commercetools-frontend/notifications';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import { DOMAINS } from '@commercetools-frontend/constants';

import jobConfigData from '../../data/jobConfigData.json';

const Settings = (props) => {
  const { syncTypes } = jobConfigData;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { baseurl, error } = useGetSettingsCTP();
  const [showError, setShowError] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const GetSettingsData = useGetSettingsData();
  const SaveSettings = useSettings();
  const SaveSettingsToDashboard = useSettingsToDashboard();
  const showNotification = useShowNotification();

  const refreshCacheHandler = (event) => {
    event.preventDefault();
    alert('Cache Refreshed!');
  };

  const scrollToTop = () => {
    document
      .querySelector('#notifications-page')
      .scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  const initialValues = useMemo(() => {
    return {
      connectorEnabled: false,
      backendURL: '',
      miraklOperatorKey: '',
      miraklUrl: '',
      ctConfigFile: '',
    };
  }, []);

  syncTypes.forEach((type) => {
    initialValues[type.id] = false;
  });

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (formikValues) => {
      try {
        await SaveSettingsToDashboard.execute(formikValues);
        if (formikValues.connectorEnabled && formikValues.backendURL) {
          await SaveSettings.execute({ url: formikValues.backendURL });
        }
        scrollToTop();
        const notification = showNotification({
          kind: 'success',
          domain: DOMAINS.PAGE,
          text: intl.formatMessage(messages.settingsUpdated, {}),
        });

        setTimeout(() => {
          dispatch(removeNotification(notification.payload.id));
        }, 3000);

        setIsFormChanged(false);
      } catch (err) {
        scrollToTop();
        const notification = showNotification({
          kind: 'error',
          domain: DOMAINS.PAGE,
          text: JSON.stringify(err?.body?.error || 'Something went wrong'),
        });

        setTimeout(() => {
          dispatch(removeNotification(notification.payload.id));
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (
      typeof baseurl !== 'undefined' &&
      baseurl &&
      formik.values.backendURL !== baseurl &&
      !contentLoaded
    ) {
      GetSettingsData.execute(baseurl)
        .then((result) => {
          formik.setValues({
            ...initialValues,
            ...result.data,
          });

          setIsLoading(false);
          setContentLoaded(true);
        })
        .catch(() => {
          if (showError) {
            scrollToTop();
            const notification = showNotification({
              kind: 'error',
              domain: DOMAINS.PAGE,
              text: 'Failed to fetch data.',
            });

            setTimeout(() => {
              dispatch(removeNotification(notification.payload.id));
            }, 2000);

            setShowError(false);
          }

          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
    }
  }, [
    GetSettingsData,
    baseurl,
    formik,
    initialValues,
    showNotification,
    dispatch,
    showError,
    contentLoaded,
  ]);

  if (error) {
    showNotification({
      kind: 'error',
      domain: DOMAINS.PAGE,
      text: JSON.stringify(error),
    });
  }

  const onChangeHandler = (event) => {
    setIsFormChanged(true);
    formik.handleChange(event);
  };

  return (
    <div id="settingsPage">
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

        {isLoading ? (
          <LoadingSpinner size="s">Loading</LoadingSpinner>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Spacings.Stack scale="m">
              <Spacings.Inline alignItems="center">
                <Label htmlFor="connectorEnabled" isBold>
                  Enable Markeplace Connector:
                </Label>
                <ToggleInput
                  id="connectorEnabled"
                  name="connectorEnabled"
                  onChange={onChangeHandler}
                  isChecked={formik.values.connectorEnabled}
                  value="connectorEnabled"
                  size="small"
                />
              </Spacings.Inline>

              <div className="top-bar">
                <Spacings.Inline justifyContent="flex-end">
                  <Tooltip placement="left" title="Refresh Connector Cache.">
                    <PrimaryButton
                      id="refreshCache"
                      type="submit"
                      style={{ width: 'fit-content' }}
                      label="Refresh Cache"
                      onClick={refreshCacheHandler}
                      isDisabled={formik.isSubmitting}
                    />
                  </Tooltip>

                  <PrimaryButton
                    id="saveButton"
                    type="submit"
                    style={{ width: 'fit-content' }}
                    label="Save"
                    onClick={formik.handleSubmit}
                    isDisabled={formik.isSubmitting || !isFormChanged}
                  />
                </Spacings.Inline>
              </div>

              {formik.values.connectorEnabled && (
                <Spacings.Stack scale="m">
                  <UrlConfiguration
                    formik={formik}
                    setIsFormChanged={setIsFormChanged}
                  />
                  <JobConfiguration
                    formik={formik}
                    setIsFormChanged={setIsFormChanged}
                  />
                  <CommerceToolsConfigutation
                    formik={formik}
                    setIsFormChanged={setIsFormChanged}
                  />
                </Spacings.Stack>
              )}
            </Spacings.Stack>
          </form>
        )}
      </Spacings.Stack>
    </div>
  );
};
Settings.displayName = 'Settings';
Settings.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Settings;
