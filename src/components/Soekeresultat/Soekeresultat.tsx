import { Table } from '@navikt/ds-react';

import styles from './Soekeresultat.module.css';
import { ResultatType } from '../../../pages/sok';
import { defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { sortData, useHandleSort } from '@/components/Soekeresultat/SoekeresultatUtil';
import { CopyToClipboard } from '@navikt/ds-react-internal';
import { StatusIcon } from './StatusIcon';

const ExpandableContent = ({ data }: { data: string | object }) => {
  if (typeof data === 'string') {
    return <span>{data}</span>;
  }
  return <JsonView data={data} style={defaultStyles} />;
};

interface DataradProps {
  rad: ResultatType;
}
const Datarad = (props: DataradProps) => {
  const { rad } = props;
  return (
    <Table.ExpandableRow content={<ExpandableContent data={rad.record} />}>
      <Table.DataCell>
        <StatusIcon data={rad.record} />
      </Table.DataCell>
      <Table.DataCell>{rad.personident}</Table.DataCell>
      <Table.DataCell>{rad.dtoVersion}</Table.DataCell>
      <Table.DataCell>{rad.partition}</Table.DataCell>
      <Table.DataCell>{rad.offset}</Table.DataCell>
      <Table.DataCell>{rad.topic}</Table.DataCell>
      <Table.DataCell>{rad.timestamp}</Table.DataCell>
      <Table.DataCell>{rad.systemTimeMs}</Table.DataCell>
      <Table.DataCell>{rad.streamTimeMs}</Table.DataCell>
      <Table.DataCell>
        <CopyToClipboard copyText={JSON.stringify(rad.record)} popoverText={'Yeah baby!'} />
      </Table.DataCell>
    </Table.ExpandableRow>
  );
};

interface SoekeresultatProps {
  data: ResultatType[] | undefined;
}

const Soekeresultat = (props: SoekeresultatProps) => {
  const { sort, handleSort } = useHandleSort();

  if (!props.data) {
    return null;
  }

  const sortedData = sortData(props.data, sort);

  return (
    <Table className={styles.resultatTabell} sort={sort} onSortChange={(sortKey) => handleSort(sortKey)}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell />
          <Table.HeaderCell>Personident</Table.HeaderCell>
          <Table.ColumnHeader sortKey={'dtoVersion'} sortable>
            DTO version
          </Table.ColumnHeader>
          <Table.ColumnHeader sortKey={'partition'} sortable>
            Partition
          </Table.ColumnHeader>
          <Table.ColumnHeader sortKey={'offset'} sortable>
            Offset
          </Table.ColumnHeader>
          <Table.ColumnHeader sortKey={'topic'} sortable>
            Topic
          </Table.ColumnHeader>
          <Table.ColumnHeader sortKey={'timestamp'} sortable>
            Timestamp
          </Table.ColumnHeader>
          <Table.ColumnHeader sortKey={'systemTimeMs'} sortable>
            SystemTimeMs
          </Table.ColumnHeader>
          <Table.ColumnHeader sortKey={'streamTimeMs'} sortable>
            StreamTimeMs
          </Table.ColumnHeader>
          <Table.ColumnHeader>Kopier JSON</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedData.map((rad, index) => (
          <Datarad rad={rad} key={index} />
        ))}
      </Table.Body>
    </Table>
  );
};

export { Soekeresultat };
