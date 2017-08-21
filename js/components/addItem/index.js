import React, { Component } from "react";
import { withApollo, graphql} from 'react-apollo';
import {Alert, ActivityIndicator,TouchableHighlight, StatusBar, Modal} from 'react-native';
import {shops, shopsSubscription, createItem} from './query';
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

class AddItem extends Component {
  constructor(props) {
    super(props);
  this.state = {
    name:'',
    pricePerStock:'',
    note:'',
    quantity:'',
    modalShops:false,
    shops:this.props.navigation.state.params.id=='all'?[]:[this.props.navigation.state.params.shop],
  };
  this.setShop.bind(this);
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
  submit(){
    let name=this.state.name;
    let priceQuantity=this.state.pricePerStock==''?0:(this.state.pricePerStock[0]=='.'?parseFloat('0'+this.state.pricePerStock):parseFloat(this.state.pricePerStock));
    let note=this.state.note;
    let quantity=parseInt(this.state.quantity==''?0:this.state.quantity);
    let shopsIds=this.state.shops.map((shop)=>shop.id);
    this.props.client.mutate({
          mutation: createItem,
          variables: { name, priceQuantity, note, quantity,shopsIds},
        });
    this.props.navigation.goBack(null);

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
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Add item</Title>
          </Body>
          <Right />
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
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={this.submit.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="add" />
            <Text style={{ color: 'white' }} >Add</Text>
          </Button>
        </FooterTab>
      </Footer>
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
    </Container>
    );
  }
}

export default withShops(withApollo(AddItem));
