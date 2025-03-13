import { useParentNavigator } from "../../../hooks/useParentNavigator";
import { GraphQLModuleStackParamList } from "../types/GraphQLModuleStackParamList";

const useGraphQLModuleNavigator = () => {
  return useParentNavigator<"GraphQLModule", GraphQLModuleStackParamList>();
};

export { useGraphQLModuleNavigator };
