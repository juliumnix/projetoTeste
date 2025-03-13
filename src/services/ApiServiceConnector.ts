import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { AxiosResponse } from "axios";
import {
  ApiRequestConfig,
  ApiRequestFormat,
  ClientProtocol,
  GraphQLOperationConfig,
  HttpRequestConfig,
} from "./types/ApiServiceConnectorTypes";
import { GraphQLAdapter } from "./types/GraphQLAdapter";
import { RESTAdapter } from "./types/RESTAdapter";

const PROTOCOL_DETECTORS: Record<
  ClientProtocol,
  (adapter: ApiRequestFormat) => boolean
> = {
  REST: (adapter) => "axiosInstance" in adapter,
  GraphQL: (adapter) => "apolloClient" in adapter,
};

export class ApiServiceConnector<TAdapter extends ApiRequestFormat> {
  private static connectorRegistry = new Map<
    string,
    ApiServiceConnector<RESTAdapter | GraphQLAdapter>
  >();

  private constructor(
    private readonly adapterClient: TAdapter,
    private readonly protocolType: ClientProtocol
  ) {}

  static createOrRetrieve<TAdapter extends ApiRequestFormat>(
    adapter: TAdapter
  ): ApiServiceConnector<TAdapter> {
    const protocol = Object.entries(PROTOCOL_DETECTORS).find(([_, detector]) =>
      detector(adapter)
    )?.[0] as ClientProtocol;

    if (!protocol) {
      throw new Error(
        "Tipo de adaptador não reconhecido. Nenhum detector de protocolo correspondente."
      );
    }

    const registryKey = `${adapter.constructor.name}:${protocol}`;

    if (!this.connectorRegistry.has(registryKey)) {
      this.connectorRegistry.set(
        registryKey,
        new ApiServiceConnector(adapter, protocol)
      );
    }

    return this.connectorRegistry.get(
      registryKey
    ) as ApiServiceConnector<TAdapter>;
  }

  applyAuthenticationToken(accessToken: string): void {
    if (this.protocolType !== "REST") {
      throw new Error(
        "Autenticação via token disponível apenas para clientes REST"
      );
    }

    (
      this.adapterClient as RESTAdapter
    ).axiosInstance.defaults.headers.authorization = `Bearer ${accessToken}`;
  }

  getGraphQLClient(): ApolloClient<NormalizedCacheObject> {
    if (this.protocolType !== "GraphQL") {
      throw new Error("Cliente GraphQL não disponível neste conector");
    }

    return (this.adapterClient as GraphQLAdapter).apolloClient;
  }

  request<TResponse>(
    this: ApiServiceConnector<RESTAdapter>,
    config: HttpRequestConfig
  ): Promise<AxiosResponse<TResponse>>;

  request<TResponse>(
    this: ApiServiceConnector<GraphQLAdapter>,
    config: GraphQLOperationConfig
  ): Promise<AxiosResponse<TResponse>>;

  async request<TResponse>(
    config: ApiRequestConfig
  ): Promise<AxiosResponse<TResponse>> {
    if (this.protocolType === "REST") {
      return this.executeHttpRequest(
        this.adapterClient as RESTAdapter,
        config as HttpRequestConfig
      );
    }

    if (this.protocolType === "GraphQL") {
      return this.executeGraphQLOperation(
        this.adapterClient as GraphQLAdapter,
        config as GraphQLOperationConfig
      );
    }

    throw new Error(`Protocolo não suportado: ${this.protocolType}`);
  }

  private async executeHttpRequest<TResponse>(
    adapter: RESTAdapter,
    { url, method, data, params, headers }: HttpRequestConfig
  ): Promise<AxiosResponse<TResponse>> {
    const { axiosInstance } = adapter;
    const originalHeaders = { ...axiosInstance.defaults.headers };

    try {
      if (headers) {
        Object.assign(axiosInstance.defaults.headers, headers);
      }

      const response = await axiosInstance.request<TResponse>({
        url,
        method,
        data,
        params,
      });

      return response;
    } catch (error: any) {
      if (error.isAxiosError && error.response) {
        return error.response as AxiosResponse<TResponse>;
      }
      throw new Error(`Falha na requisição HTTP: ${error.message || error}`);
    } finally {
      axiosInstance.defaults.headers = originalHeaders;
    }
  }

  private async executeGraphQLOperation<TResponse>(
    adapter: GraphQLAdapter,
    { query, variables, headers }: GraphQLOperationConfig
  ): Promise<AxiosResponse<TResponse>> {
    const { apolloClient } = adapter;
    const gqlOperation =
      typeof query === "string"
        ? gql`
            ${query}
          `
        : query;

    try {
      const { data } = await apolloClient.query<TResponse>({
        query: gqlOperation,
        variables,
        context: headers ? { headers } : undefined,
      });

      return {
        data,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      } as AxiosResponse<TResponse>;
    } catch (error: any) {
      throw new Error(`Falha na operação GraphQL: ${error.message || error}`);
    }
  }
}
