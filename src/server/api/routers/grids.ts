import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gridsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.string().uuid())
    .mutation(async ({ input, ctx }) => {
      const grid = await ctx.db.grids.create({
        data: {
          created_at: new Date(),
          pin: 1234,
          device_id: input,
        },
      });

      return grid;
    }),
});
