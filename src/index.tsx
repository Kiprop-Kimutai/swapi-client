import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, InMemoryCache, ApolloClient, NormalizedCacheObject, Reference} from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          People: {
            keyArgs: false,
            merge(existing , incoming) {
              console.log(incoming);
              let People: Reference[] = [];
              if(existing && existing.People) {
                // People = People.concat(existing.People)
              }
              if(incoming && incoming.People) {
                People = People.concat(incoming.People);
              }
              return { ...incoming, People}
            }
          }
        }
      }
    }
  }),
  uri: 'http://104.131.118.153:3500/',
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client = {client}>
      <Router>
        <App/>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
