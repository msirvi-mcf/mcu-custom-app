import {
  useMcMutation,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { actions, useAsyncDispatch } from "@commercetools-frontend/sdk";
import { useEffect, useState } from "react";
import {
  extractErrorFromGraphQlResponse,
} from '../../helpers';
import UpdateSettings from './update-settings.ctp.graphql';

export const useSettings = () => {
  const [UpdateSettingsDetails, { loading }] = useMcMutation(
    UpdateSettings
  );

  const execute = async ({ url }) => {
    try {
      return await UpdateSettingsDetails({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          setting: {
            container: "ConnectorSettingContainer",
            key: "Url",
            value: JSON.stringify(url)
          }
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return {
    loading,
    execute,
  };
}
export const useSettingsToDashboard = (formData) => {
  
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const dispatch = useAsyncDispatch();
    async function execute(formData) {
      const baseUrl = formData?.name
      const settingUrl = "/settings/"
      const url = baseUrl + settingUrl;
      console.log(url);
      try {
        const result = await dispatch(
          actions.forwardTo.post({ uri: url, payload: formData, headers: { "ngrok-skip-browser-warning": "69420" } })
        );
        // Update state with `result`
        setdata(result);
        setloading(false)
      } catch (error) {
        // Update state with `error`
        seterror(error);
      }
    }
   

  return {
    execute,
    loading,
    error
  }
}