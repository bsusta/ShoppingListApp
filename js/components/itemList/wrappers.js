import {allItems, allItemsFiltered,shopItems} from './query';
import { graphql, withApollo } from 'react-apollo';

export function withAll(){
  return (graphql(allItems, {
      props: ({ data: { loading, allItems, error, refetch, subscribeToMore } }) => ({
          loadingItems: loading,
          items: allItems,
          itemsError: error,
          refetchItems:refetch,
          subscribeToMoreItems:subscribeToMore,
      }),
  }));
}

export function withAllFiltered(done){
  return (graphql(allItemsFiltered, {
      options:{
        variables:{
          done:done,
        },
      },
      props: ({ data: { loading, allItems, error, refetch, subscribeToMore } }) => ({
          loadingItems: loading,
          items: allItems,
          itemsError: error,
          refetchItems:refetch,
          subscribeToMoreItems:subscribeToMore,
      }),
  }));
}

export function withShop(id){
  return (graphql(shopItems, {
      options:{
        variables:{
          id:id,
        },
      },
      props: ({ data: { loading, allShops, error, refetch, subscribeToMore } }) => ({
          loadingItems: loading,
          items: allShops?allShops[0].items:allShops,
          itemsError: error,
          refetchItems:refetch,
          subscribeToMoreItems:subscribeToMore,
      }),
  }));
}
