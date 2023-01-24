import PropTypes from 'prop-types';
import Spacings from '@commercetools-uikit/spacings';
import Label from '@commercetools-uikit/label';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import TextField from '@commercetools-uikit/text-field';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';

const UrlConfiguration = ({ formik }) => {
  return (
    <CollapsiblePanel header="Url Configuration" id="urlConfigurationPanel">
      <Spacings.Stack scale="l">
        <div id="urlConfigurationInputs">
          <Spacings.Stack scale="l">
            <TextField
              name="backendURL"
              title="Backend URL"
              value={formik?.values?.backendURL || ''}
              errors={formik.errors.backendURL}
              touched={formik.touched.backendURL}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isRequired
            />

            <TextField
              name="miraklApiKey"
              title="Mirakl API key"
              value={formik?.values?.miraklApiKey || ''}
              touched={formik.touched.miraklApiKey}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextField
              name="miraklAPISecret"
              title="Mirakl API Secret"
              value={formik?.values?.miraklAPISecret || ''}
              errors={formik.errors.miraklAPISecret}
              touched={formik.touched.miraklAPISecret}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextField
              name="miraklClientKey"
              title="Mirakl Client Key"
              value={formik?.values?.miraklClientKey || ''}
              errors={formik.errors.miraklClientKey}
              touched={formik.touched.miraklClientKey}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Spacings.Stack>
        </div>
        <CheckboxInput
          id="urlIsProduction"
          name="urlIsProduction"
          onChange={formik.handleChange}
          isChecked={formik.values.urlIsProduction}
          value="urlIsProduction"
          aria-label={'is production'}
        >
          <Label isBold htmlFor="urlIsProduction">
            Is Production
          </Label>
        </CheckboxInput>
      </Spacings.Stack>
    </CollapsiblePanel>
  );
};

UrlConfiguration.propTypes = {
  formik: PropTypes.object,
};

export default UrlConfiguration;
