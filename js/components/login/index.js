import React, {Component} from "react";
import {View, ActivityIndicator, StatusBar,AsyncStorage, BackHandler} from 'react-native';
import {withApollo, graphql} from 'react-apollo';
import { connect } from 'react-redux';
import { addTokenToUse } from './../../tokens/tokenHandling';

import ItemList from './../itemList/';
import {SUBMIT_ID} from './../../apollo/userId';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Item,
    Label,
    Input,
    Body,
    Left,
    Right,
    Icon,
    Form,
    Text,
    CheckBox
} from "native-base";
import {loginUser,getMe} from "./query";

import styles from "./styles";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: 'test@test.com',
            password: 'test',
            loading: false,
            waitingForToken:true,
            rememberMe:true,
        }
        this.getToken.bind(this);
    }

    componentDidMount(){
      this.getToken();
    }

    async getToken(){
      if(this.props.loggedIn){
        this.setState({waitingForToken:false});
        return;
      }
      let token = await AsyncStorage.getItem('lansystem-graphcool-token');
      if(token){
        try{
          addTokenToUse(this.props.client,token);
          const data = await this.props.client.query({
            query: getMe,
          });
          this.props.saveUser(token=token,id=data.data.user.id,userMail=data.data.user.email);
        }catch(e){
          console.log(e);
        }
      }
      this.setState({waitingForToken:false});
    }

    async submit() {
      this.setState(
            {loading: true}
        );
        let email = this.state.userName;
        let password = this.state.password;
        let client = this.props.client;
        client.mutate({
            mutation: loginUser,
            variables: {email, password}
        }).then((userData)=>{
            addTokenToUse(client,userData.data.signinUser.token,this.state.rememberMe);
            this.props.saveUser(token=userData.data.signinUser.token,id=userData.data.signinUser.user.id,userMail=userData.data.signinUser.user.email);
            this.setState({
                    loading: false
                }
            );
        }

        );
    }

    render() {
        if(this.state.waitingForToken){
          return (<ActivityIndicator
              animating size={'large'}
              color='#007299'/>);
        }
        if(this.props.loggedIn){
          return (<ItemList id='all' name='All' navigation={this.props.navigation}/>);
        }
        return (
            <Container>
            <StatusBar
            backgroundColor="red"
            barStyle="light-content"
            />
                <Content>
                    <Header>
                        <Body>
                        <Title>ShoppingList</Title>
                        </Body>
                    </Header>
                    <Form>
                        <Item inlineLabel>
                            <Label>Username</Label>
                            <Input
                                label="Username"
                                value={this.state.userName}
                                onChangeText={(value) => this.setState({userName: value})}
                            />
                        </Item>
                        <Item inlineLabel last>
                            <Label>Password</Label>
                            <Input
                                label="Password"
                                value={this.state.password}
                                onChangeText={(value) => this.setState({password: value})}
                                secureTextEntry={true}
                            />
                        </Item>
                        <Item inlineLabel last>
                            <Label>Remember me</Label>
                            <CheckBox
                              checked={this.state.rememberMe}
                              onPress={()=>this.setState({rememberMe:!this.state.rememberMe})}
                            />
                        </Item>
                    </Form>
                    <View style={{marginBottom: 80, marginTop: 20}}>
                        <Button
                            block
                            primary
                            style={styles.mb15}
                            onPress={this.submit.bind(this)}
                            disabled={this.state.loading}
                        >
                            {
                                this.state.loading ?
                                    <ActivityIndicator
                                        animating size={'large'}
                                        color='#007299'/> :
                                    <Text>Login</Text>
                            }
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

function bindActions(dispatch) {
    return {
        saveUser: (token,id,userMail) => dispatch({type:SUBMIT_ID,userId:id,token:token,userMail:userMail}),
    };
}

const mapStateToProps = state => ({
  loggedIn:state.userId.userId?true:false
});

export default withApollo((connect(mapStateToProps, bindActions)(Login)));
