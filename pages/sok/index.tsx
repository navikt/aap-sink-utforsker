import { Alert, Button, Radio, RadioGroup, Select, TextField } from '@navikt/ds-react';
import { useState } from 'react';
import { beskyttetSideUtenProps } from '../../auth/beskyttetSide';
import { jsonViewerThemes } from '@/components/JsonViewer/JsonViewer';

import styles from './Sok.module.css';
import { ThemeKeys } from 'react-json-view';
import { Soekeresultat } from '@/components/Soekeresultat/Soekeresultat';
import { useFetch } from '@/hooks/useFetch';

export interface ResultatType {
  personident: string;
  dtoVersion?: string;
  partition: number;
  offset: number;
  topic: string;
  timestamp: number;
  systemTimeMs: number;
  streamTimeMs: number;
  record: Object;
}

const Søk = () => {
  const [personIdent, setPersonIdent] = useState<string>('');
  const [antall, setAntall] = useState<string>('1');
  const [retning, setRetning] = useState('DESC');
  const [theme, setTheme] = useState<ThemeKeys>('apathy:inverted');

  const params = new URLSearchParams({
    antall,
    retning,
  });
  const { fetchData, data, isLoading, error } = useFetch(`api/sok?${params}`, {
    headers: { personident: personIdent },
  });

  return (
    <div className={styles.sok}>
      <form
        className={styles.sokForm}
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
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
        <Button loading={isLoading}>Søk</Button>
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
      {error && <Alert variant={'error'}>Feil ved henting av data. {error}</Alert>}
      <Soekeresultat data={data} theme={theme} />
    </div>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Søk;
