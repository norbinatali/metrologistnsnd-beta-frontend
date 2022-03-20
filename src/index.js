import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
import { SnackbarProvider } from 'notistack';
const httpLink = createHttpLink({
    uri: 'https://metrologistnsnd-beta-backend.herokuapp.com', credentials: "include"
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});
const linkError = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),linkError,
    });
export default client;

const Wrapper = ()=>(
    <ApolloProvider client={client}>

            <SnackbarProvider>
                <App />
            </SnackbarProvider>

    </ApolloProvider>
)
ReactDOM.render(
    <Wrapper/>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

