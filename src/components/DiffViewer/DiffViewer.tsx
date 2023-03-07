import { Button, Modal } from '@navikt/ds-react';
import { useState } from 'react';
import { ResultatType } from '../../../pages/sok';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';

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
          <div>Partition: {leftSide.partition}</div>
          <div>Offset: {leftSide.offset}</div>
        </div>
      }
      rightTitle={
        <div>
          <div>Partition: {rightSide.partition}</div>
          <div>Offset: {rightSide.offset}</div>
        </div>
      }
    />
  );
};

const SummaryRow = ({ noekkel, verdi }: { noekkel: string; verdi?: number }) => (
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
      <div className={styles.stickyContainer}>
        <DiffSummary leftSide={leftSide} rightSide={rightSide} />
        <div className={styles.buttonRow}>
          <Button variant={'primary'} onClick={() => (leftSide && rightSide ? toggleDiffOpen(true) : null)}>
            Vis diff
          </Button>
          <Button onClick={() => clearAll()} variant={'secondary'}>
            Lukk
          </Button>
        </div>
      </div>
      <Modal open={diffOpen} onClose={() => toggleDiffOpen(false)} className={styles.modal}>
        <DiffVisning leftSide={leftSide} rightSide={rightSide} />
      </Modal>
    </section>
  );
};

export { DiffViewer };
