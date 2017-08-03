/* @flow */

import React from "react";
import { ApolloProvider } from 'react-apollo';
import createStore from './apollo/';
import client from './apollo/client';
import AppNavigator from './AppNavigator';

export default() => {
  const store = createStore(client);
  return (
    <ApolloProvider client={client} store={store}>
      <AppNavigator/>
    </ApolloProvider>
  );
}
