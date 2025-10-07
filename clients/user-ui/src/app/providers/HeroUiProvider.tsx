"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client/react/react.cjs";
import { SessionProvider } from "next-auth/react";
import { graphqlClient } from "@/src/graphql/gql.setup";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <SessionProvider>
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
