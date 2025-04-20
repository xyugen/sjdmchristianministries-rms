import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { testRoute } from "./routes/test-route";
import { administrativeRouter } from "./routes/administrative";
import { humanResourceRouter } from "./routes/human-resource";
import { authRouter } from "./routes/auth";
import { financeRouter } from "./routes/finance";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  administrative: administrativeRouter,
  humanResource: humanResourceRouter,
  finance: financeRouter,
  test: testRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
