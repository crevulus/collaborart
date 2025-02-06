import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const devicesRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const devices = await ctx.db.devices.findMany();

    return devices;
  }),
});
