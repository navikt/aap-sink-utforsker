import { useState } from 'react';
import { parseJSON } from '@/utils/jsonUtils';
import { Buffer } from 'buffer';

const useFetch = () => {
  const [data, setData] = useState<any | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (url: string, headers: object) => {
    setIsLoading(true);
    try {
      const res = await fetch(url, { ...headers });
      if (res.ok) {
        const response = await res.json();
        const parsedRespons = response.map((obj: { record: string }) => {
          try {
            obj.record = parseJSON(obj.record);
          } catch (e) {
            obj.record = Buffer.from(obj.record, 'base64').toString();
          }
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
