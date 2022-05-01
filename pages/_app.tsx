import type { AppProps } from 'next/app'

import { ApolloProvider } from '@apollo/client';

import '../styles/globals.css'

import { apolloClient } from 'lib/graphql';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}