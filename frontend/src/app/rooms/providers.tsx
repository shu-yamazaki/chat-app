// subscriptionはwsで、queryとmutationはhttpに振り分けるためのコンポーネント
// UIは持たないが配下のコンポーネントにApolloProviderを提供しGraphQLの機能を使えるようにする

"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  ApolloProvider,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// クエリとミューテーションがhttpで通信するための設定
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP ?? "http://localhost:3000/graphql",
  credentials: "omit",
});

// サブスクリプションがwsで通信するための設定。切れづらく無駄に繋がらないように。
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url:
            process.env.NEXT_PUBLIC_GRAPHQL_WS ?? "ws://localhost:3000/graphql",
          lazy: true,
          keepAlive: 20000,
          retryAttempts: 5,
        })
      )
    : null;

// サブスクリプションはws、queryとmutationはhttpに振り分ける
const link = wsLink
  ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === "OperationDefinition" && def.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

//
const client = new ApolloClient({ link, cache: new InMemoryCache() });

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
