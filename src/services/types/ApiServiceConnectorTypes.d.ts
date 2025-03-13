import { GraphQLAdapter } from "./GraphQLAdapter";
import { RESTAdapter } from "./RESTAdapter";

export type ClientProtocol = "REST" | "GraphQL";

export type HttpRequestConfig = {
  url: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  data?: any;
  params?: any;
  headers?: Record<string, string>;
};

export type GraphQLOperationConfig = {
  query: DocumentNode | string;
  variables?: any;
  headers?: Record<string, string>;
};

export type ApiRequestConfig = HttpRequestConfig | GraphQLOperationConfig;

export type ApiRequestFormat = RESTAdapter | GraphQLAdapter;
