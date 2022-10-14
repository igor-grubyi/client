import { COMPANY_QUERY, CREATE_JOB_MUTATION, JOBS_QUERY, JOB_QUERY } from '../graphql/queries.js';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { getAccessToken } from '../auth.js';

export const useJobs = () => {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: 'network-only'
  });

  return {
    jobs: data?.jobs,
    loading,
    error,
  }
}

export const useJob = (id) => {
  const variables = {
    id,
  };

  const { data, loading, error } = useQuery(JOB_QUERY, {
    fetchPolicy: 'network-only',
    variables,
  });

  return {
    job: data?.job,
    loading,
    error,
  }
}

export const useCompany = (id) => {
  const variables = { id };

  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    fetchPolicy: 'network-only',
    variables,
  });

  return {
    company: data?.company,
    loading,
    error,
  }
}

export const useCreateCompany = () => {
  const [mutate, result] = useMutation(CREATE_JOB_MUTATION);

  return {
    createJob: async (input) => {
      const variables = { input };
      const context = {
        headers: { 'Authorization': 'Bearer ' + getAccessToken() }
      };

      const { data } = await mutate({
        context,
        variables,
        // in this code we wont to save responce to cache directly to not call getJob again 
        update: (cache, {
          data
        }) => {
          cache.writeQuery({
            query: JOB_QUERY,
            variables: {
              id: data.job.id
            },
            data
          })
        }
      });

      return data.job;
    },
    result
  }
}