import styles from './StatusIcon.module.css';

type Props = {
  data: string | object;
};
const StatusIcon = ({ data }: Props) => {
  if (typeof data !== 'string') {
    return null;
  }
  if (data === 'tombstone') {
    return (
      <span className={styles.statusIcon} title={'Tombstone'}>
        &#9760;
      </span>
    );
  }
  return null;
};

export { StatusIcon };
