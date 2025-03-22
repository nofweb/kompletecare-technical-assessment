import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const httpLink = createHttpLink({
    uri: `${config.public.apiUrl}graphql`, 
  });

  const authLink = setContext((_, { headers }) => {
    if (process.client) {
      const token = localStorage.getItem('authToken');
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    }
    return { headers };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  nuxtApp.vueApp.provide('apollo', apolloClient);
  nuxtApp.provide('apollo', apolloClient);
});
