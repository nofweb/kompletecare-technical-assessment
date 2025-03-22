import { gql } from '@apollo/client/core';
import { inject, ref } from 'vue';

export const useMedicalRecords = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  // GraphQL Mutation
  const CREATE_MEDICAL_RECORD = gql`
    mutation AddMedicalRecord(
      $investigations: [ID!]!
      $ctscan: String!
      $mri: String!
      $developer: String!
    ) {
      add_medical_record(
        investigations: $investigations
        ctscan: $ctscan
        mri: $mri
        developer: $developer
      ) {
        id
        patient {
          id
          name
          email
        }
        investigations {
          id
          title
          type {
            id
            title
          }
        }
        ctscan
        mri
        created_at
      }
    }
  `;

  // Inject Apollo Client
  const apollo = inject('apollo');
  if (!apollo) {
    throw new Error('Apollo client not found. Ensure the plugin is loaded.');
  }

  // Function to create a medical record
  const createMedicalRecord = async ({
    investigations,
    ctscan,
    mri,
  }: {
    investigations: number[];
    ctscan: string;
    mri: string;
  }) => {
    loading.value = true;
    error.value = null;

    try {
      const token = process.client ? localStorage.getItem('authToken') : null;
      if (!token) {
        throw new Error('No authentication token found.');
      }

      const { data, errors } = await apollo.mutate({
        mutation: CREATE_MEDICAL_RECORD,
        variables: {
          investigations: investigations.map(String), 
          ctscan,
          mri,
          developer: 'Developer', 
        },
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

      return data?.add_medical_record;
    } catch (err: any) {
      error.value = err.message;
      console.error('Error creating medical record:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    createMedicalRecord,
    loading,
    error,
  };
};
