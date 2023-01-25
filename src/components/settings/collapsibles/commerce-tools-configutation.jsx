import PropTypes from 'prop-types';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Label from '@commercetools-uikit/label';
import Spacings from '@commercetools-uikit/spacings';
import { useState } from 'react';
import IconButton from '@commercetools-uikit/icon-button';
import Tooltip from '@commercetools-uikit/tooltip';
import { InformationIcon } from '@commercetools-uikit/icons';

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
      headerControls={
        <Tooltip placement="right" title="Upload .env format config file only">
          <IconButton
            icon={<InformationIcon />}
            label="Upload .env format config file only"
          />
        </Tooltip>
      }
      header="Commercetools Configuration"
      isSticky={true}
      id="ctConfigurationPanel"
    >
      <Spacings.Stack>
        <Spacings.Inline alignItems="center">
          <Label htmlFor="uploadFile">Upload Configuration File</Label>
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
