import PropTypes from 'prop-types';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import IconButton from '@commercetools-uikit/icon-button';
import { InformationIcon } from '@commercetools-uikit/icons';
import Tooltip from '@commercetools-uikit/tooltip';

const UrlConfiguration = ({ formik, setIsFormChanged }) => {
  const onChangeHandler = (event) => {
    setIsFormChanged(true);
    formik.handleChange(event);
  };

  return (
    <CollapsiblePanel header="Url Configuration" id="urlConfigurationPanel">
      <div id="urlConfigurationInputs">
        <Spacings.Stack scale="xl">
          <Spacings.Inline alignItems="center">
            <TextField
              name="backendURL"
              title="Connector Endpoint:"
              value={formik?.values?.backendURL || ''}
              errors={formik.errors.backendURL}
              touched={formik.touched.backendURL}
              onChange={onChangeHandler}
              onBlur={formik.handleBlur}
              renderError={(errorKey) => {
                switch (errorKey) {
                  case 'notvalid':
                    return 'The value should be a valid https url.';
                  default:
                    return null;
                }
              }}
              isRequired
            />
            <Tooltip
              placement="right"
              title="Insert the connector endpoint e.g. https://connector.com/."
            >
              <IconButton
                icon={<InformationIcon />}
                label="Insert the connector endpoint e.g. https://connector.com/."
              />
            </Tooltip>
          </Spacings.Inline>
          <Spacings.Inline alignItems="center">
            <TextField
              name="miraklOperatorKey"
              title="Mirakl Operator Key:"
              value={formik?.values?.miraklOperatorKey || ''}
              errors={formik.errors.miraklOperatorKey}
              touched={formik.touched.miraklOperatorKey}
              onChange={onChangeHandler}
              onBlur={formik.handleBlur}
              isRequired
            />
            <Tooltip placement="right" title="Insert the operator key.">
              <IconButton
                icon={<InformationIcon />}
                label="Insert the operator key."
              />
            </Tooltip>
          </Spacings.Inline>
          <Spacings.Inline alignItems="center">
            <TextField
              name="miraklUrl"
              title="Mirakl URL:"
              value={formik?.values?.miraklUrl || ''}
              errors={formik.errors.miraklUrl}
              touched={formik.touched.miraklUrl}
              renderError={(errorKey) => {
                switch (errorKey) {
                  case 'notvalid':
                    return 'The value should be a valid https url.';
                  default:
                    return null;
                }
              }}
              onChange={onChangeHandler}
              onBlur={formik.handleBlur}
              isRequired
            />
            <Tooltip
              placement="right"
              title="Insert the mirakl url e.g. https://yourorg.mirakl.net/."
            >
              <IconButton
                icon={<InformationIcon />}
                label="Insert the mirakl url e.g. https://yourorg.mirakl.net/."
              />
            </Tooltip>
          </Spacings.Inline>
        </Spacings.Stack>
      </div>
    </CollapsiblePanel>
  );
};

UrlConfiguration.propTypes = {
  formik: PropTypes.object,
  setIsFormChanged: PropTypes.func,
};

export default UrlConfiguration;
