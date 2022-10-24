import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import {
    ApolloLink,
    Observable,
    InMemoryCache,
    ApolloClient,
    HttpLink
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            let handle: any;
            Promise.resolve(operation)
                .then(operation => {
                    const accessToken = localStorage.getItem('token');
                    if (accessToken) {
                        operation.setContext({
                            headers: {
                                authorization: `Bearer ${accessToken}`
                            }
                        });
                    }
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer)
                    });
                })
                .catch(observer.error.bind(observer));

            return () => {
                if (handle) handle.unsubscribe();
            };
        })
);

const tokenRefreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
        const token = localStorage.getItem('token');
        if (!token) return true;

        try {
            const { exp } = jwtDecode<JwtPayload>(token);
            if (Date.now() >= exp! * 1000) return false;
            return true;
        } catch {
            return false;
        }
    },
    fetchAccessToken: () => {
        return fetch('http://localhost:4000/refresh_token', {
            method: 'POST',
            credentials: 'include'
        });
    },
    handleFetch: (accessToken: string) => {
        localStorage.setItem('token', accessToken);
    },
    handleError: (error: Error) => {
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error(error);
    }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log(graphQLErrors);
    console.log(networkError);
});

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql/',
    credentials: 'include'
});

export const client = new ApolloClient({
    link: ApolloLink.from([tokenRefreshLink, requestLink, errorLink, httpLink]),
    cache: new InMemoryCache()
});
