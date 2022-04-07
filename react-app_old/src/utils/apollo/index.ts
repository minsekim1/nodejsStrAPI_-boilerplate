import { createHttpLink } from '@apollo/client';

export const API_URL_GRAPH = 'http://localhost:1337/graphql';

export const httpLink = createHttpLink({
  uri: API_URL_GRAPH,
});
