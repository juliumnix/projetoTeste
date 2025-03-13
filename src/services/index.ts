import { ApiServiceConnector } from "./ApiServiceConnector";
import { GraphQLConfig } from "./config/GraphQLConfig";
import { RESTConfig } from "./config/RESTConfig";

export const RESTExampleConnector = ApiServiceConnector.createOrRetrieve(
  new RESTConfig()
);

export const GraphQLExampleConnector = ApiServiceConnector.createOrRetrieve(
  new GraphQLConfig()
);
