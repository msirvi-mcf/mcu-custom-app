import PropTypes from 'prop-types';
import Spacings from '@commercetools-uikit/spacings';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import Label from '@commercetools-uikit/label';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import jobConfigData from '../../../data/jobConfigData.json';
import ToggleInput from '@commercetools-uikit/toggle-input';
import IconButton from '@commercetools-uikit/icon-button';
import Tooltip from '@commercetools-uikit/tooltip';
import { InformationIcon } from '@commercetools-uikit/icons';

const JobConfiguration = ({ formik }) => {
  const { syncTypes } = jobConfigData;
  const intl = useIntl();
  return (
    <CollapsiblePanel
      header="Job Configuration"
      isSticky={true}
      id="jobConfigurationPanel"
    >
      <Spacings.Inline scale="xxl" alignItems="baseline">
        <Spacings.Stack scale="m">
          {syncTypes.map((data, index) => {
            return (
              <Spacings.Inline key={index}>
                <Label htmlFor={data.id} isBold >
                  {intl.formatMessage({ id: data.id, defaultMessage: data.key, description: data.key }, {})}
                </Label>
                <ToggleInput
                  id={data.id}
                  name={data.id}
                  onChange={formik.handleChange}
                  isChecked={formik.values[data.id]}
                  value={data.id}
                  size="small"
                />
                {formik.values[data.id] && (
                  <div id="modeSelect">
                    <Spacings.Inline alignItems="center">
                      <SelectField
                        title="Mode:"
                        name={data.modeId}
                        value={formik?.values[data.modeId] || ''}
                        onChange={formik.handleChange}
                        horizontalConstraint={4}
                        options={data.modes}
                      />
                    </Spacings.Inline>
                    {formik?.values[data.modeId] === "job" && (
                      <Spacings.Inline>
                        <TextField
                          name={data.modeId + "Schedule"}
                          title="Schedule:"
                          value={formik?.values[data.modeId + "Schedule"] || ''}
                          errors={formik.errors[data.modeId + "Schedule"]}
                          touched={formik.touched[data.modeId + "Schedule"]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          renderError={(errorKey) => {
                            switch (errorKey) {
                              case 'syntaxError':
                                return 'The cron syntax is invalid';
                              default:
                                return null;
                            }
                          }}
                          isRequired
                        />
                        <Tooltip
                          placement="right"
                          title="Insert a valid cron syntax: * * * * *"
                        >
                          <IconButton
                            icon={<InformationIcon />}
                            onClick={() => { }}
                          />
                        </Tooltip>
                      </Spacings.Inline>
                    )}
                  </div>

                )}

              </Spacings.Inline>

            );
          })}
        </Spacings.Stack>

      </Spacings.Inline>
    </CollapsiblePanel>
  );
};

JobConfiguration.propTypes = {
  formik: PropTypes.object,
};

export default JobConfiguration;
