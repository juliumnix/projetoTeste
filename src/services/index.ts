// eslint-disable-next-line import/order
import type { AppRouter } from '../../server/tRPC-server-exemple';
import { ApiServiceConnector } from './ApiServiceConnector';
import { GraphQLConfig } from './config/GraphQLConfig';
import { RESTConfig } from './config/RESTConfig';
import { TRPCConfig } from './config/TRPCConfig';

export const RESTExampleConnector = ApiServiceConnector.createOrRetrieve(
  new RESTConfig(),
);

export const GraphQLExampleConnector = ApiServiceConnector.createOrRetrieve(
  new GraphQLConfig(),
);

export const TRPCExampleConnector = ApiServiceConnector.createOrRetrieve(
  new TRPCConfig<AppRouter>(),
);
