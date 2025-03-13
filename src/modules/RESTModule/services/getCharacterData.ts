import { RESTExampleConnector } from "../../../services";
import { CharacterDetail } from "../screens/DetailRESTScreen/Model/CharacterDetail";

const getCharacterData = async (id: string) => {
  const { data } = await RESTExampleConnector.request<
    CharacterDetail["character"]
  >({
    method: "GET",
    url: `/character/${id}`,
  });

  return {
    ...data,
    episode: (data.episode as unknown as string[]).map((url) => ({
      name: url,
    })),
  };
};

export { getCharacterData };
