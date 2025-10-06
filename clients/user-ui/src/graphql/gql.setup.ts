import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import Cookies from "js-cookie";

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      accesstoken: Cookies.get("access_token"),
      refreshtoken: Cookies.get("refresh_token"),
    },
  });
  return forward(operation);
});

console.log(process.env.NEXT_PUBLIC_SERVER_URI);

const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URI,
});

export const graphqlClient = new ApolloClient({
  link, // 👈 required now
  cache: new InMemoryCache(),
});
