import { useQuery } from "@tanstack/react-query";
import { useCharacterIdStore } from "../../../../../store/characterIdStore/useCharacterIdStore";
import { useRESTModuleNavigator } from "../../../hooks/useRESTModuleNavigator";
import { getCharacterData } from "../../../services/getCharacterData";

const useDetailRESTScreenViewModel = () => {
  const navigation = useRESTModuleNavigator();
  const { id } = useCharacterIdStore();

  const { data: characterData, isLoading } = useQuery({
    queryKey: ["DetailRESTScreen.getCharacterData"],
    queryFn: () => getCharacterData(id),
    enabled: !!id,
  });

  return {
    navigation,
    characterData,
    isLoading,
  };
};

export { useDetailRESTScreenViewModel };
