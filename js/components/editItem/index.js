import React, { Component } from "react";
import { withApollo, graphql} from 'react-apollo';
import {Alert, ActivityIndicator} from 'react-native';
import {updateItem, deleteItem, shops, shopsSubscription} from './query';
import MultiSelect from 'react-native-multiple-select';
import {
  Container,
  Header,
  Footer,
  FooterTab,
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
  Item,
  Input,
  View,
  Picker
} from "native-base";

import styles from "./styles";

const withShops = graphql(shops, {
    props: ({ data: { loading, allShops, error, refetch, subscribeToMore } }) => ({
        loadingShops: loading,
        shops: allShops,
        refetchShops:refetch,
        subscribeToMoreShops:subscribeToMore,
    }),
});

class EditItem extends Component {
  constructor(props) {
    super(props);
  let item = this.props.navigation.state.params.item;
  console.log(item);
  this.state = {
    name:item.name?item.name:'',
    pricePerStock:item.priceQuantity?item.priceQuantity.toString():'',
    note:item.note?item.note:'',
    quantity:item.quantity?item.quantity.toString():'',
    selectedShops:item.shops,
  };
  console.log(this.state.selectedShops);
 }
componentDidMount(){
  this.props.subscribeToMoreShops({
    document: shopsSubscription,
    updateQuery: () => {
      this.props.refetchShops();
      return;
    },
  });
}

setQuantity(input){
  if(!/^\d*$/.test(input)){
    return;
  }
  if(input[0]=='0'){
    this.setState({quantity:input.substr(1)});
  }
  else{
    this.setState({quantity:input});
  }
}

setPrice(input){
  if(!/^\d*\.?\d{0,2}$/.test(input)){
    return;
  }
  if(input[0]=='0' && !(input.length>1 && input[1]=='.')){
    this.setState({pricePerStock:input.substr(1)});
  }
  else{
    this.setState({pricePerStock:input});
  }
}
  deleteItem(){
    Alert.alert(
      'Deleting item',
      'Are you sure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () =>{
          this.props.client.mutate({
                mutation: deleteItem,
                variables: { id:this.props.navigation.state.params.item.id},
              });
          this.props.navigation.goBack(null);
        }},
      ],
      { cancelable: false }
    );

  }
  submit(){
    let name=this.state.name;
    let priceQuantity=this.state.pricePerStock==''?0:(this.state.pricePerStock[0]=='.'?parseFloat('0'+this.state.pricePerStock):parseFloat(this.state.pricePerStock));
    let note=this.state.note;
    let quantity=parseInt(this.state.quantity==''?0:this.state.quantity);
    let shopsIds=this.state.selectedShops.map((shop)=>shop.id);
    this.props.client.mutate({
          mutation: updateItem,
          variables: { name, priceQuantity, note, quantity,id:this.props.navigation.state.params.item.id,shopsIds},
        });
    this.props.navigation.goBack(null);

  }

  render() {
    if(this.props.loadingShops){
      return (<ActivityIndicator
        animating size={'large'}
        color='#007299'/>);
    }
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="close" />
            </Button>
          </Left>
          <Body>
            <Title>Edit item</Title>
          </Body>
          <Right>
          <Button transparent onPress={this.submit.bind(this)}>
            <Icon active style={{ color: 'white' }} name="ios-checkmark-circle-outline" />
          </Button>
          </Right>
        </Header>
        <Content style={{ padding: 15 }}>

          <Text note>Name</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
             value={this.state.name}
             onChangeText={(value)=>this.setState({name:value})}
            />
          </View>

          <Text note>Price/amount</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              keyboardType='numeric'
              value={this.state.pricePerStock}
              onChangeText={ value => this.setPrice(value) }
            />
          </View>

          <Text note>Quantity</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            keyboardType='numeric'
            value={this.state.quantity}
            onChangeText={ value => this.setQuantity(value) }
            />
          </View>

          <Text note>Note</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            value={this.state.note}
            onChangeText={(value)=>this.setState({note:value})}
          />
          </View>

          <Text note>Shop</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <MultiSelect
            items={this.props.shops}
            uniqueKey="id"
            selectedItemsChange={(selectedItems)=>this.setState({selectedShops:selectedItems})}
            selectedItems={this.state.selectedShops}
            selectText="Pick shops"
            searchInputPlaceholderText="Search Shops..."
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />
        </View>
      </Content>
      <Footer>
        <FooterTab>
          <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5, backgroundColor:'red' }} onPress={this.deleteItem.bind(this)}>
            <Icon active style={{ color: 'white' }} name="trash" />
            <Text style={{ color: 'white' }} >Delete</Text>
          </Button>
        </FooterTab>
        <FooterTab>
          <Button onPress={this.submit.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="ios-checkmark-circle-outline" />
            <Text style={{ color: 'white' }} >Save</Text>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
    );
  }
}

export default withShops(withApollo(EditItem));
