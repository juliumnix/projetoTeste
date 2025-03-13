import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailGraphQLScreenView } from "../screens/DetailGraphQLScreen/view/DetailGraphQLScreenView";
import { GraphQLModuleStackParamList } from "../types/GraphQLModuleStackParamList";

const Stack = createNativeStackNavigator<
  GraphQLModuleStackParamList,
  "GraphQLModuleStack"
>();

const GraphQLModuleStack = () => {
  return (
    <Stack.Navigator id="GraphQLModuleStack">
      <Stack.Screen
        name="DetailGraphQLScreen"
        component={DetailGraphQLScreenView}
      />
    </Stack.Navigator>
  );
};
export { GraphQLModuleStack };
