import React, { Component } from "react";
import { graphql} from "react-apollo";
import {itemsAll,shopItems} from "./query";
import ItemList from './itemList';
class ItemListLoader extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let params=this.props.navigation.state.params;
    params=params?params:{id:'all',shop:'all',name:'All'};
    if(params.id=="all"){
      const withAllItems = graphql(itemsAll, {
          props: ({ data: { loading, allItems, error, refetch, subscribeToMore } }) => ({
              loadingItems: loading,
              items: allItems,
              itemsError: error,
              refetchItems:refetch,
              subscribeToMoreItems:subscribeToMore,
          }),
      });
      const All=withAllItems(ItemList);
      return <All id={params.id} shop={params.shop} name={params.name} navigation={this.props.navigation}/>
    }
    const withItems = graphql(shopItems, {
        options:{
          variables:{
            id:params.id,
          },
        },
        props: ({ data: { loading, allShops, error, refetch, subscribeToMore } }) => ({
            loadingItems: loading,
            items: allShops?allShops[0].items:allShops,
            itemsError: error,
            refetchItems:refetch,
            subscribeToMoreItems:subscribeToMore,
        }),
    });
    const Filtered=withItems(ItemList);
    return <Filtered id={params.id} shop={params.shop} name={params.name} color={params.color} navigation={this.props.navigation}/>
  }
}

export default ItemListLoader;
