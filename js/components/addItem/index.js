import React, { Component } from "react";
import { withApollo, graphql} from 'react-apollo';
import {Alert, ActivityIndicator} from 'react-native';
import {shops, shopsSubscription, createItem} from './query';
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
    shop:this.props.navigation.state.params.id=='all'?null:this.props.navigation.state.params.id,
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
  submit(){
    let name=this.state.name;
    let priceQuantity=this.state.pricePerStock==''?0:(this.state.pricePerStock[0]=='.'?parseFloat('0'+this.state.pricePerStock):parseFloat(this.state.pricePerStock));
    let note=this.state.note;
    let quantity=parseInt(this.state.quantity==''?0:this.state.quantity);
    let shopId=this.state.shop?this.state.shop:null;
    this.props.client.mutate({
          mutation: createItem,
          variables: { name, priceQuantity, note, quantity,shopId},
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
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Edit item</Title>
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
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.shop}
              onValueChange={(value)=>{this.setState({shop:value})}}>
              {
                [{name:'None',value:null,key:null}].concat(this.props.shops).map((shop)=><Item label={shop.name} value={shop.id} key={shop.key} />)
              }
          </Picker>
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
      </Container>
    );
  }
}

export default withShops(withApollo(AddItem));
