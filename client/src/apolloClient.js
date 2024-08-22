import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "/graphql" // Adjust if your GraphQL endpoint is different
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// eslint-disable-next-line import/no-anonymous-default-export
export default client;
