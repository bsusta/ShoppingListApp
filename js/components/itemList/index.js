import React, { Component } from "react";
import { graphql} from "react-apollo";
import {itemsAll,filteredItems} from "./query";
import ItemList from './itemList';


class ItemListLoader extends Component {
  render() {
    if(this.props.navigation.state.params.id=="all"){
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
      return <All id={this.props.navigation.state.params.id} name={this.props.navigation.state.params.name} navigation={this.props.navigation}/>
    }
    const withItems = graphql(filteredItems, {
        options:{
          variables:{
            id:this.props.navigation.state.params.id,
          },
        },
        props: ({ data: { loading, allItems, error, refetch, subscribeToMore } }) => ({
            loadingItems: loading,
            items: allItems,
            itemsError: error,
            refetchItems:refetch,
            subscribeToMoreItems:subscribeToMore,
        }),
    });
    const Filtered=withItems(ItemList);
    return <Filtered id={this.props.navigation.state.params.id} name={this.props.navigation.state.params.name} color={this.props.navigation.state.params.color} navigation={this.props.navigation}/>
  }
}

export default ItemListLoader;
