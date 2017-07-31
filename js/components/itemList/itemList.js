import React, { Component } from "react";
import { withApollo } from "react-apollo";
import {itemsSubscription,items, updateItemDone} from "./query";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
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

class ItemList extends Component {
  componentWillMount(){
    this.props.subscribeToMoreItems({
      document: itemsSubscription,
      updateQuery: (prev, recieved) => {

        if(this.props.id!='all'){
          if(recieved.subscriptionData.data.Item.mutation=='DELETED' && !recieved.subscriptionData.data.Item.previousValues.shop || recieved.subscriptionData.data.Item.previousValues.shop.id!=this.props.id){
            return prev;
          }
          if(!recieved.subscriptionData.data.Item.node.shop || recieved.subscriptionData.data.Item.node.shop.id!=this.props.id){
              return prev;
          }
        }
        switch (recieved.subscriptionData.data.Item.mutation) {
          case "DELETED":
          {
            let newItems=[...prev.allItems];
            newItems.splice(prev.allItems.findIndex((element)=>element.id==recieved.subscriptionData.data.Item.previousValues.id),1);
            return Object.assign({},prev,{allItems:newItems});
            break;
          }
          case "CREATED":
          return Object.assign({},prev,{allItems:[recieved.subscriptionData.data.Item.node,...prev.allItems]});
          break;
          case "UPDATED":
          {
            let newItems=[...prev.allItems];
            newItems[newItems.findIndex((element)=>element.id==recieved.subscriptionData.data.Item.node.id)]=recieved.subscriptionData.data.Item.node;
            return Object.assign({},prev,{allItems:newItems});
            break;
          }
          default:
          return prev;
        }
      },
    });
    }

  render() {
    if(this.props.loadingItems){
      return (<ActivityIndicator
          animating size={'large'}
          color='#007299'/>);
    }
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
            renderRow={item =>
              <ListItem thumbnail>
                <Left>

                </Left>
                <Body>
                  <TouchableHighlight transparent onPress={() => this.props.navigation.navigate('EditItem',{item})}>
                    <View>
                      <Text>{item.name}</Text>
                      <Text numberOfLines={1} note>Quantity: {item.quantity}</Text>
                      <Text numberOfLines={1} note>Price/stock: {item.priceQuantity}</Text>
                    </View>
                </TouchableHighlight>
                </Body>
                <Right>
                  <Button transparent block
                  onPress={
                      ()=>{
                        let newDone=!item.done;
                        this.props.client.mutate({
                          mutation: updateItemDone,
                          variables: {
                            done:newDone,id:item.id
                          },
                          optimisticResponse: {
                            updateItem:{
                              done: newDone,
                              __typename:'Item'
                            }
                          },
                          update: (proxy, { data: { updateItem } }) => {
                            let data = proxy.readQuery({ query: items });
                            let index = data.allItems.findIndex((element)=>element.id==item.id);
                            data.allItems[index].done=updateItem.done;
                            proxy.writeQuery({ query: items, data });
                          },
                          });
                      }
                  }
                  >
                    <CheckBox checked={item.done}
                              onPress={
                                  ()=>{
                                    let newDone=!item.done;
                                    this.props.client.mutate({
                                      mutation: updateItemDone,
                                      variables: {
                                        done:newDone,id:item.id
                                      },
                                      optimisticResponse: {
                                        updateItem:{
                                          done: newDone,
                                          __typename:'Item'
                                        }
                                      },
                                      update: (proxy, { data: { updateItem } }) => {
                                        let data = proxy.readQuery({ query: items });
                                        let index = data.allItems.findIndex((element)=>element.id==item.id);
                                        data.allItems[index].done=updateItem.done;
                                        proxy.writeQuery({ query: items, data });
                                      },
                                      });
                                  }
                              }
                    />
                  </Button>
                </Right>
              </ListItem>}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.navigate('AddItem',{id:this.props.id})} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >Add Item</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default withApollo(ItemList);
