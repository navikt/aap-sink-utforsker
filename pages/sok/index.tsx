import { Search } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

const Søk = () => {
  const [value, setValue] = useState<string>();
  const [data, setData] = useState();

  useEffect(() => {
    fetch('api/?antall=1&retning=DESC', {
      method: 'GET',
      headers: {
        personident: '11457841185',
        accept: 'application/json',
      },
    }).then((res) => res.json().then((data) => setData(data)));
  }, []);

  console.log(data);

  return (
    <div>
      <Search label={'Skriv inn noe her'} onChange={(e) => setValue(e)} variant={'simple'} />
      <h2>{value}</h2>
    </div>
  );
};

export default Søk;
