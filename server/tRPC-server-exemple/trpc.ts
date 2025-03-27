import { initTRPC } from '@trpc/server';

import { transformer } from './transformer';

const t = initTRPC.create({
  transformer,
});

const loggerMiddleware = t.middleware(
  async ({ path, next, getRawInput, input }) => {
    console.log(
      `[${new Date().toISOString()}] Requisição recebida para ${path}`,
    );
    console.log('getRawInput', await getRawInput());
    console.log('input', input);
    const result = await next();
    console.log('result', result);
    console.log(`[${new Date().toISOString()}] Resposta para ${path}:`, {
      status: result.ok ? 'success' : 'error',
    });

    return result;
  },
);

export const router = t.router;
export const publicProcedure = t.procedure.use(loggerMiddleware);
