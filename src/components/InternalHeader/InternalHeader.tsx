import { BrukerMeny, Brukerinfo } from '@/components/BrukerMeny/BrukerMeny';
import { SystemMeny } from '@/components/systemmeny/SystemMeny';
import { Header } from '@navikt/ds-react-internal';
import useSWR from 'swr';

import styles from './InternalHeader.module.css';

export const InternalHeader = () => {
  const { data: brukerInfo } = useSWR<Brukerinfo>('api/user');

  return (
    <Header className={styles.header}>
      <Header.Title href={'/'}>AAP Sink utforsker</Header.Title>
      <SystemMeny />
      {brukerInfo && <BrukerMeny brukerinfo={brukerInfo} />}
    </Header>
  );
};
