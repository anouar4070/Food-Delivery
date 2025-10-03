"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
//import { ApolloProvider } from "@apollo/client/react";
//import { graphqlClient } from "@/src/graphql/gql.setup";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <ApolloProvider client={graphqlClient}>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    // </ApolloProvider>
  );
}
