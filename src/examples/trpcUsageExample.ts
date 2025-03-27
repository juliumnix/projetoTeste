import type { AppRouter } from '../../server/tRPC-server-exemple';
import { ApiServiceConnector } from '../services/ApiServiceConnector';
import { TRPCConfig } from '../services/config/TRPCConfig';
import { TRPCOperationConfig } from '../services/types/ApiServiceConnectorTypes';

// Importar apenas o tipo do router, não o valor

/**
 * Exemplo de uso do tRPC com tipagem para autocomplete
 */
async function trpcUsageExample() {
  // Configurar o TRPCConfig com o tipo específico do router para obter autocomplete
  const trpcConfig = new TRPCConfig<AppRouter>();

  // Criar o connector
  const connector = ApiServiceConnector.createOrRetrieve(trpcConfig);

  try {
    // EXEMPLO 1: Executar operação com path baseada no tipo do router
    // Quando você digita 'trpcConfig.trpcClient.' o editor mostrará autocomplete
    console.log(
      'Estrutura do cliente tRPC:',
      Object.keys(trpcConfig.trpcClient),
    );

    // Dentro do seu editor, você poderá navegar a estrutura do router:
    // trpcConfig.trpcClient.user.byId.query()

    // Executando uma operação via connector
    const getUserResult = await connector.request<{ id: string; name: string }>(
      {
        path: 'user.byId', // Este path tem autocomplete quando você navega pelo trpcClient
        input: { id: '123' },
        type: 'query',
      } as TRPCOperationConfig,
    );

    console.log('Resultado da query:', getUserResult.data);

    // EXEMPLO 2: Criando uma função auxiliar para simplificar o uso
    async function executeTRPC<TResult>(
      path: string, // Na prática, use a navegação do trpcClient para obter este path
      input?: any,
      type: 'query' | 'mutate' = 'query',
    ): Promise<TResult> {
      const response = await connector.request<TResult>({
        path,
        input,
        type,
      } as TRPCOperationConfig);

      return response.data;
    }

    // Uso simplificado e tipado
    const user = await executeTRPC<{ id: string; name: string }>('user.byId', {
      id: '456',
    });

    console.log('Usuário:', user);

    // EXEMPLO 3: Executar operação diretamente no cliente tRPC
    // Aqui você terá autocomplete completo no editor
    if (trpcConfig.trpcClient.user?.byId) {
      const directResult = await trpcConfig.trpcClient.user.byId.query({
        id: '789',
      });
      console.log('Resultado direto:', directResult);
    }
  } catch (error) {
    console.error('Erro ao executar operações tRPC:', error);
  }
}

export default trpcUsageExample;
