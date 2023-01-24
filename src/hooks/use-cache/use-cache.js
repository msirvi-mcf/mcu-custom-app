import { useState, useEffect } from 'react';

const cache = new Map();

export function useCachedData(key, fetchData) {
  const [data, setData] = useState(cache.get(key));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cache.has(key)) {
      setLoading(true);
      fetchData().then(data => {
        cache.set(key, data);
        setData(data);
        setLoading(false);
      });
    }
  }, [key, fetchData]);

  function invalidateCache() {
    cache.delete(key);
    setData(null);
  }

  function refreshData() {
    setLoading(true);
    fetchData().then(data => {
      cache.set(key, data);
      setData(data);
      setLoading(false);
    });
  }

  return { data, loading, invalidateCache, refreshData };
}
 export default useCachedData;