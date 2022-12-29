import { actions, useAsyncDispatch } from "@commercetools-frontend/sdk";
import { useEffect, useState } from "react";

const externalApiUrl =
  "https://2968-2402-e280-3e4e-e7-1855-6234-44ae-7c5.in.ngrok.io/incident/detail/63a45deada2d9b18694d9eb9";
const baseUrl =
  "https://2968-2402-e280-3e4e-e7-1855-6234-44ae-7c5.in.ngrok.io/";
const logUrl = "process/list/"

export const useProcessDetails = (processId) => {
  const url = baseUrl + logUrl + '/'+ processId;
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
    data, loading, error
  }

};

export const useProcessList = () => {
  const url = baseUrl + logUrl;
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