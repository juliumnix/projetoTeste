import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainRoutes } from "./src/routes/stack/MainRoutes";
import { GraphQLExampleConnector } from "./src/services";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ApolloProvider client={GraphQLExampleConnector.getGraphQLClient()}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MainRoutes />
        </NavigationContainer>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
