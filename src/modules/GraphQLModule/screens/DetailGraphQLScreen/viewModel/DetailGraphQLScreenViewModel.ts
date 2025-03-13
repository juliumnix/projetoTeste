import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useCharacterIdStore } from "../../../../../store/characterIdStore/useCharacterIdStore";
import { useGraphQLModuleNavigator } from "../../../hooks/useGraphQLModuleNavigator";
import { getCharacterData } from "../../../services/getCharacterData";

const useDetailGraphQLScreenViewModel = () => {
  const navigation = useGraphQLModuleNavigator();
  const defaultNavigation = useNavigation<any>();
  const { id } = useCharacterIdStore();

  const { data: characterData, isLoading } = useQuery({
    queryKey: ["DetailGraphQLScreenView.getCharacterData"],
    queryFn: () => getCharacterData(id),
    enabled: !!id,
  });

  return {
    navigation,
    defaultNavigation,
    characterData,
    isLoading,
  };
};
export { useDetailGraphQLScreenViewModel };
