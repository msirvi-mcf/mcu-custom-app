import { actions, useAsyncDispatch } from "@commercetools-frontend/sdk";
import { useEffect, useState } from "react";
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useGetSettingsCTP } from '../use-settings'
export const useProcessDetails = (processId) => {
  const baseUrl = useApplicationContext((context) =>
    context.environment.externalApiUrl
  );
  const logUrl = "process/list/"
  const url = baseUrl + logUrl + '/' + processId;
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const dispatch = useAsyncDispatch();
  useEffect(() => {
    async function execute() {
      try {
        const result = await dispatch(
          actions.forwardTo.get({ uri: url, headers: { "ngrok-skip-browser-warning": "69420" } })
        );
        // Update state with `result`
        setdata(result);
        setloading(false)
      } catch (error) {
        // Update state with `error`
        seterror(error);
      }
    }
    execute();
  }, [dispatch,url])

  return {
    data, loading, error
  }

};

export const useProcessList = ({page,perPage}) => {
  
  const {baseurl} = useGetSettingsCTP();
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const dispatch = useAsyncDispatch();
  const pageValue  = page.value;
  const perPageValue = perPage.value;
  useEffect(() => {
    async function execute() {
      const logUrl = `/process/list?page=${pageValue}&perPage=${perPageValue}`
      const url = baseurl + logUrl;
      if(baseurl){
        try {
          const result = await dispatch(
            actions.forwardTo.get({ uri: url, headers: { "ngrok-skip-browser-warning": "69420" } })
          );
          // Update state with `result`
          setdata(result);
          setloading(false)
        } catch (error) {
          // Update state with `error`
          seterror(error);
        }
      }
      
    }
    execute();
  }, [dispatch, baseurl,pageValue,perPageValue])

  return {
    processList: data?.incidents,
    total: data?.total,
    loading,
    error
  }
}