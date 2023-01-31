import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { InternalHeader } from '@/components/InternalHeader/InternalHeader';

interface Props {
  children: ReactElement;
}

export const Layout = (props: Props) => {
  const { children } = props;
  const router = useRouter();

  return (
    <>
      <InternalHeader />
      <div className={'appContainer'}>{children}</div>
    </>
  );
};
