import { Layout } from '@/components/Layout/Layout';
import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import { Modal } from '@navikt/ds-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr/_internal';

import '../src/styles/globals.css';
import '../src/styles/index.css';

function App(props: AppProps) {
  const { Component, pageProps } = props;

  if (Modal.setAppElement) {
    Modal.setAppElement('#__next');
  }

  return (
    <>
      <Head>
        <title>AAP Sink Utforsker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}>
        <Layout>
          <main>
            <Component {...pageProps} />
          </main>
        </Layout>
      </SWRConfig>
    </>
  );
}

export default App;
