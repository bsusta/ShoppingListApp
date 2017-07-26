# ShoppingListApp

## Create react native app

```sh
$ npm i -g create-react-native-app

$ create-react-native-app ShoppingListApp

$ cd ShoppingListApp

$ yarn start
```
## Install npm modules

### NativeBase
```sh
$ npm install native-base --save

$ react-native link

$ npm install @expo/vector-icons --save
```
Kvoli pouzitiu expa treba nahrať externé fonty pred spustením aplikacie

```sh
export default class App1 extends React.Component {

  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    };
  }

   async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
return(
    this.state.fontLoaded ? (
       <App />
        ) : null
      );
  }
}
```

### REDUX
```sh
$ npm install --save redux

$ npm install --save react-redux
```

### Redux DevTools Extension for REACT

#### Installation for browser

1. For Chrome

	* from Chrome Web Store;
	* or build it with npm i && npm run build:extension and load the extension's folder ./build/extension;
	* or run it in dev mode with npm i && npm start and load the extension's folder ./dev.

#### Installation redux-devtools-extension package from npm

```sh
$ npm install --save-dev remote-redux-devtools@0.5.0
```

https://github.com/jhen0409/remote-redux-devtools-on-debugger

```
$ npm install --save-dev remote-redux-devtools-on-debugger
```

Add command to your project's package.json:
```sh
"scripts": {
  "postinstall": "remotedev-debugger [options]"
}
```

```sh
npm install
```

#### Napojenie devTools na store vzor:
```sh
    const enhancer = compose(
      applyMiddleware(ReduxThunk),
      devTools({
        name: 'manager', realtime: true,
      }),
    );
    const store = createStore(reducers, {}, enhancer);
```

### Dalsie npm moduly

```sh
$ npm install --save lodash

$ npm install --save react-native-modalbox

$ npm install --save react-native-scrollable-tab-view

$ npm install --save react-navigation

$ npm install --save redux-form

$ npm install --save redux-persist

$ npm install --save color

$ npm install react-native-easy-grid --save

$ npm install --save npm install react-native-elements
```

### Vytvorenie adresárov

js
- assets
- components
- themes

### Login graph.cool

$ npm install --save apollo-client
$ npm install --save graphql-tag
$ npm install --save react-apollo
$ npm install --save subscriptions-transport-ws
