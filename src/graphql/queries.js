import {
  ApolloClient,
  gql,
  InMemoryCache
} from '@apollo/client';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export const client = new ApolloClient({
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

export const JOB_QUERY = gql `
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export const JOBS_QUERY = gql `
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

export const COMPANY_QUERY = gql `
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

export const CREATE_JOB_MUTATION = gql `
  mutation createJob($input: CreateJobInput!) {
    job: createJob (input: $input) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;
