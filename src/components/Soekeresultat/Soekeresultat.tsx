import { DiffViewer } from '@/components/DiffViewer';
import { sortData, useHandleSort } from '@/components/Soekeresultat/SoekeresultatUtil';
import { ActionType, DiffActions, useDiff } from '@/hooks/useDiff';
import { timestampFromMilliSeconds } from '@/utils/dateUtils';
import { Alert, Button, Table } from '@navikt/ds-react';
import { CopyToClipboard } from '@navikt/ds-react-internal';
import { Dispatch, useState } from 'react';
import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

import { ResultatType } from '../../../pages/sok';
import styles from './Soekeresultat.module.css';
import { StatusIcon } from './StatusIcon';

const ExpandableContent = ({ data }: { data: string | object }) => {
  if (typeof data === 'string') {
    return <span>{data}</span>;
  }
  return <JsonView data={data} style={defaultStyles} />;
};

interface DataradProps {
  rad: ResultatType;
  rowIsInDiff: boolean;
  dispatch: Dispatch<ActionType>;
}
const Datarad = (props: DataradProps) => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const { rad, rowIsInDiff, dispatch } = props;
  const addLeft = () => dispatch({ type: DiffActions.ADD_LEFT, payload: rad });
  const addRight = () => dispatch({ type: DiffActions.ADD_RIGHT, payload: rad });
  return (
    <Table.ExpandableRow
      content={isOpen && <ExpandableContent data={rad.record} />}
      className={rowIsInDiff ? `${styles.inDiff}` : ''}
      open={isOpen}
      onOpenChange={() => toggleOpen(!isOpen)}
    >
      <Table.DataCell>
        <StatusIcon data={rad.record} />
      </Table.DataCell>
      <Table.DataCell>
        <Button variant={'secondary'} onClick={() => addLeft()} size={'small'}>
          V
        </Button>
        <Button variant={'secondary'} onClick={() => addRight()} size={'small'}>
          H
        </Button>
      </Table.DataCell>

      <Table.DataCell>{rad.personident}</Table.DataCell>
      <Table.DataCell>{rad.dtoVersion}</Table.DataCell>
      <Table.DataCell>{rad.partition}</Table.DataCell>
      <Table.DataCell>{rad.offset}</Table.DataCell>
      <Table.DataCell>{rad.topic}</Table.DataCell>
      <Table.DataCell>{timestampFromMilliSeconds(rad.timestamp)}</Table.DataCell>
      <Table.DataCell>{timestampFromMilliSeconds(rad.systemTimeMs)}</Table.DataCell>
      <Table.DataCell>{timestampFromMilliSeconds(rad.streamTimeMs)}</Table.DataCell>
      <Table.DataCell>
        <CopyToClipboard copyText={JSON.stringify(rad.record)} popoverText={'Yeah baby!'} />
      </Table.DataCell>
    </Table.ExpandableRow>
  );
};

interface SoekeresultatProps {
  data: ResultatType[] | undefined;
  partisjonerIResultat: Set<number> | undefined;
  topicFilter: string[];
}

const Soekeresultat = ({ data, partisjonerIResultat, topicFilter }: SoekeresultatProps) => {
  const { diffState, dispatch } = useDiff();
  const { sort, handleSort } = useHandleSort();

  if (!data) {
    return null;
  }
  const filteredData = topicFilter.length > 0 ? data.filter((rad) => topicFilter.includes(rad.topic)) : data;
  const sortedAndFilteredData = sortData(filteredData, sort);

  function radErLik(side: ResultatType, rad: ResultatType) {
    return side.offset === rad.offset && side.partition === rad.partition && side.topic === rad.topic;
  }
  function radErLagtIDiff(rad: ResultatType) {
    if (!diffState.leftSide && !diffState.rightSide) {
      return false;
    }
    let erLik = false;
    if (diffState.leftSide) {
      erLik = radErLik(diffState.leftSide, rad);
    }
    if (diffState.rightSide && !erLik) {
      erLik = radErLik(diffState.rightSide, rad);
    }
    return erLik;
  }

  return (
    <section className={styles.resultatSeksjon}>
      <DiffViewer
        leftSide={diffState.leftSide}
        rightSide={diffState.rightSide}
        clearAll={() => dispatch({ type: DiffActions.CLEAR_ALL })}
      />
      {partisjonerIResultat && partisjonerIResultat.size > 1 && (
        <Alert variant={'error'}>Resultat ligger på følgende partisjoner: {partisjonerIResultat}</Alert>
      )}
      <Table className={styles.resultatTabell} sort={sort} onSortChange={(sortKey) => handleSort(sortKey)}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.ColumnHeader>Diff</Table.ColumnHeader>
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
          {sortedAndFilteredData.map((rad, index) => (
            <Datarad rad={rad} key={index} rowIsInDiff={radErLagtIDiff(rad)} dispatch={dispatch} />
          ))}
        </Table.Body>
      </Table>
    </section>
  );
};

export { Soekeresultat };
