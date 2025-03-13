import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDetailGraphQLScreenViewModel } from "../viewModel/DetailGraphQLScreenViewModel";

const WIDTH = Dimensions.get("screen").width;

const DetailGraphQLScreenView = () => {
  const { characterData, isLoading, navigation } =
    useDetailGraphQLScreenViewModel();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RESTModule");
        }}
      >
        <Text>Navegando com o ParentNavigator</Text>
      </TouchableOpacity>

      <View>
        <Image
          source={{ uri: characterData?.image }}
          style={{ width: WIDTH, height: WIDTH }}
        />
      </View>

      <FlatList
        data={characterData?.episode}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};
export { DetailGraphQLScreenView };
