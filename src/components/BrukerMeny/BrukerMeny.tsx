import React from 'react';
import { Dropdown, Header } from '@navikt/ds-react-internal';
import { Link } from '@navikt/ds-react';

interface Props {
  brukerinfo: Brukerinfo;
}

export interface Brukerinfo {
  name: string;
}

export const BrukerMeny = (props: Props) => {
  return (
    <Dropdown>
      <Header.UserButton name={props.brukerinfo.name} as={Dropdown.Toggle} />
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
