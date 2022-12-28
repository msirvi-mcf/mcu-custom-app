import { actions, useAsyncDispatch } from "@commercetools-frontend/sdk";
import { useState } from "react";

const externalApiUrl =
  "https://jsonplaceholder.typicode.com/todos/1";

export const useProcessDetails = () => {
  // The asyncDispatch is a wrapper around the redux dispatch and provides
  // the correct return type definitions because the action resolves to a Promise.
  const asyncDispatch = useAsyncDispatch();
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [result,setresult] = useState({});
    setLoading(true);
    setLoading(false);
    asyncDispatch(actions.forwardTo.get({ uri: externalApiUrl }))
      .then((result) => {
        setresult(result);
      })
      .catch((error) => {
        setError(error);
      });
      return {
        loading,
        error,
        result
      }
};

