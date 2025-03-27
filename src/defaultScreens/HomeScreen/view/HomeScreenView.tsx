import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TRPCExampleConnector } from '../../../services';
import { AppStackRoutes } from '../../../types/navigationTypes';
import { useHomeScreenViewModel } from '../viewModel/HomeScreenViewModel';

interface User {
  json: { id: string; name: string }[];
}

const HomeScreenView = ({ navigation }: AppStackRoutes<'HomeScreen'>) => {
  const { bottom } = useSafeAreaInsets();
  const { data, setID } = useHomeScreenViewModel();
  const [error, setError] = useState<string | null>(null);

  // Consulta usando o TRPCExampleConnector
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery<User[]>({
    queryKey: ['userList'],
    queryFn: async () => {
      const response = await TRPCExampleConnector.request<User>({
        path: 'user.list',
        type: 'query',
      });
      console.log('response', response.data.json);
      return response.data.json;
    },
  });

  // Mostrar log da resposta

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      {isLoading && (
        <View style={{ padding: 10, backgroundColor: '#f0f0f0' }}>
          <Text>Carregando dados do tRPC...</Text>
        </View>
      )}

      {error && (
        <View style={{ padding: 10, backgroundColor: '#ffeeee' }}>
          <Text style={{ color: 'red' }}>Erro: {error}</Text>
        </View>
      )}

      {users && users.length > 0 && (
        <View style={{ padding: 10, backgroundColor: '#eeffee' }}>
          <Text>Usuários ({users.json.length}):</Text>
          {users.json.map(user => (
            <Text key={user.id}>- {user.name || 'Sem nome'}</Text>
          ))}
        </View>
      )}

      {users && users.length === 0 && !isLoading && !error && (
        <View style={{ padding: 10, backgroundColor: '#ffffee' }}>
          <Text>Nenhum usuário encontrado.</Text>
          <TouchableOpacity
            style={{ marginTop: 10, padding: 8, backgroundColor: '#ddddff' }}
            onPress={async () => {
              try {
                // Criar um usuário para testar
                const userName =
                  'Usuário Teste ' + new Date().toISOString().slice(11, 19);
                console.log('Tentando criar usuário:', userName);

                const response = await TRPCExampleConnector.request({
                  path: 'user.create',
                  type: 'mutation',
                  input: { name: userName },
                });

                console.log('Resposta da criação:', response);
                refetch();
              } catch (err) {
                console.error('Erro ao criar usuário:', err);
                setError(
                  err instanceof Error ? err.message : 'Erro ao criar usuário',
                );
              }
            }}>
            <Text>Criar Usuário Teste</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={data.rest}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <View>
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  setID(String(item.id));
                  navigation.navigate('GraphQLModule');
                }}>
                <Text>navigate to GraphQLModule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  setID(String(item.id));
                  navigation.navigate('RESTModule');
                }}>
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
