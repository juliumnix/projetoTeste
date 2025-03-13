import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppStackRoutes } from "../../../types/navigationTypes";
import { useHomeScreenViewModel } from "../viewModel/HomeScreenViewModel";

const HomeScreenView = ({ navigation }: AppStackRoutes<"HomeScreen">) => {
  const { bottom } = useSafeAreaInsets();
  const { data, setID } = useHomeScreenViewModel();

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <FlatList
        data={data.rest}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <View>
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  setID(String(item.id));
                  navigation.navigate("GraphQLModule");
                }}
              >
                <Text>navigate to GraphQLModule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  setID(String(item.id));
                  navigation.navigate("RESTModule");
                }}
              >
                <Text>navigate to RESTModule</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};
export { HomeScreenView };
