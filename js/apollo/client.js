import ApolloClient, { addTypename, createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

// Create regular NetworkInterface by using apollo-client's API:
const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj5l038t8lybv0134z2qfs5kf',
});

// Create WebSocket client
const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj5l038t8lybv0134z2qfs5kf', {
    reconnect: true,
});

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);

// Finally, create your ApolloClient instance with the modified network interface
export default new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
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
