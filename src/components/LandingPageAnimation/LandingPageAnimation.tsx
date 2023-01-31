import { ReactNode } from 'react';
import './LandingPageAnimation.module.css';

import styles from './LandingPageAnimation.module.css';

interface Props {
  children: ReactNode;
}

export const LandingPageAnimation = (props: Props) => {
  const { children } = props;
  return (
    <>
      <div className={styles.bg}></div>
      <div className={`${styles.bg} ${styles.bg2}`}></div>
      <div className={`${styles.bg} ${styles.bg3} `}></div>
      <div className={styles.content}>{children}</div>
    </>
  );
};
