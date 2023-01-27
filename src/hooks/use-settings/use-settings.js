import {
  useMcMutation,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { actions, useAsyncDispatch } from '@commercetools-frontend/sdk';
import { extractErrorFromGraphQlResponse } from '../../helpers';
import UpdateSettings from './update-settings.ctp.graphql';
import getSettings from './get-settings.ctp.graphql';

export const useSettings = () => {
  const [UpdateSettingsDetails, { loading }] = useMcMutation(UpdateSettings);

  const execute = async ({ url }) => {
    try {
      return await UpdateSettingsDetails({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          setting: {
            container: 'ConnectorSettingContainer',
            key: 'Url',
            value: JSON.stringify(url),
          },
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
};

export const useSettingsToDashboard = () => {
  const dispatch = useAsyncDispatch();
  async function execute(formData) {
      const baseUrl = formData?.backendURL;
      const settingUrl = '/settings/';
      const url = baseUrl + settingUrl;
      await dispatch(
        actions.forwardTo.get({
          uri: url,
          headers: { 'ngrok-skip-browser-warning': '69420' },
        })
      );
      await dispatch(
        actions.forwardTo.post({
          uri: url,
          payload: formData,
          headers: { 'ngrok-skip-browser-warning': '69420' },
        })
      );
  }

  return {
    execute,
  };
};

export const useGetSettingsCTP = () => {
  const { data, error, loading } = useMcQuery(getSettings, {
    variables: {
      key: 'Url',
      container: 'ConnectorSettingContainer',
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    baseurl: data?.customObject?.value || '',
    error,
    loading,
  };
};

export const useGetSettingsData = () => {
  const dispatch = useAsyncDispatch();

  async function execute(baseurl) {
    const settingUrl = '/settings/';
    const url = baseurl + settingUrl;
    return await dispatch(
      actions.forwardTo.get({
        uri: url,
        headers: { 'ngrok-skip-browser-warning': '69420' },
      })
    );
  }

  return {
    execute,
  };
};
