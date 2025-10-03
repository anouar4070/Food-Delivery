import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

console.log(process.env.NEXT_PUBLIC_SERVER_URI);

const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URI,
});

export const graphqlClient = new ApolloClient({
  link, // 👈 required now
  cache: new InMemoryCache(),
});
