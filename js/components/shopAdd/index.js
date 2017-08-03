import React, { Component } from "react";
import { ColorPicker , fromHsv } from 'react-native-color-picker';
import { View, Text } from 'react-native';
import { withApollo} from 'react-apollo';
import {createShop} from "./query"
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,

  Thumbnail,
  Left,
  Body,
  Right,
  CheckBox,
  Item,
  Input,

  Footer,
  FooterTab
} from "native-base";

import styles from "./styles";


class ShopAdd extends Component {
  constructor(props){
    super(props);
    this.state={
      shopColor:'#0000ff',
      shopName:'',
    };
  }
  submit(){
  let color = this.state.shopColor;
  let name = this.state.shopName;
    this.props.client.mutate({
        mutation: createShop,
        variables: { name, color},
    });
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Add Shop</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 15,flex:1 }}>
          <Text note>ShopName</Text>
          <View style={{ borderColor: '#CCCCCC', backgroundColor:this.state.shopColor, borderWidth: 0.5, marginBottom: 15 }}>
            <Input
                value={this.state.shopName}
                placeholder='Shop name'
                style={{color:'white'}}
                placeholderTextColor="white"
                onChangeText={(value)=>this.setState({shopName:value})} />
          </View>

          <View style={{flex: 1, padding: 15, backgroundColor: '#212021',height:200,}}>
            <ColorPicker
                oldColor={this.state.ShopColor}
                color={this.state.shopColor}
                onColorChange={(color)=>{this.setState({shopColor:fromHsv(color)})}}
                onColorSelected={(color)=>{this.setState({shopColor:fromHsv(color)})}}
                onOldColorSelected={(color)=>{this.setState({shopColor:fromHsv(color)})}}
                style={{flex: 1,height:200,}}
            />
          </View>



        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.goBack()} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="remove" />
              <Text style={{ color: 'white' }} >Cancel</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={this.submit.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >Save</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default withApollo(ShopAdd);
