import { ReactElement } from 'react';
import { InternalHeader } from '@/components/InternalHeader/InternalHeader';

interface Props {
  children: ReactElement;
}

export const Layout = (props: Props) => {
  const { children } = props;

  return (
    <>
      <InternalHeader />
      <div className={'appContainer'}>{children}</div>
    </>
  );
};
