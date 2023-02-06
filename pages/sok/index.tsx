import { Button, TextField } from '@navikt/ds-react';
import { useState } from 'react';
import { Buffer } from 'buffer';

const Søk = () => {
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<any[]>([]);

  const parseJSON = (data: string) => {
    if (!data) {
      return 'No JSON here...';
    }
    try {
      const buf = Buffer.from(data, 'base64');
      return JSON.parse(buf.toString());
    } catch (error) {
      console.error('Klarte ikke å parse json. ' + error);
      console.error(data);
    }
  };

  async function doFetch(personident: string) {
    const params = new URLSearchParams({
      antall: '1',
      retning: 'DESC',
    });

    const response = await fetch('api/?' + params, {
      method: 'GET',
      headers: {
        personident: personident,
        accept: 'application/json',
      },
    });

    if (response.ok) {
      const json: any[] = await response.json();

      const parsedRespons = json.map((obj) => {
        obj.record = parseJSON(obj.record);
        return obj;
      });

      setData(parsedRespons);
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridRowGap: '1rem' }}>
      <div style={{ width: '50%', display: 'grid', gridTemplateColumns: '1fr', gridRowGap: '1rem' }}>
        <TextField label={'Skriv inn noe her'} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={() => doFetch(value)}>Søk</Button>
      </div>
      {data && data.length > 0 && <div style={{ padding: '1rem' }}>{JSON.stringify(data)}</div>}
    </div>
  );
};

export default Søk;
