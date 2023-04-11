import { InternalHeader } from '@/components/InternalHeader/InternalHeader';
import { ReactElement } from 'react';

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
