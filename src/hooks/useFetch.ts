import { useState } from 'react';
import { parseJSON } from '@/utils/jsonUtils';

const useFetch = (url: string, headers: object) => {
  const [data, setData] = useState<any | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url, { ...headers });
      if (res.ok) {
        const response = await res.json();
        const parsedRespons = response.map((obj: { record: string }) => {
          obj.record = parseJSON(obj.record);
          return obj;
        });
        setData(parsedRespons);
        setError(undefined);
      }
    } catch (e) {
      setError(`Fetch error ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, data, error, isLoading };
};

export { useFetch };
