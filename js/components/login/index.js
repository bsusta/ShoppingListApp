import React, {Component} from "react";
import {View, ActivityIndicator, StatusBar} from 'react-native';
import {withApollo, graphql} from 'react-apollo';
import { connect } from 'react-redux';
import { addTokenToUse } from './../../tokens/tokenHandling';


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
    Text
} from "native-base";
import {loginUser} from "./query";

import styles from "./styles";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: 'test@test.com',
            password: 'test',
            loading: false,
        }
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
            addTokenToUse(client,userData.data.signinUser.token);
            this.props.saveUser(userData.data.signinUser.token,userData.data.signinUser.user.id);
            this.setState({
                    loading: false
                }
            );
            this.props.navigation.navigate('ItemList');
        }

        );


    }

    render() {
        return (
            <Container>
                <StatusBar barStyle="light-content"/>
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
        saveUser: (userId,token) => dispatch({type:SUBMIT_ID,userId:userId,token:token}),
    };
}

const mapStateToProps = state => ({
});

export default withApollo((connect(mapStateToProps, bindActions)(Login)));


