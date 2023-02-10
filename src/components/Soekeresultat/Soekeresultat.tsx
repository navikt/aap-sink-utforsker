import { Table } from '@navikt/ds-react';

import styles from './Soekeresultat.module.css';
import { ResultatType } from '../../../pages/sok';
import { defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

interface DataradProps {
  rad: ResultatType;
}
const Datarad = (props: DataradProps) => {
  const { rad } = props;
  return (
    <Table.ExpandableRow content={<JsonView data={rad.record} style={defaultStyles} />}>
      <Table.DataCell>{rad.personident}</Table.DataCell>
      <Table.DataCell>{rad.dtoVersion}</Table.DataCell>
      <Table.DataCell>{rad.partition}</Table.DataCell>
      <Table.DataCell>{rad.offset}</Table.DataCell>
      <Table.DataCell>{rad.topic}</Table.DataCell>
      <Table.DataCell>{rad.timestamp}</Table.DataCell>
      <Table.DataCell>{rad.systemTimeMs}</Table.DataCell>
      <Table.DataCell>{rad.streamTimeMs}</Table.DataCell>
    </Table.ExpandableRow>
  );
};

interface SoekeresultatProps {
  data: ResultatType[] | undefined;
}
const Soekeresultat = (props: SoekeresultatProps) => {
  if (!props.data) {
    return null;
  }
  return (
    <Table className={styles.resultatTabell}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Personident</Table.HeaderCell>
          <Table.HeaderCell>DTO version</Table.HeaderCell>
          <Table.HeaderCell>Partition</Table.HeaderCell>
          <Table.HeaderCell>Offset</Table.HeaderCell>
          <Table.HeaderCell>Topic</Table.HeaderCell>
          <Table.HeaderCell>Timestamp</Table.HeaderCell>
          <Table.HeaderCell>SystemTimeMs</Table.HeaderCell>
          <Table.HeaderCell>StreamTimeMs</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.data.map((rad, index) => (
          <Datarad rad={rad} key={index} />
        ))}
      </Table.Body>
    </Table>
  );
};

export { Soekeresultat };
