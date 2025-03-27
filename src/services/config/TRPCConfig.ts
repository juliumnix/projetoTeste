import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  TRPCClientError,
} from '@trpc/client';

import { transformer } from '../../../server/tRPC-server-exemple/transformer';
import { TRPCAdapter } from '../types/TRPCAdapter';

export class TRPCConfig<TRouter = any> implements TRPCAdapter<TRouter> {
  trpcClient: any;
  baseUrl: string;

  constructor(
    baseUrl: string = 'http://192.168.0.7:3000/trpc',
    options: {
      transformer?: any;
      headers?: Record<string, string>;
      useBatchLink?: boolean;
    } = {},
  ) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    const {
      transformer: customTransformer = transformer,
      headers = {
        'Content-Type': 'application/json',
      },
      useBatchLink = true,
    } = options;

    console.log('Inicializando TRPCConfig com baseUrl:', this.baseUrl);

    const linkOptions = {
      url: this.baseUrl,
      headers,
      transformer: customTransformer,
    };

    const link = useBatchLink
      ? httpBatchLink(linkOptions)
      : httpLink(linkOptions);

    this.trpcClient = createTRPCClient({
      links: [link],
    });
  }

  // Método auxiliar para transformar erros do tRPC em formato compatível com Axios
  formatTRPCErrorToAxios(error: unknown): any {
    if (error instanceof TRPCClientError) {
      return {
        status: error.data?.httpStatus || 500,
        statusText: error.message || 'Erro na operação tRPC',
        data: null,
        headers: {},
        config: {},
      };
    }

    return {
      status: 500,
      statusText: error instanceof Error ? error.message : 'Erro desconhecido',
      data: null,
      headers: {},
      config: {},
    };
  }
}
