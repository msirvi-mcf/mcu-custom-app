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

const JobConfiguration = ({ formik, setIsFormChanged }) => {
  const { syncTypes } = jobConfigData;
  const intl = useIntl();

  const onChangeHandler = (event) => {
    setIsFormChanged(true);
    formik.handleChange(event);
  };

  return (
    <CollapsiblePanel
      header="Job Configuration"
      isSticky={true}
      id="jobConfigurationPanel"
    >
      <Spacings.Inline scale="xxl" alignItems="baseline">
        <Spacings.Stack scale="l">
          {syncTypes.map((data, index) => {
            return (
              <Spacings.Inline key={index} alignItems="center" scale="xl">
                <Spacings.Inline alignItems="center">
                  <Label htmlFor={data.id} isBold>
                    {intl.formatMessage(
                      {
                        id: data.id,
                        defaultMessage: data.label,
                        description: data.label,
                      },
                      {}
                    )}
                  </Label>
                  <ToggleInput
                    id={data.id}
                    name={data.id}
                    onChange={onChangeHandler}
                    isChecked={formik.values[data.id]}
                    value={data.id}
                    size="small"
                  />
                </Spacings.Inline>
                {formik.values[data.id] && (
                  <div id="modeSelect">
                    <Spacings.Inline alignItems="center" scale="xxl">
                      <SelectField
                        title="Mode:"
                        name={data.modeId}
                        value={formik?.values[data.modeId] || ''}
                        onChange={onChangeHandler}
                        horizontalConstraint={4}
                        options={data.modes}
                        isRequired
                      />
                      {formik?.values[data.modeId] === 'job' && (
                        <div id="scheduleSelect">
                          <Spacings.Inline>
                            <TextField
                              name={data.modeId + 'Schedule'}
                              title="Schedule:"
                              value={
                                formik?.values[data.modeId + 'Schedule'] || ''
                              }
                              errors={formik.errors[data.modeId + 'Schedule']}
                              touched={formik.touched[data.modeId + 'Schedule']}
                              onChange={onChangeHandler}
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
                              title="Insert a valid cron syntax e.g. * * * * *"
                            >
                              <IconButton
                                icon={<InformationIcon />}
                                label="Insert a valid cron syntax."
                              />
                            </Tooltip>
                          </Spacings.Inline>
                        </div>
                      )}
                    </Spacings.Inline>
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
  setIsFormChanged: PropTypes.func,
};

export default JobConfiguration;
