import { gql } from '@apollo/client/core';
import { inject } from 'vue';

export const useInvestigations = () => {
  const GET_INVESTIGATIONS = gql`
    query GetInvestigations {
      investigations {
        id
        title
        type { 
          id
          title
        }
      }
    }
  `;

  const apollo = inject('apollo');
  if (!apollo) {
    throw new Error('Apollo client not found. Ensure the plugin is loaded.');
  }

  return {
    async fetchInvestigations() {
      try {
        const token = process.client ? localStorage.getItem('authToken') : null;
        if (!token) {
          throw new Error('No authentication token found.');
        }

        const { data, errors } = await apollo.query({
          query: GET_INVESTIGATIONS,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        if (errors) {
          console.error('GraphQL Errors:', errors);
          throw new Error('GraphQL returned errors.');
        }

        return data?.investigations || [];
      } catch (error) {
        console.error('GraphQL Query Error:', error);
        throw error;
      }
    },
  };
};
