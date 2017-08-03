import React, { Component } from "react";
import { withApollo} from 'react-apollo';
import {deleteShop, updateShop} from './query';
import {Alert} from 'react-native';
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
  Item,
  Input,
  View,
  Footer,
  FooterTab
} from "native-base";
import { ColorPicker , fromHsv } from 'react-native-color-picker';
import styles from "./styles";


class ShopEdit extends Component {
  constructor(props){
      super(props);
      console.log(this.props.navigation.state.params);
      this.state={
          shopColor:this.props.navigation.state.params.color,
          shopName:this.props.navigation.state.params.name,
      };
  }
  submit(){
      this.props.client.mutate({
          mutation: updateShop,
          variables: { name:this.state.shopName, color:this.state.shopColor,id:this.props.navigation.state.params.id},
      });
      this.props.navigation.navigate('ItemList',{name:this.state.shopName,color:this.state.shopColor,id:this.props.navigation.state.params.id});
  }
  deleteShop(){
      Alert.alert(
          'Deleting shop',
          'Are you sure you want to delete this shop?',
          [
              {text: 'Cancel', style: 'cancel'},
              {text: 'OK', onPress: () =>{
                  this.props.client.mutate({
                      mutation: deleteShop,
                      variables: {id:this.props.navigation.state.params.id},
                  });
                  this.props.navigation.navigate('ItemList',{id:'all', name:'All'});
              }},
          ],
          { cancelable: false }
      )



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
            <Title>{'Edit ' +this.props.navigation.state.params.name}</Title>
            </Body>
            <Right />
          </Header>
          <Content style={{ padding: 15,flex:1 }}>
            <Text note>ShopName</Text>
            <View style={{ borderColor: '#CCCCCC', backgroundColor:this.state.shopColor, borderWidth: 0.5, marginBottom: 15 }}>
              <Input
                  value={this.state.shopName}
                  style={{color:'white'}}
                  placeholderTextColor="white"
                  onChangeText={(value)=>this.setState({shopName:value})} />
            </View>

            <View style={{flex: 1, padding: 15, backgroundColor: '#212021',height:200,}}>
              <ColorPicker
                  oldColor={this.props.navigation.state.params.color}
                  color={this.state.shopColor}
                  onColorChange={(color)=>{this.setState({shopColor:fromHsv(color)})}}
                  onColorSelected={(color)=>{this.setState({shopColor:fromHsv(color)})}}
                  onOldColorSelected={(color)=>{this.setState({shopColor:fromHsv(color)})}}
                  style={{flex: 1,height:200,}}
              />
            </View>

            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginTop: 15 }}>
              <Button danger block onPress={this.deleteShop.bind(this)}>
                <Text>Delete shop</Text>
              </Button>
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

export default withApollo(ShopEdit);
