import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '@/components/Layout/Layout';

import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import '../src/styles/index.css';
import '../src/styles/globals.css';

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
