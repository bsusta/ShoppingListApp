# ShoppingListApp

## Create react native app

$ npm i -g create-react-native-app
$ create-react-native-app ShoppingListApp
$ cd ShoppingListApp
$ yarn start

## Install npm modules

### NativeBase
$ npm install native-base --save
$ react-native link

### REDUX
$ npm install --save redux
$ npm install --save react-redux


### Redux DevTools Extension for REACT

#### Installation for browser

1. For Chrome

	* from Chrome Web Store;
	* or build it with npm i && npm run build:extension and load the extension's folder ./build/extension;
	* or run it in dev mode with npm i && npm start and load the extension's folder ./dev.

#### Installation redux-devtools-extension package from npm

$ npm install --save-dev remote-redux-devtools@0.5.0

https://github.com/jhen0409/remote-redux-devtools-on-debugger

$ npm install --save-dev remote-redux-devtools-on-debugger

Add command to your project's package.json:

"scripts": {
  "postinstall": "remotedev-debugger [options]"
}

npm install

#### Napojenie devTools na store vzor:

    const enhancer = compose(
      applyMiddleware(ReduxThunk),
      devTools({
        name: 'manager', realtime: true,
      }),
    );
    const store = createStore(reducers, {}, enhancer);
