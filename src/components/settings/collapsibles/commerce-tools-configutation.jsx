import PropTypes from 'prop-types';
import TextField from '@commercetools-uikit/text-field';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';

const CommerceToolsConfigutation = ({ formik }) => {
  return (
    <CollapsiblePanel header="Commercetools Configuration" isSticky={true}>
      <TextField
        name="ctClientID"
        title="Client Id"
        value={formik?.values?.ctClientID || ''}
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
        value={formik?.values?.ctClientKey || ''}
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
        value={formik?.values?.ctProjectKey || ''}
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
        value={formik?.values?.ctHost || ''}
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
        value={formik?.values?.authUrl || ''}
        errors={formik.errors.authUrl}
        touched={formik.touched.authUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        renderError={(errorKey) => {}}
        horizontalConstraint={13}
      />
    </CollapsiblePanel>
  );
};

CommerceToolsConfigutation.propTypes = {
  formik: PropTypes.object,
};

export default CommerceToolsConfigutation;
