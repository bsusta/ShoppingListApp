import React, { Component } from "react";
import { withApollo } from "react-apollo";
import {Alert, BackHandler} from 'react-native';
import {itemsSubscription, updateItemDone,deleteItem} from "./query";

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
  constructor(props){
    super(props);
    this.state={zmena:false};
  }
  componentWillMount(){
    this.props.subscribeToMoreItems({
      document: itemsSubscription,
      updateQuery: (prev, recieved) => {
        this.props.refetchItems();
        return;
        switch (recieved.subscriptionData.data.Item.mutation) {
          case "DELETED":
          {
            let newItems=[...prev.allItems];
            let index=prev.allItems.findIndex((element)=>element.id==recieved.subscriptionData.data.Item.previousValues.id);
            if(index==-1){
              return prev;
            }
            newItems.splice(index,1);
            return Object.assign({},prev,{allItems:newItems});
            break;
          }
          case "CREATED":
          if(this.props.id=='all' || (recieved.subscriptionData.data.Item.node.shop&&recieved.subscriptionData.data.Item.node.shop.id==this.props.id) ){
            return Object.assign({},prev,{allItems:[recieved.subscriptionData.data.Item.node,...prev.allItems]});
          }
          return prev;
          break;
          case "UPDATED":
          {
            let newItems=[...prev.allItems];
            let index=prev.allItems.findIndex((element)=>element.id==recieved.subscriptionData.data.Item.node.id);
            if(index!=-1 && recieved.subscriptionData.data.Item.node.shop && recieved.subscriptionData.data.Item.node.shop.id!=this.props.id && this.props.id!='all'){
              newItems.splice(index,1);
            }
            else if(index==-1 && recieved.subscriptionData.data.Item.node.shop && recieved.subscriptionData.data.Item.node.shop.id==this.props.id && this.props.id!='all'){
              newItems=[recieved.subscriptionData.data.Item.node,...newItems];
            }
            else if(index!=-1 && (this.props.id=='all'||(recieved.subscriptionData.data.Item.node.shop && recieved.subscriptionData.data.Item.node.shop.id==this.props.id))){
              newItems[index]=recieved.subscriptionData.data.Item.node;
            }
            return Object.assign({},prev,{allItems:newItems});
            break;
          }
          default:
          return prev;
        }
      },
    });
    }

    deleteItem(id){
      Alert.alert(
        'Deleting item',
        'Are you sure?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () =>{
            this.props.client.mutate({
                  mutation: deleteItem,
                  variables: { id},
                optimisticResponse: {
                  deleteItem:{
                    id: id,
                    __typename:'Item'
                  }
                },
                update: (proxy, data) => {
                  let queryData = proxy.readQuery({ query: this.props.sourceQuery });
                  if(this.props.color){
                    let index = queryData.allShops[0].items.findIndex((element)=>element.id==data.data.deleteItem.id);
                    queryData.allShops[0].items.splice(index,1);
                  }
                  else{
                    let index = queryData.allItems.findIndex((element)=>element.id==data.data.deleteItem.id);
                    queryData.allItems.splice(index,1);
                  }
                  proxy.writeQuery({ query: this.props.sourceQuery,data: queryData });
                },
              });
          }},
        ],
        { cancelable: false }
      );
    }

  render() {
    if(this.props.loadingItems){
      return (<ActivityIndicator
          animating size={'large'}
          color='#007299'/>);
    }
      return (
      <Container style={styles.container}>
        <Content>
          <List
            dataArray={([...this.props.items]).filter((item)=>this.props.itemDone==undefined||(this.props.itemDone==item.done)).sort((a,b)=>a.createdAt<b.createdAt?1:a.createdAt==b.createdAt?0:-1)}
            renderRow={item =>
              <ListItem thumbnail>
                <Left>
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
                                        let data = proxy.readQuery({ query: this.props.sourceQuery });
                                        if(this.props.color){
                                          let index = data.allShops[0].items.findIndex((element)=>element.id==item.id);
                                          data.allShops[0].items[index].done=updateItem.done;
                                        }
                                        else{
                                          let index = data.allItems.findIndex((element)=>element.id==item.id);
                                          data.allItems[index].done=updateItem.done;
                                        }
                                        proxy.writeQuery({ query: this.props.sourceQuery, data });
                                        this.setState={}
                                      },
                                      });
                                  }
                              }
                    />
                </Left>
                <Body>
                <TouchableHighlight transparent onPress={() => this.props.navigation.navigate('EditItem',{item})}>
                  <View style={{paddingLeft:10}}>
                    <Text>{item.name}</Text>
                    <Text numberOfLines={1} note>Quantity: {item.quantity}</Text>
                    <Text numberOfLines={1} note>Price/stock: {item.priceQuantity}</Text>
                  </View>
                </TouchableHighlight>
                </Body>

                <Right>
                  <Button transparent primary onPress={() => this.deleteItem(item.id)}  iconLeft style={{backgroundColor:'white' }}>
                    <Icon active style={{ color: '#3F51B5' }} name="trash" />
                  </Button>
                </Right>
              </ListItem>}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.navigate('AddItem',{id:this.props.id,shop:this.props.shop})} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
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
