import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import userId from './userId';

export default client => createStore(
	combineReducers({
  apollo: client.reducer(),
  userId,
}),
	{},
	compose(
		applyMiddleware(client.middleware()),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	)
);
