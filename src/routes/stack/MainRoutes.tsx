import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreenView } from '../../defaultScreens/HomeScreen';
import { GraphQLModuleStack } from '../../modules/GraphQLModule';
import { RESTModuleStack } from '../../modules/RESTModule';

export type MainRoutesParamList = {
  HomeScreen: undefined;
  GraphQLModule: undefined;
  RESTModule: undefined;
};

const Stack = createNativeStackNavigator<MainRoutesParamList, 'MainRoutes'>();
const MainRoutes = () => {
  return (
    <Stack.Navigator id="MainRoutes">
      <Stack.Screen name="HomeScreen" component={HomeScreenView} />
      <Stack.Screen name="GraphQLModule" component={GraphQLModuleStack} />
      <Stack.Screen name="RESTModule" component={RESTModuleStack} />
    </Stack.Navigator>
  );
};

export { MainRoutes };
