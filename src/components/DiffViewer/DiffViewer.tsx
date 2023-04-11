import { Button, Modal } from '@navikt/ds-react';
import { useState } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';

import { ResultatType } from '../../../pages/sok';
import styles from './DiffViewer.module.css';

interface Props {
  leftSide?: ResultatType;
  rightSide?: ResultatType;
  clearAll: Function;
}
interface DiffVisningProps {
  leftSide?: ResultatType;
  rightSide?: ResultatType;
}

const DiffVisning = ({ leftSide, rightSide }: DiffVisningProps) => {
  if (!leftSide || !rightSide) {
    return <div>Mangler dokumenter for å kunne gjøre en diff</div>;
  }
  return (
    <ReactDiffViewer
      oldValue={JSON.stringify(leftSide.record, null, 2)}
      newValue={JSON.stringify(rightSide.record, null, 2)}
      compareMethod={DiffMethod.WORDS}
      leftTitle={
        <div>
          <div>Topic: {leftSide.topic}</div>
          <div>Partition: {leftSide.partition}</div>
          <div>Offset: {leftSide.offset}</div>
        </div>
      }
      rightTitle={
        <div>
          <div>Topic: {rightSide.topic}</div>
          <div>Partition: {rightSide.partition}</div>
          <div>Offset: {rightSide.offset}</div>
        </div>
      }
    />
  );
};

interface SummaryRowProps {
  noekkel: string;
  verdi?: number | string;
}
const SummaryRow = ({ noekkel, verdi }: SummaryRowProps) => (
  <div className={styles.summaryRow}>
    <span className={styles.key}>{noekkel}</span>
    <span className={styles.value}>{verdi}</span>
  </div>
);
const DiffSummary = ({ leftSide, rightSide }: { leftSide?: ResultatType; rightSide?: ResultatType }) => {
  const sider = [
    { side: 'Venstre', object: leftSide },
    { side: 'Høyre', object: rightSide },
  ];
  return (
    <div className={styles.summary}>
      {sider.map((side, index) => (
        <div key={index} className={styles.diffSide}>
          <div className={styles.bold}>{side.side}</div>
          <SummaryRow noekkel={'Topic'} verdi={side.object?.topic} />
          <SummaryRow noekkel={'Partition'} verdi={side.object?.partition} />
          <SummaryRow noekkel={'Offset'} verdi={side.object?.offset} />
        </div>
      ))}
    </div>
  );
};
const DiffViewer = ({ leftSide, rightSide, clearAll }: Props) => {
  const [diffOpen, toggleDiffOpen] = useState<boolean>(false);
  if (!leftSide && !rightSide) {
    return null;
  }

  return (
    <section className={styles.diffContainer}>
      <DiffSummary leftSide={leftSide} rightSide={rightSide} />
      <div className={styles.buttonRow}>
        <Button
          variant={'primary'}
          onClick={() => (leftSide && rightSide ? toggleDiffOpen(true) : null)}
          size={'small'}
        >
          Vis diff
        </Button>
        <Button onClick={() => clearAll()} variant={'secondary'} size={'small'}>
          Lukk
        </Button>
      </div>
      <Modal open={diffOpen} onClose={() => toggleDiffOpen(false)} className={styles.modal}>
        <DiffVisning leftSide={leftSide} rightSide={rightSide} />
      </Modal>
    </section>
  );
};

export { DiffViewer };
