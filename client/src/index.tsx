import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import store from 'store';
import App from './App';
import { client } from './apolloConfig';

const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <App />
                    </Router>
                </PersistGate>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>
);
