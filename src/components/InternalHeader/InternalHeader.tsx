import { Header } from '@navikt/ds-react-internal';
import useSWR from 'swr';
import { Brukerinfo, BrukerMeny } from '@/components/BrukerMeny/BrukerMeny';

import styles from './InternalHeader.module.css';

export const InternalHeader = () => {
  const { data: brukerInfo } = useSWR<Brukerinfo>('api/user');

  return (
    <Header className={styles.header}>
      <Header.Title href={'/'}>AAP Sink utforsker</Header.Title>
      {brukerInfo && <BrukerMeny brukerinfo={brukerInfo} />}
    </Header>
  );
};
