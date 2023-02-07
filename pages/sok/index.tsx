import { Button, TextField } from '@navikt/ds-react';
import { useState } from 'react';
import { beskyttetSideUtenProps } from '../../auth/beskyttetSide';
import { JsonViewer } from '@/components/JsonViewer/JsonViewer';
import { parseJSON } from '@/utils/jsonUtils';

const Søk = () => {
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<any[]>();

  async function doFetch(personident: string) {
    const params = new URLSearchParams({
      antall: '1',
      retning: 'DESC',
    });

    const response = await fetch(`api/sok?${params}`, {
      method: 'GET',
      headers: {
        personident: personident,
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
      {data && data.length > 0 && (
        <div style={{ padding: '1rem' }}>{<JsonViewer src={data} theme={'summerfruit'} />}</div>
      )}
    </div>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Søk;
