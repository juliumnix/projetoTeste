import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailRESTScreenView } from "../screens/DetailRESTScreen/View/DetailRESTScreenView";
import { RESTModuleStackParamList } from "../types/RESTModuleStackParamList";

const Stack = createNativeStackNavigator<
  RESTModuleStackParamList,
  "RESTModuleStack"
>();

const RESTModuleStack = () => {
  return (
    <Stack.Navigator id="RESTModuleStack">
      <Stack.Screen name="DetailRESTScreen" component={DetailRESTScreenView} />
    </Stack.Navigator>
  );
};
export { RESTModuleStack };
