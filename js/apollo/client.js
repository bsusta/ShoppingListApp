import ApolloClient, { addTypename, createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj181bsf22crn0189q8au5ijj', {
    reconnect: true,
});

const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj181bsf22crn0189q8au5ijj',
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

export default new ApolloClient({
  networkInterfaceWithSubscriptions,
  addTypename: true,
  queryTransformer: addTypename,
  queryDeduplication: false,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
});
