import PropTypes from 'prop-types';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Label from '@commercetools-uikit/label';
import Spacings from '@commercetools-uikit/spacings';
import { useState } from 'react';
import Tooltip from '@commercetools-uikit/tooltip';

const CommerceToolsConfigutation = ({ formik }) => {
  const [fileUploaded, setFileUploaded] = useState('');
  const fileUploadHandler = (event) => {
    try {
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      reader.onloadend = () => {
        const fileContent = reader.result;
        formik.setFieldValue('ctConfigFile', fileContent);
        setFileUploaded(file.name);
      };
      reader.readAsText(file, 'UTF-8');
    } catch (err) {
      formik.setFieldValue('ctConfigFile', null);
      setFileUploaded('');
    }
  };
  return (
    <CollapsiblePanel
      header="Commercetools Configuration"
      isSticky={true}
      id="ctConfigurationPanel"
    >
      <Spacings.Stack>
        <Spacings.Inline alignItems="center">
          <Tooltip
            placement="right"
            title="Upload .env format config file only"
          >
            <Label htmlFor="uploadFile">Upload Configuration File</Label>
          </Tooltip>
          <input
            type="file"
            id="uploadFile"
            accept=".env"
            onChange={fileUploadHandler}
          />
          {fileUploaded && <span>File Uploaded: {fileUploaded}</span>}
        </Spacings.Inline>
      </Spacings.Stack>
    </CollapsiblePanel>
  );
};

CommerceToolsConfigutation.propTypes = {
  formik: PropTypes.object,
};

export default CommerceToolsConfigutation;
