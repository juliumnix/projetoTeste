import { useParentNavigator } from "../../../hooks/useParentNavigator";
import { RESTModuleStackParamList } from "../types/RESTModuleStackParamList";

const useRESTModuleNavigator = () => {
  return useParentNavigator<"RESTModule", RESTModuleStackParamList>();
};
export { useRESTModuleNavigator };
