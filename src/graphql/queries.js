import {
  ApolloClient,
  gql,
  InMemoryCache
} from '@apollo/client';
import {
  getAccessToken
} from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';
const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   query: { fetchPolicy: 'network-only' },
  //   mutate: { fetchPolicy: 'network-only' },
  //   watchQuery: { fetchPolicy: 'network-only' },
  // }
});

const JOB_DETAIL_FRAGMENT = gql `
  fragment JobDetail on Job {
    id,
    title,
    description,
    company {
      id
      name
    }
  }
`;

const JOB_QUERY = gql `
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export const createJob = async (input) => {
  const mutation = gql `
    mutation createJob($input: CreateJobInput!) {
      job: createJob (input: $input) {
        ...JobDetail
      }
    }
    ${JOB_DETAIL_FRAGMENT}
  `;
  const variables = {
    input
  };
  const context = {
    headers: {
      'Authorization': 'Bearer ' + getAccessToken()
    }
  };
  const {
    data
  } = await client.mutate({
    mutation,
    variables,
    context,
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
}

export const getCompany = async (id) => {
  const query = gql `
    query GetCompany ($id: ID!) {
      company(id: $id) {
        id,
        name,
        description,
        jobs {
          id,
          title,
          description
        }
      }
  }
  `;
  const variables = {
    id
  };
  const {
    data
  } = await client.query({
    query,
    variables
  });

  return data.company;
}

export const getJob = async (id) => {
  const variables = {
    id
  };
  const {
    data
  } = await client.query({
    query: JOB_QUERY,
    variables
  });

  return data.job;
}

export const getJobs = async () => {
  const query = gql `
    query JobsQuery {
      jobs {
        id,
        title,
        description,
        company {
          id
          name
        }
      }
    }
  `;
  const {
    data
  } = await client.query({
    query,
    fetchPolicy: 'network-only'
  });

  return data.jobs;
}