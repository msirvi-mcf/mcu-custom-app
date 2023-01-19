import PropTypes from 'prop-types';
import Spacings from '@commercetools-uikit/spacings';
import { useIntl } from 'react-intl';
import { BackIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import Constraints from '@commercetools-uikit/constraints';
import { ContentNotification } from '@commercetools-uikit/notifications';
import {
  Link as RouterLink,
} from 'react-router-dom';
import messages from './messages';
import FlatButton from '@commercetools-uikit/flat-button';
import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import FieldLabel from '@commercetools-uikit/field-label';
import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import validate from './validate';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import SelectField from '@commercetools-uikit/select-field';
import TextField from '@commercetools-uikit/text-field';
const Settings = (props) => {
  const intl = useIntl();
  const { dataLocale, languages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    languages: context.project.languages,
  }));
  let isChecked;
  const formik = useFormik({
    // We assume that the form is empty. Therefore, we need to provide default values.
    initialValues: {
      // A Channel's `name`: https://docs.commercetools.com/api/projects/channels
      name: LocalizedTextInput.createLocalizedString(languages),
      connector: null,
      url:null,
      urlIsProduction:null,
    },
    validate,
    onSubmit: async (formikValues) => {
      console.log(formikValues);
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
        <SelectField
          title="Markeplace Connector"
          name="connector"
          value={formik.values.connector}
          touched={formik.touched.connector}
          onBlur={formik.handleBlur}
          onChange={
            formik.handleChange
          }
          options={[
            { value: 'enable', label: 'Enable' },
            { value: 'disable', label: 'Disable' },
          ]}
        />
        <fieldset>
          <legend>Url Configuration</legend>


          <Spacings.Inline>
            <TextField
              name="url"
              title="Backend URL"
              value={formik.values.url}
              errors={formik.errors.url}
              touched={formik.touched.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

              renderError={(errorKey) => {
                
              }}
              horizontalConstraint={13}
            />
           
            <CheckboxInput
            name='urlIsProduction'
            value={formik.values.urlIsProduction}
            
              aria-label={'is production'}>Is production</CheckboxInput>
          </Spacings.Inline>
          <Spacings.Inline>
            <TextField
              name="miraklApiKey"
              title="Mirakl API key"
              value={formik.values.miraklApiKey}
              errors={formik.errors.miraklApiKey}
              touched={formik.touched.miraklApiKey}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

              renderError={(errorKey) => {
               
              }}
              horizontalConstraint={13}
            />
           
            <CheckboxInput
             name='miraklApiKeyIsProduction'
             value={formik.values.miraklApiKeyIsProduction}
              onChange={formik.handleChange}
              aria-label={'is production'}>Is production</CheckboxInput>
          </Spacings.Inline>

          <Spacings.Inline>
            <TextField
              name="miraklAPISecret"
              title="Mirakl API Secret"
              value={formik.values.miraklAPISecret}
              errors={formik.errors.miraklAPISecret}
              touched={formik.touched.miraklAPISecret}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

              renderError={(errorKey) => {
                
              }}
              horizontalConstraint={13}
            />
           
            <CheckboxInput
             name='miraklAPISecretIsProduction'
             value={formik.values.miraklAPISecretIsProduction}
              onChange={formik.handleChange}
              aria-label={'is production'}>Is production</CheckboxInput>
          </Spacings.Inline>
          <Spacings.Inline>
            <TextField
              name="miraklClientKey"
              title="miraklClientKey"
              value={formik.values.miraklClientKey}
              errors={formik.errors.miraklClientKey}
              touched={formik.touched.miraklClientKey}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

              renderError={(errorKey) => {
                
              }}
              horizontalConstraint={13}
            />
           
            <CheckboxInput
            name='miraklClientKeyIsProduction'
            value={formik.values.miraklClientKeyIsProduction}
              onChange={formik.handleChange}
              aria-label={'is production'}>Is production</CheckboxInput>
          </Spacings.Inline>


        </fieldset>
        <fieldset>
          <legend>Job Configuration</legend>
          <Spacings.Inline>
            <CheckboxInput
             name='categorySync'
             value={formik.values.categorySync}
              onChange={formik.handleChange}
              aria-label={'Category Sync'} > Category Sync </CheckboxInput>
            <Spacings.Stack>

              <SelectField
                title="Mode"
                name="mode"
                value={formik.values.mode}
                onChange={
                  formik.handleChange
                }
                horizontalConstraint={4}
                options={[
                  { value: 'job', label: 'JOB' },
                  { value: 'queue', label: 'QUEUE' },
                ]}
              />
            </Spacings.Stack>


          </Spacings.Inline>
          <CheckboxInput
           name='productSync'
           value={formik.values.productSync}
            onChange={formik.handleChange}
            aria-label={'Product Sync'} > Product Sync </CheckboxInput>
          <CheckboxInput
          name='offerSync'
          value={formik.values.offerSync}
            onChange={formik.handleChange}
            aria-label={'Offer Sync'} > Offer Sync </CheckboxInput>


        </fieldset>
        <fieldset>
          <legend>Commercetools Configuration</legend>
          <LocalizedTextField
        name="name"
        title="Name"
        isRequired
        selectedLanguage={dataLocale}
        value={formik.values.name}
        errors={
          LocalizedTextField.toFieldErrors(formik.errors).name
        }
        touched={formik.touched.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
        </fieldset>

        <PrimaryButton
          type="submit"
          label="Submit"
          onClick={formik.handleSubmit}
          isDisabled={formik.isSubmitting}
        />
      </form>
    </Spacings.Stack>
  )
};
Settings.displayName = 'Settings';
Settings.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,

};

export default Settings;