import PropTypes from 'prop-types';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Label from '@commercetools-uikit/label';
import Spacings from '@commercetools-uikit/spacings';
import { useState } from 'react';
import IconButton from '@commercetools-uikit/icon-button';
import Tooltip from '@commercetools-uikit/tooltip';
import ReactHtmlParser from 'react-html-parser';
import { InformationIcon } from '@commercetools-uikit/icons';

const CommerceToolsConfigutation = ({ formik, setIsFormChanged }) => {
  const [fileUploaded, setFileUploaded] = useState('');
  const fileUploadHandler = (event) => {
    try {
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      reader.onloadend = () => {
        const fileContent = reader.result;
        setIsFormChanged(true);
        formik.setFieldValue('ctConfigFile', fileContent);
        setFileUploaded(file.name);
      };
      reader.readAsText(file, 'UTF-8');
    } catch (err) {
      setIsFormChanged(true);
      formik.setFieldValue('ctConfigFile', null);
      setFileUploaded('');
    }
  };

  const configFile = formik.values.ctConfigFile.replaceAll('\n', '<br/>');

  return (
    <CollapsiblePanel
      headerControls={
        <Tooltip placement="right" title="Upload .env file, keys required in .env : CTP_PROJECT_KEY,CTP_CLIENT_SECRET,CTP_CLIENT_ID,CTP_AUTH_URL,CTP_API_URL,CTP_SCOPES">
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
        {formik.values.ctConfigFile && (
          <div className="config-file-display">
            <h4>Current Configuration File</h4>
            <div>{ReactHtmlParser(configFile)}</div>
          </div>
        )}
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
  setIsFormChanged: PropTypes.func,
};

export default CommerceToolsConfigutation;
