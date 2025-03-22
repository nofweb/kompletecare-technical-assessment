import { gql } from '@apollo/client/core';
import { inject } from 'vue';

export const useAuth = () => {
  const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password)
    }
  `;

  const apollo = inject('apollo');
  if (!apollo) {
    throw new Error('Apollo client not found.');
  }

  return {
    async login(email: string, password: string) {
      try {
        const { data, errors } = await apollo.mutate({
          mutation: LOGIN_MUTATION,
          variables: { email, password },
        });

        if (errors) {
          console.error('GraphQL Errors:', errors);
          throw new Error('GraphQL returned errors.');
        }

        const token = data?.login;
        if (!token) {
          throw new Error('No token received.');
        }

        if (process.client) {
          localStorage.setItem('authToken', token);
        }

        return token;
      } catch (error) {
        console.error('Login Error:', error);
        throw error;
      }
    },
  };
};
