import { actions, useAsyncDispatch } from "@commercetools-frontend/sdk";
import { useEffect, useState } from "react";
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

export const useProcessDetails = (processId) => {
  const baseUrl = useApplicationContext((context) =>
    context.environment.externalApiUrl
  );
  const logUrl = "process/list/"
  const url = baseUrl + logUrl + '/' + processId;
  // console.log(url);
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
  }, [dispatch])

  return {
    data, loading, error
  }

};

export const useProcessList = () => {
  const baseUrl = useApplicationContext((context) =>
    context.environment.externalApiUrl
  );
  const logUrl = "process/list/"
  const url = baseUrl + logUrl;
  console.log(url);
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
  }, [dispatch])

  return {
    processList: data?.incidents,
    loading,
    error
  }
}