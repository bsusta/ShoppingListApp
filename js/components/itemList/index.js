import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import {items, updateItem} from "./query";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  CheckBox,
  View
} from "native-base";

import {ActivityIndicator,TouchableHighlight} from "react-native";

import styles from "./styles";

const withItems = graphql(items, {
    props: ({ data: { loading, allItems, error, refetch, subscribeToMore } }) => ({
        loadingItems: loading,
        items: allItems,
        itemsError: error,
        refetchItems:refetch,
        subscribeToMoreItems:subscribeToMore,
    }),
});

const datas = [
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  },
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  },
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  },
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  },
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  },
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  }
];

class ItemList extends Component {

  render() {
    if(this.props.loadingItems){
      return (<ActivityIndicator
          animating size={'large'}
          color='#007299'/>);
    }
    console.log(this.props);
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Icon name="menu" />
          </Button>
          </Left>
          <Body>
            <Title>ShopName</Title>
          </Body>
          <Right>
            <Button transparent style={{ marginTop: 8 }} onPress={() => this.props.navigation.navigate('Search')}>
              <Icon name="search" style={{ color: 'white' }} />
            </Button>
            <Button transparent style={{ marginTop: 8 }} onPress={() => this.props.navigation.navigate('Login')}>
              <Icon name="power" style={{ color: 'white' }} />
            </Button>
          </Right>
        </Header>

        <Content>
          <List
            dataArray={this.props.items}
            renderRow={data =>
              <ListItem thumbnail>
                <Left>

                </Left>
                <Body>
                  <TouchableHighlight transparent onPress={() => this.props.navigation.navigate('EditItem')}>
                    <View>
                      <Text>{data.name}</Text>
                      <Text numberOfLines={1} note>Quantity: {data.quantity}</Text>
                      <Text numberOfLines={1} note>Price/stock: {data.priceQuantity}</Text>
                    </View>
                </TouchableHighlight>
                </Body>
                <Right>
                  <Button transparent block>
                    <CheckBox checked={data.done}
                              onPress={
                                  ()=>{
                                    let done=!data.done;
                                    console.log(done);
                                      this.props.client.mutate({
                                          mutation: updateItem,
                                          variables: {done,id:data.id},
                                      });
                                  }
                              }
                    />
                  </Button>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default withApollo(withItems(ItemList));
