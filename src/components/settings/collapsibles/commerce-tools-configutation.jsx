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
        formik.setFieldValue('configfilename', file.name);
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
        <Tooltip placement="right" title={
          <div style={{width: '200px', height: 'auto', whiteSpace: 'pre-wrap'}}>
          Upload .env file, e.g : 
          CTP_PROJECT_KEY=key
          CTP_CLIENT_SECRET=Zwb88jjjher
          CTP_CLIENT_ID=sdskjRR88jss_-Rt
          CTP_AUTH_URL=https://auth.us-central1.gcp.commercetools.com
          CTP_API_URL=https://api.us-central1.gcp.commercetools.com
          CTP_SCOPES=manage_project:key
        </div>
        }>
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
        {fileUploaded && (
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
          {!fileUploaded && formik.values.configfilename && <span>Config: {formik.values.configfilename}</span> }
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
