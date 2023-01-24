import PropTypes from 'prop-types';
// import { useCallback } from 'react';
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
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import SelectField from '@commercetools-uikit/select-field';
import TextField from '@commercetools-uikit/text-field';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import { useSettings, useSettingsToDashboard } from '../../hooks/use-settings';
import {
  useShowNotification,
  // useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';

const Settings = (props) => {
  const intl = useIntl();
  const SaveSettings = useSettings();
  const SaveSettingsToDashboard = useSettingsToDashboard();
  const showNotification = useShowNotification();
  const formik = useFormik({
    initialValues: {
      connectorEnabled: false,
      name: '', //url
      miraklApiKey: '',
      miraklAPISecret: '',
      urlIsProduction: null,
      miraklClientKey: '',
      ctClientID: '',
      ctClientSecret: '',
      authUrl: '',
      ctHost: '',
      ctProjectKey: '',
    },
    validate,
    onSubmit: async (formikValues, formikHelpers) => {
      console.log(formikValues);
      try {
        await SaveSettings.execute({ url: formikValues.name });
        await SaveSettingsToDashboard.execute(formikValues);
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: intl.formatMessage(messages.settingsUpdated, {}),
        });
      } catch (err) {
        console.log(err);
      }
      // console.log(formikValues);
      // Do something async
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

      <Constraints.Horizontal max={13}>
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.demoHint} />
        </ContentNotification>
      </Constraints.Horizontal>
      <form onSubmit={formik.handleSubmit}>
        <Spacings.Stack scale="xl">
          <Spacings.Stack scale="xs">
            <Label htmlFor="connectorEnabled" isBold>
              Markeplace Connector
            </Label>
            <ToggleInput
              id="connectorEnabled"
              name="connectorEnabled"
              onChange={formik.handleChange}
              isChecked={formik.values.connectorEnabled}
              value="connectorEnabled"
              size="small"
            />
          </Spacings.Stack>

          {formik.values.connectorEnabled && (
            <Spacings.Stack scale="xs">
              <CollapsiblePanel header="Url Configuration">
                <Spacings.Inline
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Spacings.Stack>
                    <TextField
                      name="name"
                      title="Backend URL"
                      value={formik.values.name}
                      errors={formik.errors.name}
                      touched={formik.touched.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isRequired
                    />
                    <TextField
                      name="miraklApiKey"
                      title="Mirakl API key"
                      value={formik.values.miraklApiKey}
                      touched={formik.touched.miraklApiKey}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    <TextField
                      name="miraklAPISecret"
                      title="Mirakl API Secret"
                      value={formik.values.miraklAPISecret}
                      errors={formik.errors.miraklAPISecret}
                      touched={formik.touched.miraklAPISecret}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      renderError={(errorKey) => {}}
                    />

                    <TextField
                      name="miraklClientKey"
                      title="miraklClientKey"
                      value={formik.values.miraklClientKey}
                      errors={formik.errors.miraklClientKey}
                      touched={formik.touched.miraklClientKey}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      renderError={(errorKey) => {}}
                    />
                  </Spacings.Stack>
                  <Spacings.Stack>
                    <CheckboxInput
                      id="urlIsProduction"
                      name="urlIsProduction"
                      onChange={formik.handleChange}
                      isChecked={formik.values.urlIsProduction}
                      value="urlIsProduction"
                      aria-label={'is production'}
                    >
                      Is Production
                    </CheckboxInput>
                  </Spacings.Stack>
                </Spacings.Inline>
              </CollapsiblePanel>

              <CollapsiblePanel header="Job Configuration" isSticky={true}>
                <Spacings.Stack>
                  <Spacings.Inline>
                    <CheckboxInput
                      id="categorySync"
                      name="categorySync"
                      onChange={formik.handleChange}
                      isChecked={formik.values.categorySync}
                      value="categorySync"
                      aria-label={'Category Sync'}
                    >
                      Category Sync
                    </CheckboxInput>

                    <Spacings.Stack>
                      <SelectField
                        title="Mode"
                        name="mode"
                        value={formik.values.mode}
                        onChange={formik.handleChange}
                        horizontalConstraint={4}
                        options={[
                          { value: 'job', label: 'JOB' },
                          { value: 'queue', label: 'QUEUE' },
                        ]}
                      />
                    </Spacings.Stack>
                  </Spacings.Inline>
                  <Spacings.Stack>
                    <CheckboxInput
                      id="productSync"
                      name="productSync"
                      onChange={formik.handleChange}
                      isChecked={formik.values.productSync}
                      value="productSync"
                      aria-label={'Product Sync'}
                    >
                      Product Sync
                    </CheckboxInput>
                    <CheckboxInput
                      id="offerSync"
                      name="offerSync"
                      onChange={formik.handleChange}
                      isChecked={formik.values.offerSync}
                      value="offerSync"
                      aria-label={'Offer Sync'}
                    >
                      Offer Sync
                    </CheckboxInput>
                  </Spacings.Stack>
                </Spacings.Stack>
              </CollapsiblePanel>

              <CollapsiblePanel
                header="Commercetools Configuration"
                isSticky={true}
              >
                <TextField
                  name="ctClientID"
                  title="Client Id"
                  value={formik.values.ctClientID}
                  errors={formik.errors.ctClientID}
                  touched={formik.touched.ctClientID}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  renderError={(errorKey) => {}}
                  horizontalConstraint={13}
                />
                <TextField
                  name="ctClientSecret"
                  title="Client Secret"
                  value={formik.values.ctClientKey}
                  errors={formik.errors.ctClientKey}
                  touched={formik.touched.ctClientKey}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  renderError={(errorKey) => {}}
                  horizontalConstraint={13}
                />
                <TextField
                  name="ctProjectKey"
                  title="Project Key"
                  value={formik.values.ctProjectKey}
                  errors={formik.errors.ctProjectKey}
                  touched={formik.touched.ctProjectKey}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  renderError={(errorKey) => {}}
                  horizontalConstraint={13}
                />
                <TextField
                  name="ctHost"
                  title="Host"
                  value={formik.values.ctHost}
                  errors={formik.errors.ctHost}
                  touched={formik.touched.ctHost}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  renderError={(errorKey) => {}}
                  horizontalConstraint={13}
                />
                <TextField
                  name="authUrl"
                  title="Auth Url"
                  value={formik.values.authUrl}
                  errors={formik.errors.authUrl}
                  touched={formik.touched.authUrl}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  renderError={(errorKey) => {}}
                  horizontalConstraint={13}
                />
              </CollapsiblePanel>
            </Spacings.Stack>
          )}

          <PrimaryButton
            type="submit"
            style={{ width: 'fit-content' }}
            label="Submit"
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
