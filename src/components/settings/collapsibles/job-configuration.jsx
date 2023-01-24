import PropTypes from 'prop-types';
import Spacings from '@commercetools-uikit/spacings';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import SelectField from '@commercetools-uikit/select-field';
import Label from '@commercetools-uikit/label';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import jobConfigData from '../../../data/jobConfigData.json';

const JobConfiguration = ({ formik }) => {
  const { syncTypes, modes } = jobConfigData;
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
              <CheckboxInput
                key={index}
                id={data.id}
                name={data.id}
                onChange={formik.handleChange}
                isChecked={formik.values[data.id]}
                value={data.id}
              >
                <Label isBold htmlFor={data.id}>
                  {data.label}
                </Label>
              </CheckboxInput>
            );
          })}
        </Spacings.Stack>
        <div id="modeSelect">
          <Spacings.Inline alignItems="center">
            <SelectField
              title="Mode"
              name="mode"
              value={formik?.values?.mode || ''}
              onChange={formik.handleChange}
              horizontalConstraint={4}
              options={modes}
            />
          </Spacings.Inline>
        </div>
      </Spacings.Inline>
    </CollapsiblePanel>
  );
};

JobConfiguration.propTypes = {
  formik: PropTypes.object,
};

export default JobConfiguration;
