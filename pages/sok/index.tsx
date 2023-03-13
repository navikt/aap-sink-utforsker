import { Alert, Button, Heading, Radio, RadioGroup, TextField } from '@navikt/ds-react';
import { FormEvent, RefObject, useRef, useState } from 'react';
import { beskyttetSideUtenProps } from '../../auth/beskyttetSide';

import styles from './Sok.module.css';
import { Soekeresultat } from '@/components/Soekeresultat/Soekeresultat';
import { useFetch } from '@/hooks/useFetch';
import { Filters } from '@/components/Filters';

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

function validatePid(pidRef: RefObject<HTMLInputElement>) {
  return pidRef.current?.value.match(/^\d{11}$/);
}

function validateAntall(antallRef: RefObject<HTMLInputElement>) {
  return antallRef.current?.value.match(/^\d+$/);
}

function validateFields(pidRef: RefObject<HTMLInputElement>, antallRef: RefObject<HTMLInputElement>) {
  const pidIsValid = validatePid(pidRef);
  const antallIsValid = validateAntall(antallRef);
  return pidIsValid && antallIsValid;
}
const Søk = () => {
  const pidRef = useRef<HTMLInputElement>(null);
  const antallRef = useRef<HTMLInputElement>(null);
  const retningRef = useRef<HTMLInputElement>(null);
  const [filter, updateFilter] = useState<string[]>([]);

  const { fetchData, data, isLoading, error } = useFetch();

  const partisjonerIResultat = data && new Set(data.map((rad: ResultatType) => rad.partition));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isValid = validateFields(pidRef, antallRef);
    if (isValid) {
      // @ts-ignore -- håndtert i validateFields
      const params = new URLSearchParams({ antall: antallRef.current.value, retning: retningRef.current.value });
      // @ts-ignorehåndtert i validateFields
      fetchData(`api/sok?${params}`, { headers: { personident: pidRef.current.value } });
    }
  }

  return (
    <div className={styles.container}>
      <aside className={styles.soekeverktoey}>
        <form className={styles.sokForm} onSubmit={(e) => handleSubmit(e)}>
          <TextField size={'small'} label={'Personident'} ref={pidRef} />
          <TextField size={'small'} label={'Antall'} defaultValue={'20'} ref={antallRef} />
          <RadioGroup size={'small'} legend={'Hvilken retning?'} defaultValue={'DESC'}>
            <Radio value={'ASC'} ref={retningRef}>
              Stigende
            </Radio>
            <Radio value={'DESC'} ref={retningRef}>
              Synkende
            </Radio>
          </RadioGroup>
          <Button loading={isLoading}>Søk</Button>
        </form>
        {error && <Alert variant={'error'}>Feil ved henting av data. {error}</Alert>}
        <div className={styles.filter}>
          <Heading level={'2'} size={'small'}>
            Filter
          </Heading>
          <Filters data={data} updateFilter={updateFilter} isLoading={isLoading} />
        </div>
      </aside>
      <Soekeresultat data={data} partisjonerIResultat={partisjonerIResultat} topicFilter={filter} />
    </div>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Søk;
