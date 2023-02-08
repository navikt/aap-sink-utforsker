import { Button, Radio, RadioGroup, Select, TextField } from '@navikt/ds-react';
import { useState } from 'react';
import { beskyttetSideUtenProps } from '../../auth/beskyttetSide';
import { JsonViewer, jsonViewerThemes } from '@/components/JsonViewer/JsonViewer';
import { parseJSON } from '@/utils/jsonUtils';

import styles from './Sok.module.css';
import { ThemeKeys } from 'react-json-view';

const Søk = () => {
  const [personIdent, setPersonIdent] = useState<string>('');
  const [antall, setAntall] = useState<string>('1');
  const [retning, setRetning] = useState('DESC');
  const [data, setData] = useState<any[]>();
  const [theme, setTheme] = useState<ThemeKeys>('summerfruit');

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
    <div className={styles.sok}>
      <form
        className={styles.sokForm}
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
        {data && (
          <Select
            size={'small'}
            value={theme}
            label={'Velg tema'}
            onChange={(value) => setTheme(value.target.value as ThemeKeys)}
          >
            {jsonViewerThemes.map((theme, index) => (
              <option key={index} value={theme}>
                {theme}
              </option>
            ))}
          </Select>
        )}
      </form>
      {data && <div className={'padding-m'}>{<JsonViewer src={data} theme={theme} />}</div>}
    </div>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Søk;
