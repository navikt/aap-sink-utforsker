import { Dropdown, Header } from '@navikt/ds-react-internal';
import { Link } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { func } from 'prop-types';

interface Brukerinfo {
  name: string;
}

const Brukermeny = ({ brukerinfo }: { brukerinfo: Brukerinfo }): JSX.Element => {
  return (
    <Dropdown>
      <Header.UserButton name={brukerinfo.name} as={Dropdown.Toggle} />
      <Dropdown.Menu>
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item>
            <Link href={'/oauth2/logout'}>Logg ut</Link>
          </Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const InternalHeader = () => {
  const [brukerInfo, setBrukerInfo] = useState<Brukerinfo | undefined>();

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch('api/user');
      if (response.ok) {
        const brukerinfo = await response.json();
        setBrukerInfo(brukerinfo);
      }
    }
  }, []);

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Header.Title href={'/'}>AAP Sink utforsker</Header.Title>
      {brukerInfo && <Brukermeny brukerinfo={brukerInfo} />}
    </Header>
  );
};
