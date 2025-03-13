import { GraphQLExampleConnector } from "../../../services";
import { CharacterDetail } from "../screens/DetailGraphQLScreen/model/CharacterDetail";

const getCharacterData = async (id: string) => {
  const { data } = await GraphQLExampleConnector.request<CharacterDetail>({
    query: `query {
  character(id: ${id}){
    name
    image
    episode{
      name
    }
  }
}`,
  });
  return data.character;
};

export { getCharacterData };
