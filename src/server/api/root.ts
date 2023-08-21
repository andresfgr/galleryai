import { createTRPCRouter } from "~/server/api/trpc";
import { todosRouter } from "./routers/generateImage";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // example: exampleRouter,
  todosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
