import React, { Component } from "react";
import { withApollo, graphql} from 'react-apollo';
import {Alert, ActivityIndicator,Modal} from 'react-native';
import {updateItem, deleteItem, shops, shopsSubscription} from './query';
import Shop from './shop';
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
  this.state = {
    name:item.name?item.name:'',
    pricePerStock:item.priceQuantity?item.priceQuantity.toString():'',
    note:item.note?item.note:'',
    quantity:item.quantity?item.quantity.toString():'',
    modalShops:false,
    shops:item.shops,

  };
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
setShop(removing,shop){
  if(removing){
    let index=this.state.shops.findIndex((item)=>item.id==shop.id);
    if(index==-1){
      return;
    }
    let newShops=[...this.state.shops];
    newShops.splice(index,1);
    this.setState({shops:newShops});
  }
  else{
    let index=this.state.shops.findIndex((item)=>item.id==shop.id);
    if(index==-1){
      this.setState({shops:[...this.state.shops,shop]});
    }
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
    let shopsIds=this.state.shops.map((shop)=>shop.id);
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
          <Button block
            onPress={()=>{this.setState({modalShops:true})}}
          ><Text>Select shops</Text></Button>
          <List
            dataArray={this.state.shops}
            renderRow={shop =>
              <ListItem>
                <View style={{backgroundColor:shop.color,paddingLeft:10}}>
                  <Text style={{color:'white'}}>{shop.name}</Text>
                </View>
              </ListItem>
              }
          />
        </View>
          <Modal
            animationType={"fade"}
            transparent={false}
            style={{flex:1}}
            visible={this.state.modalShops}
            onRequestClose={() => this.setState({modalShops:false})}
            >
            <Content style={{ padding: 15 }}>
            <Header>
              <Body>
                <Title>Select shops</Title>
              </Body>
            </Header>

           <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
             <List
               dataArray={this.props.shops}
               renderRow={item =>
                 <Shop item={item} setShop={this.setShop.bind(this)} selected={this.state.shops.some((shop)=>item.id==shop.id)}/>
                 }
             />
           </View>

          </Content>
          <Footer>

            <FooterTab>
              <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                onPress={()=>this.setState({modalShops:false})}>
                <Text style={{ color: 'white' }}>DONE</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Modal>
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
