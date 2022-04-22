import { ApolloClient, InMemoryCache } from "@apollo/client";

export const productsClient = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export const customersClient = new ApolloClient({
  uri: "http://localhost:3010/api/graphql",
  cache: new InMemoryCache(),
});

export const cartClient = new ApolloClient({
  uri: "http://localhost:3020/api/graphql",
  cache: new InMemoryCache(),
});
