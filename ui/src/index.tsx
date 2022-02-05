import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {ApolloClient, ApolloLink, ApolloProvider, concat, HttpLink, InMemoryCache} from '@apollo/client';
import {serverUrl} from './urls';
import {store} from './store';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(
    new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: store.getState().currentUser/*?.jwt*/ || null
        }
      });

      return forward(operation);
    }),
    new HttpLink({uri: `${serverUrl}/graphql`})
  ),
  defaultOptions: {
    query: {fetchPolicy: 'no-cache'},
    mutate: {fetchPolicy: 'no-cache'},
    watchQuery: {fetchPolicy: 'no-cache'}
  }
});


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <App/>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
