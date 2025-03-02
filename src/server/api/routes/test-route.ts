import { createTRPCRouter, publicProcedure } from "../trpc";

export const testRoute = createTRPCRouter({
  test: publicProcedure.query(() => {
    return "test";
  })
})