import { Button, Radio, RadioGroup, TextField } from '@navikt/ds-react';
import { useState } from 'react';
import { beskyttetSideUtenProps } from '../../auth/beskyttetSide';
import { JsonViewer } from '@/components/JsonViewer/JsonViewer';
import { parseJSON } from '@/utils/jsonUtils';

const Søk = () => {
  const [personIdent, setPersonIdent] = useState<string>('');
  const [antall, setAntall] = useState<string>('1');
  const [retning, setRetning] = useState('DESC');
  const [data, setData] = useState<any[]>();

  async function fetchSøker() {
    const params = new URLSearchParams({
      antall,
      retning,
    });

    const response = await fetch(`api/sok?${params}`, {
      headers: {
        personident: personIdent,
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gridRowGap: '1rem', height: '100%' }}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingRight: '1rem',
          gap: '1rem',
          minHeight: '100vh',
          height: 'inherit',
          borderRight: '1px solid black',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          fetchSøker();
        }}
      >
        <TextField
          size={'small'}
          value={personIdent}
          label={'Personident'}
          onChange={(e) => setPersonIdent(e.target.value)}
        />
        <TextField size={'small'} value={antall} label={'Antall'} onChange={(e) => setAntall(e.target.value)} />
        <RadioGroup size={'small'} legend={'Hvilken retning?'} onChange={(value) => setRetning(value)} value={retning}>
          <Radio value={'ASC'}>Stigende</Radio>
          <Radio value={'DESC'}>Synkende</Radio>
        </RadioGroup>
        <Button>Søk</Button>
      </form>
      {data && data.length > 0 && (
        <div style={{ padding: '1rem' }}>{<JsonViewer src={data} theme={'summerfruit'} />}</div>
      )}
    </div>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Søk;
