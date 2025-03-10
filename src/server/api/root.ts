import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { devicesRouter } from "./routers/devices";
import { postRouter } from "./routers/post";
import { gridsRouter } from "./routers/grids";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  devices: devicesRouter,
  grids: gridsRouter,
  post: postRouter,
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
