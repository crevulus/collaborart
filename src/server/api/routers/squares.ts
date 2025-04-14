import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const squaresRouter = createTRPCRouter({
  getSquaresByGrid: publicProcedure
    .input(z.object({ grid_id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.squares.findMany({
        where: { grid_id: input.grid_id },
        select: {
          id: true,
          drawing_data: true,
          image_url: true,
        },
      });
    }),
});
