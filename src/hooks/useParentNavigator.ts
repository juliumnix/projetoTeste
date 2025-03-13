import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainRoutesParamList } from "../routes/stack/MainRoutes";

const useParentNavigator = <
  OmitFlow extends keyof MainRoutesParamList,
  StackDefault
>() => {
  type FilteredModuleStack = Omit<MainRoutesParamList, OmitFlow>;
  type MergedStack = FilteredModuleStack & StackDefault;

  const navigation = useNavigation<NativeStackNavigationProp<MergedStack>>();
  const route = useRoute();

  const parentNavigation = navigation.getParent<
    "GraphQLModule" | "RESTModule"
  >() as unknown as NativeStackNavigationProp<FilteredModuleStack> | undefined;

  const isModuleScreen = (
    screen: string
  ): screen is keyof FilteredModuleStack =>
    screen in ({} as FilteredModuleStack);

  return {
    navigate: <T extends keyof MergedStack>(
      screen: T,
      params?: MergedStack[T] | any
    ) => {
      if (isModuleScreen(String(screen)) && parentNavigation) {
        return parentNavigation.navigate(screen, params);
      }
      return navigation.navigate(screen, params);
    },
    goBack: () => {
      if (parentNavigation?.canGoBack()) {
        return parentNavigation.goBack();
      }
      return navigation.goBack();
    },
    push: <T extends keyof MergedStack>(
      screen: T,
      params?: MergedStack[T] | any
    ) => {
      if (isModuleScreen(String(screen)) && parentNavigation) {
        return parentNavigation.push(screen, params);
      }
      return navigation.push(screen, params);
    },
    replace: <T extends keyof MergedStack>(
      screen: T,
      params?: MergedStack[T] | any
    ) => {
      if (isModuleScreen(String(screen)) && parentNavigation) {
        return parentNavigation.replace(screen, params);
      }
      return navigation.replace(screen, params);
    },
    reset: (state: any) => {
      if (parentNavigation) {
        return parentNavigation.reset(state);
      }
      return navigation.reset(state);
    },
    setParams: (params: any) => navigation.setParams(params),
    dispatch: (action: any) => {
      if (parentNavigation) {
        return parentNavigation.dispatch(action);
      }
      return navigation.dispatch(action);
    },
    addListener: (
      ...args: Parameters<NativeStackNavigationProp<MergedStack>["addListener"]>
    ) => {
      if (parentNavigation) {
        return (parentNavigation.addListener as any)(...args);
      }
      return navigation.addListener(...args);
    },
    removeListener: (
      ...args: Parameters<
        NativeStackNavigationProp<MergedStack>["removeListener"]
      >
    ) => {
      if (parentNavigation) {
        return (parentNavigation.removeListener as any)(...args);
      }
      return navigation.removeListener(...args);
    },
    isFocused: () => navigation.isFocused(),
    canGoBack: () => {
      if (parentNavigation?.canGoBack()) {
        return parentNavigation.canGoBack();
      }
      return navigation.canGoBack();
    },
    getState: () => {
      if (parentNavigation) {
        return parentNavigation.getState();
      }
      return navigation.getState();
    },

    routes: route.params,
  };
};

export { useParentNavigator };
