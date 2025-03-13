import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLAdapter } from "../types/GraphQLAdapter";

export class GraphQLConfig implements GraphQLAdapter {
  apolloClient = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });
}
