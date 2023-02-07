import type { AppProps } from 'next/app';
import Head from 'next/head';

import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import '../src/styles/index.css';
import { Layout } from '@/components/Layout/Layout';

function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>AAP Sink Utforsker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  );
}

export default App;
