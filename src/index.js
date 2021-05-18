import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context';
import { LoginProvider } from './components/Context/Authentication'
import { SnackbarProvider } from 'notistack'
import { CartProvider } from './components/Context/Cart'

const httpLink = createHttpLink({
  uri: 'https://meros-master.herokuapp.com/graphql',
});
  
const wsLink = () => {
// Get the authentication token from local storage if it exists
const token = localStorage.getItem('token');
	return new WebSocketLink({
			uri: `wss://meros-master.herokuapp.com/graphql`,
			options: {
			reconnect: true,
			timeout: 30000,
			connectionParams: {
				Authorization: `Bearer ${token}`,
				authToken: token
			}
		}
	});
};

const authLink = setContext(async(_, { headers }) => {
	const token = await localStorage.getItem('token')
	return {
	  headers: {
		...headers,
		authorization: token ? `${token}` : "",
	  }
	}
});

const splitLink = split(
	({ query }) => {
	  const definition = getMainDefinition(query);
	  return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	  );
	},
	wsLink(),
	authLink.concat(httpLink)
  )

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});


ReactDOM.render(
	<ApolloProvider client={client}>
		<SnackbarProvider maxSnack={3}>
			<LoginProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</LoginProvider>
		</SnackbarProvider>
	</ApolloProvider>,
  document.getElementById('root')
);
