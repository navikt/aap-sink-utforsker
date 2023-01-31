import { Search, Table } from '@navikt/ds-react';
import { useState } from 'react';

const Søk = () => {
  const [value, setValue] = useState<string>();

  return (
    <div>
      <Search label={'Skriv inn noe her'} onChange={(e) => setValue(e)} variant={'simple'} />
      <h2>{value}</h2>
    </div>
  );
};

export default Søk;
