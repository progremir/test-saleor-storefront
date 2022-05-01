import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';

import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import '../styles/globals.css'

import { apolloClient } from 'lib/graphql';
import { useCreateCheckoutMutation } from '@/saleor/api';


const Root = ({ Component, pageProps }: AppProps) => {
  const [token, setToken] = useLocalStorage("token");
  const [createCheckout, { data, loading }] = useCreateCheckoutMutation();

  useEffect(() => {
    async function doCheckout() {
      const { data } = await createCheckout();
      const token = data?.checkoutCreate?.checkout?.token;

      setToken(token);
    }

    doCheckout();
  }, []);

  return <Component {...pageProps} token={token} />;
};

export default function MyApp(props: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Root {...props} />
    </ApolloProvider>
  )
}