/**
 * This a minimal tRPC server
 */
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';

import { db } from './db';
import { publicProcedure, router } from './trpc';

const userRouter = router({
  list: publicProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),
  byId: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await db.user.findById(input);
    return user;
  }),
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db.user.create(input);
      return user;
    }),
});

export type AppRouter = typeof userRouter;

const server = createHTTPServer({
  router: userRouter,
  basePath: '/trpc/api/',
});

server.listen(3000);
