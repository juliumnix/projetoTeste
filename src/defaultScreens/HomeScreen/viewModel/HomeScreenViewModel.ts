import { useQuery } from "@tanstack/react-query";
import {
  GraphQLExampleConnector,
  RESTExampleConnector,
} from "../../../services";
import { useCharacterIdStore } from "../../../store/characterIdStore/useCharacterIdStore";
import { Character } from "../model/Character";

const useHomeScreenViewModel = () => {
  const { setID } = useCharacterIdStore();
  const requestByRest = async () => {
    const { data } = await RESTExampleConnector.request<
      Character["characters"]
    >({
      method: "GET",
      url: "/character",
    });
    return data;
  };

  const requestByGraphQL = async () => {
    const { data } = await GraphQLExampleConnector.request<Character>({
      query: `query {
  characters {
    results {
      id
      name
      status
      species
      image
    }
  }
}`,
    });

    return data.characters;
  };
  const { data: dataFromREST } = useQuery({
    queryKey: ["RESTExampleConnector.character"],
    queryFn: requestByRest,
  });

  const { data: dataFromGraphQL } = useQuery({
    queryKey: ["GraphQLExampleConnector.character"],
    queryFn: requestByGraphQL,
  });

  return {
    data: {
      rest: dataFromREST?.results,
      graphQL: dataFromGraphQL?.results,
    },
    setID,
  };
};
export { useHomeScreenViewModel };
